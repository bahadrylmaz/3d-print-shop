import Bolum from '../temel/Bolum'

// Ana sayfa 3. bölümün devamı "Süreç" (YON §6.2-3 alt, METIN §3.3): gerçek bir sıra olduğu için numaralı.
// 1280: yatay 4 sütun (her biri 3 kol), numara Bodoni 44 px. 375: dikey liste. Çapa: #process.
const ADIMLAR = [
  {
    baslik: 'Gönderin',
    metin:
      'Fotoğrafı, çizimi ya da STL, OBJ, 3MF dosyasını WhatsApp\'tan ya da bu sayfadaki formdan gönderin. Ölçüyü, adedi ve parçanın nerede kullanılacağını da yazın.',
    sure: '2 dakika',
  },
  {
    baslik: 'Fiyat ve onay',
    metin:
      'Çalışma saatlerinde yaklaşık 30 dakika içinde tahmini fiyat, süre ve reçine önerisiyle döneriz. Model bizden çıkacaksa ön izlemeyi gönderir, onayınızı bekleriz.',
    sure: '30 dakika', // DOĞRULA: 30 dakikada dönüş süresi (METIN.md §3.3)
  },
  {
    baslik: 'Baskı',
    metin:
      'Saturn 4 Ultra 16K yazıcıda 25 mikron katmanla basılır. IPA ile yıkanır, 405 nm UV ile kürlenir, destekler elde temizlenir.',
    sure: '6-24 saat',
  },
  {
    baslik: 'Teslim',
    metin:
      'Manisa ve İzmir\'de elden teslim ederiz. Türkiye\'nin geri kalanına parçanın kırılganlığına göre paketleyip kargolarız.',
    sure: '1-2 gün',
  },
]

export default function Surec() {
  return (
    <Bolum id="process" baslikId="surec-baslik" bosluk="kucuk">
      <div className="col-span-full mb-12 md:col-span-6">
        <h2 id="surec-baslik" className="m-0 font-serif text-h2 font-[400]">
          Fotoğraftan teslime
        </h2>
        <p className="m-0 mt-4 max-w-[48ch] text-grafit-2">
          STL dosyanız olmak zorunda değil. Fotoğraf, çizim ya da ölçülü bir taslak başlamak için yeter.
        </p>
      </div>

      <ol className="col-span-full m-0 grid list-none grid-cols-1 gap-x-(--mf-oluk) p-0 md:grid-cols-12">
        {ADIMLAR.map((a, i) => (
          <li key={a.baslik} className="border-t border-cizgi pt-5 pb-10 md:col-span-3 md:pb-0">
            <span aria-hidden="true" className="mf-rakam block font-serif text-[2.75rem] leading-none font-[400]">
              {i + 1}
            </span>
            <h3 className="m-0 mt-5 font-serif text-h3 font-[500]">{a.baslik}</h3>
            <p className="m-0 mt-3 text-grafit-2">{a.metin}</p>
            <p className="m-0 mt-3 text-small text-sis">{a.sure}</p>
          </li>
        ))}
      </ol>

      {/* DOĞRULA: toplam yaklaşık 48 saat (METIN.md §3.3 bölüm altı) */}
      <p className="col-span-full m-0 mt-12 max-w-[62ch] text-grafit-2 md:col-span-8">
        Dosyası hazır, onaylanmış bir işte toplam süre yaklaşık 48 saat. Modelleme gereken işlerde süreyi teklifte
        ayrıca yazarız.
      </p>
    </Bolum>
  )
}
