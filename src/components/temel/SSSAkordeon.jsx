import { useId, useState } from 'react'
import Ikon from './Ikon'

// SSSAkordeon: kutusuz soru-cevap listesi. Satırlar 1 px üst çizgi, soru Schibsted 500 18 px, sağda +/−, satır ≥ 56 px.
// Props: sorular [{ soru, cevap }], baslikSeviyesi ('h3' varsayılan; soru düğmesini saran başlık), ilkAcik (açık başlayan sıra, yoksa hepsi kapalı).
// Açılma CSS grid satırıyla (0fr -> 1fr), 280 ms; hareket azaltmada anında. Birden fazla soru aynı anda açık olabilir.
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
    <div className={`border-b border-cizgi ${className}`}>
      {sorular.map((s, i) => {
        const acikMi = acik.has(i)
        const dugmeId = `${kok}-s${i}`
        const panelId = `${kok}-c${i}`
        return (
          <div key={s.soru} className="border-t border-cizgi">
            <Baslik className="m-0">
              <button
                type="button"
                id={dugmeId}
                aria-expanded={acikMi}
                aria-controls={panelId}
                onClick={() => degistir(i)}
                className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-6 bg-transparent py-4 text-left font-sans text-[1.125rem] leading-[1.4] font-[500] text-grafit transition-colors duration-(--mf-sure-hizli) hover:text-recine"
              >
                <span>{s.soru}</span>
                <Ikon ad={acikMi ? 'eksi' : 'arti'} boyut={16} className="flex-none" />
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
