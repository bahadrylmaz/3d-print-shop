import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Kapsayici } from '../temel/Kapsayici'
import Bolum from '../temel/Bolum'
import { Buton, MetinBaglanti } from '../temel/Buton'
import Ikon from '../temel/Ikon'
import SayfaBasligi from '../yerlesim/SayfaBasligi'
import UrunKarti from './UrunKarti'
import KategoriSekmeleri from './KategoriSekmeleri'
import { products, filters, SITE } from '../../data/products'
import { INSTAGRAM_KULLANICI, INSTAGRAM_URL, WA_GENEL_MESAJ, waBaglanti } from '../../data/iletisim'
import useJsonLd from '../../hooks/useJsonLd'

// Mağaza listesi (/magaza): gök bandında ortalanmış başlık → hap filtreler + sayaç → ürün ızgarası (mobil 2, md 3, xl 4 sütun) → özel baskı paneli.
// Filtre adreste: /magaza?kategori=super-kahraman (paylaşılabilir; kanonik adres yine /magaza). Bilinmeyen değer "Tümü" sayılır.
// Filtre değişince ızgara 160 ms çapraz geçiş (hareket azaltmada anında).
const sayKategori = (id) => (id === 'all' ? products.length : products.filter((p) => p.category === id).length)

export default function Magaza() {
  const [params, setParams] = useSearchParams()
  const azHareket = useReducedMotion()

  const secili = filters.find((f) => f.kategori && f.kategori === params.get('kategori'))?.id ?? 'all'
  const liste = secili === 'all' ? products : products.filter((p) => p.category === secili)
  // Ürünü olmayan kategori düğmesi gösterilmez (adresten seçilmişse görünür kalır)
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

  const gecis = { duration: azHareket ? 0 : 0.16, ease: [0.2, 0, 0, 1] }

  return (
    <>
      <section aria-labelledby="magaza-baslik">
        <SayfaBasligi
          baslikId="magaza-baslik"
          baslik="Mağaza:"
          vurgu="elde boyanmış figürler"
          className="pb-8!"
        >
          <p className="m-0 mt-6 max-w-[50ch] text-lead text-grafit-2">
            Atölyede basılıp boyanmış koleksiyon parçaları. Her birini farklı ölçüde yeniden basabiliriz. Siparişler
            WhatsApp&apos;tan alınır.
          </p>
          <p className="m-0 mt-3 text-small text-sis">
            Fiyat için WhatsApp&apos;tan yazın. Ölçü, adet ve boyaya göre hesaplıyoruz.
          </p>
        </SayfaBasligi>

        <Kapsayici className="pb-(--mf-bolum)">
          {products.length > 0 && (
            <KategoriSekmeleri
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
                <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 pt-5 md:grid-cols-3 md:gap-4 md:pt-8 xl:grid-cols-4">
                  {liste.map((urun, i) => (
                    <li key={urun.id}>
                      {/* İlk satır ekranın üstünde (LCP adayı): lazy yerine eager + fetchpriority high */}
                      <UrunKarti urun={urun} oncelikli={i < 4} sizes="(min-width: 1280px) 300px, (min-width: 768px) 31vw, 46vw" />
                    </li>
                  ))}
                </ul>
              ) : (
                <BosDurum tamamenBos={products.length === 0} />
              )}
            </motion.div>
          </AnimatePresence>
        </Kapsayici>
      </section>

      <Bolum panel="tas" bosluk="yok" izgara={false} baslikId="ozel-baski-baslik">
        <div className="flex flex-col items-center text-center">
          <h2 id="ozel-baski-baslik" className="m-0 max-w-[20ch] text-h2 font-[700]">
            Aradığınız karakter <em className="mf-italik">burada yok mu?</em>
          </h2>
          <p className="m-0 mt-5 max-w-[46ch] text-grafit-2">
            Adını ya da fotoğrafını gönderin, sizin için basalım.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Buton href={waBaglanti(WA_GENEL_MESAJ)}>
              <Ikon ad="whatsapp" />
              WhatsApp&apos;tan yazın
            </Buton>
            <Buton href="/#order" tur="cerceve">
              Teklif formu
            </Buton>
          </div>
          <p className="m-0 mt-5 text-grafit-2">
            Instagram&apos;da daha fazla iş: <MetinBaglanti href={INSTAGRAM_URL}>{INSTAGRAM_KULLANICI}</MetinBaglanti>
          </p>
        </div>
      </Bolum>
    </>
  )
}

// Boş durumlar: kategori boş ya da mağaza tamamen boş
function BosDurum({ tamamenBos }) {
  return (
    <div className="mt-8 flex flex-col items-center rounded-panel bg-tas px-6 py-14 text-center">
      <p className="m-0 max-w-[38ch] text-lead text-grafit-2">
        {tamamenBos
          ? 'Yeni parçaların fotoğrafları çekiliyor. Bu arada istediğiniz parçayı fotoğrafla anlatabilirsiniz.'
          : 'Bu kategoride şu an parça yok. Benzerini sizin için basabiliriz.'}
      </p>
      <Buton href="/#order" className="mt-8">
        Teklif isteyin
      </Buton>
    </div>
  )
}
