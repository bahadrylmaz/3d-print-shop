import { Link } from 'react-router-dom'
import Bolum from '../temel/Bolum'
import { MetinBaglanti } from '../temel/Buton'
import UrunGorseli from '../temel/UrunGorseli'
import EserEtiketi from '../temel/EserEtiketi'

// Ana sayfa 2. bölüm "Vitrin" (YON §6.2-2, METIN §3.7): asimetrik raf, tam 3 ürün.
// 1280: büyük kart 5 kol (2 satır) + iki küçük kart 3'er kol (ilki 128 px aşağıda) + sağ altta fiyat notu ve bağlantı.
// 375: büyük kart tam genişlik, iki küçük kart yan yana (detay gizli). Props: urunler (en az 3 kayıt beklenir).
function Kart({ urun, buyuk, className }) {
  return (
    <Link
      to={`/magaza/${urun.id}`}
      aria-label={`${urun.name} ayrıntıları`}
      className={`group block text-grafit no-underline ${className}`}
    >
      <UrunGorseli product={urun} sizes={buyuk ? '(min-width: 768px) 40vw, 100vw' : '(min-width: 768px) 24vw, 50vw'} />
      <EserEtiketi
        name={urun.name}
        price={urun.price}
        priceFrom={urun.priceFrom}
        material={urun.material}
        dimensions={urun.dimensions}
        leadTime={urun.leadTime}
        boyut={buyuk ? 'buyuk' : 'kucuk'}
        detayMobildeGizli={!buyuk}
        kartIcinde
      />
    </Link>
  )
}

export default function Vitrin({ urunler }) {
  const [birinci, ikinci, ucuncu] = urunler
  if (!ucuncu) return null

  return (
    <Bolum id="vitrin" baslikId="vitrin-baslik">
      <div className="col-span-full mb-12 md:col-span-5">
        <h2 id="vitrin-baslik" className="m-0 font-serif text-h1 font-[400]">
          Atölyeden hazır parçalar
        </h2>
        <p className="m-0 mt-4 max-w-[62ch] text-grafit-2">
          Bastığımız dekor ve koleksiyon parçalarından seçin. Her birini farklı ölçü, renk ya da reçineyle yeniden
          basabiliriz.
        </p>
      </div>

      <Kart urun={birinci} buyuk className="col-span-full mb-16 md:col-span-5 md:row-span-2 md:row-start-2 md:mb-0" />
      <Kart
        urun={ikinci}
        className="col-span-2 mb-8 md:col-span-3 md:col-start-7 md:row-start-2 md:mt-32 md:mb-0 md:self-start"
      />
      <Kart urun={ucuncu} className="col-span-2 mb-8 md:col-span-3 md:col-start-10 md:row-start-2 md:mb-0 md:self-start" />

      <div className="col-span-full flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-cizgi pt-3 md:col-span-6 md:col-start-7 md:row-start-3 md:mt-16 md:self-end">
        <p className="m-0 text-small text-sis">
          Fiyatlar standart ölçü ve tek renk içindir. Ölçü, adet ve boya fiyatı değiştirir.
        </p>
        <MetinBaglanti to="/magaza">Mağazaya bakın</MetinBaglanti>
      </div>
    </Bolum>
  )
}
