import { useRef, useState } from 'react'
import UrunGorseli from '../temel/UrunGorseli'

// UrunGalerisi: ürün detayında 3:4 ana görsel + küçük görseller (YON §6.4).
// Bütün fotoğraflar aynı kutuda üst üste durur; seçim değişince 140 ms çapraz geçiş (hareket azaltmada anında, tokens.css).
// Küçük görseller <button aria-pressed>: Tab ile her birine gelinir, Enter/Boşluk seçer, ok tuşları / Home / End
// komşuya geçip seçer. 1280: 88×117 sıra; 375: 72 px genişlikte yatay kaydırılan şerit. Fotoğraf yoksa yer tutucu.
// Props: urun (products.js kaydı). Ürün değişince state sıfırlansın diye çağıran taraf key={urun.id} verir.
export default function UrunGalerisi({ urun }) {
  const fotolar = urun.photos ?? []
  const [secili, setSecili] = useState(0)
  const dugmeler = useRef([])

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
      <div className="relative aspect-[3/4] w-full">
        {fotolar.length === 0 ? (
          <UrunGorseli product={urun} oncelikli className="absolute inset-0" />
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
                oncelikli={i === 0}
                sizes="(min-width: 1440px) 780px, (min-width: 768px) 56vw, 100vw"
              />
            </div>
          ))
        )}
      </div>

      {fotolar.length > 1 && (
        <div
          role="group"
          aria-label={`${urun.name} fotoğrafları`}
          className="-mr-(--mf-kenar) mt-4 flex gap-3 overflow-x-auto pt-1 pr-(--mf-kenar) pb-1 pl-1 [scrollbar-width:none] md:mr-0 md:flex-wrap md:overflow-visible md:pr-0 [&::-webkit-scrollbar]:hidden"
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
              className={`w-[72px] flex-none cursor-pointer border-0 bg-transparent p-0 pb-1.5 transition-[opacity,box-shadow] duration-(--mf-sure-hizli) ease-mf focus-visible:outline-offset-[-2px] md:w-[88px] ${
                i === secili
                  ? 'opacity-100 shadow-[inset_0_-2px_0_var(--mf-grafit)]'
                  : 'opacity-60 shadow-[inset_0_-2px_0_transparent] hover:opacity-100'
              }`}
            >
              <UrunGorseli src={src} alt="" sizes="88px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
