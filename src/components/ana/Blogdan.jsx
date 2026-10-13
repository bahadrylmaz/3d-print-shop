import { Link } from 'react-router-dom'
import Bolum from '../temel/Bolum'
import { MetinBaglanti } from '../temel/Buton'
import UrunGorseli from '../temel/UrunGorseli'

// Ana sayfa 8. bölüm "Atölyeden notlar" (YON §6.2-8, METIN §3.8): son 2 yazı.
// 1280: büyük yazı 16:9 (7 kol) + ikinci yazı yalnız başlık ve künye (4 kol, alta hizalı). 375: alt alta.
// Props: yazilar (blogPosts kayıtları, yeniden eskiye; ilk ikisi kullanılır).
const kunye = (y) => `${y.category}, ${y.readTime} okuma`

export default function Blogdan({ yazilar }) {
  const [buyuk, ikinci] = yazilar
  if (!buyuk) return null

  return (
    <Bolum id="rehber" baslikId="rehber-baslik">
      <div className="col-span-full mb-12 flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
        <div>
          <h2 id="rehber-baslik" className="m-0 font-serif text-h2 font-[400]">
            Atölyeden notlar
          </h2>
          <p className="m-0 mt-4 max-w-[52ch] text-grafit-2">
            Hangi reçine, hangi ölçek, dosya nasıl hazırlanır: sipariş vermeden önce işinize yarayacak yazılar.
          </p>
        </div>
        <MetinBaglanti to="/blog">Bütün yazılar</MetinBaglanti>
      </div>

      <article className="col-span-full md:col-span-7">
        <Link to={`/blog/${buyuk.slug}`} className="group block text-grafit no-underline">
          <UrunGorseli src={buyuk.image} alt={buyuk.imageAlt} oran="genis" sizes="(min-width: 768px) 55vw, 100vw" />
          <p className="m-0 mt-5 text-small text-sis">{kunye(buyuk)}</p>
          <h3 className="m-0 mt-2 font-serif text-h3 font-[500] decoration-1 underline-offset-[0.18em] group-hover:underline">
            {buyuk.title}
          </h3>
        </Link>
        <p className="m-0 mt-3 max-w-[62ch] text-grafit-2">{buyuk.excerpt}</p>
        <MetinBaglanti to={`/blog/${buyuk.slug}`} className="mt-2" aria-label={`${buyuk.title}: yazıyı okuyun`}>
          Yazıyı okuyun
        </MetinBaglanti>
      </article>

      {ikinci && (
        <article className="col-span-full mt-12 border-t border-cizgi pt-6 md:col-span-4 md:col-start-9 md:mt-0 md:self-end">
          <p className="m-0 text-small text-sis">{kunye(ikinci)}</p>
          <h3 className="m-0 mt-2 font-serif text-h3 font-[500]">
            <Link
              to={`/blog/${ikinci.slug}`}
              className="text-grafit no-underline decoration-1 underline-offset-[0.18em] hover:underline"
            >
              {ikinci.title}
            </Link>
          </h3>
          <MetinBaglanti to={`/blog/${ikinci.slug}`} className="mt-2" aria-label={`${ikinci.title}: yazıyı okuyun`}>
            Yazıyı okuyun
          </MetinBaglanti>
        </article>
      )}
    </Bolum>
  )
}
