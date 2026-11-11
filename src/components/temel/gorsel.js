// Ürün fotoğrafı adlarından türetilen yardımcılar (UrunGorseli, UrunKarti ve UrunGalerisi ortak kullanır).
// Fotoğraflar public/shop altında iki boyda durur: ad.jpg (uzun kenar 1440 px) ve ad-k.jpg (800 px).

// Yatay çekilmiş fotoğraflar dosya adında "-genis-" taşır (ürün galerisi kutunun oranını buna göre seçer)
export const genisMi = (src = '') => src.includes('-genis-')

// /shop/venom-1.jpg -> /shop/venom-1-k.jpg (küçük sürüm); başka yoldaki görsel olduğu gibi döner
export const kucukSurum = (src = '') =>
  /^\/shop\/.+\.jpg$/.test(src) && !src.endsWith('-k.jpg') ? src.replace(/\.jpg$/, '-k.jpg') : src

// srcset: dikey 600w/1080w, yatay 800w/1440w. Küçük sürümü olmayan görselde undefined.
export const kaynakKumesi = (src = '') => {
  const kucuk = kucukSurum(src)
  if (kucuk === src) return undefined
  return genisMi(src) ? `${kucuk} 800w, ${src} 1440w` : `${kucuk} 600w, ${src} 1080w`
}
