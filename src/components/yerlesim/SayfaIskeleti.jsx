import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppDugmesi from './WhatsAppDugmesi'

// SayfaIskeleti: her sayfanın ortak çerçevesi: "İçeriğe geç" bağlantısı -> Navbar -> <main id="icerik"> -> Footer -> WhatsApp düğmesi.
// Navbar yüzer (fixed): sayfanın ilk bölümü üst boşluğu kendisi bırakır (Hero, SayfaBasligi).
// Props: whatsappGizli (true: gizli; 'mobil': yalnız mobilde gizli, ürün sayfasında yapışkan alt çubuk varken), whatsappMesaj (ör. blog mesajı).
// Örnek: <SayfaIskeleti><Bolum>…</Bolum></SayfaIskeleti>
export default function SayfaIskeleti({ children, whatsappGizli = false, whatsappMesaj }) {
  return (
    <>
      <a
        href="#icerik"
        className="fixed top-2 left-2 z-(--mf-z-modal) -translate-y-[200%] rounded-hap bg-grafit px-5 py-3 text-small font-[600] text-kirec focus:translate-y-0"
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
