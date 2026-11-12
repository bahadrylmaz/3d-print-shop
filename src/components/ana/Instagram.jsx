import Bolum from '../temel/Bolum'
import { Buton } from '../temel/Buton'
import Ikon from '../temel/Ikon'
import { INSTAGRAM_KULLANICI, INSTAGRAM_URL, WA_GENEL_MESAJ, waBaglanti } from '../../data/iletisim'

// Ana sayfa "Instagram" bölümü: sitedeki tek koyu panel. Zemin Instagram sayfasının kendisi gibi lacivert ve ızgara çizgili.
// Solda başlık + iki eylem; sağda profili gösteren telefon maketi (tamamı Instagram'a giden tek bağlantı), lg üstünde
// arkasında iki eğik fotoğraf kartı. Çapa: #instagram.
// Maket bir çizimdir, canlı akış değil: profil adı ve biyografi Instagram sayfasındaki metinle aynı tutulur,
// ızgaradaki kareler atölyenin kendi fotoğraflarıdır. Takipçi ve gönderi sayısı bilerek yok (eskir, yanlış kalır).
// Küçük kareler public/instagram altında (240 px, her biri ~9 KB); profil metni değişirse PROFIL'i güncelleyin.
const KULLANICI = INSTAGRAM_KULLANICI.replace(/^@/, '')

const PROFIL = {
  ad: 'MicronForge3D | 3D Baskı Manisa',
  satirlar: ['Kişiye özel figürler ve tasarım objeleri.', 'Fikirden modele, detaylı reçine baskı.', 'Manisa · Sipariş ve özel tasarım'],
  baglanti: 'micronforge.shop',
}

const kare = (ad) => `/instagram/${ad}.jpg`

const ONE_CIKANLAR = [
  ['hulk-1', 'Hulk'],
  ['darth-vader-1', 'Vader'],
  ['superman-1', 'Superman'],
  ['keloglan-1', 'Keloğlan'],
  ['chibi-set-3', 'Chibi'],
]

const IZGARA = [
  'venom-1',
  'chibi-set-1',
  'batman-1',
  'ejderha-1',
  'wolverine-1',
  'black-panther-1',
  'kaptan-amerika-1',
  'kirmizi-hulk-2',
  'ninja-kaplumbaga-1',
]

// Telefonun arkasındaki iki eğik kart (yalnız lg üstünde): [fotoğraf, yerleşim]. Kartların iç yarısı telefonun
// arkasında kalır: figürü kareyi dolduran ya da dış yarıda duran fotoğraf seçin.
const YAN_KARTLAR = [
  ['/shop/wolverine-2-k.jpg', 'top-[10%] -left-[15%] -rotate-[9deg]'],
  ['/shop/chibi-set-2-k.jpg', '-right-[15%] bottom-[8%] rotate-[8deg]'],
]

const GOVDE = '#07060F' // telefon gövdesi: gece panelinden bir ton koyu

