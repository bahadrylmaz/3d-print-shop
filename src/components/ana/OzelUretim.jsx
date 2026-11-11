import Bolum from '../temel/Bolum'
import { Buton } from '../temel/Buton'
import UrunGorseli from '../temel/UrunGorseli'

// Ana sayfa 3. bölüm "Atölyede basılanlar": dört iş türü, bento düzeninde dört kart.
// 1280: üst sıra fotoğraflı geniş kart (7 kol) + vurgu zeminli kart (5 kol); alt sıra 5 + 7 kol. 375: alt alta.
// Çapalar: #ozel-uretim (bölüm), #services (eski bağlantılar), her kartın kendi id'si (footer bağlantıları).
const ISLER = [
  {
    id: 'koleksiyon-dekor',
    baslik: 'Vitrin için parçalar',
    metin:
      'Elde boyanmış karakter figürleri, chibi setler ve şeffaf reçineden dekor parçaları. 32 mm ve 75 mm masa oyunu figürü, kaide ve diorama parçası da basıyoruz. Renkli reçinede parça boyanmadan teslim edilebilir.',
    alt: 'Boyalı, şeffaf ve renkli reçine',
    foto: { src: '/shop/chibi-set-genis-1.jpg', alt: 'Beyaz masada yan yana duran altı chibi figür, çimenli kaideleriyle' },
    yer: 'md:col-span-7',
    zemin: 'bg-kirec shadow-kart',
  },
  {
    id: 'kisiye-ozel-figur',
    baslik: 'Fotoğraftan figür',
    metin:
      'Bir fotoğraftan yola çıkıp modeli biz hazırlıyoruz. Baskıdan önce dijital ön izlemeyi size gönderiyoruz; yüz, saç, poz ve kaide onayınızdan sonra baskıya geçiyoruz. Çift figürü, evcil hayvan minyatürü, isimli figür ya da yayıncı masa standı olabilir.',
    alt: 'Boyasız, astarlı ya da boyalı teslim (boya ayrıca konuşulur)',
    adimlar: ['Fotoğraf', 'Dijital ön izleme', 'Onayınız', 'Baskı'],
    yer: 'md:col-span-5',
    zemin: 'bg-recine-acik',
  },
  {
    id: 'mimari-maket',
    baslik: 'Ölçekli maket parçaları',
    metin:
      "1/100, 1/200 ve 1/500 ölçekte insan, ağaç, mobilya, araç, sokak elemanı ve cephe detayı. Manisa Celal Bayar Üniversitesi ve İzmir'deki mimarlık öğrencilerine jüri dönemlerinde 24-48 saatte ekspres baskı yapıyoruz.",
    alt: '1/100 · 1/200 · 1/500',
    yer: 'md:col-span-5',
    zemin: 'bg-tas',
  },
  {
    id: 'sanayi-prototipi',
    baslik: 'Kalıptan önce numune',
    metin:
      "Manisa OSB'deki üreticiler için elektronik kutu ve kapak, sunum modeli ve kalıp öncesi kontrol numunesi. Darbeye dayanıklı Tough (ABS benzeri) reçine kullanıyoruz. İlk numune onaylandıktan sonra adet fiyatını ayrıca çıkarıyoruz. Dosyalarınızı izniniz olmadan kimseyle paylaşmıyoruz.",
    alt: 'Otomotiv yan sanayi · Beyaz eşya · Elektronik',
    yer: 'md:col-span-7',
    zemin: 'bg-tas',
  },
]

export default function OzelUretim() {
  return (
    <Bolum ekCapalar={['services']} id="ozel-uretim" baslikId="ozel-uretim-baslik" icClassName="gap-y-3 md:gap-y-4">
      <div className="col-span-full mb-6 text-center md:mb-10">
        <h2 id="ozel-uretim-baslik" className="m-0 text-h2 font-[700]">
          Atölyede <em className="mf-italik">basılanlar</em>
        </h2>
        <p className="m-0 mx-auto mt-5 max-w-[44ch] text-grafit-2">
          Dört tür iş yapıyoruz. Hepsi aynı baskı ve kontrol sürecinden geçer.
        </p>
      </div>

      {ISLER.map((is) => (
        <article
          key={is.id}
          id={is.id}
          className={`col-span-full flex flex-col overflow-hidden rounded-panel ${is.zemin} ${is.yer}`}
        >
          {is.foto && (
            <div className="p-2 pb-0">
              <UrunGorseli
                src={is.foto.src}
                alt={is.foto.alt}
                oran="yatay"
                oranMd="genis"
                kose="yok"
                sizes="(min-width: 768px) 56vw, 100vw"
                className="rounded-[calc(var(--mf-r-panel)-0.5rem)]"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col p-6 md:p-9">
            <h3 className="m-0 text-h3 font-[700]">{is.baslik}</h3>
            <p className="m-0 mt-3 max-w-[58ch] text-grafit-2">{is.metin}</p>
            {is.adimlar && (
              <ol className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
                {is.adimlar.map((adim, i) => (
                  <li
                    key={adim}
                    className="inline-flex min-h-9 items-center gap-2 rounded-hap bg-kirec py-1 pr-4 pl-1.5 text-small font-[600] text-grafit"
                  >
                    <span className="mf-rakam grid h-6 w-6 place-items-center rounded-hap bg-recine text-[0.75rem] text-kirec" aria-hidden="true">
                      {i + 1}
                    </span>
                    {adim}
                  </li>
                ))}
              </ol>
            )}
            <p className="m-0 mt-auto pt-5 text-small text-sis">{is.alt}</p>
          </div>
        </article>
      ))}

      <div className="col-span-full mt-6 flex flex-col items-center gap-4 text-center md:mt-10">
        <p className="m-0 max-w-[52ch] text-grafit-2">
          Listede olmayan bir iş mi? Fotoğrafını gönderin, basılıp basılamayacağını söyleyelim.
        </p>
        <Buton href="#order" tur="cerceve">
          Bu iş için teklif isteyin
        </Buton>
      </div>
    </Bolum>
  )
}
