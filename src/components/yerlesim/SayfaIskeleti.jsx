import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppDugmesi from './WhatsAppDugmesi'

// SayfaIskeleti: her sayfanın ortak çerçevesi: "İçeriğe geç" bağlantısı -> Navbar -> <main id="icerik"> -> Footer -> WhatsApp düğmesi.
// Props: whatsappGizli (true: gizli; 'mobil': yalnız mobilde gizli, ürün sayfasında yapışkan alt çubuk varken), whatsappMesaj (ör. blogda METIN §5 blog mesajı).
// Örnek: <SayfaIskeleti><Bolum>…</Bolum></SayfaIskeleti>
export default function SayfaIskeleti({ children, whatsappGizli = false, whatsappMesaj }) {
  return (
    <>
      <a
        href="#icerik"
        className="fixed top-2 left-2 z-(--mf-z-modal) -translate-y-[200%] rounded-kontrol bg-grafit px-4 py-3 text-small text-kirec focus:translate-y-0"
      >
        İçeriğe geç
      </a>
      <Navbar />
      <main id="icerik" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      {/* Sabit düğme de bir landmark içinde kalsın (axe: region) */}
      <aside aria-label="Hızlı iletişim">
        <WhatsAppDugmesi gizli={whatsappGizli} {...(whatsappMesaj ? { mesaj: whatsappMesaj } : {})} />
      </aside>
    </>
  )
}
