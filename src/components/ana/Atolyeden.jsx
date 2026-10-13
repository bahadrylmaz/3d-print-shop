import { Kapsayici, Izgara } from '../temel/Kapsayici'
import UrunGorseli from '../temel/UrunGorseli'

// Ana sayfa 4. bölüm "Atölyeden" (YON §6.2-4, METIN §3.5): kenardan kenara 16:9 atölye görseli,
// altında başlık + giriş ve üç reçinenin sekmesiz tanım listesi (3 sütun). Çapa: #materials (+ her reçinenin id'si).
// Atölye fotoğrafı gelene kadar yer tutucu; gelince UrunGorseli'ne src verin.
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
    // DOĞRULA: renk sayısı ("sekizden fazla renk", METIN.md §3.5)
    metin:
      'Renk reçinenin içinde olduğu için parça boyanmadan teslim edilebilir. Şeffaf, gri, siyah, beyaz ve sekizden fazla renk seçeneği var.',
    katman: '25-50 mikron',
    uygun: 'dekor, koleksiyon, hediye',
  },
]

export default function Atolyeden() {
  return (
    <section id="materials" aria-labelledby="malzeme-baslik" className="border-t border-cizgi pb-(--mf-bolum)">
      <UrunGorseli oran="genis" />
      <Kapsayici>
        <Izgara className="pt-(--mf-bolum-kucuk)">
          <div className="col-span-full mb-12 md:col-span-6">
            <h2 id="malzeme-baslik" className="m-0 font-serif text-h2 font-[400]">
              Üç reçine, üç iş
            </h2>
            <p className="m-0 mt-4 max-w-[48ch] text-grafit-2">
              Reçineyi parçanın ne yapacağına göre seçiyoruz. Emin değilseniz teklifte biz öneririz.
            </p>
          </div>

          <ul className="col-span-full m-0 grid list-none grid-cols-1 gap-x-(--mf-oluk) p-0 md:grid-cols-12">
            {RECINELER.map((r) => (
              <li key={r.id} id={r.id} className="border-t border-cizgi pt-6 pb-10 md:col-span-4 md:pb-0">
                <h3 className="m-0 font-serif text-h3 font-[500]">{r.ad}</h3>
                <p className="m-0 mt-2 font-[500]">{r.kisa}</p>
                <p className="m-0 mt-3 text-grafit-2">{r.metin}</p>
                <dl className="m-0 mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-small">
                  <dt className="text-sis">Katman</dt>
                  <dd className="m-0 text-grafit-2">{r.katman}</dd>
                  <dt className="text-sis">Kürleme</dt>
                  <dd className="m-0 text-grafit-2">UV 405 nm</dd>
                  <dt className="text-sis">Uygun işler</dt>
                  <dd className="m-0 text-grafit-2">{r.uygun}</dd>
                </dl>
              </li>
            ))}
          </ul>
        </Izgara>
      </Kapsayici>
    </section>
  )
}
