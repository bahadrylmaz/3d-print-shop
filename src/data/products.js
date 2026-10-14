// Mağaza ürün kataloğu — hem liste (Shop) hem ürün detay sayfası bunu kullanır.
// Fiyatlar standart boyut/tek renk içindir; boyut, adet ve boyama ile değişir.
import { waBaglanti } from './iletisim'

export const SITE = 'https://micronforge.shop'

export const products = [
  {
    id: 'buz-ejderha',
    name: 'Buz Ejderhası',
    desc: 'Dev boyut, dikenli kristal gövde — vitrinlik koleksiyon parçası.',
    category: 'dekor',
    categoryLabel: 'Kristal Sanat',
    material: 'Şeffaf Reçine',
    price: 1480,
    featured: true,
    photos: ['/shop/urun-02.jpg'],
  },
  {
    id: 'anka-kusu',
    name: 'Kristal Anka Kuşu',
    desc: 'Açık kanatlı, ince tüy detaylı büyük dekoratif heykel.',
    category: 'dekor',
    categoryLabel: 'Kristal Sanat',
    material: 'Şeffaf Reçine',
    price: 1320,
    featured: true,
    photos: ['/shop/urun-03.jpg'],
  },
  {
    id: 'kurt',
    name: 'Low-Poly Kurt',
    desc: 'Geometrik uluyan kurt, buzul görünümlü şeffaf reçine.',
    category: 'dekor',
    categoryLabel: 'Dekoratif',
    material: 'Şeffaf Reçine',
    price: 240,
    photos: ['/shop/urun-01.jpg', '/shop/urun-10.jpg'],
  },
  {
    id: 'uluyan-kurt',
    name: 'Uluyan Kurt',
    desc: 'Kaya üzerinde uluyan kurt, zümrüt yeşili şeffaf reçine.',
    category: 'dekor',
    categoryLabel: 'Dekoratif',
    material: 'Renkli Reçine',
    price: 240,
    photos: ['/shop/urun-31.jpg', '/shop/urun-32.jpg', '/shop/urun-33.jpg'],
  },
  {
    id: 'fil',
    name: 'Süslü Fil',
    desc: 'Motif işlemeli süslü fil heykeli, zümrüt yeşili şeffaf reçine.',
    category: 'dekor',
    categoryLabel: 'Dekoratif',
    material: 'Renkli Reçine',
    price: 210,
    photos: ['/shop/urun-28.jpg', '/shop/urun-27.jpg', '/shop/urun-34.jpg'],
  },
  {
    id: 'baykus',
    name: 'Süslü Baykuş',
    desc: 'İnce desen işlemeli baykuş, zümrüt yeşili şeffaf reçine.',
    category: 'dekor',
    categoryLabel: 'Dekoratif',
    material: 'Renkli Reçine',
    price: 200,
    photos: ['/shop/urun-26.jpg', '/shop/urun-37.jpg'],
  },
  {
    id: 'kaplumbaga',
    name: 'Kristal Kaplumbağa',
    desc: 'Sırtı kristal küme kaplumbağa — şeffaf reçine.',
    category: 'dekor',
    categoryLabel: 'Kristal Sanat',
    material: 'Şeffaf Reçine',
    price: 190,
    photos: ['/shop/urun-35.jpg', '/shop/urun-36.jpg'],
  },
  {
    id: 'kirpi',
    name: 'Kirpi',
    desc: 'Sevimli kirpi minyatürü, zümrüt yeşili şeffaf reçine.',
    category: 'dekor',
    categoryLabel: 'Dekoratif',
    material: 'Renkli Reçine',
    price: 120,
    photos: ['/shop/urun-25.jpg'],
  },
  {
    id: 'kurukafa',
    name: 'Anatomik Kurukafa',
    desc: 'Gerçek oranlı kafatası, masaüstü dekoru — şeffaf reçine.',
    category: 'dekor',
    categoryLabel: 'Dekoratif',
    material: 'Şeffaf Reçine',
    price: 300,
    photos: ['/shop/urun-05.jpg', '/shop/urun-04.jpg'],
  },
  {
    id: 'boga',
    name: 'Boğa Heykeli',
    desc: 'Wall Street tarzı saldıran boğa, metalik bronz kaplama.',
    category: 'dekor',
    categoryLabel: 'Dekoratif',
    material: 'Metalik Boyalı',
    price: 540,
    photos: ['/shop/urun-15.jpg'],
  },
  {
    id: 'atlas',
    name: 'Atlas Heykeli',
    desc: 'Dünyayı taşıyan Atlas — mitolojik, antik patine dekor.',
    category: 'dekor',
    categoryLabel: 'Dekoratif',
    material: 'Boyalı Reçine',
    price: 580,
    photos: ['/shop/urun-21.jpg', '/shop/urun-23.jpg'],
  },
  {
    id: 'ozel-figur',
    name: 'Kişiye Özel Figür / Büst',
    desc: 'Fotoğrafından el boyamalı 3D portre büst veya figür. Fiyat modele göre değişir.',
    category: 'ozel',
    categoryLabel: 'Kişiye Özel',
    material: 'Boyalı Reçine',
    price: null,
    priceFrom: 240,
    photos: ['/shop/urun-38.jpg', '/shop/urun-40.jpg', '/shop/urun-39.jpg', '/shop/urun-45.jpg', '/shop/urun-08.jpg'],
  },
]

// Mağaza filtreleri (METIN §4.1). id = ürünün category alanı; kategori = paylaşılabilir adres (/magaza?kategori=dekor).
// Ürünü olmayan kategori listede gösterilmez.
export const filters = [
  { id: 'all', label: 'Tümü' },
  { id: 'dekor', label: 'Dekor', kategori: 'dekor' },
  { id: 'figur', label: 'Koleksiyon', kategori: 'koleksiyon' },
  { id: 'ozel', label: 'Kişiye özel', kategori: 'kisiye-ozel' },
  { id: 'set', label: 'Setler', kategori: 'setler' },
]

export const getProduct = (slug) => products.find((p) => p.id === slug)

export const fmt = (n) => new Intl.NumberFormat('tr-TR').format(n)

// METIN §4.2: ürün sayfasından giden önceden doldurulmuş WhatsApp sipariş mesajı
export const waOrder = (name) =>
  waBaglanti(`Merhaba, "${name}" için sipariş vermek istiyorum. Fiyat ve teslim süresini öğrenebilir miyim?`)

// Google zengin sonuçları için Product yapılandırılmış verisi.
export const productJsonLd = (p) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: p.name,
  ...(p.photos?.length ? { image: p.photos.map((ph) => `${SITE}${ph}`) } : {}),
  description: p.desc,
  category: p.categoryLabel,
  brand: { '@type': 'Brand', name: 'MicronForge' },
  offers: {
    '@type': 'Offer',
    price: p.price ?? p.priceFrom,
    priceCurrency: 'TRY',
    availability: 'https://schema.org/InStock',
    url: `${SITE}/magaza/${p.id}`,
    seller: { '@type': 'Organization', name: 'MicronForge' },
  },
})
