# MicronForge: site metni

Bu dosya Dev'in bileşenlere doğrudan koyacağı Türkçe metindir. Her başlıkta iki seçenek var; **(öneri)** yazan kullanılır.
Süslü parantezli alanlar (`{ölçü}`) veriden gelir. `[DOĞRULA]` işaretli cümleler mevcut sitede geçiyor ama Bahadır'ın bir kez onaylaması iyi olur.

Hitap: baştan sona "siz". Mevcut sitedeki "sen" kullanımı bırakılır.

Kaynak bilgiler (yalnızca bunlar kullanıldı): Saturn 4 Ultra 16K MSLA yazıcı; 25 mikron katman (Tough'ta 50); en büyük tek parça 218 × 123 × 250 mm; 405 nm UV kürleme; IPA yıkama; Standart, Tough (ABS benzeri), Renkli ve şeffaf reçine; STL, OBJ, 3MF ya da fotoğraf; dosya yoksa modelleme ve onay; WhatsApp'tan yaklaşık 30 dakikada tahmini fiyat; baskı ve kürleme 6-24 saat; teslim 1-2 gün; toplam yaklaşık 48 saat; mimarlık öğrencisine 24-48 saat ekspres; Manisa ve İzmir'de elden teslim, Türkiye geneline kargo; Pazartesi-Cumartesi 09.00-19.00; +90 531 103 45 35; Instagram @micronforge3d; baskı hatası atölyeden kaynaklıysa ücretsiz yeniden baskı; izin olmadan model paylaşılmaz.

---

## 1. Ses ve ton rehberi

1. Atölye konuşur, şirket konuşmaz. "Basıyoruz", "kontrol ediyoruz", "yazıyoruz" deriz; "hizmet sunmaktayız" demeyiz.
2. Kısa cümle. Bir cümlede tek bilgi. 20 kelimeyi geçen cümleyi ikiye böl.
3. Sayı varsa sayı yaz: "25 mikron", "218 × 123 × 250 mm", "6-24 saat". Sayı yoksa sıfat da koyma.
4. Övmek yerine anlat. "Kusursuz yüzey" yazma; "Her parça IPA ile yıkanır, UV ile kürlenir, destekleri elde temizlenir" yaz.
5. Ünlem yok. Büyük harfle bağırma yok. Başlıklar cümle düzeninde (yalnız ilk harf büyük).
6. Üçlü sıfat dizisi yok. Liste gerekiyorsa gerçek kalemleri say (ölçek, malzeme, süre).
7. "X değil, Y" kalıbı yok. Ne olduğunu doğrudan söyle.
8. Uzun tire (—) ve kısa tire (–) metinde yok. Virgül, nokta ya da iki nokta kullan. Sayı aralığında düz kısa çizgi (6-24) kalabilir.
9. Söz verirken sınırını da yaz: "Baskı hatası bizden kaynaklıysa yeniden basarız." Koşulsuz garanti dili kullanma.
10. Lüks, sakinlikten gelir. Acele ettirmeyiz ("Hemen!", "Kaçırmayın" yok); yolu gösteririz ("Fotoğraf gönderin, fiyatı yazalım").

### Kullanılmayacak kelime ve kalıplar

hayallerinizi gerçeğe dönüştürmek · mikron seviyede / mikron hassasiyetinde (ölçü olarak "25 mikron katman" serbest) · mükemmel, mükemmellik, kusursuz · yenilikçi, inovatif, son teknoloji · bir sonraki seviye · benzersiz, eşsiz · profesyonel çözümler · kaliteli hizmet · müşteri memnuniyeti · %100 · 7/24 · anında, an içinde · en çok tercih edilen, en çok talep edilen (veri yok) · keşfet, keşfedin (başlıkta) · farkımız, neden biz · uzman ekip · tutkuyla · özenle seçilmiş · dünya standartlarında · ücretsiz (yalnız gerçekten ücretsiz olan yeniden baskı için) · boss, rogue, NPC gibi oyun argosu · DLP, 4K LCD (kullanılmayan teknolojiler) · Castable (katalogda doğrulanmadı) · lisanslı karakter ve marka adları (hiçbiri).

---

## 2. Arayüz metinleri

### Navbar

| Bağlantı | Etiket | Hedef |
|---|---|---|
| Logo | MicronForge | `/` |
| 1 | İşler | `/#services` |
| 2 | Süreç | `/#process` |
| 3 | Malzemeler | `/#materials` |
| 4 | Fiyat | `/#pricing` |
| 5 | Mağaza | `/magaza` |
| 6 | Rehber | `/blog` |
| 7 | SSS | `/#faq` |
| Buton | Teklif isteyin | `/#order` |
| WhatsApp simgesi (aria-label) | WhatsApp'tan yazın | wa.me |
| Mobil menü (aria-label) | Menüyü aç / Menüyü kapat | |

Not: "Anasayfa" bağlantısı kaldırıldı; logo o işi görüyor. Menü 7 öğeden fazlası olmasın.

### Butonlar

| Bağlam | Birincil | İkincil |
|---|---|---|
| Hero | Fotoğraf gönderin, teklif alın | Mağazaya bakın |
| Hizmet kartı | Bu iş için teklif isteyin | |
| Fiyat bölümü | Ölçünüzü yazın, fiyatı söyleyelim | WhatsApp'tan yazın |
| Mağaza kartı | İncele | |
| Ürün detay | WhatsApp'tan sipariş verin | Soru sorun |
| Ürün detay (alt) | Farklı ölçüde isteyin | |
| Form | Talebi hazırla | |
| Form sonrası | WhatsApp'ta gönderin | Yeni talep |
| Blog kartı | Yazıyı okuyun | |
| Blog listesi altı | Parçanızı anlatın | |
| Kapanış | Fotoğraf gönderin | Arayın: +90 531 103 45 35 |
| Footer WhatsApp | WhatsApp'tan yazın | |
| Hata sayfası | Mağazaya dönün / Rehbere dönün | Ana sayfa |

### Form etiketleri (sipariş/teklif formu)

| Alan | Etiket | Yer tutucu / yardım metni |
|---|---|---|
| Fotoğraf | Görseller | En fazla 5 fotoğraf. Farklı açılardan, gün ışığında çekilmiş olsun. |
| Kategori | Ne bastırmak istiyorsunuz? | Seçenekler: Koleksiyon ve dekor · Kişiye özel figür · Mimari maket · Sanayi prototipi · Başka bir şey |
| Boyut | Yaklaşık en uzun ölçü | Seçenekler: 5 cm'den küçük · 5-10 cm · 10-20 cm · 20 cm'den büyük |
| İsim | Adınız | Adınız ve soyadınız |
| İletişim | Telefon ya da e-posta | Size nereden dönelim? |
| Notlar | Notlar (isteğe bağlı) | Renk, malzeme, adet, teslim tarihi, parçanın nerede kullanılacağı |

### Hata mesajları

| Durum | Metin |
|---|---|
| İsim boş | Adınızı yazın, mesajı kime yazdığımızı bilelim. |
| İletişim boş | Telefon ya da e-posta gerekli. Fiyatı oraya yazacağız. |
| 5'ten fazla fotoğraf | En fazla 5 fotoğraf ekleyebilirsiniz. Fazlasını WhatsApp'ta gönderin. |
| Görsel olmayan dosya (STL vb.) | Bu alan yalnızca fotoğraf kabul ediyor. STL, OBJ ya da 3MF dosyanızı WhatsApp'tan gönderin. |
| WhatsApp açılmadı (pop-up engeli) | WhatsApp açılmadı. Tarayıcınız yeni pencereyi engellemiş olabilir. Numaramız: +90 531 103 45 35 |
| Görsel yüklenemedi (ürün/blog) | Görsel yüklenemedi. |
| Genel hata | Bir şey ters gitti. Sayfayı yenileyin ya da doğrudan WhatsApp'tan yazın. |

### Başarı mesajları

Önemli: mevcut form hiçbir yere veri göndermiyor; yalnızca WhatsApp mesajı hazırlıyor ve fotoğraflar WhatsApp'a aktarılmıyor. Eski "Talebin Alındı!" metni yanıltıcı. Yerine:

- Başlık: **Bir adım kaldı**
- Metin: Bilgileriniz WhatsApp mesajına eklendi. Aşağıdaki butonla mesajı gönderin, fotoğrafları da aynı sohbete ekleyin. Çalışma saatlerinde yaklaşık 30 dakika içinde döneriz.
- Buton: WhatsApp'ta gönderin
- Bağlantı: Yeni talep

### Boş durum metinleri

| Yer | Metin |
|---|---|
| Fotoğraf alanı (boş) | Fotoğrafları buraya sürükleyin ya da seçmek için dokunun. |
| Mağaza filtresi sonuç vermedi | Bu kategoride şu an parça yok. Benzerini sizin için basabiliriz. → Teklif isteyin |
| Mağaza tamamen boş (yeni katalog gelene kadar) | Yeni parçaların fotoğrafları çekiliyor. Bu arada istediğiniz parçayı fotoğrafla anlatabilirsiniz. → Teklif isteyin |
| Benzer ürün yok | (bölüm gizlenir, metin yok) |
| Blog listesi boş | Yeni yazılar hazırlanıyor. |
| Ürün 404 başlık / metin | Bu ürün artık mağazada yok. / Aynı parçayı ya da benzerini sipariş üzerine basabiliriz. |
| Blog 404 başlık / metin | Bu yazıyı bulamadık. / Yayından kaldırılmış olabilir. Diğer rehberler blog sayfasında. |

---

## 3. Ana sayfa

### 3.1 Hero

Üst satır (küçük, büyük harf kullanmadan): **Manisa · SLA reçine 3D baskı atölyesi**

Başlık (H1):
- A: **Reçineden ince işler.** (öneri) Kısa, sakin, malzemeyi öne koyuyor. SEO anahtarı üst satırda ve alt metinde.
- B: **Manisa'da figür, maket ve prototip basıyoruz.** Daha açık, daha az karakterli.

Alt metin:
> Kişiye özel figür, mimari maket, sanayi prototipi ve dekor parçalarını Saturn 4 Ultra 16K yazıcıda, 25 mikron katmanla basıyoruz. Her parça yıkanır, kürlenir ve paketlenmeden önce tek tek kontrol edilir.

CTA: **Fotoğraf gönderin, teklif alın** (birincil) · **Mağazaya bakın** (ikincil)

Hero altındaki teknik satır (ikon yok, ince çizgiyle ayrılmış dört kısa bilgi):
`16K MSLA` · `25 mikron katman` · `218 × 123 × 250 mm baskı alanı` · `Manisa ve İzmir'de elden teslim`

### 3.2 Hizmetler (`#services`)

Bölüm başlığı:
- A: **Atölyede basılanlar** (öneri)
- B: **Ne basıyoruz**

Giriş: Dört tür iş yapıyoruz. Hepsi aynı baskı ve kontrol sürecinden geçer.

**1. Koleksiyon ve dekor**
- Başlık A: **Vitrin için parçalar** (öneri) · B: **Koleksiyon ve dekor**
- Metin: Şeffaf ve renkli reçineden dekor heykelleri ve masaüstü objeleri. 32 mm ve 75 mm masa oyunu figürleri, kaide ve diorama parçaları. Renkli reçinede parça boyanmadan teslim edilebilir.
- Alt satır: Şeffaf, renkli ve standart reçine

**2. Kişiye özel figür**
- Başlık A: **Fotoğraftan figür** (öneri) · B: **Kişiye özel figür**
- Metin: Bir fotoğraftan yola çıkıp modeli biz hazırlıyoruz. Baskıdan önce dijital ön izlemeyi size gönderiyoruz; yüz, saç, poz ve kaide onayınızdan sonra baskıya geçiyoruz. Çift figürü, evcil hayvan minyatürü, isimli figür ya da yayıncı masa standı olabilir.
- Alt satır: Boyasız, astarlı ya da boyalı teslim (boya ayrıca konuşulur)

**3. Mimari maket**
- Başlık A: **Ölçekli maket parçaları** (öneri) · B: **Mimari maket**
- Metin: 1/100, 1/200 ve 1/500 ölçekte insan, ağaç, mobilya, araç, sokak elemanı ve cephe detayı. Manisa Celal Bayar Üniversitesi ve İzmir'deki mimarlık öğrencilerine jüri dönemlerinde 24-48 saatte ekspres baskı yapıyoruz.
- Alt satır: 1/100 · 1/200 · 1/500

**4. Sanayi prototipi**
- Başlık A: **Kalıptan önce numune** (öneri) · B: **Sanayi prototipi**
- Metin: Manisa OSB'deki üreticiler için elektronik kutu ve kapak, sunum modeli ve kalıp öncesi kontrol numunesi. Darbeye dayanıklı Tough (ABS benzeri) reçine kullanıyoruz. İlk numune onaylandıktan sonra adet fiyatını ayrıca çıkarıyoruz. Dosyalarınızı izniniz olmadan kimseyle paylaşmıyoruz.
- Alt satır: Otomotiv yan sanayi · Beyaz eşya · Elektronik

Bölüm altı satırı: Listede olmayan bir iş mi? Fotoğrafını gönderin, basılıp basılamayacağını söyleyelim.

### 3.3 Süreç (`#process`)

Bölüm başlığı:
- A: **Fotoğraftan teslime** (öneri)
- B: **Nasıl çalışıyoruz**

Giriş: STL dosyanız olmak zorunda değil. Fotoğraf, çizim ya da ölçülü bir taslak başlamak için yeter.

| Adım | Başlık | Metin | Süre etiketi |
|---|---|---|---|
| 1 | Gönderin | Fotoğrafı, çizimi ya da STL, OBJ, 3MF dosyasını WhatsApp'tan ya da bu sayfadaki formdan gönderin. Ölçüyü, adedi ve parçanın nerede kullanılacağını da yazın. | 2 dakika |
| 2 | Fiyat ve onay | Çalışma saatlerinde yaklaşık 30 dakika içinde tahmini fiyat, süre ve reçine önerisiyle döneriz. Model bizden çıkacaksa ön izlemeyi gönderir, onayınızı bekleriz. | 30 dakika `[DOĞRULA]` |
| 3 | Baskı | Saturn 4 Ultra 16K yazıcıda 25 mikron katmanla basılır. IPA ile yıkanır, 405 nm UV ile kürlenir, destekler elde temizlenir. | 6-24 saat |
| 4 | Teslim | Manisa ve İzmir'de elden teslim ederiz. Türkiye'nin geri kalanına parçanın kırılganlığına göre paketleyip kargolarız. | 1-2 gün |

Bölüm altı: Dosyası hazır, onaylanmış bir işte toplam süre yaklaşık 48 saat. Modelleme gereken işlerde süreyi teklifte ayrıca yazarız. `[DOĞRULA]`

### 3.4 Çalışma ilkeleri (eski "Sana sözümüz" bölümünün yeni hali, isteğe bağlı)

Başlık:
- A: **Üç kuralımız** · B: **Atölyenin kuralları** (öneri)

- **Önce onay.** Boyut, renk ve detay konusunda anlaşmadan yazıcıyı çalıştırmıyoruz.
- **Hata bizdense yeniden basarız.** Baskı hatası atölyeden kaynaklanıyorsa parçayı ücretsiz yeniden basıyoruz.
- **Dosyanız sizde kalır.** Özel tasarımları ve prototipleri izniniz olmadan paylaşmıyor, çoğaltmıyoruz.

(Kalın başlık burada bilgi taşıdığı için kalabilir; Dev isterse serif başlık olarak dizer.)

### 3.5 Malzemeler (`#materials`)

Bölüm başlığı:
- A: **Üç reçine, üç iş** (öneri)
- B: **Hangi reçine, ne için**

Giriş: Reçineyi parçanın ne yapacağına göre seçiyoruz. Emin değilseniz teklifte biz öneririz.

**Standart reçine**
- Kısa tanım: Figür, maket ve hediye için.
- Metin: 25 mikron katmanla en ince detayı bu reçinede alıyoruz ve yüzeyi pürüzsüz çıkıyor. Darbeye karşı hassastır, bu yüzden mekanik parçada önermiyoruz.
- Alanlar: Katman: 25 mikron · Kürleme: UV 405 nm · Uygun işler: figür, mimari maket, kaide

**Tough reçine (ABS benzeri)**
- Kısa tanım: Prototip ve montaj parçası için.
- Metin: Darbeye dayanıklıdır ve kolay işlenir. Montaj parçası, sunum numunesi, elektronik kapak ve kalıp öncesi kontrol modelinde bunu kullanıyoruz.
- Alanlar: Katman: 50 mikron · Kürleme: UV 405 nm · Uygun işler: prototip, mockup, fonksiyonel test

**Renkli ve şeffaf reçine**
- Kısa tanım: Boyasız teslim edilecek dekor için.
- Metin: Renk reçinenin içinde olduğu için parça boyanmadan teslim edilebilir. Şeffaf, gri, siyah, beyaz ve sekizden fazla renk seçeneği var. `[DOĞRULA: renk sayısı]`
- Alanlar: Katman: 25-50 mikron · Kürleme: UV 405 nm · Uygun işler: dekor, koleksiyon, hediye

### 3.6 Fiyatlandırma (`#pricing`)

Bölüm başlığı:
- A: **Fiyat ölçüye göre** (öneri)
- B: **Fiyatı ne belirler**

Giriş: Her parçanın fiyatını ayrı hesaplıyoruz. Sabit liste yerine aşağıdaki aralıklar fikir verir; kesin fiyat model onaylandıktan sonra netleşir.

Fiyatı belirleyenler (düz metin, liste değil):
> Parçanın boyu ve hacmi, seçilen reçine, yüzey işlemi (boyasız, astarlı ya da boyalı), adet ve modelleme ihtiyacı. Çok adetli işlerde aynı tablaya birden fazla parça yerleştiği için birim fiyat düşebilir.

Üç boyut bandı (kartlarda rozet ve "en çok tercih edilen" etiketi yok):

| Band | Ölçü | Örnek işler | Standart teslim |
|---|---|---|---|
| Küçük | 5 cm'den küçük | 32 mm masa oyunu figürü, 1/100 maket insanı, anahtarlık | Yıkanmış, kürlenmiş, destekleri temizlenmiş |
| Orta | 5-10 cm | 75 mm koleksiyon figürü, çift figürü, masa standı | İsterseniz astarlı (ek ücretli) |
| Büyük | 10 cm'den büyük | Dekor heykeli, maket seti, sanayi numunesi | Tek parçaya sığmayan işlerde parçalı baskı ve montaj |

Kart butonu: **Ölçünüzü yazın, fiyatı söyleyelim**

Bölüm altı: Toplu sipariş, kırtasiye ve mağaza işleri ya da sanayi numunesi için önce bir numune basıyoruz; adet fiyatını numune onayından sonra çıkarıyoruz. → **WhatsApp'tan yazın**

### 3.7 Mağaza tanıtım bandı (ana sayfada)

- Başlık A: **Atölyeden hazır parçalar** (öneri) · B: **Mağaza**
- Metin: Bastığımız dekor ve koleksiyon parçalarından seçin. Her birini farklı ölçü, renk ya da reçineyle yeniden basabiliriz.
- Buton: Mağazaya bakın

### 3.8 Rehber tanıtımı (ana sayfada)

- Başlık A: **Atölyeden notlar** (öneri) · B: **3D baskı rehberi**
- Metin: Hangi reçine, hangi ölçek, dosya nasıl hazırlanır: sipariş vermeden önce işinize yarayacak yazılar.
- Bağlantı: Bütün yazılar

### 3.9 Sipariş/teklif formu (`#order`)

- Başlık A: **Parçanızı anlatın** (öneri) · B: **Teklif isteyin**
- Metin: Fotoğraf yükleyin, birkaç bilgi ekleyin. Form mesajı hazırlar; WhatsApp'tan gönderdiğinizde fiyatı yazarız.
- Form altı not: STL, OBJ ya da 3MF dosyanız varsa doğrudan WhatsApp'tan gönderin. Dosya yoksa fotoğraftan modelleyebiliriz.
- Form yanındaki alternatif: Form doldurmak istemezseniz: **WhatsApp** · **Telefon**

### 3.10 SSS (`#faq`)

Bölüm başlığı:
- A: **Sık sorulanlar** (öneri)
- B: **Sipariş vermeden önce**

Not: `index.html` içindeki FAQPage JSON-LD bu metinlerle birebir aynı olmalı (Google görünür metinle eşleşme ister).

1. **STL dosyam yok. Fotoğraf yeterli mi?**
   Evet. Fotoğraf, referans görsel ya da el çizimi yeter. Modeli biz hazırlar, baskıdan önce onayınıza sunarız. STL, OBJ ya da 3MF dosyanız varsa doğrudan onu kullanırız; dilimleme ve destekler bizde.

2. **Hangi figürleri basıyorsunuz?**
   Kişiye özel figürler, özgün tasarımlar ve ticari kullanım izni olan dosyalarla çalışıyoruz: 32 mm ve 75 mm masa oyunu figürleri, kaideler, dekor heykelleri. Hak sahibinin izni olmayan karakter ve marka tasarımlarını basmıyoruz. `[DOĞRULA: politika kararı Bahadır'da]`

3. **Sanayi prototipi için hangi reçineyi kullanıyorsunuz?**
   Tough (ABS benzeri) reçine. Darbeye dayanıklıdır; sunum modeli, elektronik kapak ve kalıp öncesi kontrol numunesi için uygundur. Standart reçine kırılabildiği için sanayi işlerinde önermiyoruz.

4. **Mimarlık öğrencisiyim, acil baskı olur mu?**
   Olur. Manisa CBÜ ve İzmir'deki öğrencilere 24-48 saatte ekspres baskı yapıyoruz. 1/100, 1/200 ve 1/500 ölçekte insan, ağaç, mobilya ve cephe detayı basıyoruz. Jüri tarihinizi ilk mesajda yazın.

5. **En büyük parça ne kadar olabilir?**
   Tek parçada 218 × 123 × 250 mm. Daha büyük işleri parçalara bölüp basıyor, ardından birleştiriyoruz.

6. **Parça boyalı mı gelir?**
   Standart teslimde parça yıkanmış, UV ile kürlenmiş ve destekleri temizlenmiş olur. Astarlı teslim ek ücretlidir. Boyalı teslimi iş özelinde konuşuyoruz; çok ayrıntılı boyama işlerinde başka bir yol önerebiliriz.

7. **Fiyatı nasıl öğrenirim?**
   En hızlısı WhatsApp'tan fotoğraf göndermek. Çalışma saatlerinde yaklaşık 30 dakika içinde tahmini fiyat ve süreyi yazarız. Kesin fiyat, model onaylandıktan sonra belli olur.

8. **Baskı hatalı çıkarsa ne olur?**
   Baskı hatası bizden kaynaklanıyorsa parçayı ücretsiz yeniden basarız. Her parçayı paketlemeden önce tek tek kontrol ediyoruz.

9. **Gönderdiğim dosyalar ne olacak?**
   Yalnızca sizin işiniz için kullanılır. Özel tasarımları ve prototipleri izniniz olmadan kimseyle paylaşmıyor, çoğaltmıyoruz.

10. **Teslimat nasıl?**
    Manisa ve İzmir'de elden teslim ediyoruz. Türkiye'nin geri kalanına kargo ile gönderiyoruz; kırılgan parçaları buna göre paketliyoruz.

SSS altı satırı: Sorunuz burada yoksa WhatsApp'tan yazın. Pazartesi-Cumartesi, 09.00-19.00.

### 3.11 Kapanış CTA

- Başlık A: **Bir fotoğrafla başlayın.** (öneri) · B: **Parçanız aklınızdaysa yazın.**
- Metin: Fotoğrafı WhatsApp'tan ya da formdan gönderin. Fiyatı, süreyi ve hangi reçineyi önerdiğimizi yazalım.
- Butonlar: **Fotoğraf gönderin** (birincil, `#order`) · **Arayın: +90 531 103 45 35** (ikincil, `tel:`)

---

## 4. Mağaza, ürün, blog, footer

### 4.1 Mağaza listesi (`/magaza`)

- H1 A: **Mağaza** (öneri, sade; altına açıklama) · B: **Atölyeden hazır parçalar**
- Giriş: Atölyede basılmış dekor ve koleksiyon parçaları. Her birini farklı ölçü, renk ya da reçineyle yeniden basabiliriz. Siparişler WhatsApp'tan alınır.
- Fiyat notu (küçük): Fiyatlar standart ölçü ve tek renk içindir. Ölçü, adet ve boya fiyatı değiştirir.
- Filtre başlığı (ekranda görünmez, aria-label): Kategoriye göre süz
- Filtre etiketleri: **Tümü** · **Dekor** · **Koleksiyon** · **Kişiye özel** · **Setler**
  (Dev: yeni `products.js` kategori id'lerine göre eşleştir. Kullanılmayan kategori filtresini gösterme.)
- Kart üst bilgisi: `{malzeme}`
- Kart fiyat: `{fiyat} ₺` ya da `{başlangıç fiyatı} ₺'den başlayan`
- Kart bağlantısı (aria-label): `{Ürün adı} ayrıntıları`
- Liste altı: Aradığınız parça burada yoksa fotoğrafını gönderin, sizin için basalım. → **WhatsApp'tan yazın** · Instagram'da daha fazla iş: **@micronforge3d**

### 4.2 Ürün detay şablonu (`/magaza/:slug`)

Üst kırıntı: Mağaza / `{Kategori}`

- H1: `{Ürün adı}`
- Açıklama: `{desc}`
- Fiyat etiketi: **Fiyat** ya da **Başlangıç fiyatı**
- Fiyat notu: Standart ölçü ve tek renk içindir. Ölçü, renk ve adet fiyatı değiştirir.

Bilgi tablosu (ince çizgili, iki sütun):

| Alan | Değer biçimi | Veri yoksa |
|---|---|---|
| Malzeme | `{material}` (ör. Şeffaf reçine) | |
| Ölçü | `{genişlik} × {derinlik} × {yükseklik} mm` | Ölçüyü siparişte birlikte belirliyoruz. |
| Katman | 25 mikron (Tough reçinede 50 mikron) | |
| Üretim süresi | `{süre}` iş günü | Baskı ve kürleme 6-24 saat, teslim 1-2 gün. |
| Yüzey | Boyasız / Astarlı / Boyalı | Boyasız, destekleri temizlenmiş. |
| Teslim | Manisa ve İzmir'de elden, Türkiye geneline kargo | |

(Dev: `size`, `leadTime`, `finish` alanları `products.js`'e eklenebilir; yoksa sağ sütundaki varsayılan yazılır.)

Butonlar: **WhatsApp'tan sipariş verin** · **Soru sorun**

Sipariş notu (butonların altında):
> Sipariş WhatsApp'tan alınır. Ölçü, renk ve teslim tarihini orada netleştirip baskıya öyle geçeriz. Aynı parçayı farklı ölçüde ya da reçinede de basabiliriz.

Bölüm başlıkları (sayfada sırasıyla): **Ayrıntılar** · **Nasıl basılır** · **Benzer parçalar**

"Nasıl basılır" metni:
> Saturn 4 Ultra 16K yazıcıda 25 mikron katmanla basılır. IPA ile yıkanır, UV ile kürlenir, destekleri elde temizlenir ve paketlenmeden önce kontrol edilir.

WhatsApp sipariş mesajı (önceden doldurulan metin, ünlem kaldırıldı):
> Merhaba, "{Ürün adı}" için sipariş vermek istiyorum. Fiyat ve teslim süresini öğrenebilir miyim?

Görsel alt metni: `{Ürün adı}, {malzeme} ile SLA reçine 3D baskı`

### 4.3 Blog listesi (`/blog`)

- Üst satır: Rehber
- H1 A: **Atölyeden notlar** (öneri) · B: **Manisa'da 3D baskı rehberi**
- Giriş: Sipariş vermeden önce sorulan soruların yazılı cevapları. Hangi reçine, hangi ölçek, dosya nasıl hazırlanır, OSB numunesi nasıl istenir.
- Konu etiketleri (kart değil, düz satır):
  - Manisa'da 3D baskı: teklif ve üretim
  - OSB ve prototip: numune ve ölçü kontrolü
  - Figür ve hediye: fotoğraftan modelleme
  - Mimari maket: ölçek ve cephe detayı
- Liste başlığı A: **Bütün yazılar** (öneri) · B: **Konuya göre okuyun**
- Liste altı kutu: Başlık **Cevabı burada bulamadınız mı?** · Metin: Fotoğrafı ya da dosyayı, ölçüyü, adedi ve kullanım amacını gönderin. Nasıl basılacağını birlikte netleştirelim. · Buton: **WhatsApp'tan yazın**
- Blog yazısı sonu (her yazıda aynı): Bu yazıdaki parçayı bastırmak isterseniz fotoğrafını gönderin. → **Teklif isteyin**
- Kart: `{kategori}` · `{okuma süresi} dk okuma` · Bağlantı: Yazıyı okuyun

### 4.4 Footer

- Marka satırı: **MicronForge**
- Tanım: Manisa'da SLA reçine 3D baskı atölyesi. Kişiye özel figür, mimari maket, sanayi prototipi ve dekor parçaları basıyoruz. Manisa ve İzmir'e elden teslim, Türkiye'ye kargo.
- Sütun **İşler**: Koleksiyon ve dekor · Kişiye özel figür · Mimari maket · Sanayi prototipi · Toplu sipariş
- Sütun **Malzemeler**: Standart reçine · Tough reçine · Renkli ve şeffaf reçine
- Sütun **Bilgi**: Fiyat · SSS · Mağaza · Rehber
- İletişim bloğu:
  - WhatsApp: +90 531 103 45 35
  - Telefon: +90 531 103 45 35
  - Instagram: @micronforge3d
  - Konum: Manisa
  - Çalışma saatleri: Pazartesi-Cumartesi, 09.00-19.00
- Alt satır: © 2026 MicronForge
- Kaldırılanlar: bülten aboneliği (arka ucu yok), "Kullanım Şartları / Gizlilik / Çerez" bağlantıları (sayfaları yok, `href="#"`). Sayfalar yazılınca geri eklenir. KVKK aydınlatma metni hazırlanırsa "Gizlilik ve KVKK" adıyla tek bağlantı yeter.

### 4.5 WhatsApp yüzen butonu

- aria-label: WhatsApp'tan yazın
- İpucu balonu: Fotoğraf gönderin, fiyatı yazalım.
- Önceden doldurulan mesaj: Merhaba, 3D reçine baskı için teklif almak istiyorum.

---

## 5. Teklif/sipariş akışı mikro metinleri

Formun üstünde üç adım (numaralı düz metin, ikon yok):

1. **Fotoğrafları ekleyin.** En fazla 5 tane. Farklı açılardan, gün ışığında, filtresiz.
2. **Birkaç bilgi verin.** Ne olduğu, yaklaşık boyu ve size nasıl ulaşacağımız.
3. **WhatsApp'tan gönderin.** Form mesajı hazırlar. Fotoğrafları aynı sohbete ekleyip gönderin.

Dosya yükleme alanı:
- Başlık: Fotoğraflar
- Boş durum: Fotoğrafları buraya sürükleyin ya da seçmek için dokunun.
- Yardım: Telefonla çekilmiş fotoğraflar olur. En fazla 5 fotoğraf. Önden, yandan ve arkadan çekilmiş fotoğraflar modeli kolaylaştırır.
- Eklenen dosya altı: `{dosya adı}` · `{boyut} KB` · Kaldır (aria-label: `{dosya adı} fotoğrafını kaldır`)
- Sınır dolunca: 5 fotoğrafın hepsini eklediniz.
- 3D dosya notu: STL, OBJ ya da 3MF dosyanız varsa WhatsApp'tan gönderin; bu alan yalnızca fotoğraf alır.
- Önemli uyarı (form gönderilmeden önce görünür, küçük): Fotoğraflar bu sayfadan bize iletilmez. Gönder dediğinizde WhatsApp açılır; fotoğrafları oradan ekleyin.

Gönder butonu: **Talebi hazırla**
Başarı ekranı: bkz. Bölüm 2, "Başarı mesajları".

WhatsApp'a giden hazır mesaj (ünlem ve emoji yok):

```
Merhaba, 3D reçine baskı için teklif almak istiyorum.

İsim: {isim}
İletişim: {iletişim}
Ne: {kategori}
Yaklaşık boy: {boyut}
Notlar: {notlar}

Fotoğrafları bu mesajın ardından gönderiyorum.
```

Blogdan gelen WhatsApp mesajı:
> Merhaba, rehberdeki yazılardan geldim. Bir 3D baskı işim var.

WhatsApp butonları:
- Genel: WhatsApp'tan yazın
- Ürün: WhatsApp'tan sipariş verin
- Form sonrası: WhatsApp'ta gönderin
- Toplu iş: Toplu sipariş için yazın

Çalışma saati dışı notu (isteğe bağlı, saat 19.00-09.00 ve pazar): Mesajınızı bırakın, ertesi iş günü dönelim. `[DOĞRULA]`

---

## 6. SEO

Karakter sayıları kontrol edildi.

| Rota | Title (≤ 60) | Meta description (≤ 155) |
|---|---|---|
| `/` | SLA Reçine 3D Baskı Manisa ve İzmir \| MicronForge (49) | Manisa'da SLA reçine 3D baskı atölyesi: kişiye özel figür, mimari maket, sanayi prototipi, dekor. Fotoğraf gönderin, fiyat ve süreyi yazalım. (141) |
| `/magaza` | Mağaza \| Reçine Figür ve Dekor Parçaları · MicronForge (54) | Atölyede basılmış reçine dekor ve koleksiyon parçaları. Ölçü, malzeme ve üretim süresi her üründe yazılı. Sipariş WhatsApp'tan, Manisa ve İzmir'e elden. (152) |
| `/magaza/:slug` | `{Ürün adı}` \| MicronForge Mağaza (31 + ad; ad 29 karakteri geçerse " \| MicronForge" kullan) | `{Ürün adı}`: `{desc}` `{Malzeme}`, SLA reçine 3D baskı. Manisa ve İzmir'de elden teslim, Türkiye geneline kargo. (Dev: 155'i geçerse `desc` kısaltılır.) |
| `/magaza/:slug` (bulunamadı) | Ürün bulunamadı \| MicronForge (29) | Bu ürün mağazada artık yok. Atölyede basılan diğer parçalara mağazadan bakabilirsiniz. (86) |
| `/blog` | 3D Baskı Rehberi: Figür, Maket, Prototip \| MicronForge (54) | Manisa'da SLA reçine 3D baskı üzerine notlar: OSB prototipi, fotoğraftan figür, mimari maket ölçeği, reçine ve FDM karşılaştırması. (131) |
| `/blog/:slug` | `post.seoTitle` (mevcutlar 44-52 karakter, değişmesin) | `post.description` (bir istisna aşağıda) |
| `/blog/:slug` (bulunamadı) | Yazı bulunamadı \| MicronForge Rehber (36) | Aradığınız yazı yayından kaldırılmış olabilir. Diğer 3D baskı rehberleri blog sayfasında. (89) |

Open Graph ve Twitter (`index.html`):
- og:title / twitter:title: MicronForge \| Manisa SLA Reçine 3D Baskı Atölyesi (49)
- og:description / twitter:description: Kişiye özel figür, mimari maket, sanayi prototipi ve dekor. Saturn 4 Ultra 16K, 25 mikron katman. Fotoğraf gönderin, teklif alın. (129)
- `index.html` `<title>` ve `description` ana sayfa satırıyla aynı olmalı.
- JSON-LD `hasOfferCatalog` içindeki "DnD / FRP / Tabletop Minyatür Baskı" hizmeti → "Koleksiyon ve Dekor Baskı" (açıklama: "Şeffaf ve renkli reçineden dekor heykeli, 32 mm ve 75 mm masa oyunu figürü, kaide ve diorama parçaları."). FAQPage JSON-LD, Bölüm 3.10 ile eşitlenmeli.
- `keywords` meta etiketinden "DnD minyatür baskı" ve "FRP figür" çıkarılabilir; Google kullanmıyor, ama yeni konumlandırmayla çelişiyor.

Blog açıklaması istisnası: `manisa-3d-baski-hizmeti-rehberi` yazısının `description` alanı 156 karakter (sınır 155). Öneri:
> Manisa'da 3D baskı yaptırmadan önce dosya, reçine, ölçü, kullanım amacı ve teklif süreci hakkında bilmeniz gerekenler. Figür, maket ve prototip için. (150)

---

## 7. Kaldırılması önerilen mevcut metinler

| Nerede | Metin | Neden |
|---|---|---|
| Hero.jsx | "Figürler, maketler, prototipler mikron seviyede." | Yasak klişe ("mikron seviyede"). |
| Hero.jsx, OrderForm.jsx | "DnD / FRP Figür" kategori etiketi | Yeni konumlandırmada "Koleksiyon ve dekor" oldu. |
| Hero.jsx, TrustBar.jsx, Stats.jsx | "48sa Teslim", "Express ile aynı gün" | "Aynı gün" hiçbir yerde açıklanmıyor ve SSS'deki "24-48 saat ekspres" ile çelişiyor. 48 saat ancak Süreç bölümündeki koşullu cümleyle kalır. |
| Stats.jsx (bütün bölüm) | "Teknik Güç", "Neden Reçine Baskı?" sayaçları | Rakamlar gerçek makine bilgisi ama hero altındaki teknik satır ile tekrar ediyor; sayaç animasyonu "istatistik" gibi okunuyor. "Mikron seviyesinde" klişesi. Bölüm kaldırılmalı. |
| TrustBar.jsx | "25μ Mikron Detay", "Kalite Garantisi / Memnun kalmazsan yeniden" | Hero teknik satırıyla tekrar. "Memnun kalmazsan yeniden" koşulsuz garanti gibi okunuyor; gerçek koşul "baskı hatası bizden kaynaklıysa". |
| Features.jsx | "Farkımızı Keşfet", "Neden Biz?" | Yasak klişe. |
| Features.jsx | "Kalite, hız ve müşteri memnuniyetini her siparişte önceliğimiz olarak görüyoruz." | İçi boş şirket dili. |
| Features.jsx | `SLA · MSLA · DLP · 4K LCD` etiketleri | Atölyede DLP ya da 4K LCD yazıcı olduğuna dair bilgi yok; yanlış izlenim. |
| Features.jsx | "Standart, Tough, Esnek, Şeffaf, Castable ve dahası." | Esnek ve Castable reçine başka hiçbir yerde (Malzemeler, SSS) geçmiyor; doğrulanamıyor. |
| Features.jsx | "%100 Kalite Garantisi" | Yasak "%"' iddiası; gerçek söz koşullu. |
| Features.jsx | "7/24 Uzman Destek" | JSON-LD'deki çalışma saatleri (Pzt-Cmt 09-19) ile çelişiyor; "uzman ekip" doğrulanamıyor. |
| Features.jsx | "Standart siparişleriniz en geç iki iş günü içinde üretime hazır." | "48 saatte teslim" başlığıyla çelişiyor. |
| Footer.jsx | "WhatsApp · 7/24 yazabilirsin" | Çalışma saatleriyle çelişiyor. |
| Footer.jsx | "mikron seviye detay" | Yasak klişe. |
| Footer.jsx | Bülten: "Yeni baskılardan ilk sen haberdar ol", "Abone Ol" | Arka ucu yok, e-posta hiçbir yere gitmiyor. |
| Footer.jsx | Kullanım Şartları, Gizlilik Politikası, Çerez Politikası | Bağlantılar `#`; sayfa yok. |
| Footer.jsx | Reçine sütununda "Gri / Siyah" ayrı öğe | Renkli ve şeffaf reçinenin içinde anlatılıyor. |
| Process.jsx | "Siparişten teslimata dört basit adımda hayallerinizi gerçeğe dönüştürüyoruz." | Yasak klişe. |
| Process.jsx | "Nasıl Çalışır?" | Soru biçimli başlık; yeni başlıkla değişti. |
| Materials.jsx | "En çok tercih edilen" | Veri yok. |
| Materials.jsx | "Kırılgan değil, darbe dayanıklı", "Mockup kalitesi" | "X değil" kalıbı; ikincisi içi boş. |
| Materials.jsx | "Manisa OSB · Mockup · Ar-Ge" (best alanı), "Yayıncı stand" | Malzeme kartında gereksiz tekrar. |
| Pricing.jsx | "Boss" paket adı, "Boss yaratık / ejderha" | Oyun argosu; premium tona uymuyor. |
| Pricing.jsx | "En Cok Tercih Edilen", "Öne Çıkan" | Veri yok; Türkçe karakter hatası. |
| Pricing.jsx | "Hangi Boyut Senin İçin?" | Yeni başlıkla değişti. |
| Services.jsx | "En Çok Talep", "Öğrenci Dostu", "B2B" rozetleri | Veri yok; rozet yığını yasak. |
| Services.jsx | "Hangi alanda olursanız olun, ... teklif anında." | "Anında" 30 dakika vaadiyle çelişiyor. |
| Services.jsx | "Kişiselleştirme = değerli hediye." | Slogan tadında, bilgi yok. |
| Services.jsx | "Savaşçı, büyücü, rogue", "NPC", "Twitch / YouTube stand" | Oyun argosu ve platform markaları; yeni tona uymuyor. |
| Services.jsx | "Özgün & ticari lisanslı STL." | İçeriği SSS 2'ye taşındı. |
| FAQ.jsx | "Warhammer, Marvel gibi telifli markaları müşteri kendi sorumluluğunda kabul ederiz." | Lisanslı marka adı geçiyor ve yeni katalog kararıyla çelişiyor. Politika Bahadır'ın kararı. |
| FAQ.jsx | "Birleşme yerleri mikron hassasiyetinde." | Doğrulanamaz, klişe. |
| FAQ.jsx | "Evet!" | Ünlem. |
| FAQ.jsx | "Aklınızda Soru mu Var?" | Klişe başlık. |
| FAQ.jsx | Alt satırdaki `#contact` bağlantısı | Sayfada `#contact` kimliği yok; kırık bağlantı. |
| CTA.jsx | "Ucretsiz fiyat teklifi", "Foto Yukle", "Manisa & Izmir" | Türkçe karakter hatası. |
| CTA.jsx | "fiyat ve üretim süresi an içinde elinde olsun" | "An içinde" 30 dakika ile çelişiyor. |
| ShopBanner.jsx | "15+ gerçek baskı: film & oyun figürleri, kristal dekor objeleri" | Eski katalog; lisanslı figür çağrışımı; sayı değişecek. |
| ShopPage.jsx (meta) | "Hulk, Yoda, Gollum, Spider-Man" | Lisanslı karakter adları. |
| Gallery.jsx (bileşen ana sayfada kullanılmıyorsa silinmeli) | "Gandalf Diorama / LOTR fan koleksiyonu", "Little Yoda", "Gollum Kalemlik", "AI üretim portre", sabit fiyatlar | Lisanslı karakterler; eski katalog. |
| Testimonials.jsx | "Sana Sözümüz", "Yeni bir atölyeyiz ama işimizi ciddiye alıyoruz." | Sahte yorum yok, içerik dürüst; başlık ve giriş tonu değişti. Sözler Bölüm 3.4'e taşındı. |
| Testimonials.jsx | "Gerçek baskılarımızı Instagram'da gör →" | Ok işareti ve "gerçek" vurgusu; yeni metin: "Instagram'da daha fazla iş: @micronforge3d". |
| OrderForm.jsx | "Talebin Alındı!", "30 dakika içinde dönüş yapacağız." | Form veri göndermiyor; kullanıcı mesajı WhatsApp'tan göndermeden hiçbir şey bize ulaşmıyor. Yanıltıcı. |
| OrderForm.jsx, WhatsAppFab.jsx, products.js `waOrder` | "Merhaba! ..." | Ünlem. |
| ProductDetail.jsx | "• 16K MSLA, 25 mikron katman — pürüzsüz yüzey" vb. madde işaretleri | Uzun tire ve madde işareti; "Nasıl basılır" metniyle değişti. |
| BlogPage.jsx | "Her yazı tek bir arama niyetine odaklanır; gereksiz teknik kalabalık yerine..." | Metnin kendini anlatması (SEO dili okura sızmış). |
| BlogPage.jsx | "Manisa'da 3D baskıyı doğru iş için seçin" | Anlamı belirsiz. |
| index.html | og/twitter açıklamasındaki "48 saatte teslim", "DnD/FRP minyatür" | Yeni konumlandırma ve koşulsuz süre iddiası. |
