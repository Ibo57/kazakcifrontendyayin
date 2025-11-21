import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import OrderCompletionHandler from "@modules/checkout/components/order-completion-handler"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import { Metadata } from "next"
import { notFound } from "next/navigation"

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

  let cart = await retrieveCart()

  if (!cart && !isReturningFrom3DS) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  // If returning from 3DS but cart is null, try fetching again
  if (isReturningFrom3DS && !cart) {
    // Try to fetch cart one more time (it might have been cached)
    cart = await retrieveCart().catch(() => null)

    // If cart is still null, use OrderCompletionHandler to place order
    if (!cart) {
      return (
        <div className="bg-gray-50 min-h-screen py-8">
          <div className="content-container">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Ödeme</h1>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <OrderCompletionHandler />
            </div>
          </div>
        </div>
      )
    }
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
