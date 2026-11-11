import { Link } from 'react-router-dom'

// Buton: 48 px yükseklikte hap. tur="birincil" (mürekkep dolu) | "cerceve" (beyaz hap, ince kenar).
// Hedefe göre öğe seçer: to -> router <Link>, href -> <a>, ikisi de yoksa <button type="button">.
// Örnek: <Buton href="/#order">Teklif isteyin</Buton>  <Buton to="/magaza" tur="cerceve" genis>…</Buton>
// MetinBaglanti: altı çizili, 44 px dokunma alanlı metin bağlantı ("Mağazaya bakın" gibi ikincil eylem).
const TABAN =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-hap px-6 text-[0.9375rem] leading-none font-[600] tracking-[-0.01em] whitespace-nowrap no-underline transition-[background-color,color,box-shadow,scale] duration-(--mf-sure-hizli) ease-mf active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-tas-koyu disabled:text-sis disabled:shadow-none'

const TURLER = {
  birincil: 'bg-grafit text-kirec hover:bg-recine-koyu',
  cerceve:
    'bg-kirec text-grafit shadow-[inset_0_0_0_1px_var(--mf-cizgi),var(--mf-golge-kart)] hover:shadow-[inset_0_0_0_1px_var(--mf-grafit),var(--mf-golge-kart)]',
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
    className: `inline-flex min-h-11 items-center border-0 p-0 font-sans text-[1em] font-[600] text-grafit underline decoration-cizgi-guclu decoration-1 underline-offset-[0.3em] transition-colors duration-(--mf-sure-hizli) ease-mf hover:text-recine hover:decoration-current ${className}`,
  })
}
