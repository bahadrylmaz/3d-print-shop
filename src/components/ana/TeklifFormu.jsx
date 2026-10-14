import { useEffect, useRef, useState } from 'react'
import Bolum from '../temel/Bolum'
import { Buton, MetinBaglanti } from '../temel/Buton'
import { TELEFON_GORUNEN, TELEFON_HREF, WA_GENEL_MESAJ, waBaglanti } from '../../data/iletisim'

// Ana sayfa 5. bölüm: teklif/sipariş formu (YON §6.2-5 ve §6.7, METIN §3.9 ve §5). Çapa: #order (+ #pricing fiyat notu).
// Davranış eski OrderForm ile aynı: form hiçbir yere veri göndermez; "Talebi hazırla" -> "Bir adım kaldı" ekranı ->
// "WhatsApp'ta gönderin" bilgileri wa.me mesajına doldurur. Fotoğraflar yalnız önizlenir, WhatsApp'a aktarılmaz (uyarı görünür).
const KATEGORILER = [
  { id: 'dekor', etiket: 'Koleksiyon ve dekor' },
  { id: 'kisisel', etiket: 'Kişiye özel figür' },
  { id: 'mimari', etiket: 'Mimari maket' },
  { id: 'sanayi', etiket: 'Sanayi prototipi' },
  { id: 'diger', etiket: 'Başka bir şey' },
]

const BOYUTLAR = [
  { id: 'kucuk', etiket: "5 cm'den küçük" },
  { id: 'orta', etiket: '5-10 cm' },
  { id: 'buyuk', etiket: '10-20 cm' },
  { id: 'kocaman', etiket: "20 cm'den büyük" },
]

const EN_COK = 5

const HATA = {
  isim: 'Adınızı yazın, mesajı kime yazdığımızı bilelim.',
  iletisim: 'Telefon ya da e-posta gerekli. Fiyatı oraya yazacağız.',
  fazla: 'En fazla 5 fotoğraf ekleyebilirsiniz. Fazlasını WhatsApp\'ta gönderin.',
  turu: 'Bu alan yalnızca fotoğraf kabul ediyor. STL, OBJ ya da 3MF dosyanızı WhatsApp\'tan gönderin.',
  acilmadi: `WhatsApp açılmadı. Tarayıcınız yeni pencereyi engellemiş olabilir. Numaramız: ${TELEFON_GORUNEN}`,
}

const ALAN =
  'min-h-12 w-full rounded-kontrol border border-cizgi-guclu bg-kirec px-4 font-sans text-[1rem] text-grafit placeholder:text-sis focus-visible:border-recine focus-visible:outline-offset-1 aria-[invalid=true]:border-hata'
const ETIKET = 'text-small font-[500] text-grafit'

