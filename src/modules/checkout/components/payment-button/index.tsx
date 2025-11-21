"use client"

import { isManual, isIyzico } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import React, { useState, useEffect, useRef } from "react"
import ErrorMessage from "../error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    case isIyzico(paymentSession?.provider_id):
      return (
        <IyzicoPaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
      )
    default:
      return <Button disabled>Ödeme yöntemi seçin</Button>
  }
}

const IyzicoPaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending" || s.status === "requires_more"
  )

  console.log("[PaymentButton] Debug info:", {
    hasPaymentCollection: !!cart.payment_collection,
    sessionsCount: cart.payment_collection?.payment_sessions?.length || 0,
    sessions: cart.payment_collection?.payment_sessions?.map(s => ({
      id: s.id,
      status: s.status,
      provider_id: s.provider_id,
      hasThreeDSHtml: !!s.data?.threeDSHtmlContent
    })),
    foundSession: !!session,
    sessionStatus: session?.status,
    hasThreeDSHtml: !!session?.data?.threeDSHtmlContent
  })

  // Check if 3D Secure HTML content exists
  const threeDSHtmlContent = session?.data?.threeDSHtmlContent

  useEffect(() => {
    // If 3DS HTML is present, auto-submit the form to show 3DS page
    if (threeDSHtmlContent && formRef.current) {
      console.log("[Iyzico] Auto-submitting 3D Secure form")
      // Small delay to ensure form is rendered
      setTimeout(() => {
        // Find the form element inside the div
        const form = formRef.current?.querySelector('form')
        if (form) {
          console.log("[Iyzico] Found form, submitting...")
          form.submit()
        } else {
          console.error("[Iyzico] Form not found in 3DS HTML content")
        }
      }, 100)
    }
  }, [threeDSHtmlContent])

  const handlePayment = async () => {
    setSubmitting(true)

    // For iyzico, we need to submit the 3DS form
    // The form will redirect to bank's 3DS page
    // After verification, bank redirects to our callback URL
    // Then we complete the order

    if (!threeDSHtmlContent) {
      setErrorMessage("3D Secure doğrulama bilgisi bulunamadı. Lütfen ödeme yöntemini tekrar seçin.")
      setSubmitting(false)
      return
    }

    // Form will auto-submit via useEffect
  }

  if (threeDSHtmlContent) {
    // Render 3D Secure HTML form
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                🔒 Güvenli Ödeme Doğrulaması
              </h4>
              <p className="text-sm text-blue-800">
                Bankanızın 3D Secure sayfasına yönlendiriliyorsunuz. Lütfen telefon SMS'inizdeki kodu girin.
              </p>
            </div>
          </div>
        </div>

        {/* Hidden form that will auto-submit to show 3DS page */}
        <div
          ref={formRef as any}
          dangerouslySetInnerHTML={{ __html: threeDSHtmlContent }}
        />

        <div className="text-center py-4">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            <p className="text-sm text-gray-600 mt-3">Yönlendiriliyor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid={dataTestId}
      >
        Siparişi Tamamla (3D Secure)
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="iyzico-payment-error-message"
      />
    </>
  )
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = () => {
    setSubmitting(true)

    onPaymentCompleted()
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
      >
        Siparişi Tamamla
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
