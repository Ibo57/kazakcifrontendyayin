import { Metadata } from "next"

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni - Kazakçı",
  description: "Kişisel verilerin korunması ve işlenmesi hakkında bilgilendirme",
}

export default function KVKKPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="content-container">
        <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            KVKK Aydınlatma Metni
          </h1>

          <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
            <p className="text-sm text-gray-600 mb-8">
              Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Veri Sorumlusu</h2>
              <p>
                6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz;
                veri sorumlusu olarak <strong>Kazakçı</strong> tarafından aşağıda açıklanan kapsamda işlenebilecektir.
              </p>
              <div className="bg-orange-50 p-4 rounded-lg mt-4">
                <p className="font-semibold text-gray-900">İletişim Bilgileri:</p>
                <p className="mt-2">Adres: Orta Mah. Eminefendi Cad. No: 12/B Bayrampaşa/İstanbul</p>
                <p>E-posta: info@kazakci.com</p>
                <p>Telefon: 0532 280 79 44</p>
                <p>Mersis No: 1814918420800017</p>
                <p>Ticaret Sicil No: 849222</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Kişisel Verilerin Hangi Amaçla İşleneceği
              </h2>
              <p className="mb-3">Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>E-ticaret platformumuzun sunulması ve yönetimi</li>
                <li>Sipariş işlemlerinin gerçekleştirilmesi ve teslimatı</li>
                <li>Müşteri ilişkileri yönetimi ve iletişim</li>
                <li>Ödeme işlemlerinin güvenli bir şekilde gerçekleştirilmesi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Kampanya, promosyon ve reklam faaliyetlerinin yürütülmesi</li>
                <li>Müşteri memnuniyeti ve hizmet kalitesinin artırılması</li>
                <li>İstatistiksel analizler ve raporlamalar yapılması</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. İşlenen Kişisel Veri Kategorileri
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası (fatura için)</li>
                <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, adres</li>
                <li><strong>Müşteri İşlem Bilgileri:</strong> Sipariş geçmişi, ödeme bilgileri, tercihler</li>
                <li><strong>İşlem Güvenliği Bilgileri:</strong> IP adresi, çerez bilgileri, cihaz bilgileri</li>
                <li><strong>Finansal Bilgiler:</strong> Banka/kredi kartı bilgileri (tokenize edilmiş)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Kişisel Verilerin Aktarılması
              </h2>
              <p className="mb-3">Kişisel verileriniz aşağıdaki taraflara aktarılabilir:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kargo ve lojistik firmaları (teslimat için)</li>
                <li>Ödeme hizmeti sağlayıcıları (güvenli ödeme işlemleri için)</li>
                <li>Hukuki danışmanlar ve denetim firmaları</li>
                <li>Yasal yükümlülükler kapsamında kamu kurum ve kuruluşları</li>
                <li>İş ortakları ve tedarikçiler (hizmet sunumu için gerekli olduğu ölçüde)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi
              </h2>
              <p className="mb-3">Kişisel verileriniz:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Web sitemiz üzerinden üyelik ve sipariş formları aracılığıyla</li>
                <li>E-posta, telefon veya çağrı merkezi aracılığıyla</li>
                <li>Sosyal medya platformları aracılığıyla</li>
                <li>Çerezler ve benzeri teknolojiler aracılığıyla</li>
              </ul>
              <p className="mt-4">
                <strong>Hukuki Sebepler:</strong> Sözleşmenin kurulması ve ifası, yasal yükümlülüklerin
                yerine getirilmesi, meşru menfaatler ve açık rızanız.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Kişisel Veri Sahibinin Hakları
              </h2>
              <p className="mb-3">KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
              <div className="bg-blue-50 p-6 rounded-lg space-y-3">
                <p>✓ Kişisel verilerinizin işlenip işlenmediğini öğrenme</p>
                <p>✓ İşlenmişse buna ilişkin bilgi talep etme</p>
                <p>✓ İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</p>
                <p>✓ Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</p>
                <p>✓ Eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme</p>
                <p>✓ KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</p>
                <p>✓ Düzeltme, silinme veya yok edilme taleplerinin kişisel verilerin aktarıldığı
                   üçüncü kişilere bildirilmesini isteme</p>
                <p>✓ Münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kendi
                   aleyhine bir sonucun ortaya çıkmasına itiraz etme</p>
                <p>✓ Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması
                   halinde zararın giderilmesini talep etme</p>
              </div>
              <p className="mt-4">
                Haklarınızı kullanmak için <strong>info@kazakci.com</strong> adresine e-posta
                gönderebilir veya şirket adresimize yazılı olarak başvurabilirsiniz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Veri Güvenliği
              </h2>
              <p>
                Kişisel verilerinizin güvenliğini sağlamak için teknik ve idari tedbirler almaktayız.
                Verileriniz SSL şifrelemesi ile korunmakta, erişim yetkileri kısıtlanmakta ve
                düzenli güvenlik denetimleri yapılmaktadır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. İletişim
              </h2>
              <p>
                KVKK kapsamındaki sorularınız için bizimle iletişime geçebilirsiniz:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <p><strong>E-posta:</strong> kvkk@kazakci.com</p>
                <p><strong>Adres:</strong> [Şirket Adresi]</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
