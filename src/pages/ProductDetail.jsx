import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct, products, filters, fmt, waOrder, SITE } from '../data/products'
import { waBaglanti } from '../data/iletisim'
import usePageSeo from '../hooks/usePageSeo'
import useJsonLd from '../hooks/useJsonLd'
import SayfaIskeleti from '../components/yerlesim/SayfaIskeleti'
import SayfaBasligi from '../components/yerlesim/SayfaBasligi'
import { Kapsayici, Izgara } from '../components/temel/Kapsayici'
import Bolum from '../components/temel/Bolum'
import { Buton, MetinBaglanti } from '../components/temel/Buton'
import Ikon from '../components/temel/Ikon'
import UrunGalerisi from '../components/magaza/UrunGalerisi'
import UrunKarti from '../components/magaza/UrunKarti'

// Ürün detayı (/magaza/:slug).
// 1280: kırıntı → galeri (7 kol) | beyaz bilgi kartı: ad, açıklama, sipariş, Ayrıntılar (5 kol, yapışkan) → Nasıl basılır paneli → Benzer parçalar.
// 375: tek sütun; altta yüzen sipariş çubuğu, genel WhatsApp düğmesi yalnız mobilde gizli.
// Sipariş akışı bugünkü gibi: "WhatsApp'tan sipariş verin" -> waOrder(ürün adı) (wa.me, METIN §4.2 mesajı);
// "Farklı ölçüde isteyin" -> ana sayfadaki teklif formu (/#order).
// Bulunamayan slug: gök bandında kısa açıklama ve iki yol; noindex.
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

// Bilgi tablosu: veri yoksa sağ sütundaki varsayılan yazılır
function ayrintilar(u) {
  const olcu = Array.isArray(u.dimensions) ? `${u.dimensions.join(' × ')} mm` : u.dimensions
  const sure = typeof u.leadTime === 'number' ? `${u.leadTime} iş günü` : u.leadTime
  const yuzey = u.finish ?? (/boyal/i.test(u.material ?? '') ? 'Boyalı' : 'Boyasız, destekleri temizlenmiş.')
  return [
    ['Malzeme', u.material && cumleDuzeni(u.material)],
    ['Ölçü', olcu || 'Ölçüyü siparişte birlikte belirliyoruz.'],
    ['Katman', '25 mikron (Tough reçinede 50 mikron)'],
    // Boyalı parçada boyama süresi işe göre değişir; uydurma gün sayısı yazılmaz
    ['Üretim süresi', sure || (u.finish ? 'Baskı ve kürleme 6-24 saat. Boyama süresini siparişte yazıyoruz.' : 'Baskı ve kürleme 6-24 saat, teslim 1-2 gün.')],
    ['Yüzey', yuzey],
    ['Teslim', "Manisa ve İzmir'de elden, Türkiye geneline kargo"],
  ].filter(([, deger]) => deger)
}

