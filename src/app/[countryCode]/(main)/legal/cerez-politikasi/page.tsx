import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Çerez (Cookie) Politikası - Kazakçı",
  description: "Web sitemizde kullanılan çerezler ve veri toplama yöntemleri hakkında bilgi",
}

export default function CerezPolitikasiPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="content-container">
        <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Çerez (Cookie) Politikası
          </h1>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <p className="text-sm text-gray-600 mb-8">
              Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Çerez Nedir?</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="mb-4">
                  <strong>Çerez (Cookie)</strong>, bir web sitesini ziyaret ettiğinizde cihazınıza
                  (bilgisayar, tablet, telefon) kaydedilen küçük metin dosyalarıdır.
                </p>
                <p>
                  Çerezler, web sitelerinin kullanıcı deneyimini geliştirmek, site performansını
                  ölçmek ve içeriği kişiselleştirmek için kullanılır. Çerezler kişisel bilgi içermez
                  ve zararlı yazılım değildir.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Çerez Türleri</h2>

              <h3 className="font-bold text-gray-900 mt-6 mb-3">2.1. Süreye Göre Çerezler</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-orange-600 pl-4">
                  <h4 className="font-bold text-gray-900">📅 Oturum Çerezleri (Session Cookies)</h4>
                  <p className="text-gray-700 mt-2">
                    Tarayıcınızı kapattığınızda otomatik olarak silinen geçici çerezlerdir. Site
                    üzerinde gezinmenizi ve işlemlerinizi hatırlamak için kullanılır.
                  </p>
                </div>

                <div className="border-l-4 border-green-600 pl-4">
                  <h4 className="font-bold text-gray-900">💾 Kalıcı Çerezler (Persistent Cookies)</h4>
                  <p className="text-gray-700 mt-2">
                    Belirli bir süre boyunca cihazınızda kalan çerezlerdir. Tercihlerinizi ve
                    ayarlarınızı hatırlamak için kullanılır (örn: dil seçimi, oturum açık kalma).
                  </p>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mt-8 mb-3">2.2. Kullanım Amacına Göre Çerezler</h3>

              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">✅ Zorunlu Çerezler</h4>
                  <p className="mb-2">
                    Sitenin düzgün çalışması için mutlaka gerekli olan çerezlerdir. Bunlar olmadan
                    site kullanılamaz.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Örnekler:</strong> Oturum yönetimi, güvenlik, sepet işlemleri, form gönderimi
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">📊 Performans Çerezleri</h4>
                  <p className="mb-2">
                    Ziyaretçilerin siteyi nasıl kullandığını anlamak için anonim bilgi toplayan çerezlerdir.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Örnekler:</strong> Sayfa görüntülenme sayısı, ziyaret süresi, hata raporları
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">🎯 İşlevsellik Çerezleri</h4>
                  <p className="mb-2">
                    Tercihlerinizi hatırlayarak kişiselleştirilmiş deneyim sunan çerezlerdir.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Örnekler:</strong> Dil seçimi, para birimi, bölge ayarları, görünüm tercihleri
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">🎨 Hedefleme/Reklam Çerezleri</h4>
                  <p className="mb-2">
                    İlgi alanlarınıza uygun reklamlar göstermek için kullanılan çerezlerdir.
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Örnekler:</strong> İlgi alanı takibi, reklam performansı, yeniden pazarlama
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Sitemizde Kullanılan Çerezler</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Çerez Adı</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Türü</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Amacı</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Süresi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">session_id</td>
                      <td className="border border-gray-300 px-4 py-2">Zorunlu</td>
                      <td className="border border-gray-300 px-4 py-2">Oturum yönetimi</td>
                      <td className="border border-gray-300 px-4 py-2">Oturum</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">cart_token</td>
                      <td className="border border-gray-300 px-4 py-2">Zorunlu</td>
                      <td className="border border-gray-300 px-4 py-2">Sepet bilgilerini saklama</td>
                      <td className="border border-gray-300 px-4 py-2">30 gün</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">auth_token</td>
                      <td className="border border-gray-300 px-4 py-2">Zorunlu</td>
                      <td className="border border-gray-300 px-4 py-2">Kimlik doğrulama</td>
                      <td className="border border-gray-300 px-4 py-2">14 gün</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">language</td>
                      <td className="border border-gray-300 px-4 py-2">İşlevsellik</td>
                      <td className="border border-gray-300 px-4 py-2">Dil tercihi</td>
                      <td className="border border-gray-300 px-4 py-2">1 yıl</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">_ga</td>
                      <td className="border border-gray-300 px-4 py-2">Performans</td>
                      <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                      <td className="border border-gray-300 px-4 py-2">2 yıl</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">_fbp</td>
                      <td className="border border-gray-300 px-4 py-2">Reklam</td>
                      <td className="border border-gray-300 px-4 py-2">Facebook Pixel</td>
                      <td className="border border-gray-300 px-4 py-2">3 ay</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Üçüncü Taraf Çerezleri</h2>
              <p className="mb-4">
                Sitemiz, bazı üçüncü taraf hizmet sağlayıcılarının çerezlerini kullanmaktadır:
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-bold text-gray-900">Google Analytics</h4>
                  <p className="text-gray-700">
                    Web sitesi trafiğini ve kullanıcı davranışlarını analiz etmek için kullanılır.
                    Toplanan veriler anonim ve toplu olarak işlenir.
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
                      Google Gizlilik Politikası
                    </a>
                  </p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-bold text-gray-900">Facebook Pixel</h4>
                  <p className="text-gray-700">
                    Reklam kampanyalarının performansını ölçmek ve hedefli reklamlar göstermek için kullanılır.
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="underline">
                      Facebook Veri Politikası
                    </a>
                  </p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-bold text-gray-900">Stripe</h4>
                  <p className="text-gray-700">
                    Güvenli ödeme işlemleri için kullanılır. Ödeme bilgileriniz güvenli bir şekilde işlenir.
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
                      Stripe Gizlilik Politikası
                    </a>
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Çerezleri Yönetme</h2>

              <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-6">
                <p className="font-bold text-lg text-gray-900 mb-3">
                  🎛️ Çerez Tercihlerinizi Kontrol Edin
                </p>
                <p>
                  Çerezleri kabul etme veya reddetme hakkına sahipsiniz. Tarayıcı ayarlarınızdan
                  çerezleri yönetebilir veya silebilirsiniz.
                </p>
              </div>

              <h3 className="font-bold text-gray-900 mt-6 mb-3">Tarayıcı Ayarları</h3>
              <p className="mb-4">Popüler tarayıcılarda çerez ayarlarına nasıl erişeceğinizi öğrenin:</p>

              <div className="space-y-3">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-semibold">🌐 Google Chrome</p>
                  <p className="text-sm text-gray-700">
                    Ayarlar &gt; Gizlilik ve güvenlik &gt; Çerezler ve diğer site verileri
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-semibold">🦊 Mozilla Firefox</p>
                  <p className="text-sm text-gray-700">
                    Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Site Verileri
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-semibold">🧭 Safari</p>
                  <p className="text-sm text-gray-700">
                    Tercihler &gt; Gizlilik &gt; Çerezleri ve web sitesi verilerini yönet
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-semibold">🔷 Microsoft Edge</p>
                  <p className="text-sm text-gray-700">
                    Ayarlar &gt; Çerezler ve site izinleri &gt; Çerezleri ve site verilerini yönet
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg mt-6">
                <p className="font-bold text-gray-900 mb-2">⚠️ Önemli Not:</p>
                <p>
                  Çerezleri engellerseniz veya silerseniz, sitenin bazı özellikleri düzgün çalışmayabilir.
                  Örneğin, giriş yapamayabilir veya sepet işlemleri yapamayabilirsiniz.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Çerez Onay Yönetimi</h2>
              <p className="mb-4">
                Sitemizi ilk ziyaretinizde, zorunlu olmayan çerezler için onayınızı istiyoruz.
                Tercihlerinizi şu şekillerde yönetebilirsiniz:
              </p>

              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Çerez banner'ındaki "Çerez Ayarları" butonundan</li>
                <li>Sayfa altındaki "Çerez Tercihleri" linkinden</li>
                <li>Tarayıcı ayarlarınızdan</li>
              </ul>

              <div className="bg-green-50 p-6 rounded-lg">
                <p className="mb-3"><strong>Tercih Kategorileri:</strong></p>
                <ul className="space-y-2">
                  <li>✅ <strong>Zorunlu Çerezler:</strong> Kapatılamaz (sitenin çalışması için gerekli)</li>
                  <li>⚙️ <strong>Performans Çerezleri:</strong> Açık/Kapalı</li>
                  <li>🎨 <strong>İşlevsellik Çerezleri:</strong> Açık/Kapalı</li>
                  <li>🎯 <strong>Reklam Çerezleri:</strong> Açık/Kapalı</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Do Not Track (DNT)</h2>
              <p>
                Bazı tarayıcılar "Do Not Track" (İzleme) özelliği sunar. Şu anda DNT için evrensel
                bir standart olmadığından, sitemiz DNT sinyallerine otomatik olarak yanıt vermemektedir.
                Ancak çerez tercihlerinizi manuel olarak yönetebilirsiniz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Çocukların Gizliliği</h2>
              <p>
                Sitemiz 18 yaş altı çocuklara yönelik değildir ve bilerek çocuklardan veri toplamayız.
                Ebeveyn veya vasi iseniz ve çocuğunuzun bize bilgi verdiğini düşünüyorsanız,
                lütfen bizimle iletişime geçin.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Güncelmeler</h2>
              <p>
                Bu Çerez Politikası zaman zaman güncellenebilir. Önemli değişiklikler olduğunda
                sizi bilgilendireceğiz. Güncel versiyonu bu sayfada bulabilirsiniz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Haklarınız</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="mb-3"><strong>KVKK kapsamında haklarınız:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hangi çerezlerin kullanıldığını öğrenme hakkı</li>
                  <li>Çerezleri kabul etme veya reddetme hakkı</li>
                  <li>Çerez tercihlerinizi değiştirme hakkı</li>
                  <li>Çerezleri silme hakkı</li>
                  <li>Toplanan verilerin silinmesini talep etme hakkı</li>
                </ul>
              </div>
              <p className="mt-4">
                Detaylı bilgi için <a href="/legal/kvkk" className="text-orange-600 hover:text-orange-700 underline">KVKK Aydınlatma Metni</a>'ni inceleyebilirsiniz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. İletişim</h2>
              <p className="mb-4">
                Çerez politikamız hakkında sorularınız veya talebiniz varsa bizimle iletişime geçebilirsiniz:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg">
                <p><strong>E-posta:</strong> info@kazakci.com</p>
                <p><strong>Telefon:</strong> 0532 280 79 44</p>
                <p><strong>Adres:</strong> Orta Mah. Eminefendi Cad. No: 12/B Bayrampaşa/İstanbul</p>
              </div>
            </section>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-8 rounded-lg text-center mt-8">
              <p className="text-2xl mb-4">🍪</p>
              <p className="font-bold text-lg text-gray-900 mb-3">
                Çerezleri Kabul Ediyor musunuz?
              </p>
              <p className="text-gray-700 mb-4">
                Sitemizi kullanarak, çerez kullanımını kabul etmiş olursunuz.
              </p>
              <p className="text-sm text-gray-600">
                Tercihlerinizi istediğiniz zaman değiştirebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
