import Bolum from '../temel/Bolum'
import UrunGorseli from '../temel/UrunGorseli'

// Ana sayfa 5. bölüm "Malzemeler": solda şeffaf reçine ejderha fotoğrafı (5 kol), sağda üç reçinenin kartları (7 kol).
// Çapa: #materials (+ her reçinenin id'si: footer bağlantıları).
const RECINELER = [
  {
    id: 'standart-recine',
    ad: 'Standart reçine',
    kisa: 'Figür, maket ve hediye için.',
    metin:
      '25 mikron katmanla en ince detayı bu reçinede alıyoruz ve yüzeyi pürüzsüz çıkıyor. Darbeye karşı hassastır, bu yüzden mekanik parçada önermiyoruz.',
    katman: '25 mikron',
    uygun: 'figür, mimari maket, kaide',
  },
  {
    id: 'tough-recine',
    ad: 'Tough reçine (ABS benzeri)',
    kisa: 'Prototip ve montaj parçası için.',
    metin:
      'Darbeye dayanıklıdır ve kolay işlenir. Montaj parçası, sunum numunesi, elektronik kapak ve kalıp öncesi kontrol modelinde bunu kullanıyoruz.',
    katman: '50 mikron',
    uygun: 'prototip, mockup, fonksiyonel test',
  },
  {
    id: 'renkli-seffaf-recine',
    ad: 'Renkli ve şeffaf reçine',
    kisa: 'Boyasız teslim edilecek dekor için.',
    // DOĞRULA: renk sayısı ("sekizden fazla renk")
    metin:
      'Renk reçinenin içinde olduğu için parça boyanmadan teslim edilebilir. Şeffaf, gri, siyah, beyaz ve sekizden fazla renk seçeneği var.',
    katman: '25-50 mikron',
    uygun: 'dekor, koleksiyon, hediye',
  },
]

export default function Atolyeden() {
  return (
    <Bolum id="materials" baslikId="malzeme-baslik" icClassName="gap-y-8">
      <div className="col-span-full text-center md:mb-4">
        <h2 id="malzeme-baslik" className="m-0 text-h2 font-[700]">
          Üç reçine, <em className="mf-italik">üç iş</em>
        </h2>
        <p className="m-0 mx-auto mt-5 max-w-[48ch] text-grafit-2">
          Reçineyi parçanın ne yapacağına göre seçiyoruz. Emin değilseniz teklifte biz öneririz.
        </p>
      </div>

      <figure className="relative col-span-full m-0 md:col-span-5">
        <UrunGorseli
          src="/shop/ejderha-1.jpg"
          alt="Şeffaf reçineden basılmış, kanatları açık ejderha figürü"
          oran="dikey"
          kose="panel"
          sizes="(min-width: 768px) 40vw, 100vw"
          className="md:h-full md:aspect-auto"
        />
        <figcaption className="mf-cam absolute bottom-4 left-4 inline-flex min-h-9 items-center rounded-hap px-4 text-small font-[600] text-grafit">
          Şeffaf reçine, boyasız
        </figcaption>
      </figure>

      <ul className="col-span-full m-0 grid list-none gap-3 p-0 md:col-span-7 md:gap-4">
        {RECINELER.map((r) => (
          <li key={r.id} id={r.id} className="rounded-panel bg-tas p-6 md:p-8">
            <h3 className="m-0 text-h3 font-[700]">{r.ad}</h3>
            <p className="m-0 mt-2 font-[600]">{r.kisa}</p>
            <p className="m-0 mt-2 max-w-[60ch] text-grafit-2">{r.metin}</p>
            <dl className="m-0 mt-5 flex flex-wrap gap-2 text-small">
              <div className="inline-flex min-h-8 items-center gap-1.5 rounded-hap bg-kirec px-3">
                <dt className="text-sis">Katman</dt>
                <dd className="m-0 font-[600] text-grafit">{r.katman}</dd>
              </div>
              <div className="inline-flex min-h-8 items-center gap-1.5 rounded-hap bg-kirec px-3 max-md:hidden">
                <dt className="text-sis">Kürleme</dt>
                <dd className="m-0 font-[600] text-grafit">UV 405 nm</dd>
              </div>
              <div className="inline-flex min-h-8 items-center gap-1.5 rounded-hap bg-kirec px-3 py-1">
                <dt className="text-sis">Uygun</dt>
                <dd className="m-0 font-[600] text-grafit">{r.uygun}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </Bolum>
  )
}