const fiyatMetni = (u) => {
  const deger = u.price ?? u.priceFrom
  return deger != null ? `${fmt(deger)} TL` : null // ₺ yerine TL: Schibsted Grotesk'in ₺ glifi £ ile karışıyor
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
    // Paylaşım/arama önizlemesi ürünün kendi fotoğrafı (yoksa varsayılan og-image)
    ...(product?.photos?.[0] ? { image: product.photos[0] } : {}),
    noindex: !product,
  })

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
  // Önce aynı kategoriden, yetmezse diğerlerinden: her zaman 4 kart
  const benzerler = [
    ...products.filter((p) => p.category === product.category && p.id !== product.id),
    ...products.filter((p) => p.category !== product.category),
  ].slice(0, 4)

  return (
    <SayfaIskeleti whatsappGizli="mobil">
      {/* Kısa gök bandı yüzen menünün arkasında kalır; içerik onun üstüne biner */}
      <div className="mf-gok-kisa h-56" aria-hidden="true" />
      <div className="-mt-56 pt-[5.5rem]">
        <Kirinti kategori={kategori} />

        <Kapsayici className="pt-2 pb-(--mf-bolum-kucuk) md:pt-4">
          <Izgara className="gap-y-6">
            <div className="col-span-full md:col-span-7">
              <UrunGalerisi key={product.id} urun={product} />
            </div>

            <div className="col-span-full rounded-panel bg-kirec p-6 shadow-kart md:sticky md:top-24 md:col-span-5 md:self-start md:p-8">
              {kategori && (
                <p className="m-0 mb-4 inline-flex min-h-8 items-center rounded-hap bg-recine-acik px-3 text-small font-[600] text-recine-koyu">
                  {product.categoryLabel}
                </p>
              )}
              <h1 className="m-0 text-h1 font-[700]">{product.name}</h1>
              {product.desc && <p className="m-0 mt-4 max-w-[46ch] text-grafit-2">{product.desc}</p>}

              {fiyat && (
                <div className="mt-8">
                  <p className="m-0 text-small text-sis">{product.price != null ? 'Fiyat' : 'Başlangıç fiyatı'}</p>
                  <p className="mf-rakam m-0 mt-1 text-[1.5rem] leading-[1.2] font-[700]">{fiyat}</p>
                  <p className="m-0 mt-2 text-small text-sis">
                    Standart ölçü ve tek renk içindir. Ölçü, renk ve adet fiyatı değiştirir.
                  </p>
                </div>
              )}

              <div className="mt-7 grid gap-2.5">
                <Buton href={waOrder(product.name)} genis>
                  <Ikon ad="whatsapp" />
                  WhatsApp&apos;tan sipariş verin
                </Buton>
                <Buton href={waBaglanti()} tur="cerceve" genis>
                  Soru sorun
                </Buton>
              </div>
              <p className="m-0 mt-4 max-w-[46ch] text-small text-grafit-2">
                Sipariş WhatsApp&apos;tan alınır. Ölçü, renk, fiyat ve teslim tarihini orada netleştirip baskıya öyle
                geçeriz. Aynı parçayı farklı ölçüde de basabiliriz.
              </p>

              <section aria-labelledby="ayrintilar-baslik" className="mt-9">
                <h2 id="ayrintilar-baslik" className="m-0 mb-3 text-h3 font-[700]">
                  Ayrıntılar
                </h2>
                <dl className="m-0">
                  {ayrintilar(product).map(([ad, deger]) => (
                    <div key={ad} className="grid grid-cols-[7rem_1fr] gap-x-4 border-t border-cizgi py-3">
                      <dt className="text-small text-sis">{ad}</dt>
                      <dd className="m-0 text-small font-[500] text-grafit">{deger}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </Izgara>
        </Kapsayici>
      </div>

      <Bolum panel="tas" bosluk="dar" baslikId="nasil-basilir-baslik" icClassName="gap-y-6">
        <h2 id="nasil-basilir-baslik" className="col-span-full m-0 text-h2 font-[700] md:col-span-5">
          Nasıl <em className="mf-italik">basılır</em>
        </h2>
        <div className="col-span-full md:col-span-6 md:col-start-7">
          <p className="m-0 max-w-[62ch] text-lead text-grafit-2">
            Saturn 4 Ultra 16K yazıcıda 25 mikron katmanla basılır. IPA ile yıkanır, UV ile kürlenir, destekleri elde
            temizlenir ve paketlenmeden önce kontrol edilir.
          </p>
          <Buton href="/#order" tur="cerceve" className="mt-7">
            Farklı ölçüde isteyin
          </Buton>
        </div>
      </Bolum>

      {benzerler.length > 0 && (
        <Bolum baslikId="benzer-baslik" bosluk="kucuk" izgara={false}>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-2 md:mb-8">
            <h2 id="benzer-baslik" className="m-0 text-h2 font-[700]">
              Benzer <em className="mf-italik">parçalar</em>
            </h2>
            <MetinBaglanti to="/magaza">Bütün koleksiyon</MetinBaglanti>
          </div>
          <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 md:gap-4 lg:grid-cols-4">
            {benzerler.map((urun) => (
              <li key={urun.id}>
                <UrunKarti urun={urun} baslik="h3" />
              </li>
            ))}
          </ul>
        </Bolum>
      )}

      {/* Mobil yüzen sipariş çubuğu: main içinde sticky, footer'ın üstünü örtmez */}
      <div className="pointer-events-none sticky bottom-0 z-(--mf-z-yapiskan) px-3 pb-3 md:hidden">
        <div className="mf-cam pointer-events-auto flex min-h-16 items-center justify-between gap-3 rounded-hap p-2">
          {fiyat && (
            <p className="mf-rakam m-0 pl-4 text-[1.0625rem] font-[700] whitespace-nowrap">
              {product.price == null && <span className="sr-only">Başlangıç fiyatı </span>}
              {fiyat}
            </p>
          )}
          {/* Fiyat yoksa (ürünlerde fiyat gösterilmiyor) düğme çubuğu tam genişlikte doldurur */}
          <Buton href={waOrder(product.name)} genis={!fiyat} className="px-5">
            <Ikon ad="whatsapp" />
            WhatsApp&apos;tan sipariş verin
          </Buton>
        </div>
      </div>
    </SayfaIskeleti>
  )
}

function Kirinti({ kategori }) {
  const BAGLANTI =
    'inline-flex min-h-11 items-center gap-2 text-grafit-2 no-underline transition-colors duration-(--mf-sure-hizli) hover:text-recine'
  return (
    <Kapsayici as="nav" aria-label="Konum">
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-3 p-0 text-small text-grafit-2">
        <li>
          <Link to="/magaza" className={BAGLANTI}>
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
              <Link to={`/magaza?kategori=${kategori.kategori}`} className={BAGLANTI}>
                {kategori.label}
              </Link>
            </li>
          </>
        )}
      </ol>
    </Kapsayici>
  )
}

function Bulunamadi() {
  return (
    <SayfaIskeleti>
      <SayfaBasligi baslik="Bu ürün artık" vurgu="mağazada yok" className="pb-(--mf-bolum)!">
        <p className="m-0 mt-6 max-w-[38ch] text-lead text-grafit-2">
          Aynı parçayı ya da benzerini sipariş üzerine basabiliriz.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Buton to="/magaza">Mağazaya dönün</Buton>
          <Buton to="/" tur="cerceve">
            Ana sayfa
          </Buton>
        </div>
      </SayfaBasligi>
    </SayfaIskeleti>
  )
}