// Alt çizgili sekme görünümünde radyo grubu (gerçek <input type="radio">, klavyeyle oklarla gezilir)
function RadyoGrubu({ ad, baslik, secenekler, deger, onChange }) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className={`${ETIKET} mb-2 p-0`}>{baslik}</legend>
      <div className="flex flex-wrap gap-x-6 border-b border-cizgi">
        {secenekler.map((s) => (
          <label key={s.id} className="relative inline-flex min-h-11 cursor-pointer items-center">
            <input
              type="radio"
              name={ad}
              value={s.id}
              checked={deger === s.id}
              onChange={() => onChange(s.id)}
              className="peer absolute inset-0 m-0 cursor-pointer opacity-0"
            />
            <span className="text-[0.9375rem] text-grafit-2 shadow-[inset_0_-2px_0_transparent] transition-colors duration-(--mf-sure-hizli) peer-checked:font-[500] peer-checked:text-grafit peer-checked:shadow-[inset_0_-2px_0_var(--mf-grafit)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-recine peer-focus-visible:outline-solid hover:text-grafit leading-[2.75rem]">
              {s.etiket}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default function TeklifFormu() {
  const [images, setImages] = useState([])
  const [category, setCategory] = useState('dekor')
  const [size, setSize] = useState('orta')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [hatalar, setHatalar] = useState({})
  const [dosyaHatasi, setDosyaHatasi] = useState('')
  const [waHatasi, setWaHatasi] = useState('')
  const fileRef = useRef(null)
  const isimRef = useRef(null)
  const iletisimRef = useRef(null)
  const sonucRef = useRef(null)
  const imagesRef = useRef(images)
  useEffect(() => {
    imagesRef.current = images
  }, [images])

  // Sayfadan ayrılırken önizleme adreslerini serbest bırak
  useEffect(() => () => imagesRef.current.forEach((img) => URL.revokeObjectURL(img.url)), [])

  useEffect(() => {
    if (submitted) sonucRef.current?.focus()
  }, [submitted])

  const handleFiles = (files) => {
    const liste = Array.from(files)
    const fotolar = liste.filter((f) => f.type.startsWith('image/'))
    const yer = EN_COK - images.length
    let hata = ''
    if (fotolar.length < liste.length) hata = HATA.turu
    else if (fotolar.length > yer) hata = HATA.fazla
    setDosyaHatasi(hata)
    const newImages = fotolar.slice(0, Math.max(yer, 0)).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024).toFixed(0),
    }))
    setImages((prev) => [...prev, ...newImages].slice(0, EN_COK))
  }

  const removeImage = (idx) => {
    setDosyaHatasi('')
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx].url)
      return prev.filter((_, i) => i !== idx)
    })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer?.files) handleFiles(e.dataTransfer.files)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const yeni = {}
    if (!name.trim()) yeni.isim = HATA.isim
    if (!contact.trim()) yeni.iletisim = HATA.iletisim
    setHatalar(yeni)
    if (yeni.isim) return isimRef.current?.focus()
    if (yeni.iletisim) return iletisimRef.current?.focus()
    setWaHatasi('')
    setSubmitted(true)
  }

  // METIN.md §5: WhatsApp'a giden hazır mesaj (ünlem ve emoji yok)
  const sendToWhatsApp = () => {
    const catLabel = KATEGORILER.find((c) => c.id === category)?.etiket
    const sizeLabel = BOYUTLAR.find((s) => s.id === size)?.etiket
    const text =
      `${WA_GENEL_MESAJ}\n\n` +
      `İsim: ${name || '-'}\n` +
      `İletişim: ${contact || '-'}\n` +
      `Ne: ${catLabel}\n` +
      `Yaklaşık boy: ${sizeLabel}\n` +
      `Notlar: ${notes || '-'}\n\n` +
      `Fotoğrafları bu mesajın ardından gönderiyorum.`
    const pencere = window.open(waBaglanti(text), '_blank')
    setWaHatasi(pencere ? '' : HATA.acilmadi)
  }

  const yeniTalep = () => {
    images.forEach((img) => URL.revokeObjectURL(img.url))
    setSubmitted(false)
    setImages([])
    setName('')
    setContact('')
    setNotes('')
    setHatalar({})
    setDosyaHatasi('')
    setWaHatasi('')
  }

  const dolu = images.length >= EN_COK

  return (
    <Bolum id="order" baslikId="teklif-baslik">
      <div className="col-span-full mb-10 md:col-span-4 md:mb-0">
        <h2 id="teklif-baslik" className="m-0 font-serif text-h2 font-[400]">
          Parçanızı anlatın
        </h2>
        <p className="m-0 mt-4 text-grafit-2">
          Fotoğraf yükleyin, birkaç bilgi ekleyin. Form mesajı hazırlar; WhatsApp&apos;tan gönderdiğinizde fiyatı
          yazarız.
        </p>

        {/* Üç adım giriş paragrafını tekrar ediyor (fotoğraf uyarısı formun içinde de var); mobilde gizli, masaüstünde yan sütunu dolduruyor */}
        <ol className="m-0 mt-8 hidden list-none space-y-4 p-0 md:block">
          {[
            ['Fotoğrafları ekleyin.', 'En fazla 5 tane. Farklı açılardan, gün ışığında, filtresiz.'],
            ['Birkaç bilgi verin.', 'Ne olduğu, yaklaşık boyu ve size nasıl ulaşacağımız.'],
            ['WhatsApp\'tan gönderin.', 'Form mesajı hazırlar. Fotoğrafları aynı sohbete ekleyip gönderin.'],
          ].map(([baslik, metin], i) => (
            <li key={baslik} className="grid grid-cols-[1.5rem_1fr] gap-x-2 text-grafit-2">
              <span className="mf-rakam text-grafit">{i + 1}.</span>
              <span>
                <span className="font-[500] text-grafit">{baslik}</span> {metin}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-6 text-grafit-2 md:mt-8">
          <p className="m-0">Form doldurmak istemezseniz:</p>
          <p className="m-0 flex flex-wrap gap-x-6">
            <MetinBaglanti href={waBaglanti(WA_GENEL_MESAJ)}>WhatsApp</MetinBaglanti>
            <MetinBaglanti href={TELEFON_HREF}>Telefon</MetinBaglanti>
          </p>
        </div>

        <div id="pricing" className="mt-8 border-t border-cizgi pt-6 md:mt-10">
          <h3 className="m-0 font-serif text-h3 font-[500]">Fiyat ölçüye göre</h3>
          <p className="m-0 mt-3 text-small text-grafit-2">Her parçanın fiyatını ayrı hesaplıyoruz.</p>
          <p className="m-0 mt-2 text-small text-grafit-2">
            <span className="font-[500] text-grafit">Fiyatı belirleyenler:</span> Parçanın boyu ve hacmi, seçilen
            reçine, yüzey işlemi (boyasız, astarlı ya da boyalı), adet ve modelleme ihtiyacı. Çok adetli işlerde aynı
            tablaya birden fazla parça yerleştiği için birim fiyat düşebilir.
          </p>
        </div>
      </div>

      <div className="col-span-full bg-kirec p-5 md:col-span-7 md:col-start-6 md:p-10">
        {submitted ? (
          <div aria-live="polite">
            <h3 ref={sonucRef} tabIndex={-1} className="m-0 font-serif text-h2 font-[400] outline-none">
              Bir adım kaldı
            </h3>
            {/* DOĞRULA: "yaklaşık 30 dakika" dönüş süresi */}
            <p className="m-0 mt-4 max-w-[52ch] text-grafit-2">
              Bilgileriniz WhatsApp mesajına eklendi. Aşağıdaki butonla mesajı gönderin, fotoğrafları da aynı sohbete
              ekleyin. Çalışma saatlerinde yaklaşık 30 dakika içinde döneriz.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Buton onClick={sendToWhatsApp}>WhatsApp&apos;ta gönderin</Buton>
              <MetinBaglanti onClick={yeniTalep} className="cursor-pointer bg-transparent">
                Yeni talep
              </MetinBaglanti>
            </div>
            {waHatasi && (
              <p role="alert" className="m-0 mt-4 text-small text-hata">
                {waHatasi}
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="grid gap-8">
            <RadyoGrubu
              ad="kategori"
              baslik="Ne bastırmak istiyorsunuz?"
              secenekler={KATEGORILER}
              deger={category}
              onChange={setCategory}
            />
            <RadyoGrubu
              ad="boyut"
              baslik="Yaklaşık en uzun ölçü"
              secenekler={BOYUTLAR}
              deger={size}
              onChange={setSize}
            />

            <div className="grid gap-2">
              <span id="foto-etiket" className={ETIKET}>
                Fotoğraflar
              </span>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                tabIndex={-1}
                aria-hidden="true"
                onChange={(e) => {
                  handleFiles(e.target.files)
                  e.target.value = ''
                }}
                className="hidden"
              />
              <button
                type="button"
                aria-labelledby="foto-etiket foto-bos"
                aria-describedby="foto-yardim foto-uyari"
                disabled={dolu}
                onClick={() => fileRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="flex min-h-40 w-full cursor-pointer items-center justify-center rounded-kontrol border border-dashed border-cizgi-guclu bg-kirec px-6 text-center text-grafit-2 transition-colors duration-(--mf-sure-hizli) hover:border-grafit hover:text-grafit disabled:cursor-default disabled:hover:border-cizgi-guclu"
              >
                <span id="foto-bos" className="max-w-[30ch]">
                  {dolu
                    ? '5 fotoğrafın hepsini eklediniz.'
                    : 'Fotoğrafları buraya sürükleyin ya da seçmek için dokunun.'}
                </span>
              </button>
              <p id="foto-yardim" className="m-0 text-small text-sis">
                Telefonla çekilmiş fotoğraflar olur. En fazla 5 fotoğraf. Önden, yandan ve arkadan çekilmiş fotoğraflar
                modeli kolaylaştırır.
              </p>
              {dosyaHatasi && (
                <p role="alert" className="m-0 text-small text-hata">
                  {dosyaHatasi}
                </p>
              )}

              {images.length > 0 && (
                <ul className="m-0 mt-2 list-none border-t border-cizgi p-0">
                  {images.map((img, i) => (
                    <li
                      key={img.url}
                      className="grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-x-4 border-b border-cizgi py-2"
                    >
                      <img src={img.url} alt="" className="h-12 w-12 object-cover" />
                      <span className="min-w-0 text-small">
                        <span className="block truncate text-grafit">{img.name}</span>
                        <span className="mf-rakam text-sis">{img.size} KB</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        aria-label={`${img.name} fotoğrafını kaldır`}
                        className="min-h-11 cursor-pointer bg-transparent px-2 text-small font-[500] text-grafit underline decoration-cizgi-guclu underline-offset-[0.3em] hover:text-recine"
                      >
                        Kaldır
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <p id="foto-uyari" className="m-0 border-l-2 border-cizgi-guclu pl-3 text-small text-grafit-2">
                Fotoğraflar bu sayfadan bize iletilmez. Gönder dediğinizde WhatsApp açılır; fotoğrafları oradan ekleyin.
              </p>
            </div>

            <div className="grid gap-x-6 gap-y-8 md:grid-cols-2">
              <div className="grid content-start gap-2">
                <label htmlFor="teklif-isim" className={ETIKET}>
                  Adınız
                </label>
                <input
                  ref={isimRef}
                  id="teklif-isim"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Adınız ve soyadınız"
                  aria-invalid={Boolean(hatalar.isim)}
                  aria-describedby={hatalar.isim ? 'teklif-isim-hata' : undefined}
                  className={ALAN}
                />
                {hatalar.isim && (
                  <p id="teklif-isim-hata" className="m-0 text-small text-hata">
                    {hatalar.isim}
                  </p>
                )}
              </div>
              <div className="grid content-start gap-2">
                <label htmlFor="teklif-iletisim" className={ETIKET}>
                  Telefon ya da e-posta
                </label>
                <input
                  ref={iletisimRef}
                  id="teklif-iletisim"
                  type="text"
                  autoComplete="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Size nereden dönelim?"
                  aria-invalid={Boolean(hatalar.iletisim)}
                  aria-describedby={hatalar.iletisim ? 'teklif-iletisim-hata' : undefined}
                  className={ALAN}
                />
                {hatalar.iletisim && (
                  <p id="teklif-iletisim-hata" className="m-0 text-small text-hata">
                    {hatalar.iletisim}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="teklif-not" className={ETIKET}>
                Notlar (isteğe bağlı)
              </label>
              <textarea
                id="teklif-not"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Renk, malzeme, adet, teslim tarihi, parçanın nerede kullanılacağı"
                className={`${ALAN} resize-y py-3`}
              />
            </div>

            <div className="grid gap-4">
              <Buton type="submit" genis>
                Talebi hazırla
              </Buton>
              <p className="m-0 text-small text-sis">
                STL, OBJ ya da 3MF dosyanız varsa doğrudan WhatsApp&apos;tan gönderin. Dosya yoksa fotoğraftan
                modelleyebiliriz.
              </p>
            </div>
          </form>
        )}
      </div>
    </Bolum>
  )
}
