import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import { Tag } from "lucide-react"

export default async function DiscountedProducts({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: allProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 50,
      fields: "*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags",
      order: "created_at",
    },
  })

  // Gerçekten indirimli ürünleri filtrele
  const pricedProducts = allProducts.filter((product) => {
    return product.variants?.some((variant) => {
      const calculated = variant.calculated_price?.calculated_amount
      const original = variant.calculated_price?.original_amount
      return calculated && original && calculated < original
    })
  })

  if (!pricedProducts || pricedProducts.length === 0) {
    return null
  }

  return (
    <div className="content-container py-12 bg-gradient-to-b from-orange-50 to-white">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Tag className="w-8 h-8 text-red-600" />
          <div>
            <Text className="txt-xlarge font-bold text-gray-900">
              İndirimli Ürünler
            </Text>
            <p className="text-sm text-gray-600 mt-1">
              %50'ye varan fırsatları kaçırmayın!
            </p>
          </div>
        </div>
        <LocalizedClientLink href="/store" className="text-red-600 hover:text-red-700 font-medium">
          Tümünü Gör
        </LocalizedClientLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-5 gap-x-4 gap-y-8 small:gap-x-6 small:gap-y-12">
        {pricedProducts.slice(0, 10).map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} isFeatured showDiscount />
          </li>
        ))}
      </ul>
    </div>
  )
}
