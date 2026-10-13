import usePageSeo from '../hooks/usePageSeo'
import SayfaIskeleti from '../components/yerlesim/SayfaIskeleti'
import Magaza from '../components/magaza/Magaza'

// /magaza: başlık ve açıklama METIN §6. Kanonik adres filtreden bağımsız olarak /magaza.
export default function ShopPage() {
  usePageSeo({
    title: 'Mağaza | Reçine Figür ve Dekor Parçaları · MicronForge',
    description:
      "Atölyede basılmış reçine dekor ve koleksiyon parçaları. Ölçü, malzeme ve üretim süresi her üründe yazılı. Sipariş WhatsApp'tan, Manisa ve İzmir'e elden.",
    path: '/magaza',
  })

  return (
    <SayfaIskeleti>
      <Magaza />
    </SayfaIskeleti>
  )
}
