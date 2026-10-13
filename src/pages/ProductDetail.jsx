import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct, products, filters, fmt, waOrder, productJsonLd, SITE } from '../data/products'
import { waBaglanti } from '../data/iletisim'
import usePageSeo from '../hooks/usePageSeo'
import useJsonLd from '../hooks/useJsonLd'
import SayfaIskeleti from '../components/yerlesim/SayfaIskeleti'
import { Kapsayici, Izgara } from '../components/temel/Kapsayici'
import Bolum from '../components/temel/Bolum'
import { Buton, MetinBaglanti } from '../components/temel/Buton'
import Ikon from '../components/temel/Ikon'
import UrunGorseli from '../components/temel/UrunGorseli'
import UrunGalerisi from '../components/magaza/UrunGalerisi'
import UrunKarti from '../components/magaza/UrunKarti'

// Ürün detayı (/magaza/:slug): YON §6.4, METIN §4.2 ve §6.
// 1280: kırıntı → galeri (7 kol) | ad, açıklama, fiyat, sipariş, Ayrıntılar (4 kol, yapışkan) → Nasıl basılır → Benzer parçalar.
// 375: tek sütun; altta yapışkan çubuk (fiyat + sipariş), genel WhatsApp düğmesi yalnız mobilde gizli.
// Sipariş akışı bugünkü gibi: "WhatsApp'tan sipariş verin" -> waOrder(ürün adı) (wa.me, METIN §4.2 mesajı);
// "Farklı ölçüde isteyin" -> ana sayfadaki teklif formu (/#order).
// Bulunamayan slug: aynı iskelet, METIN §2 404 metni; kanonik /magaza (eski davranış).
const cumleDuzeni = (s = '') => s.charAt(0) + s.slice(1).toLocaleLowerCase('tr')
const kategoriFiltresi = (urun) => filters.find((f) => f.id === urun.category && f.kategori)

const SEO_EK = "Manisa ve İzmir'de elden teslim, Türkiye geneline kargo."

// METIN §6: başlık "{ad} | MicronForge Mağaza", ad 29 karakteri geçerse "{ad} | MicronForge"
const seoBaslik = (u) => (u.name.length > 29 ? `${u.name} | MicronForge` : `${u.name} | MicronForge Mağaza`)

// METIN §6: "{ad}: {desc} {Malzeme}, SLA reçine 3D baskı. Manisa ve İzmir'de ..."; 155'i geçerse desc kısaltılır
function seoAciklama(u) {
  const malzeme = `${cumleDuzeni(u.material)}, SLA reçine 3D baskı.`
  const tam = `${u.name}: ${u.desc} ${malzeme} ${SEO_EK}`
  if (tam.length <= 155) return tam
  const yer = 155 - (tam.length - u.desc.length) - 1
  const kisa = u.desc.slice(0, Math.max(0, yer)).replace(/[\s,.;:]+\S*$/, '')
  return `${u.name}: ${kisa}… ${malzeme} ${SEO_EK}`
}

// METIN §4.2 bilgi tablosu: veri yoksa sağ sütundaki varsayılan yazılır
function ayrintilar(u) {
  const olcu = Array.isArray(u.dimensions) ? `${u.dimensions.join(' × ')} mm` : u.dimensions
  const sure = typeof u.leadTime === 'number' ? `${u.leadTime} iş günü` : u.leadTime
  const yuzey = u.finish ?? (/boyal/i.test(u.material ?? '') ? 'Boyalı' : 'Boyasız, destekleri temizlenmiş.')
  return [
    ['Malzeme', u.material && cumleDuzeni(u.material)],
    ['Ölçü', olcu || 'Ölçüyü siparişte birlikte belirliyoruz.'],
    ['Katman', '25 mikron (Tough reçinede 50 mikron)'],
    ['Üretim süresi', sure || 'Baskı ve kürleme 6-24 saat, teslim 1-2 gün.'],
    ['Yüzey', yuzey],
    ['Teslim', "Manisa ve İzmir'de elden, Türkiye geneline kargo"],
  ].filter(([, deger]) => deger)
}

