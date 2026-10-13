import { Link } from 'react-router-dom'
import SayfaIskeleti from '../components/yerlesim/SayfaIskeleti'
import Bolum from '../components/temel/Bolum'
import { Buton, MetinBaglanti } from '../components/temel/Buton'
import UrunGorseli from '../components/temel/UrunGorseli'
import YaziSatiri from '../components/blog/YaziSatiri'
import { kunye } from '../components/blog/yaziBilgisi'
import { blogCollectionJsonLd, blogPosts } from '../data/blogPosts'
import { BLOG_LISTE_SEO, BLOG_WA_MESAJ } from '../data/blogSeo'
import { waBaglanti } from '../data/iletisim'
import useJsonLd from '../hooks/useJsonLd'
import usePageSeo from '../hooks/usePageSeo'

// Blog listesi (YON §6.5, METIN §4.3): giriş + konu satırları, öne çıkan yazı (16:9, 8 kol), sakin liste (4:5), soru bölümü.
// Aynı bileşen scripts/prerender-blog.mjs ile build'de statik HTML'e de basılır: render sırasında tarayıcı API'si kullanılmaz.

// METIN §4.3 konu etiketleri: kart değil düz satır; her biri o konunun yazısına gider.
const KONULAR = [
  { ad: "Manisa'da 3D baskı", aciklama: 'teklif ve üretim', slug: 'manisa-3d-baski-hizmeti-rehberi' },
  { ad: 'OSB ve prototip', aciklama: 'numune ve ölçü kontrolü', slug: 'manisa-osb-hassas-prototip-3d-baski' },
  { ad: 'Figür ve hediye', aciklama: 'fotoğraftan modelleme', slug: 'manisa-kisiye-ozel-figur-fotograftan-3d-baski' },
  { ad: 'Mimari maket', aciklama: 'ölçek ve cephe detayı', slug: 'manisa-mimari-maket-sla-3d-baski' },
].filter((k) => blogPosts.some((p) => p.slug === k.slug))

export default function BlogPage() {
  const [oneCikan, ...digerleri] = blogPosts

  usePageSeo({
    ...BLOG_LISTE_SEO,
    path: '/blog',
    image: oneCikan?.image,
  })
  useJsonLd('blog-collection-jsonld', blogCollectionJsonLd)

  return (
    <SayfaIskeleti whatsappMesaj={BLOG_WA_MESAJ}>
      {/* Giriş: başlık 7 kol, konu satırları 4 kol alta hizalı */}
      <Bolum cizgi={false} bosluk="kucuk" baslikId="blog-baslik" icClassName="gap-y-10">
        <div className="col-span-full md:col-span-7">
          <p className="m-0 text-small text-sis">Rehber</p>
          <h1 id="blog-baslik" className="m-0 mt-3 font-serif text-h1 font-[400]">
            Atölyeden notlar
          </h1>
          <p className="m-0 mt-6 max-w-[44ch] text-lead text-grafit-2">
            Sipariş vermeden önce sorulan soruların yazılı cevapları. Hangi reçine, hangi ölçek, dosya nasıl hazırlanır,
            OSB numunesi nasıl istenir.
          </p>
        </div>

        {KONULAR.length > 0 && (
          <nav aria-label="Konular" className="col-span-full md:col-span-5 md:col-start-8 md:self-end lg:col-span-4 lg:col-start-9">
            <ul className="m-0 list-none border-b border-cizgi p-0">
              {KONULAR.map((k) => (
                <li key={k.slug} className="border-t border-cizgi">
                  <Link
                    to={`/blog/${k.slug}`}
                    className="flex min-h-11 flex-wrap items-baseline gap-x-2 py-2.5 text-grafit no-underline transition-colors duration-(--mf-sure-hizli) ease-mf hover:text-recine"
                  >
                    <span className="font-[500]">{k.ad}:</span>
                    <span className="text-grafit-2">{k.aciklama}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Bolum>

      {!oneCikan && (
        <Bolum bosluk="kucuk">
          <p className="col-span-full m-0 text-grafit-2">Yeni yazılar hazırlanıyor.</p>
        </Bolum>
      )}

      {/* Öne çıkan yazı: 16:9 görsel 8 kol, metin 4 kol alta hizalı (lg); altında tek sütun */}
      {oneCikan && (
        <Bolum bosluk="kucuk" baslikId="one-cikan-baslik">
          <article className="col-span-full grid grid-cols-subgrid gap-y-6">
            <Link to={`/blog/${oneCikan.slug}`} aria-label={oneCikan.title} className="col-span-full block lg:col-span-8">
              <UrunGorseli
                src={oneCikan.image}
                alt={oneCikan.imageAlt}
                oran="genis"
                oncelikli
                sizes="(min-width: 1024px) 62vw, 100vw"
              />
            </Link>
            <div className="col-span-full lg:col-span-4 lg:self-end">
              <p className="m-0 text-small text-sis">{kunye(oneCikan)}</p>
              <h2 id="one-cikan-baslik" className="m-0 mt-3 font-serif text-h2 font-[400]">
                <Link
                  to={`/blog/${oneCikan.slug}`}
                  className="text-grafit no-underline decoration-1 underline-offset-[0.16em] hover:underline"
                >
                  {oneCikan.title}
                </Link>
              </h2>
              <p className="m-0 mt-4 max-w-[52ch] text-grafit-2">{oneCikan.excerpt}</p>
              <MetinBaglanti to={`/blog/${oneCikan.slug}`} className="mt-3" aria-label={`${oneCikan.title}: yazıyı okuyun`}>
                Yazıyı okuyun
              </MetinBaglanti>
            </div>
          </article>
        </Bolum>
      )}

      {/* Diğer yazılar: iki sütunlu sakin liste */}
      {digerleri.length > 0 && (
        <Bolum bosluk="kucuk" baslikId="butun-yazilar" icClassName="gap-y-10">
          <h2 id="butun-yazilar" className="col-span-full m-0 font-serif text-h2 font-[400]">
            Bütün yazılar
          </h2>
          <div className="col-span-full grid grid-cols-1 gap-x-(--mf-oluk) gap-y-10 md:grid-cols-2">
            {digerleri.map((yazi) => (
              <YaziSatiri key={yazi.slug} yazi={yazi} />
            ))}
          </div>
        </Bolum>
      )}

      {/* Liste altı: cevabı bulamayanlar için */}
      <Bolum baslikId="blog-soru-baslik" icClassName="gap-y-6">
        <h2 id="blog-soru-baslik" className="col-span-full m-0 font-serif text-h2 font-[400] md:col-span-5">
          Cevabı burada bulamadınız mı?
        </h2>
        <div className="col-span-full md:col-span-5 md:col-start-7">
          <p className="m-0 max-w-[52ch] text-grafit-2">
            Fotoğrafı ya da dosyayı, ölçüyü, adedi ve kullanım amacını gönderin. Nasıl basılacağını birlikte netleştirelim.
          </p>
          <Buton href={waBaglanti(BLOG_WA_MESAJ)} className="mt-6">
            WhatsApp'tan yazın
          </Buton>
        </div>
      </Bolum>
    </SayfaIskeleti>
  )
}
