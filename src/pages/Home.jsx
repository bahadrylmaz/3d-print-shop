import usePageSeo from '../hooks/usePageSeo'
import SayfaIskeleti from '../components/yerlesim/SayfaIskeleti'
import Hero from '../components/ana/Hero'
import Vitrin from '../components/ana/Vitrin'
import OzelUretim from '../components/ana/OzelUretim'
import Surec from '../components/ana/Surec'
import Atolyeden from '../components/ana/Atolyeden'
import TeklifFormu from '../components/ana/TeklifFormu'
import Ilkeler from '../components/ana/Ilkeler'
import Sorular from '../components/ana/Sorular'
import Instagram from '../components/ana/Instagram'
import Blogdan from '../components/ana/Blogdan'
import { products, getProduct } from '../data/products'
import { blogPosts } from '../data/blogPosts'

// Ana sayfa: Hero (gök + yelpaze) → Vitrin → Atölyede basılanlar → Süreç → Malzemeler → Teklif formu → Kurallar → SSS → Instagram → Rehber.
// Eski çapalar korunur: #hero, #services, #process, #materials, #order, #pricing, #faq.
// Hero yelpazesi soldan sağa beş ürün (ortadaki en büyük); vitrin sekiz ürün. Kataloğun sırası değişse de seçim sabit kalsın diye id ile.
const sec = (idler) => idler.map(getProduct).filter(Boolean)
const heroKartlari = sec(['hulk', 'batman', 'venom', 'wolverine', 'kaptan-amerika'])
const vitrinUrunleri = sec([
  'venom',
  'batman',
  'black-panther',
  'chibi-set',
  'wolverine',
  'darth-vader',
  'ejderha',
  'keloglan',
])
const sonYazilar = [...blogPosts].sort((a, b) => b.published.localeCompare(a.published)).slice(0, 2)

export default function Home() {
  usePageSeo({
    title: 'SLA Reçine 3D Baskı Manisa ve İzmir | MicronForge',
    description:
      "Manisa'da SLA reçine 3D baskı atölyesi: elde boyanmış koleksiyon figürü, kişiye özel figür, mimari maket, sanayi prototipi. Fotoğraf gönderin, fiyatı yazalım.",
    path: '/',
  })

  return (
    <SayfaIskeleti>
      <Hero kartlar={heroKartlari} />
      <Vitrin urunler={vitrinUrunleri} toplam={products.length} />
      <OzelUretim />
      <Surec />
      <Atolyeden />
      <TeklifFormu />
      <Ilkeler />
      <Sorular />
      <Instagram />
      <Blogdan yazilar={sonYazilar} />
    </SayfaIskeleti>
  )
}
