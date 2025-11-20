"use client"

import { RadioGroup } from "@headlessui/react"
import { isIyzico as isIyzicoFunc, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession, authorizePaymentSession, retrieveCart } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, Container, Heading, Text, clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, {
  IyzicoCardContainer,
} from "@modules/checkout/components/payment-container"
import Divider from "@modules/common/components/divider"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import Image from "next/image"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [iyzicoCardData, setIyzicoCardData] = useState<any>(null)
  const [iyzicoCardComplete, setIyzicoCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const isIyzico = isIyzicoFunc(selectedPaymentMethod)

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    if (isIyzicoFunc(method)) {
      // Initialize iyzico payment session
      await initiatePaymentSession(cart, {
        provider_id: method,
      })
    }
  }

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod

      // For iyzico, we need to pass card data and authorize
      if (isIyzicoFunc(selectedPaymentMethod)) {
        if (!iyzicoCardComplete || !iyzicoCardData) {
          setError("Lütfen kart bilgilerinizi eksiksiz doldurun")
          setIsLoading(false)
          return
        }

        try {
          console.log("[Payment] Starting iyzico payment flow...")
          console.log("[Payment] Card data:", iyzicoCardData)

          // Step 1: Initialize payment session with card data
          const sessionResult = await initiatePaymentSession(cart, {
            provider_id: selectedPaymentMethod,
            data: {
              payment_method_data: iyzicoCardData
            }
          })

          console.log("[Payment] Session result:", sessionResult)

          // Step 2: Get the payment session ID from result
          // Check if result is the cart object or wrapped
          const resultCart = sessionResult?.cart || sessionResult
          const paymentSession = resultCart?.payment_collection?.payment_sessions?.find(
            (s: any) => s.provider_id === selectedPaymentMethod
          )

          console.log("[Payment] Found payment session:", paymentSession)

          if (!paymentSession) {
            console.error("[Payment] No payment session found in result")
            setError("Ödeme oturumu oluşturulamadı")
            setIsLoading(false)
            return
          }

          // Step 3: Authorize payment (triggers 3D Secure)
          console.log("[Payment] Authorizing payment session:", paymentSession.id)
          const paymentCollectionId = cart.payment_collection?.id
          if (!paymentCollectionId) {
            throw new Error("Payment collection ID not found")
          }
          const authResult = await authorizePaymentSession(paymentCollectionId, paymentSession.id)
          console.log("[Payment] Authorization result:", authResult)

          // Step 4: Navigate to review (3DS HTML will be shown there)
          return router.push(
            pathname + "?" + createQueryString("step", "review"),
            {
              scroll: false,
            }
          )
        } catch (err: any) {
          console.error("[Payment] Error in iyzico flow:", err)
          setError(err.message || "Ödeme işlemi sırasında hata oluştu")
          setIsLoading(false)
          return
        }
      }

      if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      // For manual payment (kapıda ödeme), go to review
      return router.push(
        pathname + "?" + createQueryString("step", "review"),
        {
          scroll: false,
        }
      )
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-3xl-regular gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-600 text-white text-sm font-bold mr-2">
            3
          </span>
          Ödeme Yöntemi
          {!isOpen && paymentReady && <CheckCircleSolid className="text-green-600" />}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
              data-testid="edit-payment-button"
            >
              Düzenle
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (
            <>
              {/* Payment Security Badges */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-sm text-gray-700 font-medium mb-2">
                      Güvenli Ödeme Yöntemleri
                    </p>
                    <p className="text-xs text-gray-600">
                      Tüm ödemeler SSL sertifikası ile güvence altındadır
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Image 
                      src="/visa-logo.svg" 
                      alt="Visa" 
                      width={50} 
                      height={30}
                      className="h-8 w-auto"
                    />
                    <Image 
                      src="/mastercard-logo.svg" 
                      alt="MasterCard" 
                      width={50} 
                      height={30}
                      className="h-8 w-auto"
                    />
                    <Image 
                      src="/iyzico-logo.png" 
                      alt="iyzico ile Öde" 
                      width={100} 
                      height={30}
                      className="h-9 w-auto"
                    />
                  </div>
                </div>
              </div>

              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
              >
                {availablePaymentMethods.map((paymentMethod) => (
                  <div key={paymentMethod.id}>
                    {isIyzicoFunc(paymentMethod.id) ? (
                      <IyzicoCardContainer
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                        paymentInfoMap={paymentInfoMap}
                        setCardData={setIyzicoCardData}
                        setCardComplete={setIyzicoCardComplete}
                      />
                    ) : (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                      />
                    )}
                  </div>
                ))}
              </RadioGroup>
            </>
          )}

          {paidByGiftcard && (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Ödeme Yöntemi
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Hediye Kartı
              </Text>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <Button
            size="large"
            className="mt-6"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={
              (isIyzico && !iyzicoCardComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            {isIyzico
              ? "Ödemeye Geç"
              : "Sipariş Onayına Geç"}
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="flex items-start gap-x-1 w-full">
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Ödeme Yöntemi
                </Text>
                <Text
                  className="txt-medium text-ui-fg-subtle"
                  data-testid="payment-method-summary"
                >
                  {paymentInfoMap[activeSession?.provider_id]?.title ||
                    activeSession?.provider_id}
                </Text>
              </div>
              <div className="flex flex-col w-1/3">
                <Text className="txt-medium-plus text-ui-fg-base mb-1">
                  Ödeme Detayları
                </Text>
                <div
                  className="flex gap-2 txt-medium text-ui-fg-subtle items-center"
                  data-testid="payment-details-summary"
                >
                  <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard />
                    )}
                  </Container>
                  <Text>
                    {isIyzico
                      ? "iyzico ile Güvenli Ödeme"
                      : "Bir sonraki adımda girilecek"}
                  </Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Ödeme Yöntemi
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Hediye Kartı
              </Text>
            </div>
          ) : null}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default Payment
