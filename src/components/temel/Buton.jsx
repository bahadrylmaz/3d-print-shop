import { Link } from 'react-router-dom'

// Buton: 48 px yükseklik, 2 px köşe. tur="birincil" (Grafit dolu) | "cerceve" (çerçeveli).
// Hedefe göre öğe seçer: to -> router <Link>, href -> <a>, ikisi de yoksa <button type="button">.
// Örnek: <Buton href="/#order">Teklif isteyin</Buton>  <Buton to="/magaza" tur="cerceve" genis>…</Buton>
// MetinBaglanti: altı çizili, 44 px dokunma alanlı metin bağlantı ("Mağazaya bakın" gibi ikincil eylem).
const TABAN =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-kontrol border px-6 text-[0.9375rem] leading-none font-[500] tracking-[0.005em] whitespace-nowrap no-underline transition-colors duration-(--mf-sure-hizli) ease-mf active:translate-y-px disabled:cursor-not-allowed disabled:border-tas disabled:bg-tas disabled:text-sis'

const TURLER = {
  birincil:
    'border-grafit bg-grafit text-kirec hover:border-recine-koyu hover:bg-recine-koyu',
  cerceve: 'border-grafit bg-transparent text-grafit hover:bg-grafit hover:text-kirec',
}

function hedefOge({ to, href, children, className, ...rest }) {
  if (to) {
    return (
      <Link to={to} className={className} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    const dis = /^https?:/.test(href)
    return (
      <a href={href} className={className} {...(dis ? { target: '_blank', rel: 'noreferrer' } : {})} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={className} {...rest}>
      {children}
    </button>
  )
}

export function Buton({ tur = 'birincil', genis = false, className = '', ...rest }) {
  return hedefOge({
    ...rest,
    className: `${TABAN} ${TURLER[tur]} ${genis ? 'w-full' : ''} ${className}`,
  })
}

export function MetinBaglanti({ className = '', ...rest }) {
  return hedefOge({
    ...rest,
    className: `inline-flex min-h-11 items-center font-[500] text-grafit underline decoration-cizgi-guclu decoration-1 underline-offset-[0.3em] transition-colors duration-(--mf-sure-hizli) ease-mf hover:text-recine hover:decoration-current ${className}`,
  })
}
