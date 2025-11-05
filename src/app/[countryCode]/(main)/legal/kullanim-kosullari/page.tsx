import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kullanım Koşulları - Kazakçı",
  description: "Web sitesi kullanım koşulları ve üyelik sözleşmesi",
}

export default function KullanimKosullariPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="content-container">
        <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Kullanım Koşulları / Üyelik Sözleşmesi
          </h1>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <p className="text-sm text-gray-600 mb-8">
              Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Taraflar ve Kapsam</h2>
              <p className="mb-4">
                İşbu Kullanım Koşulları ("Sözleşme"), www.kazakci.com internet sitesini ("Site")
                kullanan gerçek ve tüzel kişiler ("Kullanıcı") ile site sahibi <strong>Kazakçı</strong>
                ("Şirket") arasında elektronik ortamda akdedilmiştir.
              </p>
              <div className="bg-orange-50 p-6 rounded-lg">
                <p className="mb-2">
                  <strong>Site Sahibi Bilgileri:</strong>
                </p>
                <p>Ticaret Unvanı: Kazakçı</p>
                <p>Adres: Orta Mah. Eminefendi Cad. No: 12/B Bayrampaşa/İstanbul</p>
                <p>E-posta: info@kazakci.com</p>
                <p>Telefon: 0532 280 79 44</p>
                <p>Mersis No: 1814918420800017</p>
                <p>Ticaret Sicil No: 849222</p>
              </div>
              <p className="mt-4">
                Siteye erişim sağlayarak veya üye olarak işbu sözleşme şartlarını kabul etmiş sayılırsınız.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Sözleşme Konusu</h2>
              <p>
                İşbu sözleşmenin konusu, Şirket'in sahip olduğu internet sitesinin kullanım koşullarının
                belirlenmesidir. Sözleşme, Site'nin kullanımı ile ilgili tarafların hak ve yükümlülüklerini
                düzenlemektedir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Üyelik</h2>

              <h3 className="font-bold text-gray-900 mt-6 mb-3">3.1. Üye Olma Koşulları</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>18 yaşını doldurmuş olmak</li>
                <li>Medeni hakları kullanma ehliyetine sahip olmak</li>
                <li>Doğru ve güncel bilgiler vermek</li>
                <li>Bu sözleşme şartlarını kabul etmek</li>
              </ul>

              <h3 className="font-bold text-gray-900 mt-6 mb-3">3.2. Üyelik Süreci</h3>
              <div className="bg-blue-50 p-6 rounded-lg">
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Üyelik formunu eksiksiz ve doğru olarak doldurun</li>
                  <li>Kullanım koşullarını ve gizlilik politikasını onaylayın</li>
                  <li>E-posta adresinizi doğrulayın</li>
                  <li>Üyeliğiniz aktif hale gelir</li>
                </ol>
              </div>

              <h3 className="font-bold text-gray-900 mt-6 mb-3">3.3. Üyelik Bilgileri</h3>
              <p className="mb-3">Kullanıcı, üyelik sırasında verdiği bilgilerin doğruluğundan sorumludur:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Yanlış, yanıltıcı veya sahte bilgi vermeyeceğini kabul eder</li>
                <li>Bilgilerinde değişiklik olduğunda derhal güncelleyeceğini taahhüt eder</li>
                <li>Başkası adına veya sahte kimlikle üyelik oluşturamaz</li>
                <li>Bir kişi yalnızca bir üyelik hesabı oluşturabilir</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Kullanıcı Hesabı Güvenliği</h2>
              <div className="bg-red-50 border-l-4 border-red-600 p-6">
                <p className="mb-3"><strong>⚠️ Önemli Güvenlik Uyarıları:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Şifrenizi kimseyle paylaşmayın</li>
                  <li>Güçlü ve benzersiz bir şifre kullanın</li>
                  <li>Hesabınızdan çıkmayı unutmayın (özellikle ortak bilgisayarlarda)</li>
                  <li>Şüpheli aktivite fark ederseniz derhal şifrenizi değiştirin</li>
                  <li>Hesabınızdan yapılan tüm işlemlerden siz sorumlusunuz</li>
                </ul>
              </div>
              <p className="mt-4">
                Hesabınızın yetkisiz kullanımından şüpheleniyorsanız derhal info@kazakci.com
                adresine bildirimde bulunun.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Kullanım Kuralları</h2>

              <h3 className="font-bold text-gray-900 mt-4 mb-3">5.1. İzin Verilen Kullanım</h3>
              <p>Site, yalnızca kişisel ve ticari olmayan amaçlarla kullanılabilir:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2 mb-6">
                <li>Ürünleri incelemek ve sipariş vermek</li>
                <li>Hesap bilgilerinizi yönetmek</li>
                <li>Müşteri hizmetleriyle iletişim kurmak</li>
                <li>Yasal çerçevede alışveriş yapmak</li>
              </ul>

              <h3 className="font-bold text-gray-900 mt-6 mb-3">5.2. Yasak Faaliyetler</h3>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <p className="mb-3"><strong>Aşağıdaki faaliyetler kesinlikle yasaktır:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Site güvenliğini tehlikeye atmak veya sistemi bozmaya çalışmak</li>
                  <li>Virüs, truva atı veya zararlı yazılım yüklemek</li>
                  <li>Başkalarının hesaplarına yetkisiz erişim sağlamak</li>
                  <li>Site içeriğini izinsiz kopyalamak, çoğaltmak veya dağıtmak</li>
                  <li>Botlar, örümcekler veya otomatik araçlar kullanmak</li>
                  <li>Spam veya istenmeyen mesajlar göndermek</li>
                  <li>Ters mühendislik yapmak veya kaynak koduna erişmeye çalışmak</li>
                  <li>Yanıltıcı veya sahte bilgiler vermek</li>
                  <li>Telif hakkı veya fikri mülkiyet haklarını ihlal etmek</li>
                  <li>Yasa dışı faaliyetlerde bulunmak</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Fikri Mülkiyet Hakları</h2>
              <p className="mb-4">
                Site'de yer alan tüm içerik (metin, görsel, logo, tasarım, yazılım, veri tabanı vb.)
                Şirket'in veya lisans verenlerin fikri mülkiyetidir ve telif hakları ile korunmaktadır.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>İçerikleri ticari amaçla kullanamaz, çoğaltamaz veya dağıtamazsınız</li>
                <li>Site logosu ve markası izinsiz kullanılamaz</li>
                <li>Ürün görselleri ve açıklamaları telif hakkı korumasındadır</li>
                <li>Yazılı izin olmadan içerik kopyalanamaz</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Hizmet Kesintileri</h2>
              <p>
                Şirket, Site'nin kesintisiz ve hatasız çalışacağını garanti etmez. Aşağıdaki durumlarda
                hizmet kesintileri yaşanabilir:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Planlı bakım ve güncellemeler</li>
                <li>Teknik arızalar ve sistem hataları</li>
                <li>İnternet servis sağlayıcı sorunları</li>
                <li>Mücbir sebepler (doğal afetler, savaş, terör vb.)</li>
                <li>Güvenlik nedenleriyle gerekli görülen durumlarda</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Sorumluluk Sınırlamaları</h2>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Şirket Sorumlu Değildir:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Kullanıcı hesap bilgilerinin üçüncü kişilerle paylaşılmasından</li>
                  <li>Kullanıcının kendi kusuru ile oluşan zararlardan</li>
                  <li>Üçüncü taraf web sitelerinin içeriğinden</li>
                  <li>Mücbir sebeplerden kaynaklanan aksaklıklardan</li>
                  <li>Yasal mevzuat değişikliklerinden doğan durumlardan</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Üyeliğin Sona Ermesi</h2>

              <h3 className="font-bold text-gray-900 mt-4 mb-3">9.1. Kullanıcı Tarafından</h3>
              <p className="mb-3">
                Üyeliğinizi istediğiniz zaman sonlandırabilirsiniz:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hesap ayarlarından "Hesabımı Sil" seçeneğini kullanarak</li>
                <li>info@kazakci.com adresine e-posta göndererek</li>
              </ul>

              <h3 className="font-bold text-gray-900 mt-6 mb-3">9.2. Şirket Tarafından</h3>
              <p className="mb-3">
                Şirket, aşağıdaki durumlarda üyeliği askıya alabilir veya sonlandırabilir:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sözleşme şartlarının ihlali</li>
                <li>Yasadışı faaliyetlerde bulunma</li>
                <li>Sahte veya yanıltıcı bilgi verme</li>
                <li>Diğer kullanıcılara zarar verme</li>
                <li>Site güvenliğini tehdit etme</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Kişisel Verilerin Korunması</h2>
              <p>
                Kişisel verileriniz, <a href="/legal/kvkk" className="text-orange-600 hover:text-orange-700 underline">KVKK Aydınlatma Metni</a> ve <a href="/legal/gizlilik-politikasi" className="text-orange-600 hover:text-orange-700 underline">Gizlilik Politikası</a>'nda
                belirtilen şartlar dahilinde işlenir ve korunur.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Değişiklikler</h2>
              <p>
                Şirket, işbu sözleşme şartlarını önceden haber vermeksizin değiştirme hakkını saklı tutar.
                Değişiklikler bu sayfada yayınlandığı anda yürürlüğe girer. Siteyi kullanmaya devam
                etmeniz, değişiklikleri kabul ettiğiniz anlamına gelir.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <p>
                  💡 <strong>Önemli:</strong> Düzenli olarak bu sayfayı kontrol etmenizi öneririz.
                  Önemli değişikliklerde e-posta ile bilgilendirileceksiniz.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Uygulanacak Hukuk ve Yetkili Mahkeme</h2>
              <p className="mb-4">
                İşbu sözleşmeden doğabilecek her türlü uyuşmazlığın çözümünde Türkiye Cumhuriyeti
                yasaları uygulanır.
              </p>
              <p>
                Sözleşmeden kaynaklanan uyuşmazlıkların çözümünde <strong>İstanbul (Avrupa)
                Mahkemeleri ve İcra Daireleri</strong> yetkilidir.
              </p>
              <p className="mt-4">
                Tüketici işlemleri için <strong>Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri</strong>
                yetkilidir. Parasal sınırlar Ticaret Bakanlığı tarafından her yıl belirlenir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. İletişim</h2>
              <p className="mb-4">
                Kullanım koşulları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg">
                <p><strong>E-posta:</strong> info@kazakci.com</p>
                <p><strong>Telefon:</strong> 0532 280 79 44</p>
                <p><strong>Adres:</strong> Orta Mah. Eminefendi Cad. No: 12/B Bayrampaşa/İstanbul</p>
                <p><strong>Çalışma Saatleri:</strong> Hafta içi 09:00 - 18:00</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Yürürlük</h2>
              <p>
                İşbu Kullanım Koşulları, siteye üye olduğunuz veya siteyi kullanmaya başladığınız
                anda yürürlüğe girer ve üyeliğiniz sona erene veya site kullanımınız bitene kadar
                geçerliliğini korur.
              </p>
            </section>

            <div className="bg-orange-50 border-t-4 border-orange-600 p-6 mt-8">
              <p className="font-bold text-lg text-gray-900 mb-3">
                ✓ Sözleşme Kabul Beyanı
              </p>
              <p className="text-gray-700">
                Site'ye üye olarak veya siteyi kullanarak, işbu Kullanım Koşullarını okuduğunuzu,
                anladığınızı ve kabul ettiğinizi beyan ve taahhüt edersiniz.
              </p>
              <p className="mt-4 text-sm text-gray-600">
                Yürürlük Tarihi: {new Date().toLocaleDateString('tr-TR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
