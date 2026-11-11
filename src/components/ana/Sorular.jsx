import Bolum from '../temel/Bolum'
import SSSAkordeon from '../temel/SSSAkordeon'
import { MetinBaglanti } from '../temel/Buton'
import { sorular } from '../../data/sss'
import { CALISMA_SAATLERI, WA_GENEL_MESAJ, waBaglanti } from '../../data/iletisim'

// Ana sayfa 8. bölüm "Sık sorulanlar": açık panel içinde ortalanmış başlık + tek sütun akordeon. Çapalar: #faq ve #sorular.
// İçerik src/data/sss.js'ten; index.html FAQPage JSON-LD ile birebir aynı tutulmalı.
export default function Sorular() {
  return (
    <Bolum ekCapalar={['sorular']} id="faq" baslikId="sss-baslik" panel="tas" bosluk="dar" izgara={false}>
      <div className="mx-auto max-w-[50rem]">
        <h2 id="sss-baslik" className="m-0 mb-8 text-center text-h2 font-[700] md:mb-12">
          Sık <em className="mf-italik">sorulanlar</em>
        </h2>
        <SSSAkordeon sorular={sorular} />
        <p className="m-0 mt-8 text-center text-grafit-2">
          Sorunuz burada yoksa{' '}
          <MetinBaglanti href={waBaglanti(WA_GENEL_MESAJ)}>WhatsApp&apos;tan yazın</MetinBaglanti>.{' '}
          <span className="whitespace-nowrap">{CALISMA_SAATLERI}.</span>
        </p>
      </div>
    </Bolum>
  )
}
