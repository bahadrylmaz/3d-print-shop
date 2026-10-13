// Blog yazısı künyesi ve tarih biçimi (YON §6.5: künye tek satır, "Teknik Rehber, 7 dk okuma"; orta nokta zinciri yok).
export const kunye = (yazi) => `${yazi.category}, ${yazi.readTime} okuma`

const TARIH = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
export const tarihMetni = (gun) => TARIH.format(new Date(`${gun}T12:00:00`))
