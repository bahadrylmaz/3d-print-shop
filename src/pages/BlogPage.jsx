import { Link } from 'react-router-dom'
import SayfaIskeleti from '../components/yerlesim/SayfaIskeleti'
import SayfaBasligi from '../components/yerlesim/SayfaBasligi'
import Bolum from '../components/temel/Bolum'
import { Buton } from '../components/temel/Buton'
import Ikon from '../components/temel/Ikon'
import UrunGorseli from '../components/temel/UrunGorseli'
import YaziSatiri from '../components/blog/YaziSatiri'
import { kunye } from '../components/blog/yaziBilgisi'
import { blogCollectionJsonLd, blogPosts } from '../data/blogPosts'
import { BLOG_LISTE_SEO, BLOG_WA_MESAJ } from '../data/blogSeo'
import { waBaglanti } from '../data/iletisim'
import useJsonLd from '../hooks/useJsonLd'
import usePageSeo from '../hooks/usePageSeo'

// Blog listesi: gök bandında başlık + konu hapları, öne çıkan yazı (büyük beyaz kart, 16:9), diğer yazılar (2 sütun kart), soru paneli.
// Aynı bileşen scripts/prerender-blog.mjs ile build'de statik HTML'e de basılır: render sırasında tarayıcı API'si kullanılmaz.

// Konu hapları: her biri o konunun yazısına gider.
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
      <SayfaBasligi
        baslikId="blog-baslik"
        baslik="Atölyeden"
        vurgu="notlar"
        ust={
          <p className="mf-cam m-0 mb-6 inline-flex min-h-9 items-center rounded-hap px-4 text-small font-[600] text-grafit-2">
            Rehber
          </p>
        }
        className="pb-8!"
      >
        <p className="m-0 mt-6 max-w-[48ch] text-lead text-grafit-2">
          Sipariş vermeden önce sorulan soruların yazılı cevapları. Hangi reçine, hangi ölçek, dosya nasıl hazırlanır,
          OSB numunesi nasıl istenir.
        </p>

        {KONULAR.length > 0 && (
          <nav aria-label="Konular" className="mt-8">
            <ul className="m-0 flex list-none flex-wrap justify-center gap-2 p-0">
              {KONULAR.map((k) => (
                <li key={k.slug}>
                  <Link
                    to={`/blog/${k.slug}`}
                    title={k.aciklama}
                    className="inline-flex min-h-11 items-center rounded-hap bg-kirec px-5 text-[0.9375rem] font-[500] text-grafit no-underline shadow-kart transition-colors duration-(--mf-sure-hizli) ease-mf hover:bg-grafit hover:text-kirec"
                  >
                    {k.ad}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </SayfaBasligi>

      {!oneCikan && (
        <Bolum bosluk="kucuk">
          <p className="col-span-full m-0 text-center text-grafit-2">Yeni yazılar hazırlanıyor.</p>
        </Bolum>
      )}

      {/* Öne çıkan yazı: büyük beyaz kart; lg üstünde görsel solda (7 kol), metin sağda (5 kol) */}
      {oneCikan && (
        <Bolum bosluk="yok" baslikId="one-cikan-baslik" izgara={false}>
          <article className="grid gap-x-(--mf-oluk) rounded-panel bg-kirec p-2 shadow-kart lg:grid-cols-12 lg:items-center">
            <Link to={`/blog/${oneCikan.slug}`} aria-label={oneCikan.title} className="group block lg:col-span-7">
              <UrunGorseli
                src={oneCikan.image}
                alt={oneCikan.imageAlt}
                oran="genis"
                kose="yok"
                buyut
                oncelikli
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="rounded-[calc(var(--mf-r-panel)-0.5rem)]"
              />
            </Link>
            <div className="p-4 md:p-7 lg:col-span-5 lg:pl-2">
              <p className="m-0 text-small text-sis">{kunye(oneCikan)}</p>
              <h2 id="one-cikan-baslik" className="m-0 mt-3 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] leading-[1.08] font-[700] tracking-[-0.035em]">
                <Link
                  to={`/blog/${oneCikan.slug}`}
                  className="text-grafit no-underline decoration-2 underline-offset-[0.16em] hover:underline"
                >
                  {oneCikan.title}
                </Link>
              </h2>
              <p className="m-0 mt-4 max-w-[52ch] text-grafit-2">{oneCikan.excerpt}</p>
              <Buton
                to={`/blog/${oneCikan.slug}`}
                tur="cerceve"
                className="mt-6"
                aria-label={`${oneCikan.title}: yazıyı okuyun`}
              >
                Yazıyı okuyun
                <Ikon ad="ok" boyut={18} />
              </Buton>
            </div>
          </article>
        </Bolum>
      )}

      {/* Diğer yazılar: iki sütun kart */}
      {digerleri.length > 0 && (
        <Bolum bosluk="kucuk" baslikId="butun-yazilar" icClassName="gap-y-6">
          <h2 id="butun-yazilar" className="col-span-full m-0 text-h2 font-[700]">
            Bütün <em className="mf-italik">yazılar</em>
          </h2>
          <div className="col-span-full grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            {digerleri.map((yazi) => (
              <YaziSatiri key={yazi.slug} yazi={yazi} />
            ))}
          </div>
        </Bolum>
      )}

      {/* Liste altı: cevabı bulamayanlar için */}
      <Bolum panel="tas" bosluk="yok" baslikId="blog-soru-baslik" izgara={false}>
        <div className="flex flex-col items-center text-center">
          <h2 id="blog-soru-baslik" className="m-0 max-w-[18ch] text-h2 font-[700]">
            Cevabı burada <em className="mf-italik">bulamadınız mı?</em>
          </h2>
          <p className="m-0 mt-5 max-w-[52ch] text-grafit-2">
            Fotoğrafı ya da dosyayı, ölçüyü, adedi ve kullanım amacını gönderin. Nasıl basılacağını birlikte netleştirelim.
          </p>
          <Buton href={waBaglanti(BLOG_WA_MESAJ)} className="mt-7">
            <Ikon ad="whatsapp" />
            WhatsApp&apos;tan yazın
          </Buton>
        </div>
      </Bolum>
    </SayfaIskeleti>
  )
}
