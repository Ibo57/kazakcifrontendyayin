import { HttpTypes } from "@medusajs/types"
import { getPercentageDiff } from "./get-precentage-diff"
import { convertToLocale } from "./money"

export const getPricesForVariant = (variant: any) => {
  // Check if variant has calculated_price
  if (!variant?.calculated_price) {
    return null
  }

  const calculatedPrice = variant.calculated_price
  
  // Medusa v2 structure
  const calculatedAmount = calculatedPrice.calculated_amount
  const originalAmount = calculatedPrice.original_amount
  const currencyCode = calculatedPrice.currency_code

  if (!calculatedAmount || !currencyCode) {
    return null
  }

  // Medusa fiyatları zaten kuruş/cent cinsinden tutuyor (örn: 18900 kuruş = 189 TL)
  // money.ts içindeki convertToLocale fonksiyonu otomatik olarak 100'e böler

  return {
    calculated_price_number: calculatedAmount,
    calculated_price: convertToLocale({
      amount: calculatedAmount,
      currency_code: currencyCode,
    }),
    original_price_number: originalAmount,
    original_price: convertToLocale({
      amount: originalAmount,
      currency_code: currencyCode,
    }),
    currency_code: currencyCode,
    price_type: calculatedPrice.is_calculated_price_price_list ? "sale" : "default",
    percentage_diff: getPercentageDiff(originalAmount, calculatedAmount),
  }
}

export function getProductPrice({
  product,
  variantId,
}: {
  product: HttpTypes.StoreProduct
  variantId?: string
}) {
  if (!product || !product.id) {
    throw new Error("No product provided")
  }

  const cheapestPrice = () => {
    if (!product || !product.variants?.length) {
      return null
    }

    const cheapestVariant: any = product.variants
      .filter((v: any) => !!v.calculated_price)
      .sort((a: any, b: any) => {
        return (
          a.calculated_price.calculated_amount -
          b.calculated_price.calculated_amount
        )
      })[0]

    return getPricesForVariant(cheapestVariant)
  }

  const variantPrice = () => {
    if (!product || !variantId) {
      return null
    }

    const variant: any = product.variants?.find(
      (v) => v.id === variantId || v.sku === variantId
    )

    if (!variant) {
      return null
    }

    return getPricesForVariant(variant)
  }

  return {
    product,
    cheapestPrice: cheapestPrice(),
    variantPrice: variantPrice(),
  }
}
