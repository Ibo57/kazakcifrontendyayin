import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Shirt, Sparkles, Palette, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "Tişört - Yakında | Kazakçı.com",
  description: "Tişört koleksiyonumuz yakında sizlerle! En trend modeller ve renk seçenekleriyle.",
}

export default function TisortComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-full p-8 shadow-2xl animate-pulse">
              <Shirt className="w-20 h-20 text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Yakında Gelecek! 👕
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            <span className="font-bold text-green-600">Tişört Koleksiyonumuz</span> Çok Yakında Burada!
          </p>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Rahat, şık ve kaliteli tişörtlerimizle tanışmaya hazır olun.
            Her tarza ve her bedene uygun geniş koleksiyonumuzla sizi bekliyoruz.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-green-200 hover:border-green-400 transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
              <Palette className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Geniş Renk Seçeneği</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Pastel tonlardan canlı renklere, siyah beyazdan desenli modellere kadar her zevke uygun seçenekler.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-teal-200 hover:border-teal-400 transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
              <Sparkles className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Premium Kumaş</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              %100 pamuk ve karışım kumaşlarla üretilen, nefes alan ve dayanıklı tişörtler.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-cyan-200 hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
              <TrendingUp className="w-8 h-8 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Trend Modeller</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Basic, oversize, crop ve V yaka gibi sezonun en trend kesim ve modellerinde.
            </p>
          </div>
        </div>

        {/* Size Options */}
        <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Beden Seçeneklerimiz</h3>
          <p className="text-center text-gray-700 mb-6">
            XS'den 6XL'e kadar geniş beden yelpazesi
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL'].map((size) => (
              <div
                key={size}
                className="bg-white rounded-lg px-6 py-3 shadow-md border-2 border-green-300 hover:border-green-500 hover:shadow-lg transition-all duration-200"
              >
                <span className="text-xl font-bold text-green-600">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-xl p-10 shadow-xl border-2 border-green-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Şimdilik Diğer Ürünlerimize Göz Atın! 🛍️
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedClientLink href="/store">
              <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                Tüm Ürünleri İncele
              </button>
            </LocalizedClientLink>

            <LocalizedClientLink href="/categories/kazak-triko">
              <button className="px-8 py-4 bg-white hover:bg-gray-50 text-green-600 font-bold rounded-lg border-2 border-green-600 hover:border-green-700 shadow-lg transform hover:scale-105 transition-all duration-200">
                Kazak & Triko Koleksiyonu
              </button>
            </LocalizedClientLink>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Tişört koleksiyonumuz hazır olduğunda haberdar olmak ister misiniz?
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 opacity-75 cursor-not-allowed" disabled>
              📧 Haber Ver (Yakında)
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Bildirim sistemi yakında aktif olacak
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-8 text-white text-center shadow-xl">
          <p className="text-lg font-semibold mb-2">
            ✨ Koleksiyonumuz üzerinde çalışıyoruz!
          </p>
          <p className="text-green-100">
            En kaliteli tişörtleri en uygun fiyatlarla sizlere sunmak için hazırlıklarımızı sürdürüyoruz.
          </p>
        </div>
      </div>
    </div>
  )
}