function Telefon() {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={`Instagram'da ${INSTAGRAM_KULLANICI} sayfasını açın`}
      className="relative mx-auto block w-[min(19rem,100%)] rounded-[3rem] text-grafit no-underline transition-[translate] duration-(--mf-sure-orta) ease-mf hover:-translate-y-1.5"
    >
      <div
        aria-hidden="true"
        className="rounded-[3rem] p-[0.5625rem] shadow-[0_0_0_1px_rgba(255,255,255,0.16),0_44px_90px_-30px_rgba(0,0,0,0.8)]"
        style={{ background: GOVDE }}
      >
        <div className="overflow-hidden rounded-[2.45rem] bg-kirec">
          {/* Kamera adası */}
          <div className="flex justify-center pt-2.5">
            <span className="block h-[1.4rem] w-[5.25rem] rounded-hap" style={{ background: GOVDE }} />
          </div>

          <div className="flex items-center justify-between px-4 pt-3">
            <span className="text-[1rem] leading-none font-[700] tracking-[-0.02em]">{KULLANICI}</span>
            <Ikon ad="menu" boyut={20} />
          </div>

          <div className="flex items-center gap-3.5 px-4 pt-3.5">
            <span className="block h-[4.25rem] w-[4.25rem] flex-none rounded-hap bg-[conic-gradient(from_200deg,#4353E6,#A78BFA,#7DD3FC,#4353E6)] p-[2.5px]">
              <img
                src="/logo-kristal.jpg"
                alt=""
                width="68"
                height="68"
                loading="lazy"
                className="block h-full w-full rounded-hap border-[2.5px] border-kirec object-cover"
              />
            </span>
            <span className="min-w-0 text-[0.8125rem] leading-[1.35]">
              <span className="block font-[700]">{PROFIL.ad}</span>
              <span className="block text-grafit-2">{PROFIL.satirlar[0]}</span>
            </span>
          </div>

          <p className="m-0 px-4 pt-2.5 text-[0.8125rem] leading-[1.4] text-grafit-2">
            {PROFIL.satirlar.slice(1).map((satir) => (
              <span key={satir} className="block">
                {satir}
              </span>
            ))}
            <span className="block font-[600] text-recine">{PROFIL.baglanti}</span>
          </p>

          <div className="grid grid-cols-2 gap-1.5 px-4 pt-3">
            <span className="grid h-8 place-items-center rounded-[0.625rem] bg-recine text-[0.8125rem] font-[600] text-kirec">
              Takip et
            </span>
            <span className="grid h-8 place-items-center rounded-[0.625rem] bg-tas text-[0.8125rem] font-[600]">
              Mesaj
            </span>
          </div>

          {/* Öne çıkanlar */}
          <div className="flex justify-between px-4 pt-4">
            {ONE_CIKANLAR.map(([ad, etiket]) => (
              <span key={ad} className="flex w-[3.1rem] flex-col items-center gap-1.5">
                <span className="block h-[3.1rem] w-[3.1rem] rounded-hap p-[2.5px] shadow-[inset_0_0_0_1px_var(--mf-cizgi-guclu)]">
                  <img
                    src={kare(ad)}
                    alt=""
                    width="240"
                    height="240"
                    loading="lazy"
                    className="block h-full w-full rounded-hap object-cover"
                  />
                </span>
                <span className="max-w-full truncate text-[0.625rem] leading-none text-grafit-2">{etiket}</span>
              </span>
            ))}
          </div>

          {/* Sekme şeridi: ızgara seçili */}
          <div className="mt-3.5 grid grid-cols-3 border-t border-cizgi">
            <span className="-mt-px grid h-9 place-items-center border-t-[1.5px] border-grafit">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                {[1, 7, 13].flatMap((y) => [1, 7, 13].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" rx="0.6" />))}
              </svg>
            </span>
            <span className="grid h-9 place-items-center text-cizgi-guclu">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                <rect x="2" y="2" width="14" height="14" rx="4" />
                <path d="M7.5 6.3v5.4L12 9z" />
              </svg>
            </span>
            <span className="grid h-9 place-items-center text-cizgi-guclu">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="9" cy="6.5" r="2.7" />
                <path d="M3.5 15.5c.6-2.8 2.7-4.3 5.5-4.3s4.900 1.5 5.500 4.3" />
              </svg>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-[2px]">
            {IZGARA.map((ad) => (
              <img
                key={ad}
                src={kare(ad)}
                alt=""
                width="240"
                height="240"
                loading="lazy"
                className="block aspect-square w-full object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </a>
  )
}

export default function Instagram() {
  return (
    <Bolum id="instagram" baslikId="instagram-baslik" panel="gece" bosluk="dar" icClassName="items-center gap-y-12">
      <div className="col-span-full md:col-span-6 lg:col-span-5">
        <p className="m-0 inline-flex min-h-9 items-center gap-2 rounded-hap bg-kirec/10 px-4 text-small font-[600] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]">
          <Ikon ad="instagram" boyut={16} />
          {INSTAGRAM_KULLANICI}
        </p>
        <h2 id="instagram-baslik" className="m-0 mt-6 text-h2 font-[700]">
          Atölyenin vitrini <em className="mf-italik">Instagram&apos;da.</em>
        </h2>
        <p className="m-0 mt-5 max-w-[44ch] text-lead text-kirec/75">
          Mağazaya girmeyen işler ve yeni baskılar orada. Beğendiğiniz bir parça olursa WhatsApp&apos;tan yazmanız yeter.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Buton href={INSTAGRAM_URL} tur="cerceve">
            <Ikon ad="instagram" />
            Instagram&apos;da takip edin
          </Buton>
          <Buton href={waBaglanti(WA_GENEL_MESAJ)} tur="hayalet">
            <Ikon ad="whatsapp" />
            WhatsApp&apos;tan yazın
          </Buton>
        </div>
      </div>

      <div className="col-span-full md:col-span-6 lg:col-start-7">
        <div className="relative isolate mx-auto w-full max-w-[26rem]">
          {/* Mor ışıma: telefonu hangi yerleşimde olursa olsun izler */}
          <span
            aria-hidden="true"
            className="absolute -inset-[14%] -z-1 rounded-hap bg-[radial-gradient(closest-side,rgba(124,108,255,0.5),transparent)]"
          />
          {YAN_KARTLAR.map(([src, yer]) => (
            <span
              key={src}
              aria-hidden="true"
              className={`absolute hidden w-[44%] rounded-kart bg-kirec p-1.5 shadow-yuzen lg:block ${yer}`}
            >
              <img
                src={src}
                alt=""
                width="600"
                height="800"
                loading="lazy"
                className="block aspect-[3/4] w-full rounded-[calc(var(--mf-r-kart)-0.4rem)] object-cover"
              />
            </span>
          ))}
          <Telefon />
        </div>
      </div>
    </Bolum>
  )
}
