import Bolum from '../temel/Bolum'

// Ana sayfa 6. bölüm "Atölyenin kuralları" (YON §6.2-6, METIN §3.4; eski Testimonials yerine).
// Tek sütun, sol 3 kolon boş; büyük Bodoni başlık + kısa metin, aralarında 1 px çizgi. Müşteri yorumu yok.
const ILKELER = [
  ['Önce onay.', 'Boyut, renk ve detay konusunda anlaşmadan yazıcıyı çalıştırmıyoruz.'],
  ['Hata bizdense yeniden basarız.', 'Baskı hatası atölyeden kaynaklanıyorsa parçayı ücretsiz yeniden basıyoruz.'],
  ['Dosyanız sizde kalır.', 'Özel tasarımları ve prototipleri izniniz olmadan paylaşmıyor, çoğaltmıyoruz.'],
]

export default function Ilkeler() {
  return (
    <Bolum id="ilkeler" baslikId="ilkeler-baslik">
      <h2 id="ilkeler-baslik" className="col-span-full m-0 mb-6 font-serif text-h2 font-[400] md:col-span-9 md:col-start-4 md:mb-10">
        Atölyenin kuralları
      </h2>
      <ul className="col-span-full m-0 list-none p-0 md:col-span-9 md:col-start-4">
        {ILKELER.map(([baslik, metin]) => (
          <li
            key={baslik}
            className="grid gap-x-(--mf-oluk) gap-y-2 border-t border-cizgi py-6 md:grid-cols-9 md:py-8 md:items-baseline"
          >
            <h3 className="m-0 font-serif text-h2 font-[400] md:col-span-5">{baslik}</h3>
            <p className="m-0 text-grafit-2 md:col-span-4">{metin}</p>
          </li>
        ))}
      </ul>
    </Bolum>
  )
}
