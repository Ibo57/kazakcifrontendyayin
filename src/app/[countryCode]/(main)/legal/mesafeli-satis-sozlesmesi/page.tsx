import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi - Kazakçı",
  description: "Online alışveriş için mesafeli satış sözleşmesi ve koşulları",
}

export default function MesafeliSatisSozlesmesiPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="content-container">
        <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Mesafeli Satış Sözleşmesi
          </h1>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <p className="text-sm text-gray-600 mb-8">
              Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">MADDE 1 - TARAFLAR</h2>

              <div className="bg-orange-50 p-6 rounded-lg mb-4">
                <h3 className="font-bold text-gray-900 mb-3">1.1. SATICI</h3>
                <p><strong>Ticaret Unvanı:</strong> Kazakçı</p>
                <p><strong>Adres:</strong> Orta Mah. Eminefendi Cad. No: 12/B Bayrampaşa/İstanbul</p>
                <p><strong>Telefon:</strong> 0532 280 79 44</p>
                <p><strong>E-posta:</strong> info@kazakci.com</p>
                <p><strong>Mersis No:</strong> 1814918420800017</p>
                <p><strong>Ticaret Sicil No:</strong> 849222</p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">1.2. ALICI</h3>
                <p>İşbu sözleşmeyi kabul eden ve sipariş veren gerçek veya tüzel kişidir.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">MADDE 2 - KONU</h2>
              <p>
                İşbu Sözleşme'nin konusu, ALICI'nın SATICI'ya ait www.kazakci.com internet sitesinden
                elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış fiyatı belirtilen
                ürün/ürünlerin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicilerin Korunması
                Hakkındaki Kanun - Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak
                ve yükümlülüklerinin saptanmasıdır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">MADDE 3 - SÖZLEŞME KONUSU ÜRÜN/HİZMET BİLGİLERİ</h2>
              <p className="mb-3">
                Sözleşme konusu mal veya hizmetin temel özellikleri, satış fiyatı ve ödemeye ilişkin tüm
                ön bilgiler sipariş ekranında yer almaktadır.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ürün bilgileri, görselleri ve fiyatları site üzerinde güncel olarak paylaşılmaktadır</li>
                <li>Tüm fiyatlar KDV dahil olarak gösterilmektedir</li>
                <li>Kargo ücreti varsa ayrıca belirtilmektedir</li>
                <li>Kampanyalı ürünlerde kampanya şartları ürün sayfasında açıklanmaktadır</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">MADDE 4 - GENEL HÜKÜMLER</h2>

              <h3 className="font-bold text-gray-900 mt-6 mb-3">4.1. Sipariş Süreci</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>ALICI, sipariş vermeden önce ürün bilgilerini ve sözleşme şartlarını okuduğunu ve onayladığını kabul eder</li>
                <li>Sipariş verdikten sonra sistem tarafından otomatik onay e-postası gönderilir</li>
                <li>SATICI, stok durumuna göre siparişi onaylama veya iptal etme hakkını saklı tutar</li>
              </ul>

              <h3 className="font-bold text-gray-900 mt-6 mb-3">4.2. Ödeme</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Ödeme kredi kartı veya banka kartı ile online olarak yapılır</li>
                <li>Taksitli ödemeler kredi kartı ile yapılabilir</li>
                <li>Ödeme bilgileri SSL güvenlik protokolü ile korunur</li>
                <li>Kredi kartı bilgileri saklanmaz, güvenli ödeme sağlayıcısı üzerinden işlem yapılır</li>
              </ul>

              <h3 className="font-bold text-gray-900 mt-6 mb-3">4.3. Teslimat</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ürünler, sipariş onayından sonra 3-7 iş günü içinde kargoya verilir</li>
                <li>Kargo süresi, teslimat adresine göre değişiklik gösterebilir</li>
                <li>Teslimat, ALICI tarafından belirtilen adrese yapılır</li>
                <li>Teslim anında ürün hasarlı ise teslim alınmayabilir</li>
                <li>Kargo şirketi kaynaklı gecikmelerden SATICI sorumlu değildir</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">MADDE 5 - CAYMA HAKKI</h2>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="mb-4">
                  <strong>ALICI, ürünün kendisine veya gösterdiği adresteki kişiye tesliminden itibaren
                  14 (on dört) gün içinde cayma hakkına sahiptir.</strong>
                </p>
                <p className="mb-4">
                  Cayma hakkının kullanılması için bu süre içinde SATICI'ya yazılı olarak veya kalıcı
                  veri saklayıcısı ile bildirimde bulunulması ve ürünün kullanılmamış olması şarttır.
                </p>
              </div>

              <h3 className="font-bold text-gray-900 mt-6 mb-3">Cayma Hakkının Kullanılması</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ürün ambalajı açılmamış, bozulmamış ve ürün kullanılmamış olmalıdır</li>
                <li>Fatura aslı iade edilmelidir</li>
                <li>Kampanyalı ürünlerde hediye varsa, hediye de iade edilmelidir</li>
                <li>Cayma bildiriminden sonra 10 gün içinde ürün SATICI'ya ulaşmalıdır</li>
              </ul>

              <h3 className="font-bold text-gray-900 mt-6 mb-3">Cayma Hakkının Kullanılamayacağı Durumlar</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hijyen ve sağlık açısından uygun olmayan, ambalajı açılmış ürünler</li>
                <li>Teslimat sonrası ALICI kusuru ile hasar görmüş ürünler</li>
                <li>Özel olarak hazırlanmış veya kişiye özel üretilmiş ürünler</li>
                <li>İç çamaşırı, mayo, bikini gibi kullanım sonrası iade kabul edilmeyen ürünler</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">MADDE 6 - ÜRÜN AYIPLI İSE</h2>
              <p className="mb-4">
                ALICI, teslim aldığı ürünün sözleşmeye aykırı veya ayıplı olması halinde, teslim tarihinden
                itibaren 30 gün içinde SATICI'ya bildirmek şartıyla Tüketicinin Korunması Hakkında Kanun'un
                11. maddesinde yer alan aşağıdaki haklardan birini kullanabilir:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sözleşmeden dönme</li>
                <li>Satış bedelinden indirim isteme</li>
                <li>Ücretsiz onarılmasını isteme</li>
                <li>Ayıpsız bir misli ile değiştirilmesini isteme</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">MADDE 7 - UYUŞMAZLIKLARIN ÇÖZÜMÜ</h2>
              <p>
                İşbu Sözleşme'den doğabilecek her türlü uyuşmazlığın çözümünde, Türkiye Cumhuriyeti
                yasaları uygulanır. Uyuşmazlıkların çözümünde İstanbul (Avrupa) Tüketici Hakem Heyetleri
                ile İstanbul (Avrupa) Mahkemeleri ve İcra Daireleri yetkilidir.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                <p>
                  <strong>Tüketici Şikayetleri:</strong> Şikayetler için Tüketici Hakem Heyetleri ve
                  Tüketici Mahkemelerine başvurabilirsiniz. Para değeri bakımından heyete başvuru sınırları
                  her yıl Ticaret Bakanlığı tarafından belirlenir.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">MADDE 8 - YÜRÜRLÜK</h2>
              <p>
                ALICI, site üzerinden sipariş verdiğinde işbu sözleşme hükümlerini kabul etmiş sayılır.
                İşbu sözleşme, taraflarca okunup, kabul edildiği tarihte yürürlüğe girer.
              </p>
            </section>

            <div className="bg-gray-100 p-6 rounded-lg mt-8">
              <p className="font-bold text-gray-900">SATICI</p>
              <p>Kazakçı</p>
              <p className="mt-4 font-bold text-gray-900">ALICI</p>
              <p className="text-sm text-gray-600">(Sipariş vererek kabul edilmiştir)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
