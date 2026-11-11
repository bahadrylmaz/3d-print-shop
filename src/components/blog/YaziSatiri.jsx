import { Link } from 'react-router-dom'
import UrunGorseli from '../temel/UrunGorseli'
import { kunye } from './yaziBilgisi'

// YaziSatiri: blog listesinde ve yazı sonundaki "ilgili yazılar"da beyaz kart. Solda kare görsel (mobilde 96 px, md üstünde 2/6),
// sağda künye + başlık + (lg üstünde) özet. Bütün kart tek bağlantı; hover'da hafifçe yükselir.
// Props: yazi (blogPosts kaydı), baslikSeviyesi ('h3' varsayılan).
export default function YaziSatiri({ yazi, baslikSeviyesi: Baslik = 'h3' }) {
  return (
    <article className="h-full">
      <Link
        to={`/blog/${yazi.slug}`}
        className="group grid h-full grid-cols-[96px_minmax(0,1fr)] items-center gap-x-4 rounded-panel bg-kirec p-2 text-grafit no-underline shadow-kart transition-[box-shadow,translate] duration-(--mf-sure-orta) ease-mf hover:-translate-y-1 hover:shadow-yuzen md:grid-cols-[minmax(0,2fr)_minmax(0,4fr)] md:gap-x-6"
      >
        <UrunGorseli
          src={yazi.image}
          alt={yazi.imageAlt}
          oran="kare"
          kose="yok"
          buyut
          sizes="(min-width: 768px) 14vw, 96px"
          className="rounded-[calc(var(--mf-r-panel)-0.5rem)]"
        />
        <div className="py-2 pr-3 md:pr-5">
          <p className="m-0 text-small text-sis">{kunye(yazi)}</p>
          <Baslik className="m-0 mt-1.5 text-[1.125rem] leading-[1.2] font-[700] tracking-[-0.02em] md:text-h3">
            {yazi.title}
          </Baslik>
          <p className="m-0 mt-3 hidden max-w-[48ch] text-grafit-2 lg:block">{yazi.excerpt}</p>
        </div>
      </Link>
    </article>
  )
}
