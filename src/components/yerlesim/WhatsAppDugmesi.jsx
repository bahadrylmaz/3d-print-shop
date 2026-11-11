import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Ikon from '../temel/Ikon'
import { WA_GENEL_MESAJ, waBaglanti } from '../../data/iletisim'

// WhatsAppDugmesi: sağ altta sabit mürekkep rengi hap (masaüstü ikon + "WhatsApp", mobilde yalnız ikon 52×52). Yeşil balon/tooltip yok.
// Görünürlük IntersectionObserver ile (scroll dinleyicisi yok): sayfada #hero varsa o geçilince görünür;
// #order (teklif formu) ekrandayken gizlenir. Props: gizli (true: her ekranda gizli; 'mobil': yalnız md altında gizli, ör. ürün sayfasının
// mobil yapışkan alt çubuğu varken), mesaj (önceden doldurulan metin).
export default function WhatsAppDugmesi({ gizli = false, mesaj = WA_GENEL_MESAJ }) {
  const [heroGorunur, setHeroGorunur] = useState(false)
  const [formGorunur, setFormGorunur] = useState(false)
  const azHareket = useReducedMotion()

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const hero = document.getElementById('hero')
    const form = document.getElementById('order')
    const gozlemci = new IntersectionObserver((kayitlar) => {
      kayitlar.forEach((k) => {
        if (k.target === hero) setHeroGorunur(k.isIntersecting)
        if (k.target === form) setFormGorunur(k.isIntersecting)
      })
    })
    if (hero) gozlemci.observe(hero)
    if (form) gozlemci.observe(form)
    return () => gozlemci.disconnect()
  }, [])

  const goster = gizli !== true && !heroGorunur && !formGorunur

  return (
    <AnimatePresence>
      {goster && (
        <motion.a
          key="wa"
          href={waBaglanti(mesaj)}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp'tan yazın"
          initial={azHareket ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={azHareket ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: 8 }}
          transition={{ duration: azHareket ? 0 : 0.28, ease: [0.2, 0, 0, 1] }}
          className={`${gizli === 'mobil' ? 'max-md:hidden' : ''} fixed right-4 bottom-4 z-(--mf-z-whatsapp) inline-flex h-13 w-13 items-center justify-center gap-2 rounded-hap bg-grafit text-[0.9375rem] leading-none font-[600] text-kirec no-underline shadow-yuzen transition-colors duration-(--mf-sure-hizli) hover:bg-recine-koyu md:w-auto md:pr-5 md:pl-4`}
        >
          <Ikon ad="whatsapp" />
          <span className="hidden md:inline" aria-hidden="true">
            WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
