import { Heading, Button } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"
import { CheckCircle, Package, Truck } from "lucide-react"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-12 min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}

        {/* Success Banner */}
        <div className="w-full bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Teşekkür Ederiz! 🎉</h1>
          <p className="text-xl mb-4">Siparişiniz başarıyla alındı</p>
          <p className="text-green-100">
            Sipariş numaranız: <strong className="text-white">#{order.display_id}</strong>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <LocalizedClientLink href="/account/orders" className="flex-1">
            <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold">
              <Package className="w-5 h-5 mr-2" />
              Siparişlerim
            </Button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/store" className="flex-1">
            <Button variant="secondary" className="w-full h-12 border-2 border-gray-300 hover:border-orange-600 text-gray-700 hover:text-orange-600 font-semibold">
              Alışverişe Devam Et
            </Button>
          </LocalizedClientLink>
        </div>

        {/* Order Info Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-orange-100 rounded-full p-3">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Sipariş Alındı</h3>
            <p className="text-sm text-gray-600">Siparişiniz onaylandı</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-blue-100 rounded-full p-3">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Hazırlanıyor</h3>
            <p className="text-sm text-gray-600">Ürünleriniz paketleniyor</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="bg-purple-100 rounded-full p-3">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Kargoda</h3>
            <p className="text-sm text-gray-600">3-7 iş günü içinde</p>
          </div>
        </div>

        {/* Order Details */}
        <div
          className="flex flex-col gap-6 max-w-4xl bg-white w-full rounded-lg border border-gray-200 p-8 shadow-sm"
          data-testid="order-complete-container"
        >
          <OrderDetails order={order} />

          <div className="border-t border-gray-200 pt-6">
            <Heading level="h2" className="text-2xl font-bold text-gray-900 mb-6">
              Sipariş Özeti
            </Heading>
            <Items order={order} />
            <div className="mt-6">
              <CartTotals totals={order} />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <ShippingDetails order={order} />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <PaymentDetails order={order} />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <Help />
          </div>
        </div>

        {/* Footer Note */}
        <div className="w-full bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-6">
          <p className="text-sm text-gray-700">
            <strong className="text-gray-900">📧 E-posta Bildirimi:</strong> Sipariş detaylarınız e-posta adresinize gönderildi.
            Kargo takip numaranız ürünleriniz kargoya verildiğinde size iletilecektir.
          </p>
        </div>
      </div>
    </div>
  )
}
