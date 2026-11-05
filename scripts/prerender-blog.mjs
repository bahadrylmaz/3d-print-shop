import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  SITE_URL,
  blogCollectionJsonLd,
  blogPostJsonLd,
  blogPosts,
} from '../src/data/blogPosts.js'
import { BLOG_LISTE_SEO } from '../src/data/blogSeo.js'
import { createServer } from 'vite'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = resolve(projectRoot, 'dist')
const baseHtml = await readFile(resolve(distRoot, 'index.html'), 'utf8')

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const escapeXml = escapeHtml

const setTitle = (html, value) => html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(value)}</title>`)

const setMeta = (html, attribute, key, value) => {
  const tag = `<meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(value)}" />`
  const matcher = new RegExp(`<meta[^>]+${attribute}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'i')
  return matcher.test(html) ? html.replace(matcher, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

const setCanonical = (html, url) => {
  const tag = `<link rel="canonical" href="${escapeHtml(url)}" />`
  const matcher = /<link[^>]+rel=["']canonical["'][^>]*>/i
  return matcher.test(html) ? html.replace(matcher, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

const setPageMeta = ({ html, title, description, url, image, type = 'website', published, modified }) => {
  let result = setTitle(html, title)
  result = setCanonical(result, url)
  result = setMeta(result, 'name', 'description', description)
  result = setMeta(result, 'property', 'og:title', title)
  result = setMeta(result, 'property', 'og:description', description)
  result = setMeta(result, 'property', 'og:url', url)
  result = setMeta(result, 'property', 'og:type', type)
  result = setMeta(result, 'property', 'og:image', image)
  result = setMeta(result, 'property', 'og:image:width', '1440')
  result = setMeta(result, 'property', 'og:image:height', '960')
  result = setMeta(result, 'name', 'twitter:title', title)
  result = setMeta(result, 'name', 'twitter:description', description)
  result = setMeta(result, 'name', 'twitter:image', image)
  if (published) result = setMeta(result, 'property', 'article:published_time', published)
  if (modified) result = setMeta(result, 'property', 'article:modified_time', modified)
  return result
}

// index.html'deki statik @graph ana sayfanın SSS'sini (FAQPage) de taşır. Yapılandırılmış veri sayfada görünen içeriği
// anlatmalı; blog ve 404 sayfalarında o SSS görünmediği için FAQPage düğümü çıkarılır (blog yazısının kendi FAQPage'i ayrı blokta).
const anaSayfaSssCikar = (html) =>
  html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/i, (tum, ac, govde, kapa) => {
    const veri = JSON.parse(govde)
    if (!Array.isArray(veri['@graph'])) return tum
    veri['@graph'] = veri['@graph'].filter((dugum) => dugum['@type'] !== 'FAQPage')
    return `${ac}${JSON.stringify(veri).replaceAll('<', '\\u003c')}${kapa}`
  })

const wrapStaticRoot = (content) =>
  `<div id="root" data-prerendered="true">${content}</div>`

// Statik gövde: tarayıcıdaki BlogPage/BlogPost bileşenleri Vite SSR ile HTML'e çevrilir (scripts/blog-ssr.js).
// Böylece Navbar, Footer ve yazı tipografisi build çıktısında da yeni tasarımla aynı; sınıflar dist CSS'inde zaten var.
const vite = await createServer({
  root: projectRoot,
  configFile: resolve(projectRoot, 'vite.config.js'),
  logLevel: 'error',
  appType: 'custom',
  server: { middlewareMode: true, hmr: false, ws: false },
})
// products.js de Vite üzerinden yüklenir: uzantısız iç import'ları (ör. '../data/iletisim') düz Node çözemez.
let blogSayfaHtml
let products
try {
  ;({ blogSayfaHtml } = await vite.ssrLoadModule('/scripts/blog-ssr.js'))
  ;({ products } = await vite.ssrLoadModule('/src/data/products.js'))
} catch (hata) {
  await vite.close()
  throw hata
}

const writePage = async (relativePath, html, content, jsonLd, jsonLdId) => {
  const outputPath = resolve(distRoot, relativePath, 'index.html')
  await mkdir(dirname(outputPath), { recursive: true })
  const withoutNoscript = anaSayfaSssCikar(html).replace(/\s*<noscript>[\s\S]*?<\/noscript>/i, '')
  const withJsonLd = withoutNoscript.replace(
    '</head>',
    `    <script type="application/ld+json" id="${jsonLdId}">${JSON.stringify(jsonLd).replaceAll('<', '\\u003c')}</script>\n  </head>`,
  )
  await writeFile(outputPath, withJsonLd.replace('<div id="root"></div>', wrapStaticRoot(content)), 'utf8')
}

const blogUrl = `${SITE_URL}/blog`
const listHtml = setPageMeta({
  html: baseHtml,
  ...BLOG_LISTE_SEO,
  url: blogUrl,
  image: `${SITE_URL}${blogPosts[0].image}`,
})
await writePage('blog', listHtml, blogSayfaHtml('/blog'), blogCollectionJsonLd, 'blog-collection-jsonld')

for (const post of blogPosts) {
  const url = `${blogUrl}/${post.slug}`
  const html = setPageMeta({
    html: baseHtml,
    title: post.seoTitle,
    description: post.description,
    url,
    image: `${SITE_URL}${post.image}`,
    type: 'article',
    published: post.published,
    modified: post.updated,
  })
  await writePage(`blog/${post.slug}`, html, blogSayfaHtml(`/blog/${post.slug}`), blogPostJsonLd(post), 'blog-post-jsonld')
}
await vite.close()

// 404.html: Vercel, rewrite hedefi bulunamayan istekte (ör. olmayan /blog/:slug, /dosya.png) bunu HTTP 404 ile sunar.
// Uygulama yüklenip NotFound/BlogPost "bulunamadı" görünümünü çizer; JS çalışmadan önce de noindex, kanoniksiz.
let html404 = setTitle(anaSayfaSssCikar(baseHtml), 'Sayfa bulunamadı | MicronForge')
html404 = setMeta(html404, 'name', 'robots', 'noindex, follow')
html404 = html404.replace(/\s*<link[^>]+rel=["']canonical["'][^>]*>/i, '').replace(/\s*<noscript>[\s\S]*?<\/noscript>/i, '')
await writeFile(resolve(distRoot, '404.html'), html404, 'utf8')

const urls = [
  { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE_URL}/magaza`, changefreq: 'weekly', priority: '0.9' },
  ...products.map((product) => ({
    loc: `${SITE_URL}/magaza/${product.id}`,
    changefreq: 'monthly',
    priority: product.id === 'ozel-figur' ? '0.8' : '0.7',
  })),
  { loc: blogUrl, changefreq: 'weekly', priority: '0.9', lastmod: blogPosts[0].updated },
  ...blogPosts.map((post) => ({
    loc: `${blogUrl}/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: post.updated,
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>${url.lastmod ? `\n    <lastmod>${url.lastmod}</lastmod>` : ''}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`
await writeFile(resolve(distRoot, 'sitemap.xml'), sitemap, 'utf8')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MicronForge 3D Baskı Rehberi</title>
    <link>${blogUrl}</link>
    <description>Manisa’da SLA reçine 3D baskı, figür, mimari maket ve endüstriyel prototip yazıları.</description>
    <language>tr-TR</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${blogPosts.map((post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${blogUrl}/${escapeXml(post.slug)}</link>
      <guid isPermaLink="true">${blogUrl}/${escapeXml(post.slug)}</guid>
      <pubDate>${new Date(`${post.published}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`).join('\n')}
  </channel>
</rss>
`
await writeFile(resolve(distRoot, 'feed.xml'), rss, 'utf8')

console.log(`Prerendered ${blogPosts.length + 1} blog pages, 404.html, sitemap.xml and feed.xml.`)
