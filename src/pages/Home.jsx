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
import Blogdan from '../components/ana/Blogdan'
import { products } from '../data/products'
import { blogPosts } from '../data/blogPosts'

// Ana sayfa: YON §6.2'deki 8 bölüm. Eski çapalar: #hero, #services, #process, #materials, #order, #pricing, #faq.
// Hero: öne çıkan ilk ürün. Vitrin: tam 3 ürün (önce öne çıkanlar), hero ürünü tekrar edilmez.
const heroUrunu = products.find((p) => p.featured) ?? products[0]
const vitrinUrunleri = [...products]
  .filter((p) => p.id !== heroUrunu?.id)
  .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
  .slice(0, 3)
const sonYazilar = [...blogPosts].sort((a, b) => b.published.localeCompare(a.published)).slice(0, 2)

export default function Home() {
  usePageSeo({
    title: 'SLA Reçine 3D Baskı Manisa ve İzmir | MicronForge',
    description:
      "Manisa'da SLA reçine 3D baskı atölyesi: kişiye özel figür, mimari maket, sanayi prototipi, dekor. Fotoğraf gönderin, fiyat ve süreyi yazalım.",
    path: '/',
  })

  return (
    <SayfaIskeleti>
      <Hero urun={heroUrunu} />
      <Vitrin urunler={vitrinUrunleri} />
      <OzelUretim />
      <Surec />
      <Atolyeden />
      <TeklifFormu />
      <Ilkeler />
      <Sorular />
      <Blogdan yazilar={sonYazilar} />
    </SayfaIskeleti>
  )
}
