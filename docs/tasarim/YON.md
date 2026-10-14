# MicronForge sanat yönü: "Alçı Atölyesi"

Hazırlayan: Tasarımcı (1. aşama). Bağlı dosyalar:
`src/styles/tokens.css` (tasarım sistemi), `public/fonts/` (yazı tipleri + lisans + `KAYNAK.txt`),
`docs/tasarim/onizleme.html` (stil rehberi; dev sunucusunda `/docs/tasarim/onizleme.html`),
`docs/tasarim/onizleme-1280.png`, `onizleme-375.png`.

Okuma: "Butik reçine baskı atölyesinin mağaza sitesi; koleksiyoncu, hediye alan ve küçük kurumsal müşteri için;
sakin, editoryal, müze mağazası dili."
Ayar: varyans 6, hareket 3, yoğunluk 2 (taste-skill ölçeği). Tek tema: açık.

---

## 1. Marka hissi

Referans dünyası **müzelerin alçı döküm atölyeleri**: Berlin'deki Gipsformerei ya da V&A'nın döküm salonları gibi,
heykellerin kopyalarının üretildiği, raflarda beyaz figürlerin sıra sıra durduğu, her parçanın yanında küçük bir
eser etiketi olan yerler. MicronForge da aynı işi yapıyor: bir modelden fiziksel bir parça döküyor, yalnızca
alçı yerine reçine kullanıyor. Site bu yüzden mağaza gibi değil **vitrin** gibi davranır: mat, mineral bir zemin,
nefes alan büyük görseller, her ürünün altında malzeme, ölçü ve süreyi söyleyen bir etiket. Ses alçak; övünme yok,
bilgi var. Tek renk vurgusu, atölyenin en çok bastığı renkli reçineden gelir: koyu, şişe camı gibi bir yeşil.

Bu yön neden "jenerik premium" değil:
- Krem + terrakota/pirinç + espresso (yapay zekâ premium varsayılanı) bilinçli olarak reddedildi. Zemin sarı değil,
  hafif yeşile çalan alçı grisi; vurgu toprak değil, ürünün kendi malzemesi.
- Serif "premium görünsün" diye seçilmedi: Bodoni'nin kıl inceliğindeki çizgileri ile kalın gövdeleri arasındaki
  karşıtlık, 25 mikronluk katman hassasiyetinin tipografik karşılığı. Baskı kalitesini anlatan şey yazının kendisi.
- İmza bileşen gerçek bilgi taşıyan bir şey (eser etiketi), süs değil.

## 2. Tipografi

| Rol | Yazı tipi | Lisans | Kaynak |
|---|---|---|---|
| Başlık, ürün adı, alıntı | **Bodoni Moda** (Owen Earl), değişken: `opsz` 6-96, `wght` 400-900, düz + italik | SIL OFL 1.1, Reserved Font Name yok | github.com/google/fonts `ofl/bodonimoda` (commit 6ce172f7), üst kaynak github.com/indestructible-type/Bodoni |
| Gövde, arayüz, fiyat, form | **Schibsted Grotesk** (Bakken & Bæck, Henrik Kongsvoll), değişken: `wght` 400-900, düz + italik | SIL OFL 1.1, Reserved Font Name yok | github.com/google/fonts `ofl/schibstedgrotesk` (commit 8b0a1d0f), üst kaynak github.com/schibsted/schibsted-grotesk |

Dosyalar `public/fonts/bodoni-moda/` ve `public/fonts/schibsted-grotesk/` altında, her birinin yanında `OFL.txt`.
Latin + Latin Genişletilmiş-A alt kümesi (Türkçe ı İ ş Ş ğ Ğ dahil, `locl` özellikleri korunmuş), toplam ~268 KB,
sayfa başına genelde 2 dosya (~126 KB) iner. `@font-face` blokları `tokens.css` içinde, `font-display: swap`.

Seçim gerekçesi:
- **Bodoni Moda**: optik boyut ekseni sayesinde 88 px'te kıl çizgiler incecik, 22 px ürün adında okunur kalıyor.
  İtaliği eser etiketindeki ürün adlarında el yazısı bir müze kartı hissi veriyor. Fraunces / Instrument Serif /
  Playfair gibi her yerde görülen seçimlerden uzak.
- **Schibsted Grotesk**: gazete için çizilmiş, küçük boyda sıkı ve net; Inter/Geist değil. `case`, `tnum`, `frac`
  özellikleri var. **₺ glifi Schibsted'de var, Bodoni'de yok**: fiyat her zaman Schibsted ile dizilir.
  *3. aşama:* Schibsted'in ₺ glifi £ ile neredeyse aynı çizilmiş; fiyatlar artık `1.480 TL` biçiminde (INCELEME.md).

Ölçek (375 px'te alt uç, 1440 px'te üst uç; `tokens.css` `--mf-fs-*`):

