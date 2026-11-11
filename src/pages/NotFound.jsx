import usePageSeo from '../hooks/usePageSeo'
import SayfaIskeleti from '../components/yerlesim/SayfaIskeleti'
import SayfaBasligi from '../components/yerlesim/SayfaBasligi'
import { Buton } from '../components/temel/Buton'

// Tanımsız yollar için 404 (App.jsx "*"). Vercel catch-all rewrite HTTP 200 döndürdüğü için
// dizine girmesin diye robots noindex basılır (kanonik ana sayfayı gösterir).
// Görünüm ProductDetail'deki "Bulunamadı" ile aynı dil: gök bandı, kısa açıklama, iki yol.
export default function NotFound() {
  usePageSeo({
    title: 'Sayfa bulunamadı | MicronForge',
    description: 'Aradığınız sayfa taşınmış ya da hiç olmamış olabilir. Mağazaya ya da ana sayfaya dönebilirsiniz.',
    path: '/',
    noindex: true,
  })

  return (
    <SayfaIskeleti>
      <SayfaBasligi
        baslik="Bu sayfa"
        vurgu="burada yok"
        ust={
          <p className="mf-cam m-0 mb-6 inline-flex min-h-9 items-center rounded-hap px-4 text-small font-[600] text-grafit-2">
            404
          </p>
        }
        className="pb-(--mf-bolum)!"
      >
        <p className="m-0 mt-6 max-w-[38ch] text-lead text-grafit-2">
          Bağlantı eskimiş ya da adres yanlış yazılmış olabilir.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Buton to="/">Ana sayfaya dönün</Buton>
          <Buton to="/magaza" tur="cerceve">
            Mağazaya bakın
          </Buton>
        </div>
      </SayfaBasligi>
    </SayfaIskeleti>
  )
}
