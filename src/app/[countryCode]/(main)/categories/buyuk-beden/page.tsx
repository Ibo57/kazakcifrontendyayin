import { Metadata } from "next"
import { Sparkles, Bell, ArrowRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Büyük Beden - Yakında Gelecek - Kazakçı",
  description: "Büyük beden kategorisi çok yakında sizlerle!",
}

export default function BuyukBedenComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16">
      <div className="content-container max-w-4xl mx-auto text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-8 shadow-2xl animate-pulse">
            <Sparkles className="w-20 h-20 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Yakında Gelecek! 📏
        </h1>

        {/* Subtitle */}
        <p className="text-2xl text-gray-700 mb-4">
          <strong className="text-blue-600">Büyük Beden Kategorisi</strong>
        </p>

        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          3XL, 4XL, 5XL ve 6XL bedenlerimiz ile rahat ve şık giyim çok yakında!
          Konfor ve kalite bir arada.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg border-2 border-blue-200 p-6 shadow-lg">
            <div className="text-4xl mb-3">📏</div>
            <h3 className="font-bold text-gray-900 mb-2">3XL - 6XL Beden</h3>
            <p className="text-sm text-gray-600">Geniş beden seçenekleri</p>
          </div>

          <div className="bg-white rounded-lg border-2 border-indigo-200 p-6 shadow-lg">
            <div className="text-4xl mb-3">🌟</div>
            <h3 className="font-bold text-gray-900 mb-2">Rahat Kesim</h3>
            <p className="text-sm text-gray-600">Konforlu tasarımlar</p>
          </div>

          <div className="bg-white rounded-lg border-2 border-purple-200 p-6 shadow-lg">
            <div className="text-4xl mb-3">💯</div>
            <h3 className="font-bold text-gray-900 mb-2">Premium Kalite</h3>
            <p className="text-sm text-gray-600">Dayanıklı kumaşlar</p>
          </div>
        </div>

        {/* Size Info */}
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Beden Seçeneklerimiz</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['3XL', '4XL', '5XL', '6XL'].map((size) => (
              <div key={size} className="bg-white rounded-lg px-6 py-3 shadow-md border-2 border-blue-300">
                <span className="text-xl font-bold text-blue-600">{size}</span>
              </div>
            ))}
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

          <Button variant="secondary" className="h-14 px-8 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-lg">
            <Bell className="w-5 h-5 mr-2" />
            Haber Ver (Yakında)
          </Button>
        </div>

        {/* Info Box */}
        <div className="bg-white rounded-lg border-l-4 border-blue-600 p-6 shadow-lg max-w-2xl mx-auto">
          <p className="text-gray-700">
            <strong className="text-blue-600">💙 Özel Bilgilendirme:</strong> Büyük beden kategorimiz hazırlanıyor!
            Tüm bedenler için kaliteli ve şık ürünler çok yakında.
          </p>
        </div>
      </div>
    </div>
  )
}
