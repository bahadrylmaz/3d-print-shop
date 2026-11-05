import usePageSeo from '../hooks/usePageSeo'
import SayfaIskeleti from '../components/yerlesim/SayfaIskeleti'
import { Kapsayici, Izgara } from '../components/temel/Kapsayici'
import { Buton, MetinBaglanti } from '../components/temel/Buton'
import UrunGorseli from '../components/temel/UrunGorseli'

// Tanımsız yollar için 404 (App.jsx "*"). Vercel catch-all rewrite HTTP 200 döndürdüğü için
// dizine girmesin diye robots noindex basılır (kanonik ana sayfayı gösterir).
// Görünüm ProductDetail'deki "Bulunamadı" ile aynı dil: Bodoni başlık, kısa açıklama, iki yol.
export default function NotFound() {
  usePageSeo({
    title: 'Sayfa bulunamadı | MicronForge',
    description: 'Aradığınız sayfa taşınmış ya da hiç olmamış olabilir. Mağazaya ya da ana sayfaya dönebilirsiniz.',
    path: '/',
    noindex: true,
  })

  return (
    <SayfaIskeleti>
      <Kapsayici className="pt-10 pb-(--mf-bolum) md:pt-16">
        <Izgara className="gap-y-12">
          <div className="col-span-full md:col-span-5 md:self-center">
            <p className="m-0 mb-6 text-small text-grafit-2">404</p>
            <h1 className="m-0 font-serif text-h1 font-[400]">Bu sayfa burada yok</h1>
            <p className="m-0 mt-6 max-w-[38ch] text-lead text-grafit-2">
              Bağlantı eskimiş ya da adres yanlış yazılmış olabilir.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Buton to="/">Ana sayfaya dönün</Buton>
              <MetinBaglanti to="/magaza">Mağazaya bakın</MetinBaglanti>
            </div>
          </div>
          <div className="col-span-full max-md:hidden md:col-span-5 md:col-start-8">
            <UrunGorseli />
          </div>
        </Izgara>
      </Kapsayici>
    </SayfaIskeleti>
  )
}
