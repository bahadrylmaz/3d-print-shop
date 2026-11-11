import Bolum from '../temel/Bolum'
import UrunGorseli from '../temel/UrunGorseli'

// Ana sayfa 7. bölüm "Atölyenin kuralları": solda yakın plan detay fotoğrafı (5 kol), sağda üç ilke kartı (7 kol).
// Müşteri yorumu ya da uydurma sayı yok; üç söz var.
const ILKELER = [
  ['Önce onay.', 'Boyut, renk ve detay konusunda anlaşmadan yazıcıyı çalıştırmıyoruz.'],
  ['Hata bizdense yeniden basarız.', 'Baskı hatası atölyeden kaynaklanıyorsa parçayı ücretsiz yeniden basıyoruz.'],
  ['Dosyanız sizde kalır.', 'Özel tasarımları ve prototipleri izniniz olmadan paylaşmıyor, çoğaltmıyoruz.'],
]

export default function Ilkeler() {
  return (
    <Bolum id="ilkeler" baslikId="ilkeler-baslik" icClassName="gap-y-8">
      <div className="col-span-full text-center md:mb-4">
        <h2 id="ilkeler-baslik" className="m-0 text-h2 font-[700]">
          Atölyenin <em className="mf-italik">kuralları</em>
        </h2>
      </div>

      <ul className="col-span-full m-0 grid list-none gap-3 p-0 md:col-span-7 md:gap-4">
        {ILKELER.map(([baslik, metin], i) => (
          <li key={baslik} className="grid grid-cols-[auto_1fr] gap-x-5 rounded-panel bg-kirec p-6 shadow-kart md:p-8">
            <span
              aria-hidden="true"
              className="mf-rakam grid h-10 w-10 place-items-center rounded-hap bg-tas text-[1.0625rem] font-[700] text-grafit"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="m-0 text-h3 font-[700]">{baslik}</h3>
              <p className="m-0 mt-2 max-w-[48ch] text-grafit-2">{metin}</p>
            </div>
          </li>
        ))}
      </ul>

      <figure className="relative col-span-full m-0 md:col-span-5">
        <UrunGorseli
          src="/shop/kirmizi-hulk-2.jpg"
          alt="Kırmızı Hulk figürünün kolu ve omzu yakından: parlak yüzeyde kas hatları"
          oran="dikey"
          kose="panel"
          sizes="(min-width: 768px) 40vw, 100vw"
          className="md:h-full md:aspect-auto"
        />
        <figcaption className="mf-cam absolute bottom-4 left-4 inline-flex min-h-9 items-center rounded-hap px-4 text-small font-[600] text-grafit">
          Paketlemeden önce tek tek kontrol
        </figcaption>
      </figure>
    </Bolum>
  )
}
