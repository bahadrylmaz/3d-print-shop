// Ana sayfa "Sık sorulanlar" içeriği (METIN.md §3.10).
// DİKKAT: index.html içindeki FAQPage JSON-LD bu metinlerle BİREBİR aynı olmalı
// (Google görünür metinle eşleşme ister). Burayı değiştirirseniz orayı da değiştirin.
export const sorular = [
  {
    soru: 'STL dosyam yok. Fotoğraf yeterli mi?',
    cevap:
      'Evet. Fotoğraf, referans görsel ya da el çizimi yeter. Modeli biz hazırlar, baskıdan önce onayınıza sunarız. STL, OBJ ya da 3MF dosyanız varsa doğrudan onu kullanırız; dilimleme ve destekler bizde.',
  },
  {
    soru: 'Hangi figürleri basıyorsunuz?',
    // DOĞRULA: politika kararı Bahadır'da. Önceki cevap "hak sahibinin izni olmayan karakter ve marka tasarımlarını
    // basmıyoruz" diyordu; yeni katalog karakter figürlerinden oluştuğu için o cümle çıkarıldı.
    cevap:
      'Süper kahramanlar, film ve çizgi film karakterleri, chibi setler, ejderha gibi fantastik figürler ve kişiye özel figürler basıyoruz. Mağazadaki parçalar birer örnek; listede olmayan bir karakter için adını ya da fotoğrafını yazmanız yeter. 32 mm ve 75 mm masa oyunu figürü, kaide ve dekor heykeli de basıyoruz.',
  },
  {
    soru: 'Sanayi prototipi için hangi reçineyi kullanıyorsunuz?',
    cevap:
      'Tough (ABS benzeri) reçine. Darbeye dayanıklıdır; sunum modeli, elektronik kapak ve kalıp öncesi kontrol numunesi için uygundur. Standart reçine kırılabildiği için sanayi işlerinde önermiyoruz.',
  },
  {
    soru: 'Mimarlık öğrencisiyim, acil baskı olur mu?',
    cevap:
      'Olur. Manisa CBÜ ve İzmir\'deki öğrencilere 24-48 saatte ekspres baskı yapıyoruz. 1/100, 1/200 ve 1/500 ölçekte insan, ağaç, mobilya ve cephe detayı basıyoruz. Jüri tarihinizi ilk mesajda yazın.',
  },
  {
    soru: 'En büyük parça ne kadar olabilir?',
    cevap:
      'Tek parçada 218 × 123 × 250 mm. Daha büyük işleri parçalara bölüp basıyor, ardından birleştiriyoruz.',
  },
  {
    soru: 'Parça boyalı mı gelir?',
    // DOĞRULA: "mağazadaki figürler boyalı teslim edilir" yeni fotoğraflara bakılarak yazıldı
    cevap:
      'Mağazadaki figürler fotoğraflardaki gibi elde boyanmış teslim edilir; şeffaf reçine parçalar boyasızdır. Kendi dosyanızdan ya da özel bir modelden basılan işlerde standart teslim boyasızdır: parça yıkanmış, UV ile kürlenmiş ve destekleri temizlenmiş olur. Astar ve boya ayrıca konuşulur.',
  },
  {
    soru: 'Fiyatı nasıl öğrenirim?',
    cevap:
      'En hızlısı WhatsApp\'tan fotoğraf göndermek. Çalışma saatlerinde yaklaşık 30 dakika içinde tahmini fiyat ve süreyi yazarız. Kesin fiyat, model onaylandıktan sonra belli olur.',
  },
  {
    soru: 'Baskı hatalı çıkarsa ne olur?',
    cevap:
      'Baskı hatası bizden kaynaklanıyorsa parçayı ücretsiz yeniden basarız. Her parçayı paketlemeden önce tek tek kontrol ediyoruz.',
  },
  {
    soru: 'Gönderdiğim dosyalar ne olacak?',
    cevap:
      'Yalnızca sizin işiniz için kullanılır. Özel tasarımları ve prototipleri izniniz olmadan kimseyle paylaşmıyor, çoğaltmıyoruz.',
  },
  {
    soru: 'Teslimat nasıl?',
    cevap:
      'Manisa ve İzmir\'de elden teslim ediyoruz. Türkiye\'nin geri kalanına kargo ile gönderiyoruz; kırılgan parçaları buna göre paketliyoruz.',
  },
]
