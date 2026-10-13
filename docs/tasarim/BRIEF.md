# MicronForge — premium yeniden tasarım brief'i

**Dal:** `premium-yeniden-tasarim` (yalnızca bu dalda çalış; `master` canlı siteye yayınlanır, ona dokunma, push etme).
**Repo:** `~/Desktop/3d-print-shop` — React 19 + Vite 8 + Tailwind 4 + react-router 7 (+ three/fiber, framer-motion mevcut).
**Site:** micronforge.shop — Manisa merkezli, SLA reçine 3D baskı atölyesi: koleksiyon/dekor parçaları, kişiye özel figür,
mimari maket, sanayi prototipi. Mağaza (`/magaza`, `/magaza/:slug`), blog (`/blog`), sipariş/teklif formu, WhatsApp.

## Hedef
Baştan sona yeniden inşa edilmiş, **premium ve lüks** hissettiren bir site. Referans duygu: butik mücevher evi,
bağımsız tasarım stüdyosu, müze mağazası. Ziyaretçi "bunu bir yapay zekâ üretmiş" diye düşünmemeli; "bunu iyi bir
stüdyo, el emeğiyle tasarlamış" demeli.

## "Yapay zekâ yapmış" görüntüsünü veren şeyler — YASAK
- Mor/mavi/pembe neon degradeler, degrade renkli başlık kelimeleri, "glow" efektleri, glassmorphism kartlar.
- Ortalanmış hero + altında 3 eşit özellik kartı + ikon dizisi; her bölümde aynı sol/sağ yerleşim.
- Hap (pill) şeklinde menü, rozet/etiket yığınları, emoji, lucide ikonlarının her başlığa serpiştirilmesi.
- Inter/system-ui gövde + aşırı yuvarlatılmış köşeler (`rounded-2xl` her yerde), her şeye gölge.
- Klişe metin: "hayallerinizi gerçeğe dönüştürüyoruz", "mikron seviyede mükemmellik", "yenilikçi çözümler",
  "bir sonraki seviyeye", üçlü sıfat dizileri, ünlem işaretleri.
- Uydurma sayı/istatistik/müşteri yorumu ("500+ mutlu müşteri", "%99 memnuniyet"). Yalnızca doğrulanabilir bilgi.
- Sahte "SECTION 01 / 02" meta etiketleri, rastgele dekoratif çizgi ızgaraları.

## Bunun yerine
- Editoryal tipografi: karakterli bir serif başlık + sade bir grotesk gövde (kendi sunucumuzdan, OFL/açık lisanslı).
- Sınırlı, sıcak/nötr bir palet (ör. kemik beyazı, mürekkep siyahı, tek bir metalik ya da toprak vurgu). Renk ürünlerden gelsin.
- Cömert boşluk, asimetrik ama disiplinli ızgara, büyük ürün görselleri, ince çizgiler, az ve anlamlı hareket.
- Ürün = mücevher gibi sunulur: tek tek, nefes alan sayfalar; malzeme, ölçü, üretim süresi gibi gerçek detaylar.
- Türkçe metin insan yazmış gibi: kısa, somut, sakin özgüven. Türkçe karakterler doğru.

## Değişmezler (bozulursa iş başarısız)
- Bütün rotalar ve URL'ler aynı kalır (SEO): `/`, `/magaza`, `/magaza/:slug`, `/blog`, `/blog/:slug`.
- `usePageSeo`, `useJsonLd`, `index.html` meta/JSON-LD, `scripts/prerender-blog.mjs`, `sitemap.xml`, `feed.xml` çalışır.
- `src/data/products.js` ve `src/data/blogPosts.js` veri kaynağıdır; yapısını bozma (alan eklenebilir).
- Sipariş/teklif formu ve WhatsApp iletişimi çalışmaya devam eder (mevcut davranışı koru).
- `npm run build` hatasız; mobil 375 px'te yatay kaydırma yok; dokunma hedefi ≥ 44 px; WCAG AA kontrast.
- Vercel Analytics kalır.

## Ürünler ve fotoğraflar
Mevcut ürün fotoğrafları ve katalog **kaldırılacak**; Bahadır yeni, profesyonel fotoğraflar gönderiyor
(`yeni-fotolar/`). Yeni katalog o fotoğraflarla kurulacak. Bu yüzden:
- Tasarımı mevcut fotoğraflara göre yapma. Ürün görseli alanları için **nötr yer tutucu** kullan
  (düz ton + ince çerçeve + oran); 3:4 dikey ürün oranı ve 16:9 / 4:5 editoryal oranlar için tasarla.
- Lisanslı karakterler (Marvel, Star Wars, Şirinler, Yüzüklerin Efendisi, Galatasaray) yeni katalogda olmayacak;
  hiçbir metinde/görselde onlara gönderme yapma.

## Ekip ve çıktı dosyaları
| Ajan | Çıktı | Not |
|---|---|---|
| Tasarımcı | `docs/tasarim/YON.md`, `src/styles/tokens.css`, `public/fonts/` | Sanat yönü + tasarım sistemi |
| Metin | `docs/tasarim/METIN.md` | Bütün sayfaların Türkçe metni |
| Dev (2. aşama) | `src/**` | Uygulama; brief + YON + METIN + görsellere göre |
| Tasarımcı (3. aşama) | `docs/tasarim/INCELEME.md` | 375/1280 px ekran görüntüsüyle görsel denetim |

Başkasının çıktı dosyasına yazma. Git commit atma; aşamaları Claude (koordinatör) commit'liyor.

## Skill'ler (oku ve uygula)
`/Users/bahadirefeyilmaz/Desktop/ajan-ofisi/eklentiler/tasarim/skills/` altında: `frontend-design/SKILL.md`,
`taste-skill/`, `redesign-skill/`, `minimalist-skill/`, `brand/`, `design-system/`, `ui-ux-pro-max/`.
Metin için `/Users/bahadirefeyilmaz/Desktop/ajan-ofisi/eklentiler/sosyal/skills/` altında `copywriting/`, `humanizer/`.
