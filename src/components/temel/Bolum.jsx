import { Kapsayici, Izgara } from './Kapsayici'

// Bolum: sayfanın bir bölümü. <section> + dikey boşluk + Kapsayici (+ Izgara).
// panel verilirse içerik yuvarlak köşeli bir panelin içine oturur: 'tas' (açık gri-mavi) | 'beyaz' (gölgeli beyaz).
// Props: id, ekCapalar (eski bağlantılar için ek çapa id'leri, ör. ['services']), baslikId (aria-labelledby için),
//   bosluk 'normal' (56-120 px) | 'kucuk' (40-72 px) | 'dar' (panelleri alt alta dizmek için 12-16 px) | 'yok',
//   izgara (çocukları 12 kolonluk ızgaraya koyar, varsayılan true), className, icClassName (ızgaranın sınıfı).
// Örnek: <Bolum id="faq" baslikId="sss-baslik" panel="tas"><h2 id="sss-baslik" className="col-span-full">…</h2></Bolum>
const BOSLUK = {
  normal: 'py-(--mf-bolum)',
  kucuk: 'py-(--mf-bolum-kucuk)',
  dar: 'py-1.5 md:py-2',
  yok: '',
}

const PANEL = {
  tas: 'rounded-panel bg-tas px-(--mf-panel-ic) py-[calc(var(--mf-panel-ic)*1.15)]',
  beyaz: 'rounded-panel bg-kirec px-(--mf-panel-ic) py-[calc(var(--mf-panel-ic)*1.15)] shadow-kart',
}

export default function Bolum({
  id,
  ekCapalar = [],
  baslikId,
  bosluk = 'normal',
  panel,
  izgara = true,
  className = '',
  icClassName = '',
  children,
}) {
  const icerik = izgara ? <Izgara className={icClassName}>{children}</Izgara> : children
  return (
    <section id={id} aria-labelledby={baslikId} className={`${BOSLUK[bosluk]} ${className}`}>
      {ekCapalar.map((c) => (
        <span key={c} id={c} aria-hidden="true" className="block" />
      ))}
      {panel ? (
        // Panel sayfa kenarına daha yakın durur (Supaste'teki geniş gri paneller gibi)
        <div className="mx-auto w-full max-w-[calc(var(--mf-max)+2*var(--mf-kenar))] px-3 md:px-4">
          <div className={PANEL[panel]}>{icerik}</div>
        </div>
      ) : (
        <Kapsayici>{icerik}</Kapsayici>
      )}
    </section>
  )
}
