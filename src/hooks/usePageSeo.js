import { useEffect } from 'react'

const SITE = 'https://micronforge.shop'
// index.html'deki varsayılan robots değeri; noindex sayfadan çıkınca geri yazılır.
const ROBOTS_VARSAYILAN = 'index, follow, max-image-preview:large, max-snippet:-1'

const setMeta = (attribute, key, value) => {
  let el = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

const removeMeta = (attribute, key) => {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove()
}

const removeCanonical = () => {
  document.head.querySelector('link[rel="canonical"]')?.remove()
}

const setCanonical = (value) => {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', value)
}

// SPA route'una göre <title>, meta description, canonical ve OG/Twitter etiketlerini günceller.
// Googlebot JS render ettiği için her sayfa kendi başlığı/açıklamasıyla indexlenir.
export default function usePageSeo({
  title,
  description,
  path = '/',
  image = '/og-image.png',
  type = 'website',
  publishedTime,
  modifiedTime,
  noindex = false,
}) {
  useEffect(() => {
    const url = `${SITE}${path}`
    const imageUrl = image.startsWith('http') ? image : `${SITE}${image}`
    if (title) {
      document.title = title
      setMeta('property', 'og:title', title)
      setMeta('name', 'twitter:title', title)
    }
    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }
    // noindex + başka sayfaya kanonik çelişkili sinyaldir (Google): bulunamadı sayfalarında kanonik kaldırılır.
    if (noindex) removeCanonical()
    else setCanonical(url)
    // 404 / bulunamadı durumları: arama motoru dizine eklemesin, bağlantıları izlesin.
    setMeta('name', 'robots', noindex ? 'noindex, follow' : ROBOTS_VARSAYILAN)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:image', imageUrl)
    setMeta('name', 'twitter:image', imageUrl)

    if (publishedTime) setMeta('property', 'article:published_time', publishedTime)
    else removeMeta('property', 'article:published_time')
    if (modifiedTime) setMeta('property', 'article:modified_time', modifiedTime)
    else removeMeta('property', 'article:modified_time')
  }, [title, description, path, image, type, publishedTime, modifiedTime, noindex])
}
