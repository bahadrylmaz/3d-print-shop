import { Link } from 'react-router-dom'
import Bolum from '../temel/Bolum'
import { MetinBaglanti } from '../temel/Buton'
import UrunGorseli from '../temel/UrunGorseli'

// Ana sayfa 9. bölüm "Atölyeden notlar": son 2 yazı, yan yana iki beyaz kart (16:9 görsel, künye, başlık, özet).
// Props: yazilar (blogPosts kayıtları, yeniden eskiye; ilk ikisi kullanılır).
const kunye = (y) => `${y.category}, ${y.readTime} okuma`

export default function Blogdan({ yazilar }) {
  const gosterilen = yazilar.slice(0, 2)
  if (!gosterilen.length) return null

  return (
    <Bolum id="rehber" baslikId="rehber-baslik" icClassName="gap-y-4">
      <div className="col-span-full mb-4 flex flex-wrap items-end justify-between gap-x-8 gap-y-2 md:mb-8">
        <div>
          <h2 id="rehber-baslik" className="m-0 text-h2 font-[700]">
            Atölyeden <em className="mf-italik">notlar</em>
          </h2>
          <p className="m-0 mt-4 max-w-[52ch] text-grafit-2">
            Hangi reçine, hangi ölçek, dosya nasıl hazırlanır: sipariş vermeden önce işinize yarayacak yazılar.
          </p>
        </div>
        <MetinBaglanti to="/blog">Bütün yazılar</MetinBaglanti>
      </div>

      {gosterilen.map((yazi) => (
        <article key={yazi.slug} className="col-span-full md:col-span-6">
          <Link
            to={`/blog/${yazi.slug}`}
            className="group flex h-full flex-col rounded-panel bg-kirec p-2 text-grafit no-underline shadow-kart transition-[box-shadow,translate] duration-(--mf-sure-orta) ease-mf hover:-translate-y-1 hover:shadow-yuzen"
          >
            <UrunGorseli
              src={yazi.image}
              alt={yazi.imageAlt}
              oran="genis"
              kose="yok"
              buyut
              sizes="(min-width: 768px) 46vw, 100vw"
              className="rounded-[calc(var(--mf-r-panel)-0.5rem)]"
            />
            <div className="flex flex-1 flex-col p-4 md:p-6">
              <p className="m-0 text-small text-sis">{kunye(yazi)}</p>
              <h3 className="m-0 mt-2 text-h3 font-[700]">{yazi.title}</h3>
              <p className="m-0 mt-3 max-w-[56ch] text-grafit-2">{yazi.excerpt}</p>
            </div>
          </Link>
        </article>
      ))}
    </Bolum>
  )
}
