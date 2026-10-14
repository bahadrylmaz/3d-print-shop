# MicronForge: 3. aşama görsel denetim

Hazırlayan: Tasarımcı. Dal: `premium-yeniden-tasarim`. Tarih: 2026-10-14.
Yöntem: Playwright (Chromium), her rota 1280 ve 375 px, tam sayfa; lazy görseller için önce sayfa sonuna kadar kaydırıldı.
Rotalar: `/`, `/magaza`, `/magaza?kategori=dekor`, `/magaza/buz-ejderha`, `/magaza/yok-boyle-urun`, `/blog`,
`/blog/manisa-3d-baski-hizmeti-rehberi`, mobil menü açık. Ayrıca DOM taraması: başlık ölçüleri, 44 px altı tıklanır öğe,
`alt` niteliği olmayan görsel, 22 px altı Bodoni.

Son ekran görüntüleri: `docs/tasarim/inceleme/son/` (`<rota>-1280.png`, `<rota>-375.png`, `menu-375.png`;
karşılaştırma için düzeltme öncesi mobil ana sayfa: `once-ana-375.png`).

`npm run lint` hatasız, `npm run build` hatasız (7 blog sayfası, sitemap ve feed prerender edildi).
Konsol hatası yok; hiçbir rotada yatay kaydırma yok (scrollWidth = 1280 / 375).

---

## Sayfa yükseklikleri (px)

| Rota | 1280 önce | 1280 sonra | 375 önce | 375 sonra |
|---|---|---|---|---|
| `/` | 10.682 | 10.434 | **13.549** | **11.788** (-1.761, -%13) |
| `/magaza` | 7.438 | 7.411 | 6.831 | 6.281 |
| `/magaza?kategori=dekor` | 4.531 | 4.505 | 4.597 | 4.152 |
| `/magaza/buz-ejderha` | 3.464 | 3.451 | 3.881 | 3.515 |
| `/magaza/yok-boyle-urun` | 1.702 | 1.695 | 2.207 | 1.423 |
| `/blog` | 3.257 | 3.174 | 3.931 | 3.578 |
| `/blog/manisa-3d-baski-hizmeti-rehberi` | 5.207 | 5.133 | 6.299 | 5.978 |

Mobil ana sayfa, bölüm bölüm (375 px): hero 1.256 → 1.191 · vitrin 1.373 → 1.252 · atölyede basılanlar 1.627 → 1.394 ·
süreç 1.539 → 1.321 · reçineler 1.496 → 1.162 · teklif formu 2.189 → 1.882 · kurallar 715 → 619 · SSS 985 → 928 ·
blogdan 1.060 → 1.004 · footer 1.249 → 975. Hiçbir metin silinmedi; mobilde gizlenen dört öğenin bilgisi sayfada başka yerde duruyor (aşağıda).

---

## Bulgular ve düzeltmeler

### 1. "Yapay zekâ yapmış" izleri

