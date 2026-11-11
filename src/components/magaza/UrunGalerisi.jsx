import { useRef, useState } from 'react'
import UrunGorseli from '../temel/UrunGorseli'
import { genisMi } from '../temel/gorsel'

// UrunGalerisi: ürün detayında ana görsel + küçük görseller. Kutu dikey fotoğrafta 3:4, yatay fotoğrafta ("-genis-") 4:3.
// Bütün fotoğraflar aynı kutuda üst üste durur; seçim değişince 160 ms çapraz geçiş (hareket azaltmada anında, tokens.css).
// Küçük görseller <button aria-pressed>: Tab ile her birine gelinir, Enter/Boşluk seçer, ok tuşları / Home / End
// komşuya geçip seçer. 1280: 76 px kare sıra; 375: yatay kaydırılan şerit. Fotoğraf yoksa yer tutucu.
// Props: urun (products.js kaydı). Ürün değişince state sıfırlansın diye çağıran taraf key={urun.id} verir.
export default function UrunGalerisi({ urun }) {
  const fotolar = urun.photos ?? []
  const [secili, setSecili] = useState(0)
  const dugmeler = useRef([])
  const yatay = genisMi(fotolar[secili])

  const git = (i) => {
    const n = (i + fotolar.length) % fotolar.length
    setSecili(n)
    dugmeler.current[n]?.focus()
  }

  const tus = (e, i) => {
    const hedef = {
      ArrowRight: i + 1,
      ArrowDown: i + 1,
      ArrowLeft: i - 1,
      ArrowUp: i - 1,
      Home: 0,
      End: fotolar.length - 1,
    }[e.key]
    if (hedef === undefined) return
    e.preventDefault()
    git(hedef)
  }

  return (
    <div>
      <div className={`relative w-full overflow-hidden rounded-panel bg-tas ${yatay ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}>
        {fotolar.length === 0 ? (
          <UrunGorseli product={urun} oncelikli kose="yok" oran="serbest" className="absolute inset-0 h-full" />
        ) : (
          fotolar.map((src, i) => (
            <div
              key={src}
              aria-hidden={i !== secili}
              className={`absolute inset-0 transition-opacity duration-(--mf-sure-hizli) ease-mf ${
                i === secili ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <UrunGorseli
                product={urun}
                src={src}
                oran="serbest"
                kose="yok"
                oncelikli={i === 0}
                sizes="(min-width: 1280px) 720px, (min-width: 768px) 56vw, 100vw"
                className="h-full"
              />
            </div>
          ))
        )}
      </div>

      {fotolar.length > 1 && (
        <div
          role="group"
          aria-label={`${urun.name} fotoğrafları`}
          className="mf-serit -mx-(--mf-kenar) mt-3 flex gap-2 overflow-x-auto px-(--mf-kenar) py-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-1"
        >
          {fotolar.map((src, i) => (
            <button
              key={src}
              ref={(el) => {
                dugmeler.current[i] = el
              }}
              type="button"
              aria-pressed={i === secili}
              aria-label={`${i + 1}. fotoğrafı göster (${fotolar.length} fotoğraftan)`}
              onClick={() => setSecili(i)}
              onKeyDown={(e) => tus(e, i)}
              className={`w-[68px] flex-none cursor-pointer rounded-[1.125rem] border-0 bg-transparent p-[3px] transition-[opacity,box-shadow] duration-(--mf-sure-hizli) ease-mf md:w-[76px] ${
                i === secili
                  ? 'opacity-100 shadow-[0_0_0_2px_var(--mf-grafit)]'
                  : 'opacity-70 shadow-[0_0_0_2px_transparent] hover:opacity-100'
              }`}
            >
              <UrunGorseli src={src} alt="" oran="kare" kose="kontrol" sizes="76px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
