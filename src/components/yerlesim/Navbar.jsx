import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Kapsayici } from '../temel/Kapsayici'
import { Buton } from '../temel/Buton'
import Ikon from '../temel/Ikon'
import { WA_GENEL_MESAJ, waBaglanti } from '../../data/iletisim'

// Navbar: yapışkan üst çubuk (68 px masaüstü, 60 px mobil), Alçı zemin, alt 1 px çizgi. Cam/küçülme yok.
// lg (1024 px) altında ≡ düğmesi tam ekran Kireç paneli açar: Esc kapatır, odak panelde döner, sayfa kaydırması kilitlenir.
// Kullanım: <Navbar /> (props yok). Genelde doğrudan değil SayfaIskeleti içinden gelir.
const BAGLANTILAR = [
  { etiket: 'Mağaza', to: '/magaza' },
  { etiket: 'İşler', href: '/#services' },
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
    'inline-flex min-h-11 items-center text-[0.9375rem] text-grafit-2 no-underline transition-colors duration-(--mf-sure-hizli) hover:text-grafit aria-[current=page]:text-grafit aria-[current=page]:shadow-[inset_0_-1px_0_var(--mf-grafit)]'

  return (
    <header className="sticky top-0 z-(--mf-z-yapiskan) border-b border-cizgi bg-alci">
      <Kapsayici className="flex h-[60px] items-center justify-between gap-8 lg:h-[68px]">
        <Link
          to="/"
          className="py-2.5 font-serif text-[1.5rem] leading-none font-[500] tracking-[-0.01em] text-grafit no-underline"
        >
          MicronForge
        </Link>

        <nav aria-label="Ana menü" className="mr-auto ml-16 hidden lg:block">
          <ul className="m-0 flex list-none gap-8 p-0">
            {BAGLANTILAR.map((b) => (
              <li key={b.etiket}>
                <NavBaglanti b={b} yol={pathname} className={masaustuBaglanti} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-6 lg:flex">
            <a href={waBaglanti(WA_GENEL_MESAJ)} target="_blank" rel="noreferrer" className={masaustuBaglanti}>
              WhatsApp
            </a>
            <Buton href="/#order">Teklif isteyin</Buton>
          </div>
          <button
            ref={dugmeRef}
            type="button"
            className="-mr-2.5 inline-grid h-11 w-11 cursor-pointer place-items-center bg-transparent text-grafit lg:hidden"
            aria-label="Menüyü aç"
            aria-expanded={acik}
            aria-controls="mobil-menu"
            onClick={() => setAcik(true)}
          >
            <Ikon ad="menu" boyut={22} />
          </button>
        </div>
      </Kapsayici>

      <AnimatePresence>
        {acik && (
          <motion.div
            ref={panelRef}
            id="mobil-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            className="fixed inset-0 z-(--mf-z-menu) flex flex-col overflow-y-auto bg-kirec shadow-katman lg:hidden"
            initial={azHareket ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={azHareket ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: 8 }}
            transition={{ duration: azHareket ? 0 : 0.28, ease: [0.2, 0, 0, 1] }}
          >
            <Kapsayici className="flex h-[60px] flex-none items-center justify-between border-b border-cizgi">
              <Link
                to="/"
                onClick={kapat}
                className="py-2.5 font-serif text-[1.5rem] leading-none font-[500] tracking-[-0.01em] text-grafit no-underline"
              >
                MicronForge
              </Link>
              <button
                type="button"
                className="-mr-2.5 inline-grid h-11 w-11 cursor-pointer place-items-center bg-transparent text-grafit"
                aria-label="Menüyü kapat"
                onClick={kapat}
              >
                <Ikon ad="kapat" boyut={22} />
              </button>
            </Kapsayici>
            <Kapsayici className="flex flex-1 flex-col justify-between pt-8 pb-8">
              <nav aria-label="Ana menü">
                <ul className="m-0 list-none p-0">
                  {BAGLANTILAR.map((b) => (
                    <li key={b.etiket}>
                      <NavBaglanti
                        b={b}
                        yol={pathname}
                        onClick={kapat}
                        className="flex min-h-14 items-center font-serif text-[2.25rem] leading-[1.15] text-grafit no-underline aria-[current=page]:underline aria-[current=page]:decoration-1 aria-[current=page]:underline-offset-[0.18em]"
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
                  WhatsApp&apos;tan yazın
                </Buton>
              </div>
            </Kapsayici>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
