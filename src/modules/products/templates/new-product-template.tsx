"use client"

import React, { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { Star, Heart, Share2, Truck, Clock, ShieldCheck } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

// Mock review data
const mockReviews = [
  {
    id: 1,
    author: "Can D.",
    rating: 5,
    date: "12.01.2025",
    comment: "Boğazlı model çok şık durmuş. Kalitesi de gayet iyi.",
    helpful: 7,
  },
  {
    id: 2,
    author: "Elif S.",
    rating: 4,
    date: "08.01.2025",
    comment: "Güzel bir ürün ama biraz pahalı buldum. Yine de memnunum.",
    helpful: 3,
  },
]

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("S")
  const [selectedColor, setSelectedColor] = useState("Bej")
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"description" | "details" | "reviews">("description")

  const images = product.images || []
  const mainImage = images[selectedImage]?.url || product.thumbnail

  // Calculate rating
  const rating = 4.6
  const reviewCount = 89
  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 50 },
    { stars: 4, count: 30, percentage: 34 },
    { stars: 3, count: 10, percentage: 11 },
    { stars: 2, count: 3, percentage: 3 },
    { stars: 1, count: 1, percentage: 1 },
  ]

  // Get price
  const variant = product.variants?.[0]
  const price = variant?.calculated_price?.calculated_amount
  const currencyCode = variant?.calculated_price?.currency_code || "TRY"

  const sizes = ["S", "M", "L", "XL"]
  const colors = ["Bej", "Siyah", "Beyaz"]

  return (
    <div className="bg-white">
      {/* Main Product Section */}
      <div className="content-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
              {product.status === "published" && (
                <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold">
                  Yeni
                </div>
              )}
              <Image
                src={mainImage || "/placeholder.png"}
                alt={product.title || "Product"}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx
                        ? "border-orange-500"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img.url || "/placeholder.png"}
                      alt={`${product.title} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(rating)
                          ? "fill-orange-500 text-orange-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {rating}
                </span>
                <span className="text-gray-500">
                  ({reviewCount} değerlendirme)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-4">
              {price && (
                <div className="text-4xl font-bold text-gray-900">
                  {new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: currencyCode,
                    minimumFractionDigits: 0,
                  }).format(price / 100)}
                </div>
              )}
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-semibold text-gray-900">Beden:</span>
                <span className="text-gray-600">{selectedSize}</span>
              </div>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border-2 rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? "border-orange-600 bg-orange-600 text-white"
                        : "border-gray-300 text-gray-700 hover:border-orange-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-semibold text-gray-900">Renk:</span>
                <span className="text-gray-600">{selectedColor}</span>
              </div>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 border-2 rounded-lg font-medium transition-colors ${
                      selectedColor === color
                        ? "border-orange-600 bg-orange-600 text-white"
                        : "border-gray-300 text-gray-700 hover:border-orange-600"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <span className="font-semibold text-gray-900 block mb-3">
                Adet
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-orange-600 transition-colors text-lg font-semibold"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-orange-600 transition-colors text-lg font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-3">
              <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Sepete Ekle
              </button>
              <button className="w-14 h-14 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-orange-600 hover:text-orange-600 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="w-14 h-14 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-orange-600 hover:text-orange-600 transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="bg-orange-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <Truck className="w-5 h-5 text-orange-600" />
                <span>Ücretsiz Kargo (150 TL ve üzeri)</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Clock className="w-5 h-5 text-orange-600" />
                <span>14 Gün İçinde Ücretsiz İade</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <ShieldCheck className="w-5 h-5 text-orange-600" />
                <span>Güvenli Alışveriş Garantisi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-gray-50 py-8">
        <div className="content-container">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === "description"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Ürün Açıklaması
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === "details"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Ürün Detayları
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === "reviews"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Bakım Talimatları
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg p-6">
            {activeTab === "description" && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description ||
                    "Boğazlı Triko, yüksek kaliteli malzemelerden üretilmiş, konforlu ve şık bir kazaktır. Günlük kullanım için ideal olan bu ürün, sıcak tutucu özelliği ile kış aylarında vazgeçilmeziniz olacak."}
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Modern tasarımı ve kaliteli işçiliği ile öne çıkan bu kazak,
                  hem rahat hem de şık bir görünüm sunar. Farklı renk
                  seçenekleri ile gardırobunuza uyum sağlar.
                </p>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-2">
                <div className="flex border-b border-gray-200 py-2">
                  <span className="font-semibold text-gray-900 w-48">
                    Materyal:
                  </span>
                  <span className="text-gray-700">%60 Pamuk, %40 Polyester</span>
                </div>
                <div className="flex border-b border-gray-200 py-2">
                  <span className="font-semibold text-gray-900 w-48">
                    Yıkama:
                  </span>
                  <span className="text-gray-700">30°C'de yıkanabilir</span>
                </div>
                <div className="flex border-b border-gray-200 py-2">
                  <span className="font-semibold text-gray-900 w-48">
                    Üretim Yeri:
                  </span>
                  <span className="text-gray-700">Türkiye</span>
                </div>
                <div className="flex border-b border-gray-200 py-2">
                  <span className="font-semibold text-gray-900 w-48">Kesim:</span>
                  <span className="text-gray-700">Regular Fit</span>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="prose max-w-none">
                <ul className="text-gray-700 space-y-2">
                  <li>Ürünü 30°C'de yıkayınız</li>
                  <li>Kurutma makinesinde kurutmayınız</li>
                  <li>Orta ısıda ütüleyebilirsiniz</li>
                  <li>Kimyasal temizleme yapılabilir</li>
                  <li>Renkli ürünlerle birlikte yıkamayınız</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="content-container py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Müşteri Değerlendirmeleri
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Rating Summary */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {rating}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(rating)
                        ? "fill-orange-500 text-orange-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{reviewCount} değerlendirme</p>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
            <div className="space-y-3">
              {ratingDistribution.map((dist) => (
                <div key={dist.stars} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-16">
                    {dist.stars} yıldız
                  </span>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500"
                      style={{ width: `${dist.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {dist.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review List */}
        <div className="space-y-6">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Değerlendirme Yaz
          </button>

          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-orange-500 text-orange-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-semibold text-gray-900">{review.author}</p>
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700 mb-4">{review.comment}</p>
              <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                Faydalı ({review.helpful})
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Products */}
      <div className="bg-gray-50 py-12">
        <div className="content-container">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Benzer Ürünler
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Placeholder for similar products */}
            <div className="text-center text-gray-500">
              Benzer ürünler yükleniyor...
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate
