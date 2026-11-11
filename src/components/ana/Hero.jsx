import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Kapsayici } from '../temel/Kapsayici'
import { Buton } from '../temel/Buton'
import Ikon from '../temel/Ikon'
import UrunGorseli from '../temel/UrunGorseli'
import { WA_GENEL_MESAJ, waBaglanti } from '../../data/iletisim'

// Ana sayfa 1. bölüm: gök zemini üstünde ortalanmış başlık (kalın grotesk + italik vurgu), giriş, iki eylem;
// altında yelpaze gibi açılmış beş ürün fotoğrafı (her biri kendi ürün sayfasına gider) ve teknik künye.
// Açılış yalnız ilk yüklemede oynar: metin bulanıktan nete, kartlar aşağıdan yukarı (index.css .mf-belir / .mf-yuksel).
// İçerik animasyona bağımlı kalmasın diye sınıflar 2,6 sn sonra kaldırılır (ACILIS_EMNIYET_MS).
// Props: kartlar (5 ürün kaydı: soldan sağa; ortadaki en büyük). 768 px altında yalnız ortadaki üçü görünür
// (ikinci kart o zaman en soldadır: bindirme payı yalnız md üstünde verilir ki yelpaze ortalı kalsın).
// İsim etiketi kartın dış köşesinde durur (sağdaki kartlarda sağ altta): iç köşe komşu kartın altında kalıyor.
let acilisOynadi = false

const TEKNIK = ['16K MSLA yazıcı', '25 mikron katman', '218 × 123 × 250 mm baskı alanı', "Manisa ve İzmir'de elden teslim"]

// Yelpaze: [genişlik, dönüş, aşağı kayma, gecikme, yalnız md üstü]
const YELPAZE = [
  ['w-[clamp(8rem,17vw,14rem)]', '-9deg', 'mt-[clamp(2.5rem,6vw,5.5rem)]', 420, true],
  ['w-[clamp(7.75rem,20vw,16.5rem)]', '-4.5deg', 'mt-[clamp(1.25rem,2.6vw,2.5rem)]', 300, false],
  ['w-[clamp(9.5rem,23vw,19rem)]', '0deg', '', 180, false],
  ['w-[clamp(7.75rem,20vw,16.5rem)]', '4.5deg', 'mt-[clamp(1.25rem,2.6vw,2.5rem)]', 300, false],
  ['w-[clamp(8rem,17vw,14rem)]', '9deg', 'mt-[clamp(2.5rem,6vw,5.5rem)]', 420, true],
]

// Emniyet: en uzun açılış animasyonu 420 ms gecikme + 1100 ms sürer (1520 ms). Bu süre dolduktan sonra animasyon sınıfları
// kaldırılır. Olağan tarayıcıda animasyon çoktan bitmiştir ve hiçbir şey değişmez; animasyon saati ilerlemeyen bir
// ortamda (gömülü ya da arka planda kalan sayfa) ise başlık, düğmeler ve kartlar opaklık 0'da takılı kalmaz.
const ACILIS_EMNIYET_MS = 2600

