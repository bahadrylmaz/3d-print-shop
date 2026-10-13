import Bolum from '../temel/Bolum'
import SSSAkordeon from '../temel/SSSAkordeon'
import { MetinBaglanti } from '../temel/Buton'
import { sorular } from '../../data/sss'
import { CALISMA_SAATLERI, WA_GENEL_MESAJ, waBaglanti } from '../../data/iletisim'

// Ana sayfa 7. bölüm "Sık sorulanlar" (YON §6.2-7, METIN §3.10). Çapalar: #faq ve #sorular.
// İçerik src/data/sss.js'ten; index.html FAQPage JSON-LD ile birebir aynı tutulmalı.
export default function Sorular() {
  return (
    <Bolum ekCapalar={['sorular']} id="faq" baslikId="sss-baslik">
      <h2 id="sss-baslik" className="col-span-full m-0 mb-10 font-serif text-h1 font-[400] md:col-span-8">
        Sık sorulanlar
      </h2>
      <SSSAkordeon sorular={sorular} className="col-span-full md:col-span-9" />
      <p className="col-span-full m-0 mt-8 text-grafit-2 md:col-span-9">
        Sorunuz burada yoksa{' '}
        <MetinBaglanti href={waBaglanti(WA_GENEL_MESAJ)}>WhatsApp&apos;tan yazın</MetinBaglanti>.{' '}
        <span className="whitespace-nowrap">{CALISMA_SAATLERI}.</span>
      </p>
    </Bolum>
  )
}
