// Mağaza ürün kataloğu — hem liste (Mağaza) hem ürün detay sayfası hem ana sayfa bunu kullanır.
// Ürünlerde fiyat gösterilmiyor: fiyat WhatsApp'tan ölçü, adet ve boyaya göre veriliyor.
// Fotoğraflar public/shop altında iki boyda durur: ad.jpg (uzun kenar 1440 px) ve ad-k.jpg (800 px); burada yalnız büyük olan yazılır.
// Yatay çekilmiş fotoğrafların adında "-genis-" geçer (galeri kutunun oranını buna göre seçer).
// Kaynak: yeni-fotolar/ klasöründeki çekimler (repo dışı, .gitignore). Ölçü ve üretim süresi fotoğraflardan okunamadığı
// için yazılmadı; öğrenilince ürüne `dimensions` ve `leadTime` alanı eklenir, ürün sayfası kendiliğinden gösterir.
import { waBaglanti } from './iletisim'

export const SITE = 'https://micronforge.shop'

const BOYALI = { material: 'El boyaması reçine', finish: 'Elde boyalı' }

export const products = [
  {
    id: 'venom',
    name: 'Venom',
    desc: 'Kıvrık dili, sivri dişleri ve göğsündeki beyaz amblemiyle parlak siyah figür. Dişler ve damarlar fırçayla tek tek işlendi.',
    category: 'kahraman',
    categoryLabel: 'Süper kahraman',
    ...BOYALI,
    featured: true,
    photos: ['/shop/venom-1.jpg', '/shop/venom-2.jpg', '/shop/venom-3.jpg'],
  },
  {
    id: 'batman',
    name: 'Batman',
    desc: 'Pelerini açık, kancasını havaya kaldırmış duruş. Gri zırh, siyah pelerin ve sarı kemer elde boyandı.',
    category: 'kahraman',
    categoryLabel: 'Süper kahraman',
    ...BOYALI,
    featured: true,
    photos: ['/shop/batman-1.jpg', '/shop/batman-2.jpg'],
  },
  {
    id: 'black-panther',
    name: 'Black Panther',
    desc: 'Çömelmiş, pençeleri açık duruş. Koyu gövde üzerinde altın rengi kolye ve pençe detayları.',
    category: 'kahraman',
    categoryLabel: 'Süper kahraman',
    ...BOYALI,
    featured: true,
    photos: [
      '/shop/black-panther-1.jpg',
      '/shop/black-panther-2.jpg',
      '/shop/black-panther-3.jpg',
      '/shop/black-panther-4.jpg',
    ],
  },
  {
    id: 'wolverine',
    name: 'Wolverine',
    desc: 'Sarı-mavi kostüm, açık pençelerle saldırı duruşu.',
    category: 'kahraman',
    categoryLabel: 'Süper kahraman',
    ...BOYALI,
    photos: ['/shop/wolverine-1.jpg', '/shop/wolverine-2.jpg', '/shop/wolverine-3.jpg'],
  },
  {
    id: 'hulk',
    name: 'Hulk',
    desc: 'Hamle yapan, yumrukları sıkılı yeşil figür; mor şortlu, siyah kaide üzerinde.',
    category: 'kahraman',
    categoryLabel: 'Süper kahraman',
    ...BOYALI,
    photos: ['/shop/hulk-1.jpg', '/shop/hulk-2.jpg'],
  },
  {
    id: 'kirmizi-hulk',
    name: 'Kırmızı Hulk',
    desc: 'Parlak kırmızı gövde, siyah pantolon. Kas hatları yakından bakınca da net.',
    category: 'kahraman',
    categoryLabel: 'Süper kahraman',
    ...BOYALI,
    photos: ['/shop/kirmizi-hulk-1.jpg', '/shop/kirmizi-hulk-2.jpg'],
  },
  {
    id: 'kaptan-amerika',
    name: 'Kaptan Amerika',
    desc: 'Kalkanı kolunda, savunma duruşunda. Mavi kostüm, kırmızı çizme ve göğüsteki yıldız elde boyandı.',
    category: 'kahraman',
    categoryLabel: 'Süper kahraman',
    ...BOYALI,
    photos: ['/shop/kaptan-amerika-1.jpg', '/shop/kaptan-amerika-2.jpg', '/shop/kaptan-amerika-3.jpg'],
  },
  {
    id: 'superman',
    name: 'Superman',
    desc: 'Kırmızı pelerinli, ayakta duruş. Fotoğraflarda aynı modelin iki baskısı yan yana.',
    category: 'kahraman',
    categoryLabel: 'Süper kahraman',
    ...BOYALI,
    photos: ['/shop/superman-1.jpg', '/shop/superman-2.jpg', '/shop/superman-3.jpg'],
  },
  {
    id: 'darth-vader',
    name: 'Darth Vader',
    desc: 'Pelerini savrulan, ışın kılıcı elinde parlak siyah figür.',
    category: 'film',
    categoryLabel: 'Film ve dizi',
    ...BOYALI,
    photos: ['/shop/darth-vader-1.jpg', '/shop/darth-vader-2.jpg', '/shop/darth-vader-3.jpg'],
  },
  {
    id: 'ninja-kaplumbaga',
    name: 'Ninja Kaplumbağa Leonardo',
    desc: 'Mavi bandanalı, çift kılıçlı Leonardo; kahverengi zırhı ve kayışlarıyla.',
    category: 'film',
    categoryLabel: 'Film ve dizi',
    ...BOYALI,
    photos: ['/shop/ninja-kaplumbaga-1.jpg', '/shop/ninja-kaplumbaga-2.jpg', '/shop/ninja-kaplumbaga-3.jpg'],
  },
  {
    id: 'chibi-set',
    name: 'Stranger Things Chibi Seti',
    desc: 'Büyük başlı, çimenli kaidede oturan karakterler. Her kaidenin önünde karakterin baş harfini taşıyan bir plaka var.',
    category: 'film',
    categoryLabel: 'Film ve dizi',
    ...BOYALI,
    featured: true,
    photos: [
      '/shop/chibi-set-1.jpg',
      '/shop/chibi-set-genis-1.jpg',
      '/shop/chibi-set-2.jpg',
      '/shop/chibi-set-3.jpg',
      '/shop/chibi-set-4.jpg',
      '/shop/chibi-set-5.jpg',
      '/shop/chibi-set-6.jpg',
      '/shop/chibi-set-genis-2.jpg',
      '/shop/chibi-set-genis-3.jpg',
    ],
  },
  {
    id: 'keloglan',
    name: 'Keloğlan İkilisi',
    desc: 'Keloğlan ve yanındaki kız karakter; yeşil kaide üzerinde iki ayrı figür.',
    category: 'masal',
    categoryLabel: 'Masal ve fantastik',
    ...BOYALI,
    photos: ['/shop/keloglan-1.jpg', '/shop/keloglan-2.jpg', '/shop/keloglan-3.jpg', '/shop/keloglan-4.jpg'],
  },
  {
    id: 'ejderha',
    name: 'Şeffaf Ejderha',
    desc: 'Kanatları açık, dikenli ejderha. Duman rengi şeffaf reçineden basıldı, boyanmadı; ışığı içinden geçiriyor.',
    category: 'masal',
    categoryLabel: 'Masal ve fantastik',
    material: 'Şeffaf reçine',
    photos: ['/shop/ejderha-1.jpg', '/shop/ejderha-2.jpg', '/shop/ejderha-3.jpg'],
  },
]