| Token | Değer | px | Satır aralığı | Yazı tipi |
|---|---|---|---|---|
| `display` | `clamp(2.75rem, 1.78rem + 4.14vw, 5.5rem)` | 44 → 88 | 1.04 | Bodoni 400 |
| `h1` | `clamp(2.25rem, 1.59rem + 2.82vw, 4rem)` | 36 → 64 | 1.12 | Bodoni 400 |
| `h2` | `clamp(1.75rem, 1.4rem + 1.5vw, 2.75rem)` | 28 → 44 | 1.12 | Bodoni 400 |
| `h3` | `clamp(1.375rem, 1.24rem + 0.56vw, 1.75rem)` | 22 → 28 | 1.2 | Bodoni 500 |
| `lead` | `clamp(1.125rem, 1.06rem + 0.28vw, 1.3125rem)` | 18 → 21 | 1.5 | Schibsted 400 |
| `body` | `clamp(1rem, 0.98rem + 0.09vw, 1.0625rem)` | 16 → 17 | 1.6 | Schibsted 400 |
| `small` | `0.875rem` | 14 (taban, altına inilmez) | 1.5 | Schibsted 400 |

Kurallar:
- Bodoni yalnız 22 px ve üstünde. Uzun okuma (blog gövdesi dahil) Schibsted. Blog'da Bodoni yalnız başlık, ara başlık, alıntı.
- Ağırlıklar: Bodoni 400 (başlık), 500 (h3, logo). Schibsted 400 gövde, 500 vurgu/etiket/buton. 600 ve üstü kullanılmaz.
- Başlıklar cümle düzeninde. **Büyük harf + açık aralıklı "eyebrow" etiketi yok.** Başlıkta tek kelimeyi italik/renkli yapmak yok.
- Fiyat: `font-variant-numeric: lining-nums proportional-nums`. `tabular-nums` yalnız hizalı sütunlarda (sipariş özeti);
  Schibsted'in tabular nokta genişliği fiyatı "1 . 480" gibi dağıtıyor (önizlemede denendi, kaldırıldı).
- Başlık ölçeği sayfalar arasında sabit (3. aşama): `display` yalnız ana sayfa hero'su; her iç sayfanın H1'i
  (Mağaza, Blog, yazı, ürün adı, 404) `h1`; bölüm başlıkları (H2) her yerde `h2`; liste içi başlıklar `h3`.
- `text-wrap: balance` başlıklarda, `pretty` paragraflarda. Paragraf genişliği en fazla `62ch`, giriş metni `38ch`.
- İtalik ürün adında `y g j p ş ç` alt uzantıları var: satır aralığı en az 1.2.
- Bodoni Moda büyük boyda bazı çiftlerde (ör. "V" + "i", önizlemede "Vitrindekiler") geniş boşluk bırakıyor.
  Başlık V/W/Y/T ile başlıyorsa göz ile kontrol edin; gerekirse ilk harfe `margin-right: -0.04em` verin.
  *3. aşama:* yazı tipinin kendisine eksik kerning çiftleri eklendi (V/Y/T + i ı j m n p r, W + bütün küçük harfler;
  `scripts/bodoni-kerning.py`, `public/fonts/KAYNAK.txt`). Elle `margin-right` gerekmez.

## 3. Renk

