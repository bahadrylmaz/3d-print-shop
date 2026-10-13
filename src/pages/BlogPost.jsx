import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import SayfaIskeleti from '../components/yerlesim/SayfaIskeleti'
import Bolum from '../components/temel/Bolum'
import { Buton, MetinBaglanti } from '../components/temel/Buton'
import { Kapsayici, Izgara } from '../components/temel/Kapsayici'
import Ikon from '../components/temel/Ikon'
import UrunGorseli from '../components/temel/UrunGorseli'
import YaziSatiri from '../components/blog/YaziSatiri'
import { kunye, tarihMetni } from '../components/blog/yaziBilgisi'
import { blogPostJsonLd, blogPosts, getBlogPost } from '../data/blogPosts'
import { BLOG_WA_MESAJ, BLOG_YAZI_YOK_SEO } from '../data/blogSeo'
import useJsonLd from '../hooks/useJsonLd'
import usePageSeo from '../hooks/usePageSeo'

// Blog yazısı (YON §6.6, METIN §4.3): künye, Bodoni başlık, giriş, 16:9 kapak (10 kol), içindekiler (lg'de 3 kol yapışkan,
// altında açılır-kapanır) + 62ch okuma sütunu (Schibsted gövde; Bodoni yalnız başlık ve not), SSS, tek teklif çağrısı, 2 ilgili yazı.
// scripts/prerender-blog.mjs aynı bileşeni build'de statik HTML'e basar: render sırasında tarayıcı API'si kullanılmaz.
// Bölüm çapaları (#bolum-1, #sikca-sorulanlar) eski yazıdakiyle aynı; dışarıdan verilmiş bağlantılar çalışmaya devam eder.

const ICINDEKILER_ESIGI = 3 // en az bu kadar bölümü olan yazıda içindekiler gösterilir

// Sıradaki iki yazı (listede sona gelince başa döner); yazı sayısı azsa tekrar etmez.
const ilgiliYazilar = (slug, adet = 2) => {
  const i = blogPosts.findIndex((p) => p.slug === slug)
  const secilen = []
  for (let k = 1; k < blogPosts.length && secilen.length < adet; k += 1) {
    secilen.push(blogPosts[(i + k) % blogPosts.length])
  }
  return secilen
}

function Icindekiler({ baglantilar, mobil = false }) {
  const liste = (
    <ol className="m-0 list-none border-l border-cizgi p-0 pl-4">
      {baglantilar.map(({ href, etiket }) => (
        <li key={href}>
          <a
            href={href}
            className="flex min-h-11 items-center py-1.5 text-small text-grafit-2 no-underline transition-colors duration-(--mf-sure-hizli) ease-mf hover:text-recine"
          >
            {etiket}
          </a>
        </li>
      ))}
    </ol>
  )

  if (mobil) {
    return (
      <details className="group border-y border-cizgi lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 font-[500] text-grafit [&::-webkit-details-marker]:hidden">
          Bu yazıda
          <Ikon ad="arti" boyut={16} className="flex-none group-open:hidden" />
          <Ikon ad="eksi" boyut={16} className="hidden flex-none group-open:block" />
        </summary>
        <nav aria-label="İçindekiler" className="pb-5">
          {liste}
        </nav>
      </details>
    )
  }

  return (
    <nav aria-label="İçindekiler">
      <p className="m-0 mb-3 text-small font-[500] text-grafit">Bu yazıda</p>
      {liste}
    </nav>
  )
}

