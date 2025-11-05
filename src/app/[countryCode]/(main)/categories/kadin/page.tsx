import { Metadata } from "next"
import { Sparkles, Bell, ArrowRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Kadın - Yakında Gelecek - Kazakçı",
  description: "Kadın kategorisi çok yakında sizlerle!",
}

export default function KadinComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 py-16">
      <div className="content-container max-w-4xl mx-auto text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-8 shadow-2xl animate-pulse">
            <Sparkles className="w-20 h-20 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Yakında Gelecek! 🎀
        </h1>

        {/* Subtitle */}
        <p className="text-2xl text-gray-700 mb-4">
          <strong className="text-pink-600">Kadın Kategorisi</strong>
        </p>

        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Şık ve kaliteli kadın kazak, hırka ve trikolarımız çok yakında sizlerle!
          Özel tasarımlar ve trend modeller için sabırsızlanıyoruz.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg border-2 border-pink-200 p-6 shadow-lg">
            <div className="text-4xl mb-3">👗</div>
            <h3 className="font-bold text-gray-900 mb-2">Özel Tasarımlar</h3>
            <p className="text-sm text-gray-600">Modern ve şık modeller</p>
          </div>

          <div className="bg-white rounded-lg border-2 border-purple-200 p-6 shadow-lg">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="font-bold text-gray-900 mb-2">Kaliteli Kumaş</h3>
            <p className="text-sm text-gray-600">Premium kalite malzemeler</p>
          </div>

          <div className="bg-white rounded-lg border-2 border-orange-200 p-6 shadow-lg">
            <div className="text-4xl mb-3">💝</div>
            <h3 className="font-bold text-gray-900 mb-2">Uygun Fiyat</h3>
            <p className="text-sm text-gray-600">Kampanyalı lansman fiyatları</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <LocalizedClientLink href="/store">
            <Button className="h-14 px-8 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg">
              <ArrowRight className="w-5 h-5 mr-2" />
              Diğer Ürünleri İncele
            </Button>
          </LocalizedClientLink>

          <Button variant="secondary" className="h-14 px-8 border-2 border-pink-600 text-pink-600 hover:bg-pink-50 font-semibold text-lg">
            <Bell className="w-5 h-5 mr-2" />
            Haber Ver (Yakında)
          </Button>
        </div>

        {/* Info Box */}
        <div className="bg-white rounded-lg border-l-4 border-pink-600 p-6 shadow-lg max-w-2xl mx-auto">
          <p className="text-gray-700">
            <strong className="text-pink-600">💌 Özel Bilgilendirme:</strong> Kadın kategorisi hazırlanıyor!
            Açılıştan haberdar olmak için sosyal medya hesaplarımızı takip edin.
          </p>
        </div>
      </div>
    </div>
  )
}
