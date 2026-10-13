// KategoriSekmeleri: alt çizgili metin sekmeleri (YON §6.3, onizleme .sekmeler). Hap yok, kutu yok.
// <button aria-pressed>; seçili olan Grafit 500 + 2 px alt çizgi. Mobilde yalnız şerit yatay kaydırılır (sayfa değil),
// şerit sol kenara kadar taşar. Sağda düz metin sayaç (ör. "12 ürün"), aria-live ile duyurulur.
// Props: secenekler [{ id, label }], secili (id), onSec(id), etiket (görünmez grup adı), sayac (metin, isteğe bağlı).
// Blog listesinde kategori filtresi gerekirse aynı bileşen kullanılır (YON §6.5).
export default function KategoriSekmeleri({ secenekler, secili, onSec, etiket, sayac, className = '' }) {
  return (
    <div className={`flex items-end justify-between gap-x-6 border-b border-cizgi ${className}`}>
      <div
        role="group"
        aria-label={etiket}
        className="-mb-px -ml-(--mf-kenar) flex min-w-0 flex-1 gap-x-8 overflow-x-auto pr-2 pl-(--mf-kenar) [scrollbar-width:none] md:ml-0 md:pr-0 md:pl-0 [&::-webkit-scrollbar]:hidden"
      >
        {secenekler.map((s) => {
          const secildi = s.id === secili
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={secildi}
              onClick={() => onSec(s.id)}
              className={`min-h-11 flex-none cursor-pointer border-0 bg-transparent p-0 font-sans text-[0.9375rem] whitespace-nowrap transition-[color,box-shadow] duration-(--mf-sure-hizli) ease-mf hover:text-grafit focus-visible:outline-offset-[-2px] ${
                secildi
                  ? 'font-[500] text-grafit shadow-[inset_0_-2px_0_var(--mf-grafit)]'
                  : 'font-[400] text-grafit-2 shadow-[inset_0_-2px_0_transparent]'
              }`}
            >
              {s.label}
            </button>
          )
        })}
      </div>
      {sayac && (
        <p aria-live="polite" className="mf-rakam m-0 min-h-11 flex-none items-center text-small text-sis flex">
          {sayac}
        </p>
      )}
    </div>
  )
}