| Bulgu | Düzeltme | Yer |
|---|---|---|
| Hero altındaki teknik satır dört kutulu, dikey çizgili bir "güven şeridi" gibi duruyordu (YON §8.8'in yasakladığı sayı şeridi görüntüsü). Metin METIN §3.1'de olduğu için kalıyor, biçimi değişti. | Kutular ve dikey çizgiler kalktı: tek üst çizgi altında sakin bir künye satırı (masaüstü yan yana, mobil 2 sütun). | `src/components/ana/Hero.jsx:66-73` |
| Mobilde atölye görseli yerine içi boş 16:9 gri blok (211 px) duruyordu; "yarım kalmış" hissi. | Yer tutucu yalnız md üstünde. Fotoğraf gelince `src` verilip `max-md:hidden` kaldırılacak (yorumda yazıyor). | `src/components/ana/Atolyeden.jsx:41-46` |
| Ürün 404'te mobilde butonların altına 447 px'lik boş kaide geliyordu. | Boş kaide yalnız md üstünde. | `src/pages/ProductDetail.jsx:254-255` |
| Blog yazısı sonundaki CTA'nın üstünde sitede tek olan koyu (Grafit) çizgi vardı. | Diğer bütün ayırıcılar gibi `Çizgi` rengi. | `src/pages/BlogPost.jsx:222` |
| Mağaza/benzer ürün küçük kartlarında mobilde "Malzeme · Şeffaf / reçine" iki sütuna sıkışıp kırılıyordu (etiket yığını görüntüsü). | Küçük kartta mobilde etiket başlığı yalnız ekran okuyucuda (`max-md:sr-only`), değer tek satır. | `src/components/temel/EserEtiketi.jsx:50-56` |

Bakıp **değiştirmediğim**: mobil menü (Kireç panel, Bodoni 36 px, 4 bağlantı) ve SSS akordeonu YON'a uygun; ikon kullanımı yalnız işlevsel; hareket yalnız hero açılışı, menü, filtre ve WhatsApp düğmesinde.

### 2. Mobil ana sayfanın uzunluğu (13.549 → 11.788 px)

| Düzeltme | Kazanç (yaklaşık) | Yer |
|---|---|---|
| Bölüm boşluğu tokenları: `--mf-bolum` 72→144 yerine **56→128**, `--mf-bolum-kucuk` 48→80 yerine **40→72**. Masaüstünde fark küçük (1280'de 133 → 126 px), mobilde her bölüm başına ~32 px. | ~400 px | `src/styles/tokens.css:104-108`, YON §4 güncellendi |
| Süreç: mobilde numara solda kendi sütununda, başlık yanında (önce numara + 20 px + başlık alt alta). | ~220 px | `src/components/ana/Surec.jsx:45-59` |
| Teklif formu solundaki 3 adımlı liste mobilde gizli: giriş paragrafı aynı üç adımı söylüyor, fotoğraf uyarısı formun içinde de var. Masaüstünde yan sütunu doldurduğu için kalıyor. | ~280 px | `src/components/ana/TeklifFormu.jsx:175-176` |
| "Atölyede basılanlar" satırlarının alt künyesi mobilde gizli (reçine türleri Malzemeler bölümünde, ölçekler metnin içinde, boya bilgisi SSS'de). | ~180 px | `src/components/ana/OzelUretim.jsx:60-61` |
| Reçine tanımlarında üçünde de aynı olan "Kürleme UV 405 nm" satırı mobilde gizli (Süreç 3. adımda yazıyor). | ~75 px | `src/components/ana/Atolyeden.jsx:66-68` |
| Boş 16:9 atölye yer tutucusu mobilde gizli (bkz. 1). | ~210 px | `src/components/ana/Atolyeden.jsx:41-47` |
| Hero görseli mobilde de 4:5 (masaüstüyle aynı oran; önce 3:4). | 28 px | `src/components/ana/Hero.jsx:46` |
| Footer mobilde 2×2 (YON §6.8 zaten böyle diyordu; "İletişim" tam genişlik olunca "Bilgi" tek başına bir satır kaplıyordu), üst boşluk 96 → 64 px. Telefon numarası artık ikiye bölünmüyor. | ~270 px | `src/components/yerlesim/Footer.jsx:58-70, 94-107` |
| Bölüm içi başlık altı boşlukları mobilde 48 → 32 px, liste satır altı 40 → 32 px (Vitrin, Atölyede basılanlar, Süreç, Reçineler, Kurallar, SSS, Blogdan). | ~200 px | ilgili `src/components/ana/*.jsx` satırları (git diff) |

### 3. Sayfalar arası tutarlılık

| Bulgu | Düzeltme | Yer |
|---|---|---|
| Başlık ölçeği dağınıktı: "Mağaza" H1 `display` (81 px), Blog H1 `h1` (61 px), ürün adı H1 `h2` (41 px; mobilde sayfanın H2'leriyle aynı 28 px), ana sayfada iki H2 `h1` boyunda (Vitrin, SSS) diğer altısı `h2`. | Kural: `display` yalnız ana sayfa hero'su; iç sayfa H1'leri (Mağaza, Blog, yazı, ürün, 404) `h1`; bütün bölüm H2'leri `h2`. YON §2'ye eklendi. | `Magaza.jsx:60`, `ProductDetail.jsx:109`, `Vitrin.jsx:39`, `Sorular.jsx:12` |
| Mağaza başlığı küçülünce H1 ile giriş metni arasında boşluk açıldı. | H1 ve giriş üstten hizalı; üst boşluk Blog ile aynı token (`--mf-bolum-kucuk`). | `Magaza.jsx:57-63` |
| Geri bağlantısının üst boşluğu ürün sayfasında 24 px, blog yazısında 40 px idi. | İkisi de 16 / 24 px. | `BlogPost.jsx:124` |

Eser etiketi, butonlar (48 px, 2 px köşe), metin bağlantıları ve çizgiler sayfalar arasında zaten tutarlıydı.

### 4. Tipografi

**Bodoni Moda kerning (V-i vb.).** Sorun CSS'te değil yazı tipindeydi: dosyanın kerning tablosunda V/Y/T + `i ı j m n p r`
çiftleri ve W'nin bütün küçük harf çiftleri 0. "Vitrin", "Yıl", "Tip", "Wave" büyük boyda kopuk görünüyordu.
Harf aralığıyla (`letter-spacing`) düzeltmek bütün başlığı bozar; ilk harfe `margin-right` vermek her başlığa elle
müdahale ister ve kelime ortasındaki çiftleri ("Yoda", "Tıkla") kaçırır. Bu yüzden yazı tipinin kendisine 54 (düz) ve
52 (italik) eksik çift eklendi (yalnız değeri 0 olanlar; UPM 2000'de -50 ile -200, mevcut komşu çiftlerden türetildi).
Ölçüm: 100 px'te "Vi" genişliği 102 → 93,5 px. Glif ve diğer özelliklere dokunulmadı; OFL 1.1 buna izin veriyor (Reserved Font Name yok).
Dosyalar: `public/fonts/bodoni-moda/*.woff2`, açıklama `public/fonts/KAYNAK.txt`, yeniden üretim `scripts/bodoni-kerning.py`.

**Hero başlığı.** "Reçineden / ince işler." 768, 1024, 1280, 1440 ve 1920 px'te ölçüldü: her birinde 2 satır (`max-w-[12ch]` + `balance`). Değişiklik gerekmedi.

**₺ işareti → "TL".** Schibsted Grotesk'in ₺ glifi £ ile neredeyse aynı çizilmiş (yan yana basıldı, ayırt edilemiyor).
Seçenekler: (a) ₺'yi başka bir yazı tipinden göstermek: sistem yazı tipine düşerse glif işletim sistemine göre değişir ve
Schibsted rakamlarının yanında farklı kalınlıkta durur; kendi sunucumuza üçüncü bir yazı tipi eklemek tek glif için fazla.
(b) "TL": aynı yazı tipiyle, her cihazda aynı, Türk perakendesinde (butik ve üst segment dahil) fiyat için yaygın biçim, okunuşu da
net. Daha sakin ve daha premium olan (b). Fiyatlar artık `1.480 TL`, başlangıç fiyatı `240 TL'den başlayan`.
Yer: `src/components/temel/EserEtiketi.jsx:32-33`, `src/pages/ProductDetail.jsx:57`. JSON-LD (`priceCurrency: TRY`) etkilenmedi.

### 5. Erişilebilirlik

- 44 px: 1280 ve 375'te bütün rotalarda 44 px altında tıklanır öğe yok (DOM taraması; radyo ve dosya girdileri etiketleriyle 44 px).
- Odak: global `:focus-visible` 2 px Reçine halkası klavyeyle denendi (mağaza sekmeleri, kartlar, form radyoları) ve görünür.
- Alt metin: `alt` niteliği olmayan görsel yok; yer tutucular `role="img"` + etiket ya da `aria-hidden`.
- Kontrast: kullanılan metin/zemin çiftleri YON §3 tablosunda AA geçiyor; Sis (#5F6561) Taş zeminde (4.15) küçük metinde kullanılmıyor (footer Grafit 2).
- Küçük kartta gizlenen "Malzeme" başlığı ekran okuyucuda okunmaya devam ediyor.

---

## Çözmediklerim ve nedenleri

1. **Lisanslı karakterler katalogda.** Mağazada Hulk Figürü, Spider-Man Figürü, Gollum, Usta Yoda, Grogu (Baby Yoda), Grogu İkili Set,
   Şirinler Seti, Galatasaray Aslanı, Beyaz Büyücü var. BRIEF "yeni katalogda olmayacak" diyor. Veri dosyası (`src/data/products.js`)
   benim alanım değil; yeni katalog gelene kadar Bahadır/koordinatör kararı gerekiyor. **Yayın öncesi en önemli eksik bu.**
2. **Ürün fotoğrafları.** Mevcut fotoğraflar balkonda, apartman cepheli arka planla çekilmiş; "stüdyo fonu" diliyle çelişiyor ve premium
   hissi en çok bu düşürüyor. Yeni fotoğraflar gelince çözülür (çekim önerisi YON §7).
3. **Masaüstünde boş atölye görseli** (1280'de ~720 px gri alan). YON'daki yere fotoğraf gelene kadar kalıyor; fotoğraf gecikecekse
   masaüstünde de gizlemeyi öneririm (tek satır: `Atolyeden.jsx` sarmalayıcısında `max-md:hidden` → `hidden`).
4. **METIN.md fiyat biçimi.** METIN §4 (satır 315) hâlâ `{fiyat} ₺` diyor; site artık `TL`. METIN.md Metin ajanının dosyası olduğu için
   değiştirmedim; koordinatör onaylarsa o satır `{fiyat} TL` / `{başlangıç fiyatı} TL'den başlayan` olmalı.
5. **Veri metinlerindeki kural dışılıklar** (dokunmadım, kaynakları veri dosyaları): ürün açıklamasında uzun tire ("Dev boyut, dikenli kristal
   gövde — vitrinlik ...", METIN §1-8 yasaklıyor); blog başlıkları Başlık Düzeninde ("Manisa OSB İçin Hassas Prototip..."), METIN cümle düzeni istiyor.
6. **Doğrulanmamış teknik iddialar görünür durumda**: Saturn 4 Ultra 16K, 25 mikron, 218 × 123 × 250 mm, "yaklaşık 30 dakika", "yaklaşık 48 saat",
   "sekizden fazla renk". YON §9'da `[doğrulanacak]`; METIN'e girdikleri için metin olarak kaldılar. Bahadır'ın bir kez onaylaması gerekiyor.
7. **Mobil ana sayfa daha da kısalabilir ama içerik kararı ister**: Atölyede basılanlar açıklamalarını Metin ajanı yarıya indirebilir
   (~350 px), SSS 10 sorudan 6'ya inebilir (JSON-LD ile birlikte), reçine tanımları akordeona alınabilir. Hepsi metin/işlev değişikliği
   olduğu için yapmadım.
8. **Mağaza mobil raf ritmi**: sağ sütun her satırda 48 px aşağıda; 22 üründe ~500 px ekliyor. Vitrin rafı hissini veren tek şey olduğu
   için korudum.
9. **Ürün kartı adı Bodoni italik 18-20 px**: YON §2'deki "Bodoni 22 px altında yok" kuralına YON §6.3'te bilerek istisna verilmişti; italik
   bu boyda okunur, kaldı.
10. **Sabit WhatsApp düğmesi** 1280 px'te sağ sütunun kenarına biniyor (ürün sayfasında "Ayrıntılar" tablosunun son birkaç harfi). Kenar boşluğu
    61 px, düğme 129 px; sabit düğmenin doğası. Kaydırınca içerik açılıyor, kabul edilebilir buldum.
