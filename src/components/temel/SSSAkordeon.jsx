import { useId, useState } from 'react'
import Ikon from './Ikon'

// SSSAkordeon: soru-cevap listesi. Her soru beyaz, yuvarlak köşeli bir satır; sağda yuvarlak +/− düğmesi, satır ≥ 64 px.
// Props: sorular [{ soru, cevap }], baslikSeviyesi ('h3' varsayılan; soru düğmesini saran başlık), ilkAcik (açık başlayan sıra, yoksa hepsi kapalı).
// Açılma CSS grid satırıyla (0fr -> 1fr), 300 ms; hareket azaltmada anında. Birden fazla soru aynı anda açık olabilir.
export default function SSSAkordeon({ sorular, baslikSeviyesi: Baslik = 'h3', ilkAcik = null, className = '' }) {
  const kok = useId()
  const [acik, setAcik] = useState(() => new Set(ilkAcik == null ? [] : [ilkAcik]))

  const degistir = (i) =>
    setAcik((onceki) => {
      const yeni = new Set(onceki)
      if (yeni.has(i)) yeni.delete(i)
      else yeni.add(i)
      return yeni
    })

  return (
    <div className={`grid gap-2 ${className}`}>
      {sorular.map((s, i) => {
        const acikMi = acik.has(i)
        const dugmeId = `${kok}-s${i}`
        const panelId = `${kok}-c${i}`
        return (
          <div key={s.soru} className="rounded-kart bg-kirec px-5 shadow-kart md:px-7">
            <Baslik className="m-0">
              <button
                type="button"
                id={dugmeId}
                aria-expanded={acikMi}
                aria-controls={panelId}
                onClick={() => degistir(i)}
                className="group flex min-h-16 w-full cursor-pointer items-center justify-between gap-5 border-0 bg-transparent p-0 py-4 text-left font-sans text-[1.0625rem] leading-[1.35] font-[600] tracking-[-0.01em] text-grafit"
              >
                <span>{s.soru}</span>
                <span
                  className={`grid h-9 w-9 flex-none place-items-center rounded-hap transition-colors duration-(--mf-sure-hizli) ${
                    acikMi ? 'bg-grafit text-kirec' : 'bg-tas text-grafit group-hover:bg-recine-acik'
                  }`}
                >
                  <Ikon ad={acikMi ? 'eksi' : 'arti'} boyut={16} />
                </span>
              </button>
            </Baslik>
            <div
              id={panelId}
              role="region"
              aria-labelledby={dugmeId}
              className="mf-akordeon-panel"
              data-acik={acikMi}
              inert={!acikMi}
            >
              <div>
                <p className="m-0 max-w-[62ch] pb-6 text-grafit-2">{s.cevap}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
