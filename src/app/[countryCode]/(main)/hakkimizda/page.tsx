import { Metadata } from "next"
import { Building2, Calendar, Package, Award, Heart, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Hakkımızda - Kazakçı",
  description: "Kazakçı - 1980'den bu yana kaliteli erkek triko üretimi. Roy Garage markası ile modern ve klasik tarzı bir araya getiriyoruz.",
}

export default function HakkimizdaPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="content-container">
        <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Hakkımızda
          </h1>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
            {/* Intro Section */}
            <div className="flex items-start gap-4 bg-orange-50 p-6 rounded-lg">
              <Building2 className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Firmamız</h2>
                <p className="leading-relaxed">
                  Firmamız, <strong>1980 yılında</strong> İstanbul Yeşildirek – Cağaloğlu bölgesinde,
                  Ersoy İş Hanı'nda triko imalatı faaliyetine başlamıştır. İlk yıllarda bayan triko
                  üretimiyle sektöre adım atan firmamız, yıllar içinde edindiği deneyim ve birikimiyle
                  erkek triko imalatına yönelmiş, üretim faaliyetlerini bugün Bayrampaşa'daki modern
                  tesisinde sürdürmektedir.
                </p>
              </div>
            </div>

            {/* Values Section */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <Heart className="w-7 h-7 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
                  <p className="leading-relaxed">
                    Kurulduğu günden bu yana <strong>kalite, estetik ve müşteri memnuniyeti</strong>ni
                    temel prensip edinen firmamız; tasarım, üretim ve satış süreçlerinin tamamında
                    yüksek standartları hedeflemektedir. Koleksiyonlarımız, çağdaş çizgilerle birleşen
                    klasik triko anlayışını yansıtarak her sezon yenilikçi bir tarz sunmaktadır.
                  </p>
                </div>
              </div>
            </section>

            {/* Brands Section */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <Sparkles className="w-7 h-7 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Markalarımız</h2>
                  <p className="leading-relaxed mb-4">
                    Ürünlerimizin üretimi <strong>Roy Garage</strong> markası altında yapılmakta olup,
                    perakende satışlarımız <strong>Kazakci.com</strong> üzerinden gerçekleştirilmektedir.
                  </p>
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border-l-4 border-orange-600">
                    <p className="font-semibold text-gray-900 mb-2">Roy Garage</p>
                    <p className="text-gray-700">
                      Erkek triko alanında kaliteyi, zarafeti ve modern çizgiyi bir araya getiren
                      bir üretim markasıdır. Uzun yıllara dayanan sektör tecrübemizi, güçlü üretim
                      altyapımızla birleştirerek erkek triko alanında güvenilir, kaliteli ve
                      sürdürülebilir markalar arasında yer almayı hedefliyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Mission Section */}
            <section>
              <div className="flex items-start gap-4 mb-4">
                <Award className="w-7 h-7 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h2>
                  <p className="leading-relaxed">
                    Klasikten moderne, her zevke hitap eden koleksiyonlarımızla <strong>trikoda
                    kalite ve güvenin adresi</strong> olmaya devam ediyoruz. Müşterilerimize en
                    iyi ürünleri sunmak ve onların beklentilerini aşmak için çalışıyoruz.
                  </p>
                </div>
              </div>
            </section>

            {/* Timeline */}
            <section className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calendar className="w-7 h-7 text-orange-600" />
                Tarihçemiz
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex-shrink-0">
                    1980
                  </div>
                  <p className="text-gray-700 pt-2">
                    İstanbul Yeşildirek – Cağaloğlu bölgesinde, Ersoy İş Hanı'nda bayan triko
                    imalatıyla faaliyete başladık
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex-shrink-0">
                    1990'lar
                  </div>
                  <p className="text-gray-700 pt-2">
                    Edindiğimiz deneyim ve birikim ile erkek triko imalatına yöneldik
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex-shrink-0">
                    Bugün
                  </div>
                  <p className="text-gray-700 pt-2">
                    Bayrampaşa'daki modern tesisimizde Roy Garage markası altında üretim yapıyor,
                    Kazakci.com üzerinden müşterilerimize ulaşıyoruz
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">İletişim</h2>
              <p className="mb-4">
                Ürünlerimiz, hizmetlerimiz veya firmamız hakkında daha fazla bilgi almak için
                bizimle iletişime geçebilirsiniz:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg space-y-2">
                <p><strong>E-posta:</strong> info@kazakci.com</p>
                <p><strong>Telefon:</strong> 0532 280 79 44</p>
                <p><strong>Adres:</strong> Orta Mah. Eminefendi Cad. No: 12/B Bayrampaşa/İstanbul</p>
              </div>
            </section>

            {/* Closing Statement */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-8 rounded-lg text-center mt-8">
              <Package className="w-12 h-12 mx-auto mb-4" />
              <p className="text-xl font-semibold mb-2">
                40+ Yıllık Deneyim
              </p>
              <p className="text-orange-100">
                Kaliteli erkek trikosunda güvenilir adresiniz
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