const fiyatMetni = (u) => {
  const deger = u.price ?? u.priceFrom
  return deger != null ? `${fmt(deger)} ₺` : null
}

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)

  usePageSeo({
    title: product ? seoBaslik(product) : 'Ürün bulunamadı | MicronForge',
    description: product
      ? seoAciklama(product)
      : 'Bu ürün mağazada artık yok. Atölyede basılan diğer parçalara mağazadan bakabilirsiniz.',
    path: product ? `/magaza/${product.id}` : '/magaza',
  })

  const jsonLd = useMemo(() => (product ? productJsonLd(product) : null), [product])
  useJsonLd('product-jsonld', jsonLd)

  const kirintiLd = useMemo(
    () =>
      product
        ? {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'MicronForge', item: `${SITE}/` },
              { '@type': 'ListItem', position: 2, name: 'Mağaza', item: `${SITE}/magaza` },
              { '@type': 'ListItem', position: 3, name: product.name, item: `${SITE}/magaza/${product.id}` },
            ],
          }
        : null,
    [product]
  )
  useJsonLd('product-breadcrumb-jsonld', kirintiLd)

  if (!product) return <Bulunamadi />

  const kategori = kategoriFiltresi(product)
  const fiyat = fiyatMetni(product)
  const benzerler = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <SayfaIskeleti whatsappGizli="mobil">
      <Kirinti kategori={kategori} />

      <Kapsayici className="pt-6 pb-(--mf-bolum) md:pt-8">
        <Izgara className="gap-y-10">
          <div className="col-span-full md:col-span-7">
            <UrunGalerisi key={product.id} urun={product} />
          </div>

          <div className="col-span-full md:sticky md:top-[calc(68px+2rem)] md:col-span-5 md:col-start-8 md:self-start lg:col-span-4 lg:col-start-9">
            <h1 className="m-0 font-serif text-h2 font-[400]">{product.name}</h1>
            {product.desc && <p className="m-0 mt-4 max-w-[46ch] text-grafit-2">{product.desc}</p>}

            {fiyat && (
              <div className="mt-8">
                <p className="m-0 text-small text-sis">{product.price != null ? 'Fiyat' : 'Başlangıç fiyatı'}</p>
                <p className="mf-rakam m-0 mt-1 text-[1.5rem] leading-[1.2] font-[500]">{fiyat}</p>
                <p className="m-0 mt-2 text-small text-sis">
                  Standart ölçü ve tek renk içindir. Ölçü, renk ve adet fiyatı değiştirir.
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col items-start gap-2">
              <Buton href={waOrder(product.name)} genis>
                <Ikon ad="whatsapp" />
                WhatsApp'tan sipariş verin
              </Buton>
              <MetinBaglanti href={waBaglanti()}>Soru sorun</MetinBaglanti>
            </div>
            <p className="m-0 mt-3 max-w-[46ch] text-small text-grafit-2">
              Sipariş WhatsApp'tan alınır. Ölçü, renk ve teslim tarihini orada netleştirip baskıya öyle geçeriz. Aynı
              parçayı farklı ölçüde ya da reçinede de basabiliriz.
            </p>

            <section aria-labelledby="ayrintilar-baslik" className="mt-12">
              <h2 id="ayrintilar-baslik" className="m-0 mb-4 font-serif text-h3 font-[400]">
                Ayrıntılar
              </h2>
              <dl className="m-0 border-b border-cizgi">
                {ayrintilar(product).map(([ad, deger]) => (
                  <div key={ad} className="grid grid-cols-[7.5rem_1fr] gap-x-4 border-t border-cizgi py-3">
                    <dt className="text-small text-sis">{ad}</dt>
                    <dd className="m-0 text-small text-grafit">{deger}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </Izgara>
      </Kapsayici>

      <Bolum baslikId="nasil-basilir-baslik" icClassName="gap-y-6">
        <h2 id="nasil-basilir-baslik" className="col-span-full m-0 font-serif text-h2 font-[400] md:col-span-4">
          Nasıl basılır
        </h2>
        <div className="col-span-full md:col-span-7 md:col-start-6">
          {/* kaynak: METIN.md §4.2 "Nasıl basılır" (yazıcı ve katman bilgisi YON §9'da doğrulanacak olarak işaretli) */}
          <p className="m-0 max-w-[62ch] text-lead text-grafit-2">
            Saturn 4 Ultra 16K yazıcıda 25 mikron katmanla basılır. IPA ile yıkanır, UV ile kürlenir, destekleri elde
            temizlenir ve paketlenmeden önce kontrol edilir.
          </p>
          <Buton href="/#order" tur="cerceve" className="mt-8">
            Farklı ölçüde isteyin
          </Buton>
        </div>
      </Bolum>

      {benzerler.length > 0 && (
        <Bolum baslikId="benzer-baslik" icClassName="gap-y-12">
          <h2 id="benzer-baslik" className="col-span-full m-0 font-serif text-h2 font-[400]">
            Benzer parçalar
          </h2>
          {benzerler.map((urun, i) => (
            <UrunKarti
              key={urun.id}
              urun={urun}
              baslik="h3"
              sizes="(min-width: 768px) 30vw, 46vw"
              className={`col-span-2 md:col-span-4 ${i === 2 ? 'max-md:hidden' : ''} ${i === 1 ? 'md:mt-24' : ''}`}
            />
          ))}
        </Bolum>
      )}

      {/* Mobil yapışkan sipariş çubuğu (YON §6.4): main içinde sticky, footer'ın üstünü örtmez */}
      <div className="sticky bottom-0 z-(--mf-z-yapiskan) border-t border-cizgi bg-kirec md:hidden">
        <div className="flex min-h-16 items-center justify-between gap-4 px-(--mf-kenar) py-2">
          {fiyat ? (
            <p className="mf-rakam m-0 text-[1.0625rem] font-[500] whitespace-nowrap">
              {product.price == null && <span className="sr-only">Başlangıç fiyatı </span>}
              {fiyat}
            </p>
          ) : (
            <span />
          )}
          <Buton href={waOrder(product.name)} className="px-4">
            WhatsApp'tan sipariş verin
          </Buton>
        </div>
      </div>
    </SayfaIskeleti>
  )
}

function Kirinti({ kategori }) {
  return (
    <Kapsayici as="nav" aria-label="Konum" className="pt-4 md:pt-6">
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-3 p-0 text-small text-grafit-2">
        <li>
          <Link
            to="/magaza"
            className="inline-flex min-h-11 items-center gap-2 text-grafit-2 no-underline transition-colors duration-(--mf-sure-hizli) hover:text-recine"
          >
            <Ikon ad="geri" boyut={16} />
            Mağaza
          </Link>
        </li>
        {kategori && (
          <>
            <li aria-hidden="true" className="text-sis">
              /
            </li>
            <li>
              <Link
                to={`/magaza?kategori=${kategori.kategori}`}
                className="inline-flex min-h-11 items-center text-grafit-2 no-underline transition-colors duration-(--mf-sure-hizli) hover:text-recine"
              >
                {kategori.label}
              </Link>
            </li>
          </>
        )}
      </ol>
    </Kapsayici>
  )
}

// METIN §2 "Ürün 404"; YON §6.4: aynı iskelet (kırıntı, sol metin, sağda boş 3:4 kaide)
function Bulunamadi() {
  return (
    <SayfaIskeleti>
      <Kirinti />
      <Kapsayici className="pt-6 pb-(--mf-bolum) md:pt-8">
        <Izgara className="gap-y-12">
          <div className="col-span-full md:col-span-5 md:self-center">
            <h1 className="m-0 font-serif text-h1 font-[400]">Bu ürün artık mağazada yok</h1>
            <p className="m-0 mt-6 max-w-[38ch] text-lead text-grafit-2">
              Aynı parçayı ya da benzerini sipariş üzerine basabiliriz.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Buton to="/magaza">Mağazaya dönün</Buton>
              <MetinBaglanti to="/">Ana sayfa</MetinBaglanti>
            </div>
          </div>
          <div className="col-span-full md:col-span-5 md:col-start-8">
            <UrunGorseli />
          </div>
        </Izgara>
      </Kapsayici>
    </SayfaIskeleti>
  )
}
