import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gizlilik Politikası - Kazakçı",
  description: "Kişisel bilgilerinizin gizliliği ve güvenliği politikamız",
}

export default function GizlilikPolitikasiPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="content-container">
        <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Gizlilik Politikası
          </h1>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <p className="text-sm text-gray-600 mb-8">
              Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Giriş</h2>
              <p>
                Kazakçı olarak, müşterilerimizin gizliliğine değer veriyor ve kişisel bilgilerinizi
                korumak için gereken tüm önlemleri alıyoruz. Bu Gizlilik Politikası, web sitemizi
                ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda kişisel bilgilerinizin nasıl
                toplandığını, kullanıldığını ve korunduğunu açıklar.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Topladığımız Bilgiler</h2>

              <h3 className="font-bold text-gray-900 mt-4 mb-3">2.1. Doğrudan Topladığımız Bilgiler</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, doğum tarihi</li>
                <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, adres</li>
                <li><strong>Hesap Bilgileri:</strong> Kullanıcı adı, şifre</li>
                <li><strong>Ödeme Bilgileri:</strong> Fatura adresi, ödeme yöntemi bilgileri</li>
                <li><strong>Sipariş Bilgileri:</strong> Satın alınan ürünler, sipariş geçmişi</li>
              </ul>

              <h3 className="font-bold text-gray-900 mt-4 mb-3">2.2. Otomatik Toplanan Bilgiler</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cihaz Bilgileri:</strong> IP adresi, tarayıcı türü, işletim sistemi</li>
                <li><strong>Kullanım Bilgileri:</strong> Ziyaret edilen sayfalar, tıklama verileri</li>
                <li><strong>Çerez Bilgileri:</strong> Tercihler, oturum bilgileri</li>
                <li><strong>Konum Bilgileri:</strong> Genel coğrafi konum</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Bilgilerin Kullanım Amaçları</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="mb-3">Topladığımız bilgileri şu amaçlarla kullanırız:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Siparişlerinizi işlemek ve ürünleri teslim etmek</li>
                  <li>Müşteri hizmetleri sunmak ve sorularınızı yanıtlamak</li>
                  <li>Hesabınızı yönetmek ve güvenliğini sağlamak</li>
                  <li>Kişiselleştirilmiş alışveriş deneyimi sunmak</li>
                  <li>Pazarlama ve promosyon faaliyetleri yürütmek (izniniz dahilinde)</li>
                  <li>Web sitemizi ve hizmetlerimizi geliştirmek</li>
                  <li>Dolandırıcılığı önlemek ve güvenliği sağlamak</li>
                  <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Bilgi Paylaşımı</h2>
              <p className="mb-4">Kişisel bilgilerinizi aşağıdaki durumlarda üçüncü taraflarla paylaşabiliriz:</p>

              <h3 className="font-bold text-gray-900 mt-4 mb-3">4.1. Hizmet Sağlayıcılar</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ödeme işlemcileri (güvenli ödeme için)</li>
                <li>Kargo şirketleri (teslimat için)</li>
                <li>E-posta hizmeti sağlayıcıları (iletişim için)</li>
                <li>Veri analitiği sağlayıcıları</li>
                <li>Hosting ve altyapı hizmet sağlayıcıları</li>
              </ul>

              <h3 className="font-bold text-gray-900 mt-4 mb-3">4.2. Yasal Zorunluluklar</h3>
              <p>
                Yasal bir talep, mahkeme kararı veya yasal yükümlülük durumunda yetkili mercilere
                bilgi sağlayabiliriz.
              </p>

              <h3 className="font-bold text-gray-900 mt-4 mb-3">4.3. İş Transferleri</h3>
              <p>
                Şirket birleşmesi, satın alma veya varlık satışı durumunda bilgileriniz transfer edilebilir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Veri Güvenliği</h2>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="mb-3"><strong>Güvenlik Önlemlerimiz:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL/TLS şifrelemesi ile güvenli veri iletimi</li>
                  <li>Güvenli sunucularda veri depolama</li>
                  <li>Düzenli güvenlik denetimleri ve testler</li>
                  <li>Erişim kontrolü ve yetkilendirme sistemleri</li>
                  <li>Çalışan eğitimleri ve gizlilik anlaşmaları</li>
                  <li>Güvenlik duvarları ve saldırı tespit sistemleri</li>
                </ul>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Not:</strong> Hiçbir sistem %100 güvenli değildir. Şifrenizi kimseyle paylaşmayın
                ve şüpheli aktivite fark ederseniz derhal bizimle iletişime geçin.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Çerezler ve Takip Teknolojileri</h2>
              <p className="mb-3">
                Web sitemiz, deneyiminizi geliştirmek için çerezler kullanır. Çerezler hakkında
                detaylı bilgi için <a href="/legal/cerez-politikasi" className="text-orange-600 hover:text-orange-700 underline">Çerez Politikamızı</a> inceleyebilirsiniz.
              </p>
              <p>
                Tarayıcı ayarlarınızdan çerezleri kontrol edebilir veya engelleyebilirsiniz. Ancak
                bu durumda bazı özellikler düzgün çalışmayabilir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Haklarınız</h2>
              <div className="bg-orange-50 p-6 rounded-lg">
                <p className="mb-3"><strong>Kişisel verileriniz ile ilgili haklarınız:</strong></p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Bilgilerinize erişme ve kopyasını alma hakkı</li>
                  <li>Yanlış veya eksik bilgileri düzeltme hakkı</li>
                  <li>Belirli koşullarda bilgilerinizi silme hakkı</li>
                  <li>Veri işlemeyi kısıtlama hakkı</li>
                  <li>Veri taşınabilirliği hakkı</li>
                  <li>Otomatik karar verme işlemlerine itiraz etme hakkı</li>
                  <li>Pazarlama iletişimlerinden çıkma hakkı</li>
                </ul>
              </div>
              <p className="mt-4">
                Haklarınızı kullanmak için <strong>privacy@kazakci.com</strong> adresine e-posta göndererek
                veya hesap ayarlarınızdan talepte bulunabilirsiniz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Veri Saklama</h2>
              <p>
                Kişisel bilgilerinizi, toplama amacı için gerekli olduğu sürece veya yasal
                yükümlülüklerimiz gerektirdiği sürece saklarız. Sipariş ve fatura bilgileri
                vergi mevzuatı gereği 10 yıl süreyle saklanır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Çocukların Gizliliği</h2>
              <p>
                Web sitemiz 18 yaş altı çocuklara yönelik değildir. Bilerek 18 yaş altı kişilerden
                kişisel bilgi toplamayız. Ebeveyn veya vasiyseniz ve çocuğunuzun bize kişisel bilgi
                verdiğini düşünüyorsanız, lütfen bizimle iletişime geçin.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Üçüncü Taraf Bağlantıları</h2>
              <p>
                Web sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin
                gizlilik uygulamalarından sorumlu değiliz. Başka bir web sitesini ziyaret ettiğinizde
                o sitenin gizlilik politikasını okumanızı öneririz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Politika Değişiklikleri</h2>
              <p>
                Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada
                yayınlandığında yürürlüğe girer. Önemli değişiklikler olduğunda sizi e-posta ile
                bilgilendireceğiz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. İletişim</h2>
              <p className="mb-4">
                Gizlilik politikamız veya kişisel verilerinizin işlenmesi hakkında sorularınız varsa,
                bizimle iletişime geçebilirsiniz:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg">
                <p><strong>E-posta:</strong> info@kazakci.com</p>
                <p><strong>Telefon:</strong> 0532 280 79 44</p>
                <p><strong>Adres:</strong> Orta Mah. Eminefendi Cad. No: 12/B Bayrampaşa/İstanbul</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
