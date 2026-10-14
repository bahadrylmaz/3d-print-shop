import Bolum from '../temel/Bolum'
import { MetinBaglanti } from '../temel/Buton'

// Ana sayfa 3. bölüm "Özel üretim" (YON §6.2-3, METIN §3.2): dört iş türü kart değil liste.
// 1280: H2 sol 4 kol; her satır Bodoni h3 (4 kol) + açıklama (4 kol), üstte 1 px çizgi. 375: h3 üstte, açıklama altta.
// Çapalar: #ozel-uretim (bölüm), #services (eski bağlantılar), her satırın kendi id'si (footer bağlantıları).
const ISLER = [
  {
    id: 'koleksiyon-dekor',
    baslik: 'Vitrin için parçalar',
    metin:
      'Şeffaf ve renkli reçineden dekor heykelleri ve masaüstü objeleri. 32 mm ve 75 mm masa oyunu figürleri, kaide ve diorama parçaları. Renkli reçinede parça boyanmadan teslim edilebilir.',
    alt: 'Şeffaf, renkli ve standart reçine',
  },
  {
    id: 'kisiye-ozel-figur',
    baslik: 'Fotoğraftan figür',
    metin:
      'Bir fotoğraftan yola çıkıp modeli biz hazırlıyoruz. Baskıdan önce dijital ön izlemeyi size gönderiyoruz; yüz, saç, poz ve kaide onayınızdan sonra baskıya geçiyoruz. Çift figürü, evcil hayvan minyatürü, isimli figür ya da yayıncı masa standı olabilir.',
    alt: 'Boyasız, astarlı ya da boyalı teslim (boya ayrıca konuşulur)',
  },
  {
    id: 'mimari-maket',
    baslik: 'Ölçekli maket parçaları',
    metin:
      "1/100, 1/200 ve 1/500 ölçekte insan, ağaç, mobilya, araç, sokak elemanı ve cephe detayı. Manisa Celal Bayar Üniversitesi ve İzmir'deki mimarlık öğrencilerine jüri dönemlerinde 24-48 saatte ekspres baskı yapıyoruz.",
    alt: '1/100 · 1/200 · 1/500',
  },
  {
    id: 'sanayi-prototipi',
    baslik: 'Kalıptan önce numune',
    metin:
      "Manisa OSB'deki üreticiler için elektronik kutu ve kapak, sunum modeli ve kalıp öncesi kontrol numunesi. Darbeye dayanıklı Tough (ABS benzeri) reçine kullanıyoruz. İlk numune onaylandıktan sonra adet fiyatını ayrıca çıkarıyoruz. Dosyalarınızı izniniz olmadan kimseyle paylaşmıyoruz.",
    alt: 'Otomotiv yan sanayi · Beyaz eşya · Elektronik',
  },
]

export default function OzelUretim() {
  return (
    <Bolum ekCapalar={['services']} id="ozel-uretim" baslikId="ozel-uretim-baslik">
      <div className="col-span-full mb-8 md:col-span-4 md:mb-0">
        <h2 id="ozel-uretim-baslik" className="m-0 font-serif text-h2 font-[400]">
          Atölyede basılanlar
        </h2>
        <p className="m-0 mt-4 max-w-[34ch] text-grafit-2">
          Dört tür iş yapıyoruz. Hepsi aynı baskı ve kontrol sürecinden geçer.
        </p>
      </div>

      <ul className="col-span-full m-0 list-none p-0 md:col-span-8 md:col-start-5">
        {ISLER.map((is) => (
          <li
            key={is.id}
            id={is.id}
            className="grid grid-cols-1 gap-x-(--mf-oluk) gap-y-3 border-t border-cizgi pt-6 pb-8 md:grid-cols-8 md:pb-10"
          >
            <h3 className="m-0 font-serif text-h3 font-[500] md:col-span-4">{is.baslik}</h3>
            <div className="md:col-span-4">
              <p className="m-0 text-grafit-2">{is.metin}</p>
              {/* İkincil künye: bilgisi metinde ya da Malzemeler/SSS bölümünde var; mobilde sayfayı uzatmasın */}
              <p className="m-0 mt-3 hidden text-small text-sis md:block">{is.alt}</p>
            </div>
          </li>
        ))}
        <li className="border-t border-cizgi pt-6">
          <p className="m-0 max-w-[62ch] text-grafit-2">
            Listede olmayan bir iş mi? Fotoğrafını gönderin, basılıp basılamayacağını söyleyelim.
          </p>
          <MetinBaglanti href="#order" className="mt-2">
            Bu iş için teklif isteyin
          </MetinBaglanti>
        </li>
      </ul>
    </Bolum>
  )
}
