import { Kapsayici, Izgara } from './Kapsayici'

// Bolum: sayfanın bir bölümü. <section> + üstte 1 px çizgi + dikey boşluk + Kapsayici (+ Izgara).
// Props: id, ekCapalar (eski bağlantılar için ek çapa id'leri, ör. ['services']), baslikId (aria-labelledby için), bosluk 'normal' (72-144 px) | 'kucuk' (48-80 px) | 'yok',
//   cizgi (üst çizgi, varsayılan true), izgara (çocukları 12 kolonluk ızgaraya koyar, varsayılan true), className.
// Örnek: <Bolum id="faq" baslikId="sss-baslik"><h2 id="sss-baslik" className="col-span-4 md:col-span-8">…</h2></Bolum>
const BOSLUK = {
  normal: 'py-(--mf-bolum)',
  kucuk: 'py-(--mf-bolum-kucuk)',
  yok: '',
}

export default function Bolum({
  id,
  ekCapalar = [],
  baslikId,
  bosluk = 'normal',
  cizgi = true,
  izgara = true,
  className = '',
  icClassName = '',
  children,
}) {
  return (
    <section
      id={id}
      aria-labelledby={baslikId}
      className={`${BOSLUK[bosluk]} ${cizgi ? 'border-t border-cizgi' : ''} ${className}`}
    >
      {ekCapalar.map((c) => (
        <span key={c} id={c} aria-hidden="true" className="block" />
      ))}
      <Kapsayici>{izgara ? <Izgara className={icClassName}>{children}</Izgara> : children}</Kapsayici>
    </section>
  )
}
