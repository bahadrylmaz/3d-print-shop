import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Buton } from '../temel/Buton'
import Ikon from '../temel/Ikon'
import { WA_GENEL_MESAJ, waBaglanti } from '../../data/iletisim'

// Navbar: sayfanın üstünde yüzen cam hap (56 px), ortalanmış; sayfa zemini (gök) arkasından görünür.
// Konumu fixed olduğu için her sayfanın ilk bölümü üstten ~96 px boşluk bırakır (Hero, SayfaBasligi, ürün sayfası).
// lg (1024 px) altında ≡ düğmesi tam ekran menü açar: Esc kapatır, odak panelde döner, sayfa kaydırması kilitlenir.
// Kullanım: <Navbar /> (props yok). Genelde doğrudan değil SayfaIskeleti içinden gelir.
const BAGLANTILAR = [
  { etiket: 'Mağaza', to: '/magaza' },
  { etiket: 'İşler', href: '/#services' },
  { etiket: 'Süreç', href: '/#process' },
  { etiket: 'Rehber', to: '/blog' },
  { etiket: 'SSS', href: '/#faq' },
]

const aktifMi = (b, yol) => Boolean(b.to) && (yol === b.to || yol.startsWith(`${b.to}/`))

function NavBaglanti({ b, yol, className, onClick }) {
  const aktif = aktifMi(b, yol)
  const ortak = { className, onClick, 'aria-current': aktif ? 'page' : undefined }
  return b.to ? (
    <Link to={b.to} {...ortak}>
      {b.etiket}
    </Link>
  ) : (
    <a href={b.href} {...ortak}>
      {b.etiket}
    </a>
  )
}

function Marka({ onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex min-h-11 items-center gap-2.5 rounded-hap pr-3 text-[1.0625rem] leading-none font-[700] tracking-[-0.03em] text-grafit no-underline"
    >
      <img src="/logo-kristal.jpg" alt="" width="36" height="36" className="h-9 w-9 rounded-[11px]" />
      MicronForge
    </Link>
  )
}

export default function Navbar() {
  const [acik, setAcik] = useState(false)
  const { pathname } = useLocation()
  const azHareket = useReducedMotion()
  const dugmeRef = useRef(null)
  const panelRef = useRef(null)

  const kapat = () => setAcik(false)

  // Panel açıkken: kaydırma kilidi, Esc ile kapanma, odak tuzağı
  useEffect(() => {
    if (!acik) return undefined
    const panel = panelRef.current
    const dugme = dugmeRef.current
    const odaklanabilir = () =>
      Array.from(panel?.querySelectorAll('a[href], button:not([disabled])') ?? [])
    odaklanabilir()[0]?.focus()
    const eskiTasma = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const tus = (e) => {
      if (e.key === 'Escape') {
        setAcik(false)
        return
      }
      if (e.key !== 'Tab') return
      const ogeler = odaklanabilir()
      if (!ogeler.length) return
      const ilk = ogeler[0]
      const son = ogeler[ogeler.length - 1]
      if (e.shiftKey && document.activeElement === ilk) {
        e.preventDefault()
        son.focus()
      } else if (!e.shiftKey && document.activeElement === son) {
        e.preventDefault()
        ilk.focus()
      }
    }
    document.addEventListener('keydown', tus)
    return () => {
      document.removeEventListener('keydown', tus)
      document.body.style.overflow = eskiTasma
      dugme?.focus({ preventScroll: true })
    }
  }, [acik])

  const masaustuBaglanti =
    'inline-flex min-h-11 items-center rounded-hap px-3.5 text-[0.9375rem] font-[500] text-grafit-2 no-underline transition-colors duration-(--mf-sure-hizli) hover:bg-tas hover:text-grafit aria-[current=page]:bg-tas aria-[current=page]:text-grafit'

  return (
    // Menü açıkken başlık WhatsApp düğmesinin (z 30) üstüne çıkar; yoksa düğme tam ekran menünün üstünde kalır
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 px-3 pt-3 ${acik ? 'z-(--mf-z-menu)' : 'z-(--mf-z-yapiskan)'}`}
    >
      <div className="mf-cam pointer-events-auto mx-auto flex h-14 w-full max-w-[940px] items-center justify-between gap-3 rounded-hap pr-1.5 pl-2.5">
        <Marka />

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="m-0 flex list-none gap-0.5 p-0">
            {BAGLANTILAR.map((b) => (
              <li key={b.etiket}>
                <NavBaglanti b={b} yol={pathname} className={masaustuBaglanti} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Buton href="/#order" className="min-h-11! px-5 max-[420px]:hidden">
            Teklif isteyin
          </Buton>
          <button
            ref={dugmeRef}
            type="button"
            className="inline-grid h-11 w-11 cursor-pointer place-items-center rounded-hap border-0 bg-transparent text-grafit transition-colors duration-(--mf-sure-hizli) hover:bg-tas lg:hidden"
            aria-label="Menüyü aç"
            aria-expanded={acik}
            aria-controls="mobil-menu"
            onClick={() => setAcik(true)}
          >
            <Ikon ad="menu" boyut={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {acik && (
          <motion.div
            ref={panelRef}
            id="mobil-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            className="mf-gok pointer-events-auto fixed inset-0 z-(--mf-z-menu) flex flex-col overflow-y-auto px-3 pt-3 lg:hidden"
            initial={azHareket ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={azHareket ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: 8 }}
            transition={{ duration: azHareket ? 0 : 0.28, ease: [0.2, 0, 0, 1] }}
          >
            <div className="mf-cam flex h-14 flex-none items-center justify-between rounded-hap pr-1.5 pl-2.5">
              <Marka onClick={kapat} />
              <button
                type="button"
                className="inline-grid h-11 w-11 cursor-pointer place-items-center rounded-hap border-0 bg-transparent text-grafit hover:bg-tas"
                aria-label="Menüyü kapat"
                onClick={kapat}
              >
                <Ikon ad="kapat" boyut={22} />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-between px-3 pt-8 pb-6">
              <nav aria-label="Ana menü">
                <ul className="m-0 list-none p-0">
                  {BAGLANTILAR.map((b) => (
                    <li key={b.etiket}>
                      <NavBaglanti
                        b={b}
                        yol={pathname}
                        onClick={kapat}
                        className="flex min-h-16 items-center text-[2.5rem] leading-[1.1] font-[700] tracking-[-0.04em] text-grafit no-underline aria-[current=page]:text-recine"
                      />
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-12 grid gap-3">
                <Buton href="/#order" genis onClick={kapat}>
                  Teklif isteyin
                </Buton>
                <Buton href={waBaglanti(WA_GENEL_MESAJ)} tur="cerceve" genis onClick={kapat}>
                  <Ikon ad="whatsapp" />
                  WhatsApp&apos;tan yazın
                </Buton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
