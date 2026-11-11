import { Link } from 'react-router-dom'
import { Buton } from '../temel/Buton'
import Ikon from '../temel/Ikon'
import {
  CALISMA_SAATLERI,
  INSTAGRAM_KULLANICI,
  INSTAGRAM_URL,
  TELEFON_GORUNEN,
  TELEFON_HREF,
  WA_GENEL_MESAJ,
  waBaglanti,
} from '../../data/iletisim'

// Footer: sayfanın kapanışı. Gök gradyanlı yuvarlak panel: üstte kapanış cümlesi + iki eylem, 4 sütun bağlantı,
// altta kenardan kenara soluk "MicronForge" ve telif satırı. Bağlantılar en az 44 px yüksek.
// Kullanım: <Footer /> (props yok).
const SUTUNLAR = [
  {
    baslik: 'İşler',
    ogeler: [
      { etiket: 'Koleksiyon ve dekor', href: '/#koleksiyon-dekor' },
      { etiket: 'Kişiye özel figür', href: '/#kisiye-ozel-figur' },
      { etiket: 'Mimari maket', href: '/#mimari-maket' },
      { etiket: 'Sanayi prototipi', href: '/#sanayi-prototipi' },
      { etiket: 'Toplu sipariş', href: '/#order' },
    ],
  },
  {
    baslik: 'Malzemeler',
    ogeler: [
      { etiket: 'Standart reçine', href: '/#standart-recine' },
      { etiket: 'Tough reçine', href: '/#tough-recine' },
      { etiket: 'Renkli ve şeffaf reçine', href: '/#renkli-seffaf-recine' },
    ],
  },
  {
    baslik: 'Bilgi',
    ogeler: [
      { etiket: 'Fiyat', href: '/#pricing' },
      { etiket: 'SSS', href: '/#faq' },
      { etiket: 'Mağaza', to: '/magaza' },
      { etiket: 'Rehber', to: '/blog' },
    ],
  },
  {
    baslik: 'İletişim',
    ogeler: [
      { etiket: `WhatsApp: ${TELEFON_GORUNEN}`, href: waBaglanti(WA_GENEL_MESAJ), dis: true },
      { etiket: `Telefon: ${TELEFON_GORUNEN}`, href: TELEFON_HREF },
      { etiket: `Instagram: ${INSTAGRAM_KULLANICI}`, href: INSTAGRAM_URL, dis: true },
      { etiket: 'Konum: Manisa' },
      { etiket: `Çalışma saatleri: ${CALISMA_SAATLERI}` },
    ],
  },
]

const BAGLANTI =
  'inline-flex min-h-11 items-center text-grafit-2 no-underline transition-colors duration-(--mf-sure-hizli) hover:text-grafit hover:underline hover:decoration-1 hover:underline-offset-[0.25em]'

// Telefon numarası mobilde ikiye bölünmesin ("+90 531 103 / 45 35"): numara tek parça, satır iki noktadan sonra kırılır.
function Metin({ etiket }) {
  const i = etiket.indexOf(TELEFON_GORUNEN)
  if (i < 0) return etiket
  return (
    <>
      {etiket.slice(0, i)}
      <span className="whitespace-nowrap">{TELEFON_GORUNEN}</span>
      {etiket.slice(i + TELEFON_GORUNEN.length)}
    </>
  )
}

function Oge({ o }) {
  if (o.to) {
    return (
      <Link to={o.to} className={BAGLANTI}>
        {o.etiket}
      </Link>
    )
  }
  if (o.href) {
    return (
      <a href={o.href} className={BAGLANTI} {...(o.dis ? { target: '_blank', rel: 'noreferrer' } : {})}>
        <span>
          <Metin etiket={o.etiket} />
        </span>
      </a>
    )
  }
  return <span className="inline-flex min-h-11 items-center text-grafit-2">{o.etiket}</span>
}

export default function Footer() {
  return (
    <footer className="px-3 pt-(--mf-bolum-kucuk) pb-3 md:px-4 md:pb-4">
      <div className="mf-gok-ters mx-auto w-full max-w-[calc(var(--mf-max)+2*var(--mf-kenar))] overflow-hidden rounded-panel">
        <div className="px-(--mf-panel-ic) pt-[calc(var(--mf-panel-ic)*1.3)]">
          <p className="m-0 max-w-[18ch] text-h2 font-[700]">
            Aklınızdaki figürü yazın, <em className="mf-italik">basıp boyayalım.</em>
          </p>
          <p className="m-0 mt-5 max-w-[56ch] text-grafit-2">
            Manisa&apos;da SLA reçine 3D baskı atölyesi. Boyalı koleksiyon figürü, kişiye özel figür, mimari maket ve
            sanayi prototipi basıyoruz. Manisa ve İzmir&apos;e elden teslim, Türkiye&apos;ye kargo.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Buton href={waBaglanti(WA_GENEL_MESAJ)}>
              <Ikon ad="whatsapp" />
              WhatsApp&apos;tan yazın
            </Buton>
            <Buton to="/magaza" tur="cerceve">
              Koleksiyonu görün
            </Buton>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-x-(--mf-oluk) gap-y-8 text-small md:mt-20 md:grid-cols-4">
            {SUTUNLAR.map((s) => (
              <div key={s.baslik}>
                <h2 className="m-0 mb-2 text-small font-[700] tracking-[-0.01em] text-grafit">{s.baslik}</h2>
                <ul className="m-0 list-none p-0">
                  {s.ogeler.map((o) => (
                    <li key={o.etiket}>
                      <Oge o={o} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="m-0 mt-10 text-small text-grafit-2">© 2026 MicronForge</p>
        </div>
        {/* Süs: marka adı zaten yukarıda ve menüde geçiyor */}
        <p
          aria-hidden="true"
          className="m-0 -mb-[0.16em] px-(--mf-panel-ic) text-[clamp(3.25rem,0.6rem+12.4vw,11.5rem)] leading-[0.9] font-[800] tracking-[-0.065em] whitespace-nowrap text-kirec/70 select-none"
        >
          MicronForge
        </p>
      </div>
    </footer>
  )
}