export default function Hero({ kartlar = [] }) {
  // StrictMode iki kez render etse de değer aynı kalır; bayrak yalnız ayrılırken kapanır.
  const [acilis, setAcilis] = useState(() => !acilisOynadi)
  useEffect(() => {
    const zamanlayici = setTimeout(() => setAcilis(false), ACILIS_EMNIYET_MS)
    return () => {
      clearTimeout(zamanlayici)
      acilisOynadi = true
    }
  }, [])
  const belir = acilis ? 'mf-belir' : ''
  const yuksel = acilis ? 'mf-yuksel' : ''
  const gecikme = (ms) => ({ '--mf-gecikme': `${ms}ms` })

  return (
    <section
      id="hero"
      aria-labelledby="hero-baslik"
      className="mf-gok overflow-hidden pt-[calc(5.5rem+clamp(1.5rem,0.4rem+4.6vw,4.5rem))]"
    >
      <Kapsayici className="flex flex-col items-center text-center">
        <p
          className={`mf-cam m-0 inline-flex min-h-9 items-center rounded-hap px-4 text-small font-[500] text-grafit-2 ${belir}`}
        >
          Manisa · SLA reçine 3D baskı atölyesi
        </p>
        <h1 id="hero-baslik" className={`m-0 mt-6 text-display font-[800] ${belir}`} style={gecikme(80)}>
          Reçineden basılır.
          <br />
          <em className="mf-italik">Elde boyanır.</em>
        </h1>
        <p className={`m-0 mt-6 max-w-[54ch] text-lead text-grafit-2 ${belir}`} style={gecikme(180)}>
          Sevdiğiniz karakteri 25 mikron katmanla basıyor, fırçayla tek tek boyuyoruz. Raftakilerden seçin ya da
          fotoğraf gönderin, sizin figürünüzü yapalım.
        </p>
        <div className={`mt-8 flex flex-wrap justify-center gap-3 ${belir}`} style={gecikme(260)}>
          <Buton href={waBaglanti(WA_GENEL_MESAJ)}>
            <Ikon ad="whatsapp" />
            WhatsApp&apos;tan yazın
          </Buton>
          <Buton to="/magaza" tur="cerceve">
            Koleksiyonu görün
          </Buton>
        </div>
        <ul
          className={`m-0 mt-5 flex list-none flex-wrap justify-center gap-x-6 gap-y-1 p-0 text-small text-grafit-2 ${belir}`}
          style={gecikme(340)}
        >
          <li>Fiyat WhatsApp&apos;tan</li>
          <li>Fotoğraftan modelleme</li>
          <li>Türkiye&apos;ye kargo</li>
        </ul>
      </Kapsayici>

      {/* Yelpaze: kartlar birbirinin üstüne biner; ortadaki öndedir */}
      <ul className="m-0 mx-auto mt-[clamp(2.5rem,1.5rem+4vw,4.5rem)] flex max-w-[1240px] list-none items-start justify-center px-2 pb-[clamp(2.5rem,1.6rem+3.6vw,5rem)]">
        {kartlar.slice(0, 5).map((urun, i) => {
          const [genislik, donus, kayma, ms, yalnizMd] = YELPAZE[i]
          const orta = i === 2
          return (
            <li
              key={urun.id}
              className={`flex-none ${genislik} ${kayma} ${yalnizMd ? 'max-md:hidden' : ''} ${i === 0 ? '' : i === 1 ? 'md:-ml-[clamp(0.75rem,2vw,1.75rem)]' : '-ml-[clamp(0.75rem,2vw,1.75rem)]'} ${orta ? 'z-3' : i === 1 || i === 3 ? 'z-2' : 'z-1'} relative hover:z-4`}
            >
              <Link
                to={`/magaza/${urun.id}`}
                aria-label={urun.name}
                style={{ rotate: donus, ...gecikme(ms) }}
                className={`group relative block rounded-kart bg-kirec p-1.5 shadow-yuzen transition-[scale] duration-(--mf-sure-orta) ease-mf hover:scale-[1.035] md:p-2 ${yuksel}`}
              >
                <UrunGorseli
                  product={urun}
                  kose="yok"
                  oncelikli={orta}
                  sizes={orta ? '(min-width: 1280px) 300px, 24vw' : '(min-width: 1280px) 260px, 21vw'}
                  className="rounded-[calc(var(--mf-r-kart)-0.4rem)]"
                />
                <span
                  aria-hidden="true"
                  className={`mf-cam absolute bottom-4 hidden min-h-8 items-center rounded-hap px-3 text-small font-[600] tracking-[-0.01em] text-grafit lg:inline-flex ${
                    i > 2 ? 'right-4' : 'left-4'
                  }`}
                >
                  {urun.name}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Teknik künye: ödül rozetleri değil, doğrulanabilir dört bilgi */}
      <Kapsayici>
        <ul className="m-0 flex list-none flex-wrap justify-center gap-2 p-0 pb-(--mf-bolum-kucuk)">
          {TEKNIK.map((t) => (
            <li key={t} className="inline-flex min-h-9 items-center rounded-hap bg-tas px-4 text-small text-grafit-2">
              {t}
            </li>
          ))}
        </ul>
      </Kapsayici>
    </section>
  )
}
