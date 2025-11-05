import { Metadata } from "next"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Sparkles, Ruler, Shield, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Pantolon - Yakında | Kazakçı.com",
  description: "Pantolon koleksiyonumuz yakında sizlerle! Rahat kesim, kaliteli kumaş ve şık modeller.",
}

export default function PantolonComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-8">
            <div className="bg-gradient-to-r from-slate-700 to-gray-800 rounded-full p-8 shadow-2xl animate-pulse">
              <svg
                className="w-20 h-20 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Yakında Gelecek! 👖
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            <span className="font-bold text-slate-700">Pantolon Koleksiyonumuz</span> Çok Yakında Burada!
          </p>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Şık, rahat ve her ortama uygun pantolon modellerimizle tanışmaya hazır olun.
            Jean'den kumaş pantolona, spordan klasiğe geniş ürün yelpazesi.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 hover:border-slate-400 transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-slate-100 to-gray-100 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <Ruler className="w-7 h-7 text-slate-700" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Perfect Fit</h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              Slim fit'ten regular'a, rahat kesime kadar her bedene uygun modeller.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-gray-100 to-zinc-100 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <Shield className="w-7 h-7 text-gray-700" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Dayanıklı Kumaş</h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              Kaliteli denim, pamuk ve karışım kumaşlarla uzun ömürlü kullanım.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-zinc-200 hover:border-zinc-400 transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-zinc-100 to-slate-100 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <Sparkles className="w-7 h-7 text-zinc-700" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Şık Tasarım</h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              Klasik ve modern kesimlerle her tarza uygun seçenekler.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-slate-200 hover:border-slate-400 transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-slate-100 to-gray-100 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <Zap className="w-7 h-7 text-slate-700" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Konforlu</h3>
            <p className="text-gray-600 text-center text-sm leading-relaxed">
              Tüm gün rahat edebileceğiniz esnek ve nefes alan kumaşlar.
            </p>
          </div>
        </div>

        {/* Size Options */}
        <div className="bg-gradient-to-r from-slate-100 to-gray-100 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Beden Seçeneklerimiz</h3>
          <p className="text-center text-gray-700 mb-6">
            28'den 6XL'e kadar geniş beden yelpazesi
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['28', '30', '32', '34', '36', '38', '40', '42', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL'].map((size) => (
              <div
                key={size}
                className="bg-white rounded-lg px-6 py-3 shadow-md border-2 border-slate-300 hover:border-slate-500 hover:shadow-lg transition-all duration-200"
              >
                <span className="text-xl font-bold text-slate-700">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Types Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">👔 Klasik Pantolon</h3>
            <p className="text-gray-700 text-center text-sm">
              İş ve özel günler için şık kumaş pantolon modelleri
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-indigo-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">👖 Jean Pantolon</h3>
            <p className="text-gray-700 text-center text-sm">
              Günlük kulanım için rahat ve dayanıklı denim modeller
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">🏃 Spor Pantolon</h3>
            <p className="text-gray-700 text-center text-sm">
              Rahat kesim ve esnek kumaşla maksimum konfor
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-xl p-10 shadow-xl border-2 border-slate-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Şimdilik Diğer Ürünlerimize Göz Atın! 🛍️
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedClientLink href="/store">
              <button className="px-8 py-4 bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-gray-900 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                Tüm Ürünleri İncele
              </button>
            </LocalizedClientLink>

            <LocalizedClientLink href="/categories/kazak-triko">
              <button className="px-8 py-4 bg-white hover:bg-gray-50 text-slate-700 font-bold rounded-lg border-2 border-slate-700 hover:border-slate-900 shadow-lg transform hover:scale-105 transition-all duration-200">
                Kazak & Triko Koleksiyonu
              </button>
            </LocalizedClientLink>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Pantolon koleksiyonumuz hazır olduğunda haberdar olmak ister misiniz?
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
        <div className="mt-12 bg-gradient-to-r from-slate-700 to-gray-800 rounded-lg p-8 text-white text-center shadow-xl">
          <p className="text-lg font-semibold mb-2">
            ✨ Koleksiyonumuz üzerinde çalışıyoruz!
          </p>
          <p className="text-gray-200">
            Erkek, kadın ve büyük beden pantolon seçenekleriyle zengin koleksiyonumuzu yakında sizlerle buluşturuyoruz.
          </p>
        </div>
      </div>
    </div>
  )
}
