import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import { Star, ShoppingCart } from "lucide-react"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
  showDiscount = false,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
  showDiscount?: boolean
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  // Mock rating data - in production this would come from reviews
  // Use product ID hash to generate consistent rating (no Math.random() to avoid hydration mismatch)
  const hashCode = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const rating = 4.5 + (hashCode % 5) / 10 // Rating between 4.5-5.0 based on ID
  const reviewCount = 50 + (hashCode % 200) // Count 50-250 based on ID

  // Get price values - FIXED: Use correct field names
  const currentPrice = cheapestPrice?.calculated_price_number
  const originalPrice = cheapestPrice?.original_price_number
  const hasDiscount = originalPrice && currentPrice && originalPrice > currentPrice

  // Calculate discount percentage
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0

  // Get product tags/colors
  const tags = product.tags?.slice(0, 3) || []

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Discount Badge */}
      {(showDiscount || hasDiscount) && (
        <div className="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-semibold z-10">
          %{discountPercent || 25} İndirim
        </div>
      )}

      {/* Product Image */}
      <LocalizedClientLink href={`/products/${product.handle}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />
        </div>
      </LocalizedClientLink>

      {/* Product Info */}
      <div className="p-3">
        {/* Title */}
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-orange-600 transition-colors min-h-[48px]" data-testid="product-title">
            {product.title}
          </h3>
        </LocalizedClientLink>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
          <span className="text-sm font-medium text-gray-900">
            {rating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500">
            ({reviewCount})
          </span>
        </div>

        {/* Price - FIXED: Removed minimumFractionDigits to show decimal places */}
        <div className="mb-3">
          {currentPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                {new Intl.NumberFormat('tr-TR', {
                  style: 'currency',
                  currency: cheapestPrice?.currency_code || 'TRY',
                }).format(currentPrice / 100)}
              </span>
              {hasDiscount && originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: cheapestPrice?.currency_code || 'TRY',
                  }).format(originalPrice / 100)}
                </span>
              )}
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              Fiyat bilgisi yok
            </div>
          )}
        </div>

        {/* View Button */}
        <LocalizedClientLink href={`/products/${product.handle}`}>
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium text-sm">
            <ShoppingCart className="w-4 h-4" />
            İncele
          </button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}
