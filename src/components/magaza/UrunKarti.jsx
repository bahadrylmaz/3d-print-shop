import { useState } from 'react'
import { Link } from 'react-router-dom'
import UrunGorseli from '../temel/UrunGorseli'
import EserEtiketi from '../temel/EserEtiketi'

// UrunKarti: mağaza listesi ve "Benzer parçalar" için tek kart (YON §6.3). Kartın tamamı tek bağlantı;
// 3:4 görsel + altında eser etiketi. Rozet, kalp, görsel üstü yazı yok.
// Hover (yalnız hover destekli cihazda, Tailwind 4 hover varyantı): ikinci fotoğraf varsa 140 ms çapraz geçiş, yoksa adın altı çizilir.
// Props: urun (products.js kaydı), baslik (ürün adı öğesi: listede 'h2', bir h2 altındaysa 'h3'), sizes, detayMobildeGizli (mobilde yalnız ad + fiyat), className.
export default function UrunKarti({ urun, baslik = 'h2', sizes = '(min-width: 768px) 30vw, 50vw', detayMobildeGizli = false, className = '' }) {
  const ikinci = urun.photos?.[1]
  const [ikinciHata, setIkinciHata] = useState(false)
  const ikinciVar = Boolean(ikinci) && !ikinciHata

  return (
    <Link
      to={`/magaza/${urun.id}`}
      aria-label={`${urun.name} ayrıntıları`}
      className={`group block text-grafit no-underline ${className}`}
    >
      <div className="relative">
        <UrunGorseli product={urun} sizes={sizes} />
        {ikinciVar && (
          <img
            src={ikinci}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            sizes={sizes}
            onError={() => setIkinciHata(true)}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-(--mf-sure-hizli) ease-mf group-hover:opacity-100"
          />
        )}
      </div>
      <EserEtiketi
        name={urun.name}
        price={urun.price}
        priceFrom={urun.priceFrom}
        material={urun.material}
        dimensions={urun.dimensions}
        leadTime={urun.leadTime}
        boyut="kucuk"
        detayMobildeGizli={detayMobildeGizli}
        as={baslik}
        kartIcinde={!ikinciVar}
      />
    </Link>
  )
}
