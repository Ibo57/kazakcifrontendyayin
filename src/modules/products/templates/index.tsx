"use client"

import React, { useState, useMemo, useCallback } from "react"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { Star, Heart, Share2, Truck, Clock, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react"
import ProductActions from "@modules/products/components/product-actions"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

// Reviews will be fetched from Medusa API in future implementation

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<HttpTypes.StoreProductVariant | undefined>(undefined)
  const [activeTab, setActiveTab] = useState<"description" | "details" | "reviews">("description")
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewFormData, setReviewFormData] = useState({
    rating: 5,
    name: "",
    email: "",
    comment: ""
  })

  // Handle variant change from ProductActions
  const handleVariantChange = useCallback((variant: HttpTypes.StoreProductVariant | undefined) => {
    setSelectedVariant(variant)
    // Reset to first image when variant changes
    setSelectedImage(0)
  }, [])

  // Get images for selected variant only (Medusa documentation compliant)
  const images = useMemo(() => {
    // Helper function to normalize Turkish characters and URL encoding
    const normalizeForMatching = (text: string): string => {
      let normalized = text

      // First, try to decode URL encoding (may need multiple passes for double-encoded)
      try {
        while (normalized.includes('%')) {
          const decoded = decodeURIComponent(normalized)
          if (decoded === normalized) break // No more decoding possible
          normalized = decoded
        }
      } catch (e) {
        // If decoding fails, continue with original
      }

      // Convert to uppercase for case-insensitive matching
      normalized = normalized.toUpperCase()

      // CRITICAL: Replace Turkish İ (U+0130) with regular I (U+0049) for matching
      // because image URLs use regular I but database has Turkish İ
      normalized = normalized
        .replace(/İ/g, 'I')            // Turkish İ → Regular I
        .replace(/\u0130/g, 'I')       // U+0130 → I (explicit Unicode)

      // Also normalize other Turkish characters to their ASCII equivalents for matching
      normalized = normalized
        .replace(/Ş/g, 'S')            // Ş → S
        .replace(/\u015E/g, 'S')       // U+015E → S
        .replace(/Ç/g, 'C')            // Ç → C
        .replace(/\u00C7/g, 'C')       // U+00C7 → C
        .replace(/Ğ/g, 'G')            // Ğ → G
        .replace(/\u011E/g, 'G')       // U+011E → G
        .replace(/Ö/g, 'O')            // Ö → O
        .replace(/\u00D6/g, 'O')       // U+00D6 → O
        .replace(/Ü/g, 'U')            // Ü → U
        .replace(/\u00DC/g, 'U')       // U+00DC → U

      // Handle various encoding artifacts from double-encoding
      normalized = normalized
        .replace(/Ä°/g, 'I')           // Latin Ä° → I
        .replace(/\u00C4\u00B0/g, 'I') // Double-encoded Ä° → I
        .replace(/I\u0307/g, 'I')      // I + combining dot → I
        .replace(/Å\u009E/g, 'S')      // Å + \u009E → S
        .replace(/Å/g, 'S')            // Å → S
        .replace(/ÅŸ/g, 'S')           // Double-encoded ş → S
        .replace(/Ã\u0087/g, 'C')      // Ã + \u0087 → C
        .replace(/Ã‡/g, 'C')           // Ã‡ → C
        .replace(/Ä\u009E/g, 'G')      // Ä + \u009E → G
        .replace(/ÄŸ/g, 'G')           // Double-encoded ğ → G
        .replace(/Ã\u0096/g, 'O')      // Ã + \u0096 → O
        .replace(/Ã–/g, 'O')           // Ã– → O
        .replace(/Ã\u009C/g, 'U')      // Ã + \u009C → U
        .replace(/Ãœ/g, 'U')           // Ãœ → U

      return normalized
    }

    if (!selectedVariant?.id) {
      // No variant selected, show all product images
      return product.images || []
    }

    // Try to match images by variant option values (mainly color)
    if (selectedVariant.options && product.images && product.options) {
      // Find the "Renk" option from product options
      const renkOption = product.options.find(opt =>
        opt.title === 'Renk' || opt.title === 'Color'
      )

      if (renkOption?.id) {
        // Get the color value from variant options
        const colorVariantOption = selectedVariant.options.find(opt =>
          opt.option_id === renkOption.id
        )

        if (colorVariantOption?.value) {
          const normalizedColor = normalizeForMatching(colorVariantOption.value)

          console.log('=== IMAGE FILTERING DEBUG ===');
          console.log('Product:', product.title);
          console.log('Selected color:', colorVariantOption.value);
          console.log('Selected color bytes:', Array.from(colorVariantOption.value).map(c => c.charCodeAt(0).toString(16)).join(' '));
          console.log('Normalized color:', normalizedColor);
          console.log('Normalized color bytes:', Array.from(normalizedColor).map(c => c.charCodeAt(0).toString(16)).join(' '));
          console.log('Total images:', product.images.length);

          const variantImages = product.images.filter(img => {
            // Exact thumbnail match
            if (img.url === selectedVariant.thumbnail) {
              return true
            }

            // Normalize image URL and check if it contains the color name
            const normalizedUrl = normalizeForMatching(img.url || '')
            const matches = normalizedUrl.includes(normalizedColor)

            // Debug: show first 2 URLs with full details
            if (product.images.indexOf(img) < 2) {
              const urlPart = img.url?.substring(img.url.lastIndexOf('/') + 1);
              const normPart = normalizedUrl.substring(normalizedUrl.lastIndexOf('/') + 1);
              console.log(`\n--- Image ${product.images.indexOf(img) + 1} ---`);
              console.log('Full URL part:', urlPart);
              console.log('Normalized URL part:', normPart);
              console.log('Looking for:', normalizedColor);
              console.log('Match:', matches, '(includes check:', normPart?.includes(normalizedColor), ')');
            }

            return matches
          })

          console.log('Filtered images:', variantImages.length);

          if (variantImages.length > 0) {
            return variantImages
          } else {
            console.log('WARNING: No images found for color:', colorVariantOption.value);
          }
        }
      }
    }

    // Fallback: show all product images
    return product.images || []
  }, [product.images, product.variants, selectedVariant])

  const mainImage = images[selectedImage]?.url || product.thumbnail

  // Get product material from metadata if available
  const material = product.material || product.metadata?.material || "%60 Pamuk, %40 Polyester"
  const madeIn = product.metadata?.made_in || "Türkiye"

  return (
    <div className="bg-white">
      {/* Main Product Section */}
      <div className="content-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] md:aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden max-h-[500px] md:max-h-[600px]">
              {product.status === "published" && (
                <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                  Yeni
                </div>
              )}
              <Image
                src={mainImage || "/placeholder.png"}
                alt={product.title || "Product"}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    aria-label="Önceki görsel"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    aria-label="Sonraki görsel"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImage + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
                {images.map((img, idx) => (
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
                      sizes="(max-width: 768px) 25vw, 10vw"
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
            </div>

            {/* Product Actions (Price, Variants, Add to Cart) */}
            <div className="border-t border-b border-gray-200 py-4">
              <ProductActions
                product={product}
                region={region}
                onVariantChange={handleVariantChange}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 h-12 bg-white border-2 border-orange-600 text-orange-600 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors font-medium">
                <Heart className="w-5 h-5" />
                Favorilere Ekle
              </button>
              <button className="flex-1 h-12 bg-white border-2 border-gray-300 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:border-orange-600 hover:text-orange-600 transition-colors font-medium">
                <Share2 className="w-5 h-5" />
                Paylaş
              </button>
            </div>

            {/* Features */}
            <div className="bg-orange-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <Truck className="w-5 h-5 text-orange-600" />
                <span>Ücretsiz Kargo (1000 TL ve üzeri)</span>
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
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-2">
                <div className="flex border-b border-gray-200 py-2">
                  <span className="font-semibold text-gray-900 w-48">
                    Materyal:
                  </span>
                  <span className="text-gray-700">{material}</span>
                </div>
                {product.weight && (
                  <div className="flex border-b border-gray-200 py-2">
                    <span className="font-semibold text-gray-900 w-48">
                      Ağırlık:
                    </span>
                    <span className="text-gray-700">{product.weight}g</span>
                  </div>
                )}
                <div className="flex border-b border-gray-200 py-2">
                  <span className="font-semibold text-gray-900 w-48">
                    Üretim Yeri:
                  </span>
                  <span className="text-gray-700">{madeIn}</span>
                </div>
                {product.metadata?.fit && (
                  <div className="flex border-b border-gray-200 py-2">
                    <span className="font-semibold text-gray-900 w-48">Kesim:</span>
                    <span className="text-gray-700">{product.metadata.fit}</span>
                  </div>
                )}
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
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Müşteri Değerlendirmeleri
          </h2>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {showReviewForm ? "Formu Kapat" : "Değerlendirme Yaz"}
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Değerlendirmenizi Paylaşın
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert("Değerlendirmeniz kaydedildi! (Backend entegrasyonu yapılacak)")
                setShowReviewForm(false)
                setReviewFormData({ rating: 5, name: "", email: "", comment: "" })
              }}
              className="space-y-4"
            >
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Puanınız *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewFormData({ ...reviewFormData, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= reviewFormData.rating
                            ? "fill-orange-500 text-orange-500"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adınız *
                </label>
                <input
                  type="text"
                  required
                  value={reviewFormData.name}
                  onChange={(e) => setReviewFormData({ ...reviewFormData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Adınızı girin"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta *
                </label>
                <input
                  type="email"
                  required
                  value={reviewFormData.email}
                  onChange={(e) => setReviewFormData({ ...reviewFormData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="E-posta adresinizi girin"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yorumunuz *
                </label>
                <textarea
                  required
                  value={reviewFormData.comment}
                  onChange={(e) => setReviewFormData({ ...reviewFormData, comment: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Ürün hakkındaki düşüncelerinizi paylaşın"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Gönder
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List Placeholder */}
        <div className="bg-white rounded-lg p-12 border border-gray-200 text-center">
          <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">
            Bu ürün için henüz değerlendirme bulunmamaktadır.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            İlk değerlendirmeyi siz yapın!
          </p>
        </div>
      </div>

      {/* Similar Products */}
      <div className="bg-gray-50 py-12">
        <div className="content-container">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Benzer Ürünler
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* TODO: Add similar products component */}
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
