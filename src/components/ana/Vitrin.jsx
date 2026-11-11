import Bolum from '../temel/Bolum'
import { Buton } from '../temel/Buton'
import Ikon from '../temel/Ikon'
import UrunKarti from '../magaza/UrunKarti'

// Ana sayfa 2. bölüm "Vitrin": açık panel içinde ortalanmış başlık + 8 ürün kartı (mobil 2, masaüstü 4 sütun) + mağaza bağlantısı.
// Props: urunler (gösterilecek ürünler), toplam (mağazadaki ürün sayısı; düğme metninde yazar).
export default function Vitrin({ urunler, toplam }) {
  if (!urunler?.length) return null

  return (
    <Bolum id="vitrin" baslikId="vitrin-baslik" panel="tas" bosluk="dar" izgara={false}>
      <div className="mx-auto mb-8 max-w-[44rem] text-center md:mb-12">
        <h2 id="vitrin-baslik" className="m-0 text-h2 font-[700]">
          Raftan seçin, <em className="mf-italik">ya da karakterinizi söyleyin.</em>
        </h2>
        <p className="m-0 mx-auto mt-5 max-w-[52ch] text-grafit-2">
          Aşağıdakiler atölyede basılıp boyanmış parçalar. Her birini farklı ölçüde yeniden basabiliriz; listede olmayan
          bir karakteri de yazabilirsiniz.
        </p>
      </div>

      <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 md:gap-4 lg:grid-cols-4">
        {urunler.map((urun) => (
          <li key={urun.id}>
            <UrunKarti urun={urun} baslik="h3" />
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col items-center gap-3 text-center md:mt-12">
        <Buton to="/magaza">
          Bütün koleksiyon{toplam ? ` (${toplam})` : ''}
          <Ikon ad="ok" boyut={18} />
        </Buton>
        <p className="m-0 max-w-[46ch] text-small text-sis">
          Fiyat için WhatsApp&apos;tan yazın. Ölçü, adet ve boyaya göre hesaplıyoruz.
        </p>
      </div>
    </Bolum>
  )
}
