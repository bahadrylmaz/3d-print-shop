// Atölyenin iletişim bilgileri: bütün bileşenler buradan okur (numara tek yerde).
// Kullanım: waBaglanti('Merhaba, ...') -> önceden doldurulmuş wa.me adresi.
export const WA_NUMARA = '905311034535'
export const TELEFON_GORUNEN = '+90 531 103 45 35'
export const TELEFON_HREF = 'tel:+905311034535'
export const INSTAGRAM_KULLANICI = '@micronforge3d'
export const INSTAGRAM_URL = 'https://instagram.com/micronforge3d'
export const CALISMA_SAATLERI = 'Pazartesi-Cumartesi, 09.00-19.00'

// METIN.md §4.5: genel WhatsApp mesajı
export const WA_GENEL_MESAJ = 'Merhaba, 3D reçine baskı için teklif almak istiyorum.'

export const waBaglanti = (metin) =>
  metin ? `https://wa.me/${WA_NUMARA}?text=${encodeURIComponent(metin)}` : `https://wa.me/${WA_NUMARA}`
