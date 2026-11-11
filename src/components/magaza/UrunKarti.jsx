import { useState } from 'react'
import { Link } from 'react-router-dom'
import UrunGorseli from '../temel/UrunGorseli'
import { genisMi, kaynakKumesi } from '../temel/gorsel'
import Ikon from '../temel/Ikon'

// UrunKarti: mağaza listesi, ana sayfa vitrini ve "Benzer parçalar" için tek kart. Kartın tamamı tek bağlantı:
// beyaz yuvarlak kart, içinde 3:4 fotoğraf, altında ad + kategori ve sağda ok düğmesi.
// Hover (yalnız hover destekli cihazda): kart hafifçe yükselir; ikinci dikey fotoğraf varsa çapraz geçişle görünür.
// Props: urun (products.js kaydı), oncelikli (ekran üstü kart: eager yükle), baslik (ürün adı öğesi: listede 'h2', bir h2 altındaysa 'h3'), sizes, className.
export default function UrunKarti({ urun, oncelikli = false, baslik: Baslik = 'h2', sizes = '(min-width: 1024px) 24vw, (min-width: 768px) 31vw, 46vw', className = '' }) {
  // Hover'da gösterilecek ikinci fotoğraf: yatay çekimler 3:4 kutuda kırpılacağı için atlanır
  const ikinci = urun.photos?.slice(1).find((f) => !genisMi(f))
  const [ikinciHata, setIkinciHata] = useState(false)
  const ikinciVar = Boolean(ikinci) && !ikinciHata

  return (
    <Link
      to={`/magaza/${urun.id}`}
      className={`group block rounded-kart bg-kirec p-1.5 text-grafit no-underline shadow-kart transition-[box-shadow,translate] duration-(--mf-sure-orta) ease-mf hover:-translate-y-1 hover:shadow-yuzen md:p-2 ${className}`}
    >
      <div className="relative overflow-hidden rounded-[calc(var(--mf-r-kart)-0.4rem)]">
        <UrunGorseli product={urun} kose="yok" buyut={!ikinciVar} oncelikli={oncelikli} sizes={sizes} />
        {ikinciVar && (
          <img
            src={ikinci}
            srcSet={kaynakKumesi(ikinci)}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            sizes={sizes}
            onError={() => setIkinciHata(true)}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-(--mf-sure-orta) ease-mf group-hover:opacity-100"
          />
        )}
      </div>
      <div className="flex items-center justify-between gap-3 px-2 pt-3 pb-2 md:px-3 md:pt-3.5 md:pb-2.5">
        <div className="min-w-0">
          <Baslik className="m-0 text-[1rem] leading-[1.2] font-[700] tracking-[-0.02em] text-balance md:text-[1.0625rem]">
            {urun.name}
          </Baslik>
          <p className="m-0 mt-0.5 text-small text-sis">{urun.categoryLabel}</p>
        </div>
        <span
          aria-hidden="true"
          className="hidden h-9 w-9 flex-none place-items-center rounded-hap bg-tas text-grafit transition-colors duration-(--mf-sure-hizli) group-hover:bg-grafit group-hover:text-kirec md:grid"
        >
          <Ikon ad="capraz" boyut={16} />
        </span>
      </div>
    </Link>
  )
}