| Ad | HEX | Kullanım | Oran | Alçı (#E7E8E3) üzerinde kontrast |
|---|---|---|---|---|
| Alçı | `#E7E8E3` | sayfa zemini | ~%70 | |
| Kireç | `#F3F4F0` | form alanı, açılır panel, mobil menü | ~%5 | |
| Taş | `#D6D8D2` | görsel yer tutucu, alt bilgi bandı | ~%10 | |
| Taş koyu | `#CDD0C9` | yer tutucu ışık geçişinin kenarı | | |
| Çizgi | `#C3C6BF` | saç çizgisi, yalnız ayırıcı | | 1.40 (metin için değil) |
| Çizgi güçlü | `#7B807A` | form kenarı, kontrol sınırı | | 3.27 (UI için ≥3 geçer) |
| Grafit | `#1C201E` | ana metin, birincil buton | ~%12 | 13.38 AAA |
| Grafit 2 | `#4F5551` | ikincil metin | | 6.20 AA |
| Sis | `#5F6561` | açıklama, etiket başlığı | | 4.84 AA (Kireç'te 5.40, Taş'ta 4.15: **Taş üstünde küçük metin için Grafit 2 kullanın**, 5.31) |
| Reçine | `#1E4D40` | **tek vurgu**: odak halkası, bağlantı hover, seçili durum, buton hover | ~%2 | 7.78 AAA |
| Reçine koyu | `#163B31` | buton hover zemini (üstünde Kireç 11.16) | | |
| Reçine açık | `#CFDAD3` | metin seçimi zemini | | Grafit üstünde 11.47 |
| Hata | `#8E2A22` | yalnız form hatası | | 6.81 AA |

Kurallar:
- Saf siyah, saf beyaz yok. Degrade yok (yer tutucudaki çok hafif ışık geçişi hariç; o da fotoğraf gelince kalkar).
- Vurgu rengi büyük alanda kullanılmaz; bölüm zemini olmaz. Renk ürün fotoğraflarından gelir.
- Tek tema: açık. Koyu bölüm "sandviçi" yok. Koyu mod şimdilik yok; gerekçe: yeni ürün fotoğrafları tek bir fon
  üzerinde çekilecek ve site o fonla bütünleşmeli. İleride istenirse `:root` değerleri bir `[data-tema="koyu"]`
  bloğunda yeniden tanımlanır, bileşenler değişmez.
- WhatsApp yeşili (#25D366) kullanılmaz; WhatsApp erişimi marka paletinde kalır (bkz. §6.9).

## 4. Izgara, boşluk, köşe, çizgi, gölge

**Izgara** (`--mf-*`):
- Masaüstü (≥768 px) 12 kolon, mobil 4 kolon.
- Oluk: `clamp(1rem, 0.75rem + 1.07vw, 2rem)` → 16-32 px.
- Kenar boşluğu: `clamp(1.25rem, 0.2rem + 4.5vw, 4.5rem)` → 375 px'te 20 px, 1280 px'te ~61 px, en çok 72 px.
- İçerik genişliği en çok 1360 px (+ kenarlar). Okuma sütunu 720 px.
- Kırılımlar: Tailwind varsayılanı (`md` 768, `lg` 1024, `xl` 1280). Yerleşim değişimi yalnız `md` ve `lg`'de.
- Hizalama: her şey sola. Ortalanmış metin yalnız 404 sayfasında.
- Asimetri kuralı: bir bölümde metin 5 kolon ise görsel 6-7 kolon; ikisi asla 6/6 bölünmez. Aynı yerleşim ailesi
  bir sayfada en fazla bir kez.

**Boşluk ölçeği** (4 px tabanlı): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
Bölümler arası: `--mf-bolum` = 56 → 128 px. Bölüm içi büyük ara: `--mf-bolum-kucuk` = 40 → 72 px.
(3. aşamada 72 → 144 / 48 → 80'den indirildi: mobil ana sayfa 13.500 px'e çıkıyordu.)
Tailwind'de aralık birimi 4 px olarak kaldı (`p-6` = 24 px); bölüm için `py-(--mf-bolum)`.

**Köşe**: tek kural. Görseller, kartlar, paneller, bantlar **keskin (0)**. Dokunulan kontroller (buton, input,
WhatsApp düğmesi) **2 px**. Hap (pill) ve yuvarlak buton yok. Tailwind'de yalnız `rounded-none` ve `rounded-kontrol` var.

**Çizgi**: 1 px `Çizgi` rengi; bölümleri ve etiket gruplarını ayırır. 2 px yalnız odak halkası ve seçili sekme alt çizgisi.
Her satırın altına çizgi çekilmez; liste içinde ya üst ya alt çizgi.

**Gölge**: tek gölge, `--mf-golge-katman`, yalnız sayfanın üstünde duran katmanlarda (mobil menü paneli,
WhatsApp düğmesi, açılır seçim). Kartta, görselde, butonda gölge yok.

**Doku**: grain/noise yok. Derinliği fotoğraf verir.

## 5. Hareket

Az ve anlamlı. Üç süre: 140 ms (renk/hover), 280 ms (panel, akordeon), 900 ms (tek açılış anı).
Eğri: `cubic-bezier(0.2, 0, 0, 1)`.

1. **Tek açılış anı: "katman katman".** Ana sayfa hero görseli ilk yüklemede alttan yukarı, 18 adımda (`steps(18)`)
   açılır; reçine baskının katman katman yükselmesine gönderme. `clip-path: inset(100% 0 0 0) → inset(0)`,
   900 ms, 120 ms gecikme. Sadece ana sayfa hero'su, sadece ilk yükleme. (Önizlemede `.katman-katman`.)
2. **Kullanıcıya yanıt veren hareket**: mobil menü açılır (280 ms opaklık + 8 px kayma), SSS akordeonu açılır
   (yükseklik yerine `grid-template-rows: 0fr → 1fr`), mağaza filtresi değişince ızgara 140 ms çapraz geçiş,
   ürün galerisinde küçük görsel seçilince ana görsel 140 ms çapraz geçiş, buton `:active` 1 px aşağı.
3. **Yok**: her bölümde kaydırınca beliren fade-up, sayılan sayaçlar, kaydırma ilerleme çubuğu, otomatik açılan
   tooltip, sonsuz döngü, paralaks, imleç efekti, hover'da kart büyütme.

`prefers-reduced-motion: reduce` ise bütün süreler 0 (`tokens.css` §4) ve açılış animasyonu hiç çalışmaz.
framer-motion içinde `useReducedMotion()` ile aynı davranış.

## 6. Sayfa sayfa yerleşim

Genel iskelet: Navbar (yapışkan) → `main` → Footer. "İçeriğe geç" bağlantısı (odakta görünür) her sayfada.

### 6.1 Navbar

```
1280: | MicronForge     Mağaza  Özel üretim  Blog  Sorular          WhatsApp  [Teklif iste] |  68 px
 375: | MicronForge                                                              [≡]     |  60 px
```
- Logo: "MicronForge" Bodoni 500, 24 px, tek renk (iki renkli "Micron**Forge**" yok, ikon kutusu yok).
- Bağlantılar Schibsted 15 px, Grafit 2; aktif sayfa Grafit + 1 px alt çizgi. Sayfa içi çapa bağlantıları
  (Fiyat, Reçineler) menüden çıkar; menü 4 öğe. Rotalar aynı: `/magaza`, `/blog`; "Özel üretim" ve "Sorular"
  ana sayfa çapalarıdır (`/#ozel-uretim`, `/#sorular`; eski `#order`, `#faq` çapaları da çalışmaya devam etmeli,
  bkz. §10).
- Zemin Alçı, alt kenar 1 px Çizgi. Blur/cam yok. Kaydırınca küçülme yok.
- Mobil: ≡ düğmesi 44×44. Açılınca tam ekran Kireç panel: bağlantılar Bodoni 36 px alt alta, en altta
  "Teklif iste" (tam genişlik) ve "WhatsApp'tan yaz" (çerçeveli). `Esc` kapatır, odak panelde kalır.

### 6.2 Ana sayfa (bölüm sırası)

Mevcut 17 bölüm 8'e iner. Kaldırılan/birleşen: ScrollProgress, TrustBar, Stats, Features (sayılar/garanti
kartları), Pricing (paket kartları; bkz. not), CTA bandı, Testimonials (içerik "ilkeler" olarak §6.2-6'ya taşınır).

1. **Hero** (asimetrik bölünme)
   ```
   1280: | H1 display, 2-3 satır        (7 kol)  |  4:5 ürün fotoğrafı (5 kol)   |
         | giriş metni ≤20 kelime                |  eser etiketi: ad · fiyat     |
         | [Teklif iste]  Mağazaya bak           |  malzeme / ölçü               |
    375:  H1 (44 px) → giriş → butonlar → 4:5 görsel tam genişlik → etiket
   ```
   Metin bloğu alta hizalı, görselin tepesi navbarın 64 px altında. Üst boşluk en çok 72 px. Rozet, istatistik,
   kategori çipi yok. Görsel: öne çıkan tek bir ürün (`featured`).
2. **Vitrin** (öne çıkan ürünler, asimetrik raf)
   ```
   1280: | Başlık + 1 cümle (5 kol)                                         |
         | büyük kart 3:4 (5 kol, 2 satır)  |  kart (3 kol, 128 px aşağıda)  |  kart (3 kol) |
         |                                   |  ── Fiyat notu ......... Bütün ürünler ──     |
    375:  başlık → büyük kart tam genişlik → iki küçük kart yan yana (2+2 kol) → alt satır
   ```
   Tam 3 ürün (boş hücre yok). Küçük kartlarda mobilde etiket detayı gizlenir, ad + fiyat kalır.
3. **Özel üretim** (eski Services + Process, `id="ozel-uretim"`; eski `id="services"` de bu bölümde kalsın)
   Dört iş türü (koleksiyon/dekor, kişiye özel figür, mimari maket, sanayi prototipi) **kart değil liste**:
   ```
   1280: | H2 (4 kol)   | Kişiye özel figür          Fotoğraftan modelleme, onaydan sonra baskı.  |
         |              | Mimari maket               Ölçekli parça, insan, ağaç, cephe detayı.    |
         |              | ...  (her satır: Bodoni h3 4 kol + Schibsted açıklama 4 kol, üstte 1 px)  |
    375:  H2 → her iş: h3 üstte, açıklama altta
   ```
   Hover'da satırın sağında 16:9 küçük görsel belirmez; görsel yok, yalın tipografi. Bu bölümün altında
   **süreç**, gerçek bir sıra olduğu için numaralı: 1 Fotoğraf ya da dosya gönderin · 2 Teklif ve onay ·
   3 Baskı, yıkama, kürleme · 4 Teslim ya da kargo. Yatay 4 sütun (1280), dikey liste (375); numara Bodoni 44 px.
4. **Atölyeden** (editoryal tam genişlik görsel)
   16:9 tam genişlik atölye/süreç fotoğrafı (kenardan kenara, `--mf-kenar` yok), altında 6 kolonluk iki paragraf:
   SLA reçine nedir, hangi reçineler var (eski Materials içeriği, kısaltılmış). Reçine türleri sekme değil,
   üç sütunlu kısa tanım listesi (ad + bir cümle + "uygun olduğu işler"). Ölçü/hassasiyet rakamları kaynaklı olmalı (§9).
5. **Teklif formu** (`id="order"` korunur; eski bağlantılar buraya gelir)
   ```
   1280: | H2 + 2 cümle + doğrudan WhatsApp bağlantısı (4 kol) |  form, Kireç panel (7 kol, 1 kol boşluk) |
    375:  başlık → form tam genişlik
   ```
   Form alanları: kategori (radyo grubu, alt çizgili sekme görünümünde), boyut (radyo), fotoğraf (sürükle-bırak
   alanı: 1 px kesikli Çizgi güçlü kenar, Kireç zemin, en az 160 px yükseklik), ad, telefon/e-posta, not.
   Etiket alanın üstünde, placeholder etiket yerine geçmez, hata metni alanın altında Hata renginde.
   Gönderim sonrası durum: aynı panelde "Teşekkürler" + "WhatsApp'ta devam et" birincil buton (mevcut davranış).
6. **Nasıl çalışırız** (eski Testimonials içeriği: önce onay, hatalı baskıda yeniden basım, gizlilik)
   Üç ilke tek sütunda büyük Bodoni h3 + kısa metin, aralarında 1 px çizgi; sol 3 kolon boş. Müşteri yorumu
   **yok** (gerçek, izinli yorum gelene kadar).
7. **Sorular** (`id="faq"` ve `id="sorular"`)
   Akordeon; kutu yok, satırlar 1 px üst çizgi, soru Schibsted 500 18 px, sağda `+`/`−` (16 px, 1.5 px çizgi).
   Satır yüksekliği ≥ 56 px. JSON-LD FAQPage `index.html`'de; metin değişirse oradaki de eşitlenmeli.
8. **Blogdan** (son 2 yazı; eski BlogPreview)
   Tek büyük yazı (16:9, 7 kol) + yanında ikinci yazı yalnız başlık ve künye (4 kol, alta hizalı). 375: alt alta.

Kapanış CTA bandı yok; Footer'ın kendisi kapanıştır.

> Pricing notu: "Mini / Detay / Boss" paketleri kaldırılıyor; fiyat ürün sayfasında ve teklifte. Boyuta göre
> başlangıç fiyatı gösterilecekse (Bahadır onayıyla) "Özel üretim" listesinde her iş türünün yanında
> "... ₺'den başlar" tek satır olarak.

### 6.3 Mağaza listesi (`/magaza`)

```
1280: | H1 "Mağaza" (Bodoni)  + 1 cümle (5 kol)                                    |
      | Tümü  Koleksiyon  Kişiye özel  Maket  ...  (alt çizgili metin sekmeleri)  N ürün |
      | kart | kart | kart       (3 sütun, her biri 4 kol; 3:4 görsel + eser etiketi)     |
      | geniş editoryal ara (16:9, 8 kol) her 9 üründe bir, varsa                       |
 375: başlık → sekmeler yatay kaydırılır (sayfa değil, yalnız sekme şeridi) → 2 sütun kart
```
- Kart: görsel 3:4 keskin köşe, altında etiket: ad (Bodoni italik 20 px, mobil 17-18 px), fiyat (Schibsted 500),
  malzeme (Sis, 14 px). Rozet, kalp ikonu, "XL" etiketi, görsel üstü yazı yok. Kartın tamamı tek bağlantı.
- Hover (yalnız `hover: hover` cihazlarda): ikinci fotoğraf varsa 140 ms çapraz geçiş; yoksa ürün adının altı çizilir.
- Filtre: `<button aria-pressed>`; seçili olan Grafit + 2 px alt çizgi. Ürün sayısı sekmelerin sağında düz metin.
- Fiyat notu ("standart boyut içindir...") başlığın altında tek satır Sis.
- Boş kategori: "Bu kategoride şu an ürün yok. Özel üretim için teklif isteyin." + buton.

### 6.4 Ürün detayı (`/magaza/:slug`)

```
1280: | ← Mağaza                                                                         |
      | ana görsel 3:4 (7 kol)                 |  Ürün adı (Bodoni h1)       (4 kol, yapışkan) |
      |                                         |  fiyat (Schibsted 24 px)                    |
      | küçük görseller: 4 adet, 88×117 (3:4)   |  açıklama (≤ 3 satır)                       |
      |                                         |  ── Malzeme / Ölçü / Üretim süresi / Renk ──|
      |                                         |  [WhatsApp'tan sipariş ver]  (tam genişlik) |
      |                                         |  Soru sor  (metin bağlantı)                 |
      | ── "Bu ürün nasıl üretilir" 3 kısa adım, 8 kol ──                                    |
      | Benzer ürünler: 3 kart (aynı kart bileşeni)                                          |
 375: ← Mağaza → görsel tam genişlik, küçük görseller yatay şerit (kaydırılır, her biri 72 px)
      → ad, fiyat, açıklama, özellikler → benzerler.
      Alt kenarda yapışkan çubuk (Kireç, üst 1 px çizgi, 64 px): fiyat solda, "WhatsApp'tan sipariş ver" sağda.
```
- Özellik listesi bir tanım listesi (`<dl>`): Malzeme, Ölçü, Üretim süresi, Renk/Boyama. Veri yoksa satır
  gösterilmez (uydurma değer yok). `products.js`'e alan eklenebilir: `dimensions`, `leadTime`, `finish`, `alt`.
- Mobilde yapışkan çubuk varken genel WhatsApp düğmesi gizlenir (çakışma olmasın).
- Ürün bulunamadı: aynı iskelet, H1 "Bu ürün artık vitrinde değil", "Mağazaya dön" butonu.

### 6.5 Blog listesi (`/blog`)

```
1280: | H1 "Blog" + 1 cümle                                                   |
      | Öne çıkan yazı: 16:9 görsel (8 kol) | kategori, tarih, başlık h2, özet (4 kol, alta hizalı) |
      | Diğerleri: 2 sütun liste; her biri 4:5 görsel (2 kol) + başlık h3 + künye (4 kol)       |
 375: öne çıkan: görsel → metin; diğerleri: tek sütun, görsel solda 96 px genişlik 4:5, metin sağda
```
- Kategori filtresi varsa mağazadaki sekme bileşeninin aynısı.
- Künye tek satır: "Teknik rehber, 7 dk" (orta nokta zinciri yok, büyük harf yok).

### 6.6 Blog yazısı (`/blog/:slug`)

```
1280: | ← Blog                                                                |
      | künye (Sis)                                                            |
      | H1 Bodoni, en fazla 3 satır (8 kol)                                    |
      | giriş (lead, 6 kol)                                                    |
      | 16:9 kapak görseli (10 kol, ızgaranın 2. kolonundan)                    |
      | içindekiler (3 kol, yapışkan) |  gövde 720 px okuma sütunu (6 kol)       |
      | ilgili yazılar: 2 adet                                                  |
 375: tek sütun, içindekiler gövdenin üstünde açılır-kapanır
```
- Gövde Schibsted 17 px / 1.6, ara başlık Bodoni h2/h3, madde işareti 6 px kare (Grafit 2). Alıntı: Bodoni italik 24 px, sol 2 px Reçine çizgi.
- Yazı sonunda tek CTA: "Bu konuda teklif isteyin" → `/#order`. Prerender (`scripts/prerender-blog.mjs`)
  çıktısında da aynı HTML yapısı oluşmalı.

### 6.7 Teklif / sipariş akışı

İki yol, ikisi de bugünkü davranışı korur:
1. **Form** (ana sayfa `#order`): doldur → "Teklif iste" → teşekkür durumu → "WhatsApp'ta devam et"
   (bilgiler WhatsApp mesajına doldurulur, `wa.me/905311034535`). Not: mevcut formda fotoğraflar sunucuya
   gönderilmiyor; mesajda "fotoğrafları mesajdan sonra yollayacağım" yazıyor. Tasarım bunu açıkça söylemeli:
   yükleme alanının altına "Fotoğraflar WhatsApp'ta size sorulacak" gibi bir yardım metni (METIN.md karar verir).
2. **Ürün sayfası**: "WhatsApp'tan sipariş ver" → `waOrder(product.name)`.

Buton adları sayfa boyunca sabit: "Teklif iste" (form/özel üretim niyeti), "WhatsApp'tan sipariş ver"
(hazır ürün), "WhatsApp'tan yaz" (genel soru). Aynı niyete ikinci isim verilmez.

### 6.8 Footer

```
1280: | MicronForge (Bodoni, 144 px, kenardan kenara, Taş zemin)                      |
      | Mağaza (3 kol) | Atölye (3 kol) | İletişim (3 kol) | Yasal (3 kol)               |
      | © 2026 MicronForge                         Manisa adresi / telefon (varsa)   |
 375: dev logo (48 px) → 2×2 sütun → telif
```
Zemin Taş (`#D6D8D2`), bağlantı Grafit 2 (5.31:1), her bağlantı en az 44 px yüksek.
Yasal bağlantılar (Gizlilik, Kullanım şartları, Çerezler) korunur.

### 6.9 WhatsApp erişimi

- Masaüstü: navbarda "WhatsApp" metin bağlantısı + sağ altta Grafit düğme (ikon + "WhatsApp", 48 px, köşe 2 px,
  katman gölgesi). Yeşil yuvarlak balon ve otomatik açılan tooltip yok.
- Düğme hero geçildikten sonra görünür (IntersectionObserver ile hero gözlenir; `scroll` dinleyicisi yok).
- Mobil: sağ altta yalnız ikon, 48×48, `aria-label="WhatsApp'tan yazın"`. Ürün sayfasında yapışkan alt çubuk
  varken gizli. Form bölümü görünürken gizli (çift çağrı olmasın).
- WhatsApp ikonu: marka kılavuzuna uygun resmi glif, tek renk (currentColor).

## 7. Ürün görseli alanları ve yer tutucu

Oranlar (`--mf-oran-*`):
- **3:4 dikey**: bütün ürün kartları, ürün detay ana görseli.
- **4:5**: hero (her genişlikte; 3. aşamada mobil de 4:5 oldu), blog listesindeki küçük görseller.
- **16:9**: editoryal (atölye, blog kapağı, mağaza ara görseli).

Yer tutucu tarifi ("stüdyo fonu", önizlemede `.gorsel`):
- Zemin: `radial-gradient(120% 80% at 50% 34%, #E1E3DD, #D6D8D2 52%, #CDD0C9)`; alt %26'da hafif koyu "zemin"
  (`rgba(28,32,30,.035)`), ufuk çizgisinde yumuşak bir kaide gölgesi. 1 px iç çizgi `#C3C6BF`.
- İçinde metin, ikon, logo yok. `role="img"` + anlamlı `aria-label` ya da dekoratifse `aria-hidden`.
- Oran `aspect-ratio` ile sabit (CLS yok). Gerçek fotoğraf geldiğinde aynı kutuya `object-fit: cover`.

Fotoğraf çekimi için öneri (Bahadır'a iletilecek): ürünler bu fonla uyumlu düz, mat, açık gri-yeşil bir
fonda (sonsuz fon/kâğıt), tek yumuşak ışıkla, 3:4 dikey çekilsin. Şeffaf reçine parçalar için arkadan ışık.
Her üründe en az 1 ana kare + 1 yakın detay. Görseller WebP/AVIF, uzun kenar 1600 px, `srcset` 480/800/1200/1600.

## 8. Bunu yapma (BRIEF'e ek, bu tasarıma özel)

1. Krem/bej zemine (#F4F1EA ailesi) ya da terrakota/pirinç vurguya kayma. Zemin Alçı `#E7E8E3`'tür.
2. Reçine yeşilini bölüm zemini, büyük düğme alanı ya da degrade olarak kullanma. En fazla ~%2.
3. Bodoni'yi 22 px altında, gövde metninde ya da büyük harfle kullanma. Bodoni'de fiyat yazma.
4. Büyük harf + harf aralıklı küçük etiket (eyebrow), mono yazı tipi, "A · B · C" künye zinciri, `→` ekli buton metni.
5. Görsel üstüne rozet/etiket/kalp ikonu/"XL" yazısı. Etiket görselin **altında**.
6. Kart kutusu (çerçeve + gölge + yuvarlak köşe). Ürünler kutuya girmez; görsel + etiket yeter.
7. Lucide ikonlarını başlık süsü olarak kullanma. İkon yalnız işlev için (menü, kapat, WhatsApp, artı/eksi,
   geri oku); 1.5 px çizgi, 20 px.
8. Sayı şeridi ("16K / 25μ / 48sa"), sayaç animasyonu, "garanti" rozetleri. Teknik bilgi ürün ve süreç
   metninde, kaynağıyla.
9. Kaydırma ilerleme çubuğu, her bölümde fade-up, sonsuz animasyon, paralaks.
10. Uzun tire (em dash) arayüz metninde. Ünlem. "Mükemmel", "benzersiz", "eşsiz".
11. Mevcut STL örnek modelleri (lisanslı karakter içeren dosya dahil) sitede gösterme.
12. Navbara 5'ten fazla bağlantı; hap şeklinde aktif sekme.

## 9. Olgusal iddialar: kaynak durumu

Mevcut sitede geçen ve yeni tasarımda kullanılmak istenebilecek iddialar. **Kaynağı Bahadır onaylamadan
yeni sitede yazılmaz**; gösterilecekse kodda yanına `<!-- kaynak: ... -->` yorumu konur.

| İddia (mevcut sitede) | Durum |
|---|---|
| Manisa merkezli, Manisa ve İzmir'e elden teslim | Mevcut `index.html` JSON-LD; Bahadır'ın bildirdiği bilgi. Kalabilir. |
| Yazıcı: Elegoo Saturn 4 Ultra 16K | [doğrulanacak] |
| 25 mikron katman | [doğrulanacak]: reçine/ayar başına değişir; "en ince katman" diye yazılmalı |
| Baskı hacmi 218 × 123 × 250 mm | [doğrulanacak]: üretici teknik sayfasıyla karşılaştırılmalı, değer tutarsız olabilir |
| 48 saatte teslim / aynı gün ekspres | [doğrulanacak] |
| 30 dakikada teklif | [doğrulanacak] |
| "%100 kalite garantisi", "7/24 uzman destek", "8+ renk", "Castable reçine" | [doğrulanacak]; kanıt yoksa kaldırın |
| Hatalı baskıda ücretsiz yeniden basım | Politika; Bahadır onayıyla kalır |

## 10. Mevcut 3D (three / @react-three/fiber / drei) ve framer-motion

**3D: ana sayfada kullanılmaz; paket bağımlılığı 2. aşamada kaldırılmaya aday.**
- Bugün hiçbir sayfa 3D kullanmıyor: `Gallery.jsx` (CardModelViewer) ve `STLModal.jsx` hiçbir sayfaya bağlı değil.
  `public/models/stl` içindeki örneklerden en az biri lisanslı bir karaktere ait; yeni katalogda olamaz.
- Gerekçe: three + fiber + drei ana paketin en ağır bağımlılıkları (boyutu `npm run build` çıktısında ölçün); müze vitrini hissini fotoğraf veriyor, döndürülebilir gri model
  ürünün kalitesini (yüzey, şeffaflık, renk) göstermiyor, aksine "ucuz önizleme" hissi veriyor.
- İstisna (isteğe bağlı, sonraki iş): ürün detayında, ürünün kendi lisanslı/telifsiz STL'si varsa "360° incele"
  metin bağlantısı → tıklanınca `lazy()` ile yüklenen tam ekran görüntüleyici (Kireç zemin, tek gri malzeme,
  kendiliğinden dönme yok, `prefers-reduced-motion`'da da kullanıcı sürükleyerek döndürür). İlk yükte asla.
  Bu yapılmayacaksa `three`, `@react-three/fiber`, `@react-three/drei`, `components/three/*`, `Gallery.jsx`,
  `STLModal.jsx`, `ProductVisual.jsx` silinebilir (Dev, build'i doğrulayarak).

**framer-motion: tutulur, dar kullanım.**
- Kullanım yerleri: mobil menü ve WhatsApp düğmesi için `AnimatePresence`, mağaza filtresinde ızgara geçişi,
  ürün galerisinde görsel değişimi, hero'daki tek açılış anı (ya da CSS ile; önizlemedeki `@keyframes katman`
  yeterli). Akordeon CSS ile.
- Kullanılmaz: `whileInView` ile her bölüme giriş animasyonu, spring ile büyüyen butonlar, sayaçlar.
- Her animasyonda `useReducedMotion()`; `true` ise geçişler anında.
- Tamamen CSS'e geçmek de mümkündür; o durumda bağımlılık kaldırılabilir. Karar Dev'in, ama görsel
  davranış bu belgedeki gibi olmalı.

## 11. Dev için notlar (2. aşama)

1. `src/index.css`: `@import "tailwindcss";` altına `@import "./styles/tokens.css";` ekleyin, eski `@theme`
   bloğunu ve `.glass*`, `.text-gradient*`, `.btn-*`, `.theme-dark`, `bg-grid` sınıflarını kaldırın.
   `tokens.css` varsayılan Tailwind renklerini, yarıçaplarını, gölgelerini ve font ailelerini **kapatır**
   (`--color-*: initial` vb.): `bg-purple-500`, `rounded-2xl`, `rounded-full`, `shadow-lg`, `font-mono` artık
   üretilmez (Tailwind derlemesiyle doğrulandı). Kullanılabilir sınıflar: `bg-alci`, `bg-kirec`, `bg-tas`,
   `text-grafit`, `text-grafit-2`, `text-sis`, `text-recine`, `border-cizgi`, `border-cizgi-guclu`, `font-serif`,
   `font-sans`, `text-display|h1|h2|h3|lead|body|small`, `rounded-kontrol`, `shadow-katman`, `max-w-sayfa`,
   `max-w-metin`, `ease-mf`; ham değerler için `p-(--mf-kenar)`, `py-(--mf-bolum)`, `gap-(--mf-oluk)`.
2. `index.html`: Google Fonts `<link>`'lerini (Space Grotesk, Inter, JetBrains Mono) ve `preconnect`'leri kaldırın;
   yerine iki `preload` (`/fonts/bodoni-moda/BodoniModa-Variable.woff2`,
   `/fonts/schibsted-grotesk/SchibstedGrotesk-Variable.woff2`, `crossorigin`). `theme-color` → `#E7E8E3`.
   Meta/JSON-LD içeriğine başka dokunmayın; metin değişirse METIN.md ile.
3. Çapa uyumluluğu: eski bağlantılar (`/#order`, `/#faq`, `/#services`, `/#pricing`, `/#materials`, `/#hero`)
   kırılmasın; yeni bölümlerde eski `id`'leri koruyun ya da boş `<span id>` ile yönlendirin.
4. Izgara: tek bir `Container` (`max-w-[calc(var(--mf-max)+2*var(--mf-kenar))] mx-auto px-(--mf-kenar)`) ve
   `grid grid-cols-4 md:grid-cols-12 gap-x-(--mf-oluk)` deseni. Yatay kaydırma için `html { overflow-x: clip }`
   kalsın; sekme şeridi gibi kaydırılan öğeler kendi içinde kaydırılır.
5. Odak: `:focus-visible { outline: 2px solid var(--mf-recine); outline-offset: 3px }` global. Bütün tıklanır
   öğeler ≥ 44×44 (footer bağlantıları dahil; `min-height: 44px` verin).
6. Eser etiketi bir bileşen olsun (`ProductLabel`): `name`, `price`, `priceFrom`, `material`, `dimensions?`,
   `leadTime?`; olmayan alan satırı hiç çizilmez. Kart, hero ve ürün detayı aynı bileşeni farklı boyda kullanır.
7. Önizleme dosyasındaki CSS (`docs/tasarim/onizleme.html`) referanstır, birebir kopyalanacak üretim kodu değil;
   ölçüler ve davranışlar bağlayıcıdır.
8. Bilinen tuzak: önizlemede aynı özgüllükteki taban kuralı medya sorgusundan **sonra** yazılınca masaüstü
   yerleşimi eziliyordu (vitrin alt satırı kartın üstüne biniyordu). Tailwind'de mobil-önce sırası bunu çözer;
   özel CSS yazarsanız taban kuralı önce gelsin.
