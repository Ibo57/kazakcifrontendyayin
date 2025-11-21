import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { headers } from "next/headers"

export const metadata: Metadata = {
  title: "Ödeme - Kazakçı",
  description: "Siparişinizi tamamlayın",
}

export default async function Checkout({ searchParams }: { searchParams: Promise<{ payment_status?: string }> }) {
  // Await searchParams to access query parameters
  const params = await searchParams

  // If coming back from 3DS callback, allow page to render even without cart
  // The Review component will handle placing the order
  const isReturningFrom3DS = params?.payment_status === "success"

  const cart = await retrieveCart()

  if (!cart && !isReturningFrom3DS) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  // If returning from 3DS but cart is null, show loading state
  // The Review component will handle order placement
  if (isReturningFrom3DS && !cart) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="content-container">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Siparişiniz işleniyor...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="content-container">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Ödeme</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <PaymentWrapper cart={cart!}>
              <CheckoutForm cart={cart!} customer={customer} />
            </PaymentWrapper>
          </div>
          <div className="relative">
            <CheckoutSummary cart={cart!} />
          </div>
        </div>
      </div>
    </div>
  )
}
