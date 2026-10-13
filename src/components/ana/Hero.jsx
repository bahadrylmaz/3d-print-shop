import { useEffect, useState } from 'react'
import { Kapsayici, Izgara } from '../temel/Kapsayici'
import { Buton, MetinBaglanti } from '../temel/Buton'
import UrunGorseli from '../temel/UrunGorseli'
import EserEtiketi from '../temel/EserEtiketi'

// Ana sayfa 1. bölüm (YON §6.2-1): solda 7 kolon başlık + giriş + eylemler (alta hizalı), sağda 5 kolon öne çıkan ürün + eser etiketi.
// Altında teknik satır (METIN §3.1). Görsel yalnız ilk yüklemede "katman katman" açılır.
// Props: urun (products.js kaydı; yoksa yalnız yer tutucu çizilir).
let acilisOynadi = false

const TEKNIK = ['16K MSLA', '25 mikron katman', '218 × 123 × 250 mm baskı alanı', "Manisa ve İzmir'de elden teslim"]

export default function Hero({ urun }) {
  // StrictMode iki kez render etse de değer aynı kalır; bayrak yalnız ayrılırken kapanır.
  const [katmanKatman] = useState(() => !acilisOynadi)
  useEffect(
    () => () => {
      acilisOynadi = true
    },
    []
  )

  return (
    <section id="hero" aria-labelledby="hero-baslik" className="pt-[clamp(2rem,1rem+4vw,4.5rem)]">
      <Kapsayici>
        <Izgara>
          <div className="col-span-full self-end pb-8 md:col-span-7 md:pb-24">
            <p className="m-0 mb-6 text-small text-grafit-2">Manisa · SLA reçine 3D baskı atölyesi</p>
            <h1 id="hero-baslik" className="m-0 max-w-[12ch] font-serif text-display font-[400]">
              Reçineden ince işler.
            </h1>
            <p className="m-0 mt-6 max-w-[38ch] text-lead text-grafit-2">
              Kişiye özel figür, mimari maket, sanayi prototipi ve dekor parçalarını Saturn 4 Ultra 16K yazıcıda, 25
              mikron katmanla basıyoruz. Her parça yıkanır, kürlenir ve paketlenmeden önce tek tek kontrol edilir.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Buton href="#order">Fotoğraf gönderin, teklif alın</Buton>
              <MetinBaglanti to="/magaza">Mağazaya bakın</MetinBaglanti>
            </div>
          </div>

          <figure className="col-span-full m-0 mt-4 md:col-span-5 md:col-start-8 md:mt-0">
            <UrunGorseli
              product={urun}
              oran="urun"
              oranMd="dikey"
              oncelikli
              katmanKatman={katmanKatman}
              sizes="(min-width: 768px) 38vw, 100vw"
            />
            {urun && (
              <figcaption>
                <EserEtiketi
                  name={urun.name}
                  price={urun.price}
                  priceFrom={urun.priceFrom}
                  material={urun.material}
                  dimensions={urun.dimensions}
                  leadTime={urun.leadTime}
                />
              </figcaption>
            )}
          </figure>
        </Izgara>

        <ul className="m-0 mt-(--mf-bolum-kucuk) grid list-none grid-cols-2 border-t border-cizgi p-0 md:grid-cols-4">
          {TEKNIK.map((t, i) => (
            <li
              key={t}
              className={`py-5 pr-4 text-small text-grafit-2 ${i % 2 ? 'border-l border-cizgi pl-4' : ''} ${
                i > 1 ? 'border-t border-cizgi md:border-t-0' : ''
              } ${i === 2 ? 'md:border-l md:pl-4' : ''}`}
            >
              {t}
            </li>
          ))}
        </ul>
      </Kapsayici>
    </section>
  )
}