// Mağaza filtreleri. id = ürünün category alanı; kategori = paylaşılabilir adres (/magaza?kategori=super-kahraman).
// Ürünü olmayan kategori listede gösterilmez.
export const filters = [
  { id: 'all', label: 'Tümü' },
  { id: 'kahraman', label: 'Süper kahramanlar', kategori: 'super-kahraman' },
  { id: 'film', label: 'Film ve dizi', kategori: 'film-dizi' },
  { id: 'masal', label: 'Masal ve fantastik', kategori: 'masal-fantastik' },
]

export const getProduct = (slug) => products.find((p) => p.id === slug)

export const fmt = (n) => new Intl.NumberFormat('tr-TR').format(n)

// Ürün sayfasından giden önceden doldurulmuş WhatsApp sipariş mesajı
export const waOrder = (name) =>
  waBaglanti(`Merhaba, "${name}" için sipariş vermek istiyorum. Fiyat ve teslim süresini öğrenebilir miyim?`)

// Product yapılandırılmış verisi (JSON-LD) fiyatlar kaldırıldığında çıkarıldı: Google'ın ürün sonucu
// offers (fiyat), review ya da aggregateRating istiyor; fiyatsız Product Search Console'da hata verir.
// Fiyat geri gelirse git geçmişindeki productJsonLd'yi (offers.price + priceCurrency: 'TRY') geri alın.
