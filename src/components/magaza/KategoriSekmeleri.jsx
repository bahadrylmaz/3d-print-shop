// KategoriSekmeleri: hap şeklinde filtre düğmeleri (Inspora'daki kategori şeridi gibi). Seçili olan mürekkep dolu, diğerleri açık panel.
// <button aria-pressed>. Mobilde yalnız şerit yatay kaydırılır (sayfa değil). Sağda düz metin sayaç (ör. "13 ürün"), aria-live ile duyurulur.
// Props: secenekler [{ id, label }], secili (id), onSec(id), etiket (görünmez grup adı), sayac (metin, isteğe bağlı).
export default function KategoriSekmeleri({ secenekler, secili, onSec, etiket, sayac, className = '' }) {
  return (
    <div className={`flex items-center justify-between gap-x-4 ${className}`}>
      <div
        role="group"
        aria-label={etiket}
        className="mf-serit -mx-(--mf-kenar) flex min-w-0 flex-1 gap-2 overflow-x-auto px-(--mf-kenar) py-1 md:mx-0 md:flex-wrap md:px-0"
      >
        {secenekler.map((s) => {
          const secildi = s.id === secili
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={secildi}
              onClick={() => onSec(s.id)}
              className={`min-h-11 flex-none cursor-pointer rounded-hap border-0 px-5 font-sans text-[0.9375rem] whitespace-nowrap transition-colors duration-(--mf-sure-hizli) ease-mf ${
                secildi ? 'bg-grafit font-[600] text-kirec' : 'bg-tas font-[500] text-grafit-2 hover:bg-tas-koyu hover:text-grafit'
              }`}
            >
              {s.label}
            </button>
          )
        })}
      </div>
      {sayac && (
        <p aria-live="polite" className="mf-rakam m-0 hidden flex-none text-small text-sis sm:block">
          {sayac}
        </p>
      )}
    </div>
  )
}
