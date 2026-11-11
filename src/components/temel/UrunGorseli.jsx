import { useState } from 'react'
import { kaynakKumesi } from './gorsel'

// UrunGorseli: sabit oranlı, yuvarlak köşeli görsel kutusu (CLS yok). src yoksa ya da yüklenemezse açık panel yer tutucusu çizer.
// Props: src (ya da product verilirse product.photos[0]), alt, product (alt metni ondan üretir),
//   oran 'urun' (3:4) | 'dikey' (4:5) | 'yatay' (4:3) | 'genis' (16:9) | 'kare' (1:1) | 'serbest' (oranı className verir),
//   oranMd (md üstünde farklı oran), kose 'kart' | 'panel' | 'kontrol' | 'yok', oncelikli (eager + fetchpriority high),
//   buyut (üst öğe 'group' ise hover'da görsel hafifçe büyür), sizes, className.
// /shop altındaki fotoğrafların iki boyu var (ad.jpg ve ad-k.jpg): srcset kendiliğinden kurulur.
// Örnek: <UrunGorseli product={p} />   <UrunGorseli src="/shop/chibi-set-genis-1.jpg" oran="yatay" alt="…" />
const ORAN = {
  urun: 'aspect-[3/4]',
  dikey: 'aspect-[4/5]',
  yatay: 'aspect-[4/3]',
  genis: 'aspect-video',
  kare: 'aspect-square',
  serbest: '',
}
const ORAN_MD = {
  urun: 'md:aspect-[3/4]',
  dikey: 'md:aspect-[4/5]',
  yatay: 'md:aspect-[4/3]',
  genis: 'md:aspect-video',
  kare: 'md:aspect-square',
}
const KOSE = {
  kart: 'rounded-kart',
  panel: 'rounded-panel',
  kontrol: 'rounded-kontrol',
  yok: '',
}

const cumleDuzeni = (s = '') => s.charAt(0) + s.slice(1).toLocaleLowerCase('tr')

// "{Ürün adı}: {malzeme}, SLA 3D baskı figür"
const urunAlt = (p) => p.alt || `${p.name}: ${cumleDuzeni(p.material).toLocaleLowerCase('tr')}, SLA 3D baskı figür`

export default function UrunGorseli({
  src,
  alt,
  product,
  oran = 'urun',
  oranMd,
  kose = 'kart',
  oncelikli = false,
  buyut = false,
  etiket,
  sizes = '(min-width: 768px) 40vw, 100vw',
  className = '',
}) {
  const kaynak = src ?? product?.photos?.[0]
  const altMetin = alt ?? (product ? urunAlt(product) : '')
  const [hata, setHata] = useState(false)
  const kutu = `${ORAN[oran]} ${oranMd ? ORAN_MD[oranMd] : ''} ${KOSE[kose]} w-full ${className}`

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
        srcSet={kaynakKumesi(kaynak)}
        alt={altMetin}
        loading={oncelikli ? 'eager' : 'lazy'}
        fetchPriority={oncelikli ? 'high' : undefined}
        decoding="async"
        sizes={sizes}
        onError={() => setHata(true)}
        className={`h-full w-full object-cover ${buyut ? 'transition-[scale] duration-(--mf-sure-orta) ease-mf group-hover:scale-[1.04]' : ''}`}
      />
    </div>
  )
}
