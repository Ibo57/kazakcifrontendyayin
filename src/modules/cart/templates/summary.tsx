"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { ShieldCheck, Truck } from "lucide-react"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sipariş Özeti</h2>

      <DiscountCode cart={cart} />

      <div className="my-6 border-t border-gray-200"></div>

      <CartTotals totals={cart} />

      <div className="space-y-3 mt-6">
        <LocalizedClientLink
          href={"/checkout?step=" + step}
          data-testid="checkout-button"
          className="block"
        >
          <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg">
            Ödemeye Geç
          </Button>
        </LocalizedClientLink>

        <LocalizedClientLink href="/store" className="block">
          <Button
            variant="secondary"
            className="w-full h-12 bg-white border-2 border-gray-300 hover:border-orange-600 text-gray-700 hover:text-orange-600 font-semibold transition-colors"
          >
            Alışverişe Devam Et
          </Button>
        </LocalizedClientLink>
      </div>

      <div className="mt-6 space-y-3 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Truck className="w-5 h-5 text-orange-600" />
          <span>1000 TL ve üzeri ücretsiz kargo</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <ShieldCheck className="w-5 h-5 text-orange-600" />
          <span>Güvenli alışveriş garantisi</span>
        </div>
      </div>
    </div>
  )
}

export default Summary
