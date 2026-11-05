import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Kapsayici, Izgara } from '../temel/Kapsayici'
import { Buton, MetinBaglanti } from '../temel/Buton'
import Ikon from '../temel/Ikon'
import UrunKarti from './UrunKarti'
import KategoriSekmeleri from './KategoriSekmeleri'
import { products, filters, SITE } from '../../data/products'
import { INSTAGRAM_KULLANICI, INSTAGRAM_URL, WA_GENEL_MESAJ, waBaglanti } from '../../data/iletisim'
import useJsonLd from '../../hooks/useJsonLd'

// Mağaza listesi (/magaza): YON §6.3, METIN §4.1.
// 1280: H1 (5 kol) | giriş + fiyat notu (5 kol, alta hizalı) → sekmeler + sayaç → 3 sütunlu raf (her kart 4 kol;
//   orta sütun 96 px aşağıda, "vitrin rafı" ritmi) → liste altı. 375: 2 sütun, sağ sütun 48 px aşağıda.
// Filtre adreste: /magaza?kategori=dekor (paylaşılabilir; kanonik adres yine /magaza). Bilinmeyen değer "Tümü" sayılır.
// Filtre değişince ızgara 140 ms çapraz geçiş (hareket azaltmada anında).
const sayKategori = (id) => (id === 'all' ? products.length : products.filter((p) => p.category === id).length)

export default function Magaza() {
  const [params, setParams] = useSearchParams()
  const azHareket = useReducedMotion()

  const secili = filters.find((f) => f.kategori && f.kategori === params.get('kategori'))?.id ?? 'all'
  const liste = secili === 'all' ? products : products.filter((p) => p.category === secili)
  // METIN §4.1: ürünü olmayan kategori sekmesi gösterilmez (adresten seçilmişse görünür kalır)
  const sekmeler = filters.filter((f) => f.id === 'all' || f.id === secili || sayKategori(f.id) > 0)

  const sec = (id) => {
    const f = filters.find((x) => x.id === id)
    const yeni = new URLSearchParams(params)
    if (f?.kategori) yeni.set('kategori', f.kategori)
    else yeni.delete('kategori')
    setParams(yeni, { replace: true })
  }

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'MicronForge mağazası',
      itemListElement: products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE}/magaza/${p.id}`,
        name: p.name,
      })),
    }),
    []
  )
  useJsonLd('shop-itemlist-jsonld', jsonLd)

  const gecis = { duration: azHareket ? 0 : 0.14, ease: [0.2, 0, 0, 1] }

  return (
    <>
      <section aria-labelledby="magaza-baslik" className="py-(--mf-bolum-kucuk)">
        <Kapsayici>
          <Izgara className="gap-y-6">
            <h1 id="magaza-baslik" className="col-span-full m-0 font-serif text-h1 font-[400] md:col-span-5">
              Mağaza
            </h1>
            <div className="col-span-full md:col-span-5 md:col-start-7 md:pt-3">
              <p className="m-0 max-w-[46ch] text-lead text-grafit-2">
                Atölyede basılmış dekor ve koleksiyon parçaları. Her birini farklı ölçü, renk ya da reçineyle yeniden
                basabiliriz. Siparişler WhatsApp'tan alınır.
              </p>
              <p className="m-0 mt-4 text-small text-sis">
                Fiyat için WhatsApp'tan yazın. Ölçü, adet ve boyaya göre hesaplıyoruz.
              </p>
            </div>
          </Izgara>

          {products.length > 0 && (
            <KategoriSekmeleri
              className="mt-(--mf-bolum-kucuk)"
              etiket="Kategoriye göre süz"
              secenekler={sekmeler}
              secili={secili}
              onSec={sec}
              sayac={`${liste.length} ürün`}
            />
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={secili}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={gecis}
            >
              {liste.length > 0 ? (
                <Izgara as="ul" className="m-0 list-none gap-y-12 p-0 pt-12 md:gap-y-20 md:pt-16">
                  {liste.map((urun, i) => (
                    <li
                      key={urun.id}
                      className={`col-span-2 md:col-span-4 ${i % 2 === 1 ? 'max-md:mt-12' : ''} ${i % 3 === 1 ? 'md:mt-24' : ''}`}
                    >
                      <UrunKarti urun={urun} sizes="(min-width: 1440px) 440px, (min-width: 768px) 31vw, 46vw" />
                    </li>
                  ))}
                </Izgara>
              ) : (
                <BosDurum tamamenBos={products.length === 0} />
              )}
            </motion.div>
          </AnimatePresence>
        </Kapsayici>
      </section>

      <section aria-label="Özel baskı" className="pb-(--mf-bolum)">
        <Kapsayici>
          <Izgara className="gap-y-6 border-t border-cizgi pt-8">
            <p className="col-span-full m-0 max-w-[38ch] font-serif text-h3 font-[400] md:col-span-6">
              Aradığınız parça burada yoksa fotoğrafını gönderin, sizin için basalım.
            </p>
            <div className="col-span-full flex flex-wrap items-center gap-x-8 gap-y-3 md:col-span-5 md:col-start-8 md:self-end md:justify-self-end">
              <Buton href={waBaglanti(WA_GENEL_MESAJ)} tur="cerceve">
                <Ikon ad="whatsapp" />
                WhatsApp'tan yazın
              </Buton>
              <p className="m-0 text-grafit-2">
                Instagram'da daha fazla iş: <MetinBaglanti href={INSTAGRAM_URL}>{INSTAGRAM_KULLANICI}</MetinBaglanti>
              </p>
            </div>
          </Izgara>
        </Kapsayici>
      </section>
    </>
  )
}

// METIN §2 boş durumlar: kategori boş ya da mağaza tamamen boş (yeni katalog gelene kadar)
function BosDurum({ tamamenBos }) {
  return (
    <Izgara className="pt-12 md:pt-16">
      <div className="col-span-full md:col-span-6">
        <p className="m-0 max-w-[38ch] text-lead text-grafit-2">
          {tamamenBos
            ? 'Yeni parçaların fotoğrafları çekiliyor. Bu arada istediğiniz parçayı fotoğrafla anlatabilirsiniz.'
            : 'Bu kategoride şu an parça yok. Benzerini sizin için basabiliriz.'}
        </p>
        <Buton href="/#order" className="mt-8">
          Teklif isteyin
        </Buton>
      </div>
      <div className="mf-fon col-span-2 mt-12 aspect-[3/4] md:col-span-3 md:col-start-9 md:mt-0" aria-hidden="true" />
    </Izgara>
  )
}
