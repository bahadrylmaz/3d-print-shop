import { fmt } from '../../data/products'

// EserEtiketi (imza bileşen, YON §1/§11.6): müze kartı gibi; ad Bodoni italik, fiyat Schibsted, altında malzeme/ölçü/süre.
// Props: name, price, priceFrom, material, dimensions ("40 × 30 × 120 mm" ya da [40,30,120]), leadTime ("3-5 iş günü" ya da 4),
//   boyut 'buyuk' | 'orta' | 'kucuk', detayMobildeGizli (küçük kartta mobilde yalnız ad + fiyat), as (ad öğesi, varsayılan 'p'),
//   kartIcinde (true: üst öğe 'group' sınıflı bağlantıysa hover'da ürün adının altı çizilir; YON §6.3).
// Verisi olmayan satır hiç çizilmez; fiyat yoksa fiyat alanı da çizilmez (uydurma değer yok).
const cumleDuzeni = (s = '') => s.charAt(0) + s.slice(1).toLocaleLowerCase('tr')

const olcuMetni = (d) => (Array.isArray(d) ? `${d.join(' × ')} mm` : d)
const sureMetni = (s) => (typeof s === 'number' ? `${s} iş günü` : s)

const AD_BOYUT = {
  buyuk: 'text-[1.375rem]',
  orta: 'text-[1.375rem]',
  kucuk: 'text-[1.125rem] md:text-[1.25rem]',
}

export default function EserEtiketi({
  name,
  price,
  priceFrom,
  material,
  dimensions,
  leadTime,
  boyut = 'orta',
  detayMobildeGizli = false,
  as: AdEtiketi = 'p',
  kartIcinde = false,
  className = '',
}) {
  // Para birimi "TL": Schibsted Grotesk'in ₺ glifi £ ile karışıyor (INCELEME.md, tipografi)
  const fiyat = price != null ? `${fmt(price)} TL` : priceFrom != null ? `${fmt(priceFrom)} TL'den başlayan` : null
  const satirlar = [
    ['Malzeme', material && cumleDuzeni(material)],
    ['Ölçü', dimensions && olcuMetni(dimensions)],
    ['Üretim', leadTime && sureMetni(leadTime)],
  ].filter(([, deger]) => deger)
  const kucuk = boyut === 'kucuk'

  return (
    <div
      className={`grid gap-x-4 gap-y-1 pt-4 ${kucuk ? 'grid-cols-1 md:grid-cols-[1fr_auto]' : 'grid-cols-[1fr_auto]'} ${className}`}
    >
      <AdEtiketi className={`m-0 font-serif leading-[1.2] font-[400] italic decoration-1 underline-offset-[0.18em] ${AD_BOYUT[boyut]} ${kartIcinde ? 'group-hover:underline' : ''}`}>{name}</AdEtiketi>
      {fiyat && (
        <p className="mf-rakam m-0 self-baseline pt-[0.2em] text-[1rem] font-[500] whitespace-nowrap">{fiyat}</p>
      )}
      {satirlar.length > 0 && (
        <dl
          className={`col-span-full mt-2 mb-0 gap-x-4 gap-y-0.5 text-small ${kucuk ? 'grid-cols-1 md:grid-cols-[auto_1fr]' : 'grid-cols-[auto_1fr]'} ${detayMobildeGizli ? 'hidden md:grid' : 'grid'}`}
        >
          {/* Küçük kartta mobil sütun ~160 px: "Malzeme | Şeffaf / reçine" iki satıra kırılıyordu. Mobilde başlık yalnız ekran okuyucuda. */}
          {satirlar.map(([ad, deger]) => (
            <div key={ad} className="contents">
              <dt className={`text-sis ${kucuk ? 'max-md:sr-only' : ''}`}>{ad}</dt>
              <dd className="m-0 text-grafit-2">{deger}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
