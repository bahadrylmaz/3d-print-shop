import Bolum from '../temel/Bolum'

// Ana sayfa 4. bölüm "Süreç": gerçek bir sıra olduğu için numaralı dört kart, açık panel içinde.
// 1280: yatay 4 kart. 768: 2 × 2. 375: alt alta. Çapa: #process.
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
    sure: '30 dakika', // DOĞRULA: 30 dakikada dönüş süresi
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
    <Bolum id="process" baslikId="surec-baslik" panel="tas" bosluk="dar" izgara={false}>
      <div className="mx-auto mb-8 max-w-[44rem] text-center md:mb-12">
        <h2 id="surec-baslik" className="m-0 text-h2 font-[700]">
          Fotoğraftan <em className="mf-italik">teslime</em>
        </h2>
        <p className="m-0 mx-auto mt-5 max-w-[48ch] text-grafit-2">
          STL dosyanız olmak zorunda değil. Fotoğraf, çizim ya da ölçülü bir taslak başlamak için yeter.
        </p>
      </div>

      <ol className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        {ADIMLAR.map((a, i) => (
          <li key={a.baslik} className="flex flex-col rounded-kart bg-kirec p-6 shadow-kart md:p-7">
            <span
              aria-hidden="true"
              className="mf-rakam grid h-10 w-10 place-items-center rounded-hap bg-recine-acik text-[1.0625rem] font-[700] text-recine-koyu"
            >
              {i + 1}
            </span>
            <h3 className="m-0 mt-5 text-h3 font-[700]">{a.baslik}</h3>
            <p className="m-0 mt-3 text-grafit-2">{a.metin}</p>
            <p className="m-0 mt-auto pt-5 text-small font-[600] text-grafit">{a.sure}</p>
          </li>
        ))}
      </ol>

      {/* DOĞRULA: toplam yaklaşık 48 saat */}
      <p className="m-0 mx-auto mt-8 max-w-[62ch] text-center text-grafit-2 md:mt-10">
        Dosyası hazır, onaylanmış bir işte toplam süre yaklaşık 48 saat. Modelleme ya da boyama gereken işlerde süreyi
        teklifte ayrıca yazarız.
      </p>
    </Bolum>
  )
}
