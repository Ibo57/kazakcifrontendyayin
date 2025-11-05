import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import { ShieldCheck, Truck } from "lucide-react"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sipariş Özeti</h2>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Sepetinizdeki Ürünler</h3>
        <ItemsPreviewTemplate cart={cart} />
      </div>

      <div className="my-6 border-t border-gray-200"></div>

      <div className="mb-6">
        <DiscountCode cart={cart} />
      </div>

      <div className="my-6 border-t border-gray-200"></div>

      <CartTotals totals={cart} />

      <div className="mt-6 space-y-3 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Truck className="w-5 h-5 text-orange-600" />
          <span>150 TL ve üzeri ücretsiz kargo</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <ShieldCheck className="w-5 h-5 text-orange-600" />
          <span>Güvenli ödeme garantisi</span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
