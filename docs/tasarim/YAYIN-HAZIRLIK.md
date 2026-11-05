# Yayın hazırlık denetimi

Dal: `premium-yeniden-tasarim` (commit/push yapılmadı). Tarih: 2026-10-29.
Ölçüm: `npm run build` + `vite preview` (üretim çıktısı) ve dev sunucusu üzerinde Playwright + axe-core;
sayfalar `/`, `/magaza`, `/magaza/buz-ejderha`, `/blog`, `/blog/sla-recineli-baski-mi-fdm-mi`, `/boyle-bir-sayfa-yok`; 375 ve 1280 px.
Yerel ölçüm; gerçek ağ/cihaz değerleri Vercel önizlemede PageSpeed ile tekrar alınmalı.

## Özet

| Alan | Durum |
|---|---|
| Lint / build | Temiz. Build ~0,25 sn, blog ön-render + sitemap + feed + 404.html üretiliyor |
| JS | İlk yük ~120-143 KB (aktarım). En büyük parçalar: `react` 58 KB gz, `motion` 43 KB gz, `index` 16 KB gz. three/fiber/drei pakete girmiyor |
| LCP | Tüm sayfalarda yerelde ~0,4 sn. Ana sayfada LCP metin (h1 / giriş paragrafı), mağaza/ürün/blogda ilk görsel ve o görsel `eager` + `fetchpriority="high"` |
| Taşma | 375 ve 1280'de hiçbir sayfada yatay taşma yok |
| axe (WCAG 2.1 AA + best-practice) | 12 yüklemede 0 ihlal |
| Konsol | Dev'de hata yok. Preview'de tek 404: `/_vercel/insights/script.js` (Vercel Analytics betiği yalnız Vercel'de var, beklenen) |
| SEO meta | Her sayfada benzersiz title (30-54 kr.) ve description (96-153 kr.), doğru kanonik, `lang="tr"`, tek h1 |
| JSON-LD | Tüm bloklar geçerli JSON; tipler: LocalBusiness, WebSite, FAQPage (ana sayfa), ItemList, Product, BreadcrumbList, CollectionPage, BlogPosting |

## Yapılanlar

Bu turda:

1. **`vercel.json`: önbellek ve güvenlik başlıkları.**
   - `/assets/*` ve `/fonts/*` için `Cache-Control: public, max-age=31536000, immutable`. Dosya adları hash'li ya da sürümü sabit olduğu için güvenli.
   - `/shop/*` için 7 gün önbellek + `stale-while-revalidate`.
   - Tüm yollar için `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN` ve `Permissions-Policy` (kamera, mikrofon ve konum kapalı).
   - CSP bilinçli olarak eklenmedi, aşağıya bakın.
   - Rewrite kuralları değişmedi.
2. **`scripts/prerender-blog.mjs`: `dist/404.html` üretimi.** Vercel, rewrite hedefi bulunamayınca bu dosyayı HTTP 404 ile sunar. Bu, olmayan `/blog/:slug` adresleri ve noktalı yollar (`/x.png` gibi) için geçerli.
   - Dosya `noindex, follow` taşır, kanonik ve `<noscript>` ana sayfa metni içermez.
   - Uygulama yüklenince NotFound ya da "yazı bulunamadı" görünümü çizilir.
3. **`scripts/prerender-blog.mjs`: blog ve 404'te ana sayfa FAQPage'i çıkarıldı.** `index.html`'deki statik `@graph` ana sayfanın SSS'sini taşıyordu ve ön-render edilen her blog sayfasına kopyalanıyordu. Yazı sayfalarında bu yüzden iki FAQPage vardı ve biri sayfada görünmeyen içeriği anlatıyordu.
   - Artık blog ve 404 sayfalarında yalnız LocalBusiness + WebSite kalıyor.
   - Yazının kendi FAQPage'i ayrı blokta duruyor.
   - Kontrol: `dist/blog/<yazı>/index.html` → `LocalBusiness, WebSite | BlogPosting, BreadcrumbList, FAQPage`.

2. tur (aynı gün, yeniden denetim):

4. **`src/hooks/usePageSeo.js`: `noindex` sayfalarda kanonik kaldırılıyor.** Önceden 404 sayfası `noindex` taşırken kanoniği ana sayfayı, bulunamayan ürün de `/magaza`'yı gösteriyordu. Google bunu çelişkili sinyal sayar. Artık `noindex` iken `<link rel=canonical>` siliniyor. Normal bir sayfaya geçilince yeniden yazılıyor (preview'de doğrulandı: 404 → /magaza geçişinden sonra kanonik `/magaza`, robots `index, follow`).
5. **`src/pages/ProductDetail.jsx`: ürün sayfasında og:image / twitter:image ürünün ilk fotoğrafı** (ör. `/shop/urun-02.jpg`). Fotoğrafı olmayan üründe varsayılan `og-image.png` kalıyor. Google ve JS çalıştıran tarayıcılar için geçerli. WhatsApp / Instagram önizlemesi için ön-render gerekiyor (aşağıda).

