import { Metadata } from "next"

export const metadata: Metadata = {
  title: "İade ve Değişim Politikası - Kazakçı",
  description: "Ürün iade ve değişim koşulları, süreci ve haklarınız",
}

export default function IadeDegisimPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="content-container">
        <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            İade ve Değişim Politikası
          </h1>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <p className="text-sm text-gray-600 mb-8">
              Son Güncelleme: 03.11.2025
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-8">
              <p className="font-bold text-lg text-gray-900 mb-2">
                💡 Önemli Bilgi
              </p>
              <p>
                Tüm ürünlerimizde 14 gün içinde koşulsuz iade hakkınız vardır.
                Memnuniyetiniz bizim önceliğimizdir!
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. İade Hakkı</h2>
              <p className="mb-4">
                6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği
                uyarınca, ürünün size teslim edildiği tarihten itibaren <strong>14 gün içinde</strong>,
                herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahipsiniz.
              </p>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">İade Süresi Hesaplama</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>14 günlük süre, ürünün size teslim edildiği tarihten itibaren başlar.</li>
                  <li>Birden fazla ürün siparişinde, her ürün için süre ayrı ayrı hesaplanır.</li>
                  <li>Cayma hakkınızı kullanmak için bu süre içinde bize bildirmeniz yeterlidir.</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. İade Koşulları</h2>

              <h3 className="font-bold text-gray-900 mt-6 mb-3">✅ İade Kabul Şartları</h3>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Ürün kullanılmamış, yıkanmamış ve denenmemiş olmalıdır.</li>
                <li>Orijinal ambalajı ve etiketleri sökülmemiş olmalıdır.</li>
                <li>Fatura aslı iade edilmelidir (fotokopi kabul edilmez).</li>
                <li>Hediye veya kampanya ürünü varsa birlikte iade edilmelidir.</li>
                <li>Ürün hiçbir şekilde hasar görmemiş olmalıdır.</li>
              </ul>

              <h3 className="font-bold text-gray-900 mt-6 mb-3">❌ İade Kabul Edilmeyen Durumlar</h3>
              <div className="bg-red-50 p-6 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hijyen ürünleri (iç çamaşırı, çorap, mayo, bikini – ambalaj açılmışsa)</li>
                  <li>Kullanılmış, yıkanmış, etiketi kopmuş ürünler</li>
                  <li>Kişiye özel hazırlanan ürünler</li>
                  <li>İndirimli / final ürünleri (ürün sayfasında belirtilir)</li>
                  <li>Ambalajı açılmış kozmetik veya parfümler</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. İade Süreci</h2>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">İade Talebinde Bulunun</h3>
                    <p>
                      Hesabım &gt; Siparişlerim bölümünden veya WhatsApp üzerinden bizimle iletişime geçerek iade talebinde bulunun. Sipariş numaranızı ve iade nedeninizi belirtin.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">İade Onayı Alın</h3>
                    <p>
                      Talebiniz 24 saat içinde değerlendirilir ve size iade kodu veya yönlendirme bilgisi gönderilir.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Ürünü Geri Gönderin</h3>
                    <div className="space-y-3">
                      <p>
                        Ürünü, fatura aslı ile birlikte paketleyip kargoya teslim edin.
                      </p>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="font-semibold mb-2">Kargo Ücreti:</p>
                        <p>• <strong className="text-green-600">Aynı kargo firmasıyla gönderirseniz</strong> iade kargo ücreti bize aittir.</p>
                        <p>• <strong className="text-orange-600">Farklı bir kargo firmasıyla gönderirseniz,</strong> kargo ücreti göndericiye aittir.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">İade İncelemesi</h3>
                    <p>
                      Ürün depomuza ulaştığında kalite kontrol ekibimiz tarafından incelenir. İade koşullarına uygunsa işleme alınır.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Para İadesi</h3>
                    <p>
                      İade onaylandıktan sonra <strong>10 iş günü içinde</strong> ödemeniz iade edilir.
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Kredi kartı: Kartınıza iade (banka işlem süresine bağlı olarak 2-8 hafta)</li>
                      <li>Banka kartı: IBAN numaranıza havale</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Ürün Değişimi</h2>
              <p className="mb-4">
                Satın aldığınız ürünü farklı beden, renk veya model ile değiştirmek istiyorsanız:
              </p>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Değişim Seçenekleri</h3>
                <ul className="space-y-3">
                  <li>
                    <strong>Beden/Renk Değişimi:</strong> Aynı ürünün farklı bedeni veya rengini ücretsiz değiştirebilirsiniz.
                  </li>
                  <li>
                    <strong>Farklı Ürün:</strong> Mevcut ürünü iade edip yeni sipariş verebilirsiniz.
                  </li>
                  <li>
                    <strong>Stok Durumu:</strong> Talep ettiğiniz ürün stokta yoksa, iade işlemi yapılır.
                  </li>
                </ul>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                <strong>Not:</strong> Değişim talebi de 14 günlük süre içinde yapılmalıdır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Hatalı veya Hasarlı Ürün</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6">
                <p className="mb-4">
                  Eğer size hatalı, hasarlı veya yanlış ürün geldiyse:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ürünü teslim almayın veya kargo görevlisine tutanak tutturun.</li>
                  <li>Hemen bizimle iletişime geçin.</li>
                  <li>Ürün fotoğraflarını gönderin.</li>
                  <li>Yeni ürün gönderimi veya tam iade seçeneğini talep edebilirsiniz.</li>
                </ul>
                <p className="mt-4 font-semibold text-gray-900">
                  ⚡ Hatalı ürünlerde kargo ücreti tamamen bize aittir.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Kargo Hasarları</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Paketi teslim almadan önce kontrol edin.</li>
                <li>Hasar varsa teslim almayın ve kargo görevlisine "Hasarlı Ürün Tutanağı" tutturun.</li>
                <li>Eğer sonradan fark ettiyseniz, 3 gün içinde bize bildirin.</li>
                <li>Hasar fotoğraflarını paylaşın.</li>
              </ol>
              <p className="mt-4">
                Kargo kaynaklı hasarlar tamamen tarafımızca karşılanır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. İptal ve İade Bildirimi</h2>
              <p className="mb-4">Cayma hakkınızı kullanmak veya iade talebi oluşturmak için bizimle şu kanallardan iletişime geçebilirsiniz:</p>
              <div className="bg-gray-100 p-6 rounded-lg space-y-3">
                <p><strong>📞 Telefon:</strong> 0532 280 79 44</p>
                <p><strong>📱 WhatsApp:</strong> 0532 280 79 44</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Sıkça Sorulan Sorular</h2>

              <div className="space-y-4">
                <div className="border-l-4 border-orange-600 pl-4">
                  <p className="font-bold text-gray-900">S: İade kargo ücreti kim tarafından ödenir?</p>
                  <p className="text-gray-700 mt-1">
                    C: Aynı kargo firmasıyla gönderilen iadelerde kargo ücreti bize aittir. Farklı bir kargo firmasıyla gönderilen iadelerde kargo ücreti göndericiye aittir.
                  </p>
                </div>

                <div className="border-l-4 border-orange-600 pl-4">
                  <p className="font-bold text-gray-900">S: Etiket kopmuşsa iade alınır mı?</p>
                  <p className="text-gray-700 mt-1">
                    C: Maalesef etiket kopmuş ürünler iade kabul edilemez. Ürünü denemeden önce
                    etiketleri korumaya özen gösterin.
                  </p>
                </div>

                <div className="border-l-4 border-orange-600 pl-4">
                  <p className="font-bold text-gray-900">S: Para iadem ne zaman hesabıma geçer?</p>
                  <p className="text-gray-700 mt-1">
                    C: İade onaylandıktan sonra 10 iş günü içinde ödeme işlemi başlatılır.
                    Kredi kartına iadede bankanızın işlem süresine bağlı olarak 2-8 hafta sürebilir.
                  </p>
                </div>

                <div className="border-l-4 border-orange-600 pl-4">
                  <p className="font-bold text-gray-900">S: Kampanyalı üründe iade nasıl yapılır?</p>
                  <p className="text-gray-700 mt-1">
                    C: Kampanya kapsamında alınan tüm ürünlerin birlikte iade edilmesi gerekir.
                    Örneğin "2 Al 1 Öde" kampanyasında hem alınan hem hediye ürün iade edilmelidir.
                  </p>
                </div>
              </div>
            </section>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-8 rounded-lg text-center">
              <p className="text-2xl font-bold text-gray-900 mb-4">
                🎯 Memnuniyetiniz Garantimizdir!
              </p>
              <p className="text-gray-700 mb-4">
                Herhangi bir sorunuz veya sorununuz mu var?
              </p>
              <p className="text-lg font-semibold text-orange-600 mb-2">
                📞 0532 280 79 44
              </p>
              <p className="text-gray-600">
                💬 WhatsApp Destek Hattı
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
