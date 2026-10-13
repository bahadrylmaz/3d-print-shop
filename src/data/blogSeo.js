// Blog rotalarının sabit SEO metinleri (METIN.md §6). BlogPage, BlogPost ve scripts/prerender-blog.mjs buradan okur;
// tarayıcıdaki başlık ile build'de üretilen statik HTML'in başlığı aynı kalsın diye tek yerde.
export const BLOG_LISTE_SEO = {
  title: '3D Baskı Rehberi: Figür, Maket, Prototip | MicronForge',
  description:
    'Manisa’da SLA reçine 3D baskı üzerine notlar: OSB prototipi, fotoğraftan figür, mimari maket ölçeği, reçine ve FDM karşılaştırması.',
}

export const BLOG_YAZI_YOK_SEO = {
  title: 'Yazı bulunamadı | MicronForge Rehber',
  description: 'Aradığınız yazı yayından kaldırılmış olabilir. Diğer 3D baskı rehberleri blog sayfasında.',
}

// METIN.md §5: blog sayfalarından açılan WhatsApp mesajı
export const BLOG_WA_MESAJ = 'Merhaba, rehberdeki yazılardan geldim. Bir 3D baskı işim var.'