Doğrulama (2. tur):
- `npm run lint` temiz.
- `npm run build` temiz. Parçalar değişmedi: react 58 KB gz, motion 43 KB gz, index 16 KB gz.
- Playwright, dev sunucusunda 375 ve 1280 px, 7 yol (`/`, `/magaza`, `/magaza/buz-ejderha`, `/blog`, bir yazı, `/boyle-bir-sayfa-yok`, `/magaza/olmayan-urun`):
  - Taşma yok, konsol/sayfa hatası yok, her sayfada tek h1.
  - Title 29-54 kr., description 86-153 kr.
  - İlk `main img` `eager` + `fetchpriority=high`.
  - JSON-LD blokları geçerli JSON. Bulunamadı sayfalarında `noindex, follow` var, kanonik yok.
- `dist/404.html` içinde kanonik yok.
- Ölçüm notu: `vite preview` `/blog/<yazı>` adresini sondaki `/` olmadan sunarken ön-render dosyasını değil SPA `index.html`'i veriyor. Bu yüzden yerel önizlemede yazıda ana sayfa FAQPage'i görünüyor. `dist/blog/<yazı>/index.html` doğru (yalnız yazının FAQPage'i). Vercel'deki `/blog/:slug` rewrite'ı bunu karşılıyor. Önizlemede `curl https://<önizleme>/blog/<yazı> | grep data-prerendered` ile teyit edin.

Çalışma ağacında bu turdan önce de commit edilmemiş değişiklikler vardı. Onlara dokunmadım, yalnızca doğruladım ve doğru çalışıyorlar:
- `NotFound.jsx` + `path="*"` route'u
- `usePageSeo` içinde `noindex` (bulunmayan ürün ve yazıda da)
- Mağaza ilk satırında `oncelikli` (eager)
- Kart bağlantılarından `aria-label` kaldırılması (görünen ad ile erişilebilir adın uyuşmaması giderildi)
- WhatsApp düğmesinin `<aside>` landmark içine alınması

## Kalanlar (riskli ya da karar gerektiren, yapılmadı)

### Performans
- **Mağaza görselleri tek boyut (750×1000 JPEG, 76-140 KB).** `/magaza` ilk açılışta ~20 görsel / ~1,8 MB indiriyor. Lazy-loading çalışıyor; Chrome'un yükleme mesafesi geniş olduğu için bu kadarı yükleniyor.
  - `UrunGorseli`'nde `sizes` var ama `srcset` yok, yani `sizes` şu an etkisiz.
  - Öneri: kullanılan 25 fotoğraftan 400w + 750w WebP/AVIF türevleri üretip `srcset` eklemek. Beklenen kazanç mağazada yaklaşık %40-60.
  - Yeni ikili dosyalar eklemek ve görsel kalitesini göz ile onaylamak gerektiği için yapılmadı. Not: `scripts/optimize-shop.mjs` `jimp`'e bağlı ama `jimp` package.json'da yok.
- **Ana sayfada görsel preload gerekmiyor.** LCP öğesi metin olduğu için hero görseli için `<link rel=preload>` eklenmedi. Hero ürünü `products.js`'ten seçiliyor; sabit bir preload eskiyebilirdi.
- **Fontlar:** 4 değişken woff2, toplam ~263 KB. Sayfa başına ~123-200 KB yükleniyor (italikler kullanılan sayfada). İki ana dosya preload'lu. Daha fazla küçültmek için Latin + Türkçe alt kümesi çıkarılabilir; düşük öncelik.
- **Kullanılmayan bağımlılıklar (kaldırılmadı, yalnızca raporlanıyor):**
  - `three`, `@react-three/fiber`, `@react-three/drei`: canlı koddan hiç import edilmiyor.
  - `lucide-react`: yalnızca ölü dosyalarda kullanılıyor.
  - Ölü dosyalar: `src/components/three/*`, `src/components/ui/{Gallery,STLModal,ProductVisual}.jsx`, `src/App.css`, `src/assets/*`.
  - `vite.config.js`'deki `three` / `icons` manualChunks kuralları da artık boşa çalışıyor.
  - Bundle'a girmedikleri için kullanıcıya maliyetleri yok; maliyet `npm install` süresi ve bakım yükü.
- **`public/models/stl` (21 MB) her deploy'da yayınlanıyor.** Hiçbir sayfa kullanmıyor.
  - İçinde `yoda.stl` var, yani lisanslı bir karakter (YON.md §… notu da bunu söylüyor). URL'yi bilen herkes indirebilir.
  - Kaldırılmalı ya da `public/` dışına taşınmalı. Bahadır'ın kararı.
- **`public/shop` içinde 23 kullanılmayan fotoğraf** (`urun-06, 07, 09, 11-14, 16-20, 22, 24, 29, 30, 41-44, 46-48`). Yük getirmiyorlar ama herkese açıklar. Bunların bir kısmı kaldırılan lisanslı ürünlere aitse silinmeli. `instagram-pp.png`, `banner.*` ve `crystal.png` da sitede kullanılmıyor (sosyal medya varlıkları).

### SEO / teknik
- **Gerçek 404 yalnızca kısmi.** Catch-all rewrite (`/((?!.*\.).*)` → `index.html`) yüzünden `/olmayan-sayfa` ve `/magaza/olmayan-urun` HTTP **200** döner. Bu yumuşak 404 şu an `noindex` ile idare ediliyor ve Google bunu kabul eder.
  - Tam çözüm: rewrite'ı yalnız gerçek rotalara (`/`, `/magaza`, `/magaza/:slug`) daraltmak. Böylece geri kalan her şey `404.html` ile 404 döner.
  - Yerelde test edilemeyen bir yönlendirme değişikliği olduğu için yapılmadı. Vercel önizlemede denenmeli.
  - Bu turda eklenen `404.html`'in davranışı da önizlemede doğrulanmalı: `curl -I https://<önizleme>/blog/yok` → 404 beklenir.
- **Ürün ve mağaza sayfalarının sosyal önizlemesi (WhatsApp, Instagram, Facebook) ana sayfanınki.** Bu tarayıcılar JS çalıştırmaz. `/magaza/...` için sunulan HTML `index.html` olduğu için başlık, açıklama ve og:image ana sayfadan gelir.
  - Google JS'i işlediği için arama sonuçları doğru.
  - Çözüm: blogdaki gibi `/magaza` ve `/magaza/:slug` sayfalarını da ön-render edip (en azından `<head>`) rewrite eklemek. Orta büyüklükte iş, ayrı adım olarak önerilir.
  - Ürün sayfasında istemci tarafı og:image artık ürün fotoğrafı (2. tur). Ön-render yapılırken aynı değer `<head>`'e statik yazılmalı.
- **Ana sayfa FAQPage'i statik `index.html`'de.** Bu yüzden SPA rotalarında da (`/magaza`, ürün sayfaları) kaynak HTML'de görünüyor. Google'ın kuralı "görünen içerik" olduğu için ideali onu yalnız ana sayfaya bağlamak; Home'da `useJsonLd` + `sss.js` ile yapılabilir. Ama JS çalıştırmayan botlar (bazı AI tarayıcıları) SSS'yi kaybeder. Bu bir ödünleşim, karar Bahadır'da.
- **Product JSON-LD:**
  - Geçerli. Google Merchant uyarıları olarak `shippingDetails` ve `hasMerchantReturnPolicy` eksik.
  - Ürünler siparişle basıldığı için `availability` için `InStock` yerine `https://schema.org/MadeToOrder` daha dürüst olur. İçerik kararı.
- **robots.txt:** tüm botlar ve AI tarayıcılarına açık, sitemap adresi doğru.
- **sitemap:** build'de üretiliyor, 21 URL (ana sayfa, mağaza, 12 ürün, blog, 6 yazı). Blog URL'lerinde `lastmod` var, ürünlerde yok. `public/sitemap.xml` ile `dist` çıktısı birebir aynı.
- **Analytics:** `@vercel/analytics` kurulu ve `<Analytics />` App'te var. Vercel projesinde Web Analytics açılmazsa betik 404 verir ve zararsızdır.

### Erişilebilirlik
- axe ihlali yok.
- "İçeriğe geç" bağlantısı, `:focus-visible` halkası, `useReducedMotion` kullanımı ve görsel alt metinleri mevcut.
- Elle ekran okuyucu (VoiceOver) turu yapılmadı. Yayından önce menü ve SSS akordeonu bir kez klavye ve VoiceOver ile denenmeli.

### Güvenlik
- CSP eklenmedi. Inline JSON-LD, Vercel Analytics ve WhatsApp bağlantıları için ayar gerekir. Yanlış CSP siteyi boş gösterebilir. Önizlemede `Content-Security-Policy-Report-Only` ile başlanması önerilir.

## Bahadır'ın kararları

1. **Vercel önizleme:** Bu dalı önizlemeye almak (push gerekir; bu turda yapılmadı). Önizlemede kontrol edilecekler:
   - `curl -I` ile 404 davranışı
   - `vercel.json` başlıkları
   - Mobil PageSpeed / Lighthouse
2. **Alan adı:** Kanonikler, sitemap, robots, og ve JSON-LD hep `https://micronforge.shop` (www'suz). Alan adı Vercel'e bağlanırken:
   - www → apex 308 yönlendirmesi ayarlanmalı.
   - Search Console'a domain mülkü olarak eklenip sitemap gönderilmeli.
   - Farklı bir alan adı seçilirse `SITE` / `SITE_URL` (usePageSeo, blogPosts.js), `index.html`, `robots.txt` ve `public/sitemap.xml` birlikte değişmeli.
3. **Analytics:** Vercel projesinde Web Analytics açılsın mı? Açılmayacaksa `<Analytics />` ve paket kaldırılabilir. Çerez kullanmadığı için KVKK çerez bandı gerektirmez, ama aydınlatma metninde anılması iyi olur.
4. **Temizlik:**
   - `public/models/stl` (lisanslı model içeriyor) ve kullanılmayan `public/shop` fotoğrafları silinsin mi?
   - three/fiber/drei/lucide ve ölü bileşenler kaldırılsın mı?
5. **Sırada önerilen iş:**
   - Ürün sayfalarının ön-render'ı (sosyal önizleme)
   - Responsive `srcset` + WebP görseller (mobil veri)
   - Rewrite'ın gerçek rotalara daraltılması (gerçek 404)
