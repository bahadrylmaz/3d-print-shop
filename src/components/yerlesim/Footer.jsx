import { Link } from 'react-router-dom'
import { Kapsayici, Izgara } from '../temel/Kapsayici'
import {
  CALISMA_SAATLERI,
  INSTAGRAM_KULLANICI,
  INSTAGRAM_URL,
  TELEFON_GORUNEN,
  TELEFON_HREF,
  WA_GENEL_MESAJ,
  waBaglanti,
} from '../../data/iletisim'

// Footer: sayfanın kapanışı (ayrı CTA bandı yok). Taş zemin, kenardan kenara büyük "MicronForge", 4 sütun, telif satırı.
// Bağlantılar Grafit 2 ve en az 44 px yüksek. Metinler METIN.md §4.4. Yasal bağlantılar sayfaları yazılınca eklenecek.
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
        {o.etiket}
      </a>
    )
  }
  return <span className="inline-flex min-h-11 items-center text-grafit-2">{o.etiket}</span>
}

export default function Footer() {
  return (
    <footer className="bg-tas pt-24 pb-8">
      <Kapsayici>
        <Izgara>
          <p className="col-span-full m-0 mb-10 overflow-hidden font-serif text-[clamp(3rem,1rem+9vw,9rem)] pb-[0.14em] leading-[0.9] font-[400] tracking-[-0.03em] whitespace-nowrap md:mb-12">
            MicronForge
          </p>
          <p className="col-span-full m-0 mb-12 max-w-[62ch] text-grafit-2">
            Manisa&apos;da SLA reçine 3D baskı atölyesi. Kişiye özel figür, mimari maket, sanayi prototipi ve dekor
            parçaları basıyoruz. Manisa ve İzmir&apos;e elden teslim, Türkiye&apos;ye kargo.
          </p>
          {SUTUNLAR.map((s) => (
            <div
              key={s.baslik}
              className={`mb-8 text-small md:col-span-3 ${s.baslik === 'İletişim' ? 'col-span-full' : 'col-span-2'}`}
            >
              <h2 className="m-0 mb-2 font-sans text-small font-[500] text-grafit">{s.baslik}</h2>
              <ul className="m-0 list-none p-0">
                {s.ogeler.map((o) => (
                  <li key={o.etiket}>
                    <Oge o={o} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="col-span-full m-0 mt-4 border-t border-cizgi pt-4 text-small text-grafit-2">© 2026 MicronForge</p>
        </Izgara>
      </Kapsayici>
    </footer>
  )
}