function YaziBulunamadi() {
  return (
    <SayfaIskeleti whatsappMesaj={BLOG_WA_MESAJ}>
      <Bolum cizgi={false} baslikId="yazi-yok-baslik">
        <div className="col-span-full md:col-span-8">
          <h1 id="yazi-yok-baslik" className="m-0 font-serif text-h1 font-[400]">
            Bu yazıyı bulamadık
          </h1>
          <p className="m-0 mt-6 max-w-[44ch] text-lead text-grafit-2">
            Yayından kaldırılmış olabilir. Diğer rehberler blog sayfasında.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Buton to="/blog">Rehbere dönün</Buton>
            <MetinBaglanti to="/">Ana sayfa</MetinBaglanti>
          </div>
        </div>
      </Bolum>
    </SayfaIskeleti>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getBlogPost(slug)
  const jsonLd = useMemo(() => (post ? blogPostJsonLd(post) : null), [post])
  const ilgili = useMemo(() => (post ? ilgiliYazilar(post.slug) : []), [post])

  usePageSeo({
    title: post?.seoTitle || BLOG_YAZI_YOK_SEO.title,
    description: post?.description || BLOG_YAZI_YOK_SEO.description,
    path: post ? `/blog/${post.slug}` : '/blog',
    image: post?.image,
    type: post ? 'article' : 'website',
    publishedTime: post?.published,
    modifiedTime: post?.updated,
  })
  useJsonLd('blog-post-jsonld', jsonLd)

  if (!post) return <YaziBulunamadi />

  const icindekiler =
    post.sections.length >= ICINDEKILER_ESIGI
      ? [
          ...post.sections.map((s, i) => ({ href: `#bolum-${i + 1}`, etiket: s.heading })),
          ...(post.faqs?.length ? [{ href: '#sikca-sorulanlar', etiket: 'Sıkça sorulanlar' }] : []),
        ]
      : null

  return (
    <SayfaIskeleti whatsappMesaj={BLOG_WA_MESAJ}>
      <article aria-labelledby="yazi-baslik">
        {/* Baş: geri bağlantı, künye, başlık, giriş, kapak */}
        <Kapsayici as="header" className="pt-6 md:pt-10">
          <Izgara className="gap-y-0">
            <nav aria-label="Sayfa yolu" className="col-span-full">
              <Link
                to="/blog"
                className="inline-flex min-h-11 items-center gap-2 text-small text-grafit-2 no-underline transition-colors duration-(--mf-sure-hizli) ease-mf hover:text-recine"
              >
                <Ikon ad="geri" boyut={16} />
                Blog
              </Link>
            </nav>

            <p className="col-span-full m-0 mt-8 flex flex-wrap gap-x-6 gap-y-1 text-small text-sis md:mt-12">
              <span>{kunye(post)}</span>
              <time dateTime={post.published}>{tarihMetni(post.published)}</time>
            </p>
            <h1
              id="yazi-baslik"
              className="col-span-full m-0 mt-4 max-w-[22ch] font-serif text-h1 font-[400] md:col-span-10 lg:col-span-8"
            >
              {post.title}
            </h1>
            <p className="col-span-full m-0 mt-6 max-w-[48ch] text-lead text-grafit-2 md:col-span-8 lg:col-span-6">
              {post.excerpt}
            </p>

            <div className="col-span-full mt-10 md:col-span-10 md:col-start-2 md:mt-14">
              <UrunGorseli
                src={post.image}
                alt={post.imageAlt}
                oran="genis"
                oncelikli
                sizes="(min-width: 768px) 82vw, 100vw"
              />
            </div>
          </Izgara>
        </Kapsayici>

        {/* Gövde: içindekiler + okuma sütunu */}
        <Kapsayici className="py-(--mf-bolum-kucuk)">
          <Izgara className="gap-y-10">
            {icindekiler && (
              <aside className="col-span-full hidden lg:sticky lg:top-24 lg:col-span-3 lg:block lg:self-start">
                <Icindekiler baglantilar={icindekiler} />
              </aside>
            )}

            <div className="col-span-full min-w-0 md:col-span-10 lg:col-span-7 lg:col-start-5">
              <div className="mf-yazi max-w-[62ch]">
                {icindekiler && (
                  <div className="mb-10">
                    <Icindekiler baglantilar={icindekiler} mobil />
                  </div>
                )}

                {post.intro.map((paragraf) => (
                  <p key={paragraf}>{paragraf}</p>
                ))}

                {post.sections.map((bolum, i) => (
                  <section key={bolum.heading} id={`bolum-${i + 1}`} aria-labelledby={`bolum-${i + 1}-baslik`}>
                    <h2 id={`bolum-${i + 1}-baslik`}>{bolum.heading}</h2>
                    {bolum.paragraphs?.map((paragraf) => (
                      <p key={paragraf}>{paragraf}</p>
                    ))}
                    {bolum.bullets && (
                      <ul>
                        {bolum.bullets.map((madde) => (
                          <li key={madde}>{madde}</li>
                        ))}
                      </ul>
                    )}
                    {bolum.note && (
                      <aside aria-label="Not" className="mf-yazi-not">
                        <p>{bolum.note}</p>
                      </aside>
                    )}
                  </section>
                ))}

                {post.faqs?.length > 0 && (
                  <section id="sikca-sorulanlar" aria-labelledby="sikca-sorulanlar-baslik">
                    <h2 id="sikca-sorulanlar-baslik">Sıkça sorulanlar</h2>
                    <div className="mt-6 border-b border-cizgi">
                      {post.faqs.map((sss) => (
                        <div key={sss.question} className="border-t border-cizgi py-5">
                          <h3 className="m-0 font-sans text-[1.125rem] leading-[1.4] font-[500] text-grafit">
                            {sss.question}
                          </h3>
                          <p className="m-0 mt-2 text-grafit-2">{sss.answer}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Tek, sakin teklif çağrısı (METIN §4.3) */}
              <div className="mt-(--mf-bolum-kucuk) max-w-[62ch] border-t border-grafit pt-6">
                <p className="m-0 text-lead text-grafit">
                  Bu yazıdaki parçayı bastırmak isterseniz fotoğrafını gönderin.
                </p>
                <Buton href="/#order" className="mt-6">
                  Teklif isteyin
                </Buton>
              </div>
            </div>
          </Izgara>
        </Kapsayici>
      </article>

      {ilgili.length > 0 && (
        <Bolum bosluk="kucuk" baslikId="ilgili-baslik" icClassName="gap-y-10">
          <div className="col-span-full flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
            <h2 id="ilgili-baslik" className="m-0 font-serif text-h2 font-[400]">
              İlgili yazılar
            </h2>
            <MetinBaglanti to="/blog">Bütün yazılar</MetinBaglanti>
          </div>
          <div className="col-span-full grid grid-cols-1 gap-x-(--mf-oluk) gap-y-10 md:grid-cols-2">
            {ilgili.map((yazi) => (
              <YaziSatiri key={yazi.slug} yazi={yazi} />
            ))}
          </div>
        </Bolum>
      )}
    </SayfaIskeleti>
  )
}
