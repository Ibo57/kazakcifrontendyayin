"use client"

import { Heading, Text, clx } from "@medusajs/ui"
import { useState, useEffect } from "react"
import PaymentButton from "../payment-button"
import { useSearchParams, useRouter } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { placeOrder } from "@lib/data/cart"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [consentChecked, setConsentChecked] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const isOpen = searchParams.get("step") === "review"
  const paymentStatus = searchParams.get("payment_status")
  const paymentId = searchParams.get("payment_id")

  // If returning from 3DS callback with success, automatically place order
  useEffect(() => {
    if (paymentStatus === "success" && paymentId && cart && !isPlacingOrder) {
      console.log("[Review] 3DS callback success detected, placing order...")
      setIsPlacingOrder(true)

      placeOrder()
        .then(() => {
          console.log("[Review] Order placed successfully!")
          router.push(`/order/confirmed/${cart.id}`)
        })
        .catch((error) => {
          console.error("[Review] Failed to place order:", error)
          // Show error message to user
          alert("Sipariş oluşturulamadı. Lütfen müşteri hizmetleri ile iletişime geçin.")
        })
    }
  }, [paymentStatus, paymentId, cart, isPlacingOrder, router])

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection?.payment_sessions?.some((session: any) => session.status === "pending" || session.status === "requires_more") || paidByGiftcard)

  // Show loading screen if placing order after 3DS callback
  if (isPlacingOrder) {
    return (
      <div className="bg-white min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Siparişiniz Oluşturuluyor...</h2>
          <p className="text-gray-600">Lütfen bekleyin, ödemeniz onaylandı ve siparişiniz hazırlanıyor.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-2xl font-bold text-gray-900 gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-600 text-white text-sm font-bold">
            4
          </span>
          Sipariş Onayı
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-6 rounded-r-lg">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">⚠️ Önemli Bilgilendirme</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                Siparişinizi tamamlamadan önce aşağıdaki yasal metinleri okumanız ve kabul etmeniz gerekmektedir:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <LocalizedClientLink
                    href="/legal/mesafeli-satis-sozlesmesi"
                    className="text-orange-600 hover:text-orange-700 underline font-medium"
                    target="_blank"
                  >
                    Mesafeli Satış Sözleşmesi
                  </LocalizedClientLink>
                  {" - Cayma hakkı, teslimat ve iade koşulları"}
                </li>
                <li>
                  <LocalizedClientLink
                    href="/legal/iade-degisim"
                    className="text-orange-600 hover:text-orange-700 underline font-medium"
                    target="_blank"
                  >
                    İade ve Değişim Politikası
                  </LocalizedClientLink>
                  {" - 14 gün içinde koşulsuz iade hakkınız"}
                </li>
                <li>
                  <LocalizedClientLink
                    href="/legal/gizlilik-politikasi"
                    className="text-orange-600 hover:text-orange-700 underline font-medium"
                    target="_blank"
                  >
                    Gizlilik Politikası
                  </LocalizedClientLink>
                  {" - Kişisel bilgilerinizin korunması"}
                </li>
                <li>
                  <LocalizedClientLink
                    href="/legal/kvkk"
                    className="text-orange-600 hover:text-orange-700 underline font-medium"
                    target="_blank"
                  >
                    KVKK Aydınlatma Metni
                  </LocalizedClientLink>
                  {" - Kişisel verilerinizin işlenmesi"}
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                required
                className="mt-1 w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                <strong>Ön Bilgilendirme Formu</strong> ve{" "}
                <LocalizedClientLink
                  href="/legal/mesafeli-satis-sozlesmesi"
                  className="text-orange-600 hover:text-orange-700 underline font-medium"
                  target="_blank"
                >
                  Mesafeli Satış Sözleşmesi
                </LocalizedClientLink>
                &apos;ni okudum, anladım ve kabul ediyorum. 14 gün içinde cayma hakkım olduğunu,{" "}
                <LocalizedClientLink
                  href="/legal/iade-degisim"
                  className="text-orange-600 hover:text-orange-700 underline font-medium"
                  target="_blank"
                >
                  İade ve Değişim Politikası
                </LocalizedClientLink>
                &apos;nı,{" "}
                <LocalizedClientLink
                  href="/legal/gizlilik-politikasi"
                  className="text-orange-600 hover:text-orange-700 underline font-medium"
                  target="_blank"
                >
                  Gizlilik Politikası
                </LocalizedClientLink>
                &apos;nı ve{" "}
                <LocalizedClientLink
                  href="/legal/kvkk"
                  className="text-orange-600 hover:text-orange-700 underline font-medium"
                  target="_blank"
                >
                  KVKK Aydınlatma Metni
                </LocalizedClientLink>
                &apos;ni okuduğumu ve kabul ettiğimi onaylıyorum.
                <span className="text-red-600 font-bold ml-1">*</span>
              </span>
            </label>
          </div>

          <div className={clx("transition-opacity", {
            "opacity-50 pointer-events-none": !consentChecked
          })}>
            <PaymentButton cart={cart} data-testid="submit-order-button" disabled={!consentChecked} />
          </div>

          {!consentChecked && (
            <p className="text-sm text-red-600 mt-3 text-center">
              ⚠️ Siparişi tamamlamak için yukarıdaki onay kutusunu işaretlemeniz gerekmektedir.
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default Review
