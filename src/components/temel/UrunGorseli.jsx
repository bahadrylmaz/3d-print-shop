import { useState } from 'react'

// UrunGorseli: sabit oranlı görsel kutusu (CLS yok). src yoksa ya da yüklenemezse "stüdyo fonu" yer tutucusu çizer.
// Props: src (ya da product verilirse product.photos[0]), alt, product (alt metni ondan üretir), oran 'urun' (3:4) | 'dikey' (4:5) | 'genis' (16:9),
//   oranMd (md üstünde farklı oran, ör. hero), oncelikli (eager + fetchpriority high), katmanKatman (hero açılış animasyonu), sizes, className.
// Örnek: <UrunGorseli product={p} />   <UrunGorseli oran="genis" etiket="Atölye fotoğrafı için yer tutucu" />
const ORAN = {
  urun: 'aspect-[3/4]',
  dikey: 'aspect-[4/5]',
  genis: 'aspect-video',
}
const ORAN_MD = {
  urun: 'md:aspect-[3/4]',
  dikey: 'md:aspect-[4/5]',
  genis: 'md:aspect-video',
}

const cumleDuzeni = (s = '') => s.charAt(0) + s.slice(1).toLocaleLowerCase('tr')

// METIN.md §4.2: "{Ürün adı}, {malzeme} ile SLA reçine 3D baskı"
const urunAlt = (p) => p.alt || `${p.name}, ${cumleDuzeni(p.material).toLocaleLowerCase('tr')} ile SLA reçine 3D baskı`

export default function UrunGorseli({
  src,
  alt,
  product,
  oran = 'urun',
  oranMd,
  oncelikli = false,
  katmanKatman = false,
  etiket,
  sizes = '(min-width: 768px) 40vw, 100vw',
  className = '',
}) {
  const kaynak = src ?? product?.photos?.[0]
  const altMetin = alt ?? (product ? urunAlt(product) : '')
  const [hata, setHata] = useState(false)
  const kutu = `${ORAN[oran]} ${oranMd ? ORAN_MD[oranMd] : ''} w-full ${katmanKatman ? 'mf-katman-katman' : ''} ${className}`

  if (!kaynak || hata) {
    // Yer tutucu: içinde metin/ikon yok. Ürüne aitse anlamlı etiket, değilse dekoratif.
    const ad = hata ? 'Görsel yüklenemedi.' : etiket ?? (product ? `${product.name} fotoğrafı hazırlanıyor` : undefined)
    return (
      <div
        className={`mf-fon ${kutu}`}
        data-oran={oran}
        {...(ad ? { role: 'img', 'aria-label': ad } : { 'aria-hidden': true })}
      />
    )
  }

  return (
    <div className={`overflow-hidden bg-tas ${kutu}`}>
      <img
        src={kaynak}
        alt={altMetin}
        loading={oncelikli ? 'eager' : 'lazy'}
        fetchPriority={oncelikli ? 'high' : undefined}
        decoding="async"
        sizes={sizes}
        onError={() => setHata(true)}
        className="h-full w-full object-cover"
      />
    </div>
  )
}
