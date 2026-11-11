import { Kapsayici } from '../temel/Kapsayici'

// SayfaBasligi: iç sayfaların açılışı (Mağaza, Blog, 404). Kısa gök bandı, ortalanmış H1 + giriş metni.
// Yüzen menünün altında kalmasın diye üst boşluğu kendisi bırakır.
// Props: baslikId, baslik (düz metin), vurgu (başlığın italik devamı, isteğe bağlı), ust (H1 üstü küçük satır), children (giriş ve eylemler).
// Örnek: <SayfaBasligi baslikId="magaza-baslik" baslik="Raftakiler," vurgu="elde boyanmış."><p>…</p></SayfaBasligi>
export default function SayfaBasligi({ baslikId, baslik, vurgu, ust, children, className = '' }) {
  return (
    <div className={`mf-gok-kisa pt-[calc(5.5rem+var(--mf-bolum-kucuk))] pb-(--mf-bolum-kucuk) ${className}`}>
      <Kapsayici className="flex flex-col items-center text-center">
        {ust}
        <h1 id={baslikId} className="m-0 max-w-[18ch] text-h1 font-[700]">
          {baslik}
          {vurgu && (
            <>
              {' '}
              <em className="mf-italik">{vurgu}</em>
            </>
          )}
        </h1>
        {children}
      </Kapsayici>
    </div>
  )
}
