"use client"

import { placeOrder } from "@lib/data/cart"
import { useEffect, useState } from "react"

/**
 * This component handles order completion after 3DS callback
 * when cart is no longer available but payment was successful
 */
export default function OrderCompletionHandler() {
  const [status, setStatus] = useState<"processing" | "error">("processing")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    console.log("[OrderCompletionHandler] Starting order placement...")

    placeOrder()
      .then((result) => {
        console.log("[OrderCompletionHandler] placeOrder result:", result)
        console.log("[OrderCompletionHandler] result.type:", result?.type)

        if (result?.type === "order") {
          console.log("[OrderCompletionHandler] Order placed successfully!")
          console.log("[OrderCompletionHandler] Order ID:", result.order?.id)
          console.log("[OrderCompletionHandler] Order shipping address:", result.order?.shipping_address)

          const countryCode = result.order?.shipping_address?.country_code?.toLowerCase() || "tr"
          const redirectUrl = `/${countryCode}/order/${result.order.id}/confirmed`

          console.log("[OrderCompletionHandler] Redirecting to:", redirectUrl)
          window.location.href = redirectUrl
        } else {
          console.warn("[OrderCompletionHandler] Unexpected result type:", result?.type)
          console.log("[OrderCompletionHandler] Full result:", JSON.stringify(result))
          setStatus("error")
          setErrorMessage("Beklenmeyen yanıt formatı")
        }
      })
      .catch((error) => {
        console.error("[OrderCompletionHandler] Failed to place order:", error)
        console.error("[OrderCompletionHandler] Error details:", error.message, error.stack)
        setStatus("error")
        setErrorMessage(error.message || "Sipariş oluşturulamadı")
      })
  }, [])

  if (status === "error") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sipariş Oluşturulamadı</h2>
          <p className="text-gray-600 mb-4">{errorMessage}</p>
          <p className="text-sm text-gray-500">
            Ödemeniz alındı ancak sipariş oluşturulurken bir hata oluştu.
            Lütfen müşteri hizmetleri ile iletişime geçin.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Siparişiniz oluşturuluyor...</p>
      </div>
    </div>
  )
}
