import { Link } from 'react-router-dom'
import UrunGorseli from '../temel/UrunGorseli'
import { kunye } from './yaziBilgisi'

// YaziSatiri: blog listesinde ve yazı sonundaki "ilgili yazılar"da sakin liste öğesi (YON §6.5).
// 4:5 görsel solda (mobilde 96 px, md üstünde 2/6), sağda künye + Bodoni başlık; üstte 1 px çizgi. Bütün satır tek bağlantı.
// Props: yazi (blogPosts kaydı), baslikSeviyesi ('h3' varsayılan).
export default function YaziSatiri({ yazi, baslikSeviyesi: Baslik = 'h3' }) {
  return (
    <article className="border-t border-cizgi pt-6">
      <Link
        to={`/blog/${yazi.slug}`}
        className="group grid grid-cols-[96px_minmax(0,1fr)] items-start gap-x-(--mf-oluk) text-grafit no-underline md:grid-cols-[minmax(0,2fr)_minmax(0,4fr)]"
      >
        <UrunGorseli src={yazi.image} alt={yazi.imageAlt} oran="dikey" sizes="(min-width: 768px) 14vw, 96px" />
        <div>
          <p className="m-0 text-small text-sis">{kunye(yazi)}</p>
          <Baslik className="m-0 mt-2 font-serif text-h3 font-[500] decoration-1 underline-offset-[0.18em] group-hover:underline">
            {yazi.title}
          </Baslik>
          <p className="m-0 mt-3 hidden max-w-[48ch] text-grafit-2 lg:block">{yazi.excerpt}</p>
        </div>
      </Link>
    </article>
  )
}
