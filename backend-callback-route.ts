import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import Iyzipay from "iyzipay"
import { Modules } from "@medusajs/framework/utils"

// Disable authentication middleware for this webhook endpoint
// Iyzico doesn't send publishable API key in callbacks
export const AUTHENTICATE = false

/**
 * iyzico 3D Secure Callback Endpoint
 * This endpoint receives the callback from iyzico after 3D Secure authentication
 * According to iyzico docs, we must call Auth 3DS endpoint after receiving callback
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    // Get callback data from iyzico (comes as form data from 3DS page)
    const callbackData = req.body

    console.log("[Iyzico Callback] Received 3D Secure callback:", {
      status: callbackData.status,
      mdStatus: callbackData.mdStatus,
      conversationId: callbackData.conversationId,
      paymentId: callbackData.paymentId
    })

    // Get frontend URL for redirect
    const frontendUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kazakci.com'

    // Check mdStatus - must be "1" for successful payment
    // mdStatus values: 1 = success, 0,2-8 = various failures
    if (callbackData.mdStatus === "1" || callbackData.mdStatus === 1) {
      // 3D Secure verification successful - now call Auth 3DS
      try {
        // Initialize iyzico client
        const iyzipay = new Iyzipay({
          apiKey: process.env.IYZICO_API_KEY!,
          secretKey: process.env.IYZICO_SECRET_KEY!,
          uri: process.env.IYZICO_URI || "https://api.iyzipay.com"
        })

        // Call Auth 3DS to finalize the payment
        const authResult: any = await new Promise((resolve, reject) => {
          iyzipay.threedsPayment.create({
            locale: Iyzipay.LOCALE.TR,
            conversationId: callbackData.conversationId,
            paymentId: callbackData.paymentId,
            conversationData: callbackData.conversationData || ""
          }, (err: any, result: any) => {
            if (err) reject(err)
            else resolve(result)
          })
        })

        console.log("[Iyzico Callback] Auth 3DS result:", {
          status: authResult.status,
          paymentId: authResult.paymentId,
          paymentStatus: authResult.paymentStatus,
          fraudStatus: authResult.fraudStatus
        })

        if (authResult.status === "success") {
          // Authorize payment session using Medusa Payment Module
          try {
            const paymentModule = req.scope.resolve(Modules.PAYMENT)
            
            console.log("[Iyzico Callback] Looking for payment session with conversationId:", callbackData.conversationId)

            // Find all payment sessions
            const paymentSessions = await paymentModule.listPaymentSessions({})

            console.log("[Iyzico Callback] Total payment sessions in database:", paymentSessions.length)

            // Find the session that matches our conversationId
            const session = paymentSessions.find((ps: any) => 
              ps.data?.conversationId === callbackData.conversationId
            )

            if (session) {
              console.log("[Iyzico Callback] Found matching payment session:", session.id)
              console.log("[Iyzico Callback] Current session status:", session.status)

              // CRITICAL: Directly update payment session status to authorized
              // This is simpler than calling authorizePaymentSession which has issues
              await paymentModule.updatePaymentSession({
                id: session.id,
                amount: session.amount,  // CRITICAL: amount is required
                currency_code: session.currency_code,
                status: "authorized",
                data: {
                  ...session.data,
                  iyzicoPaymentId: authResult.paymentId,
                  iyzicoAuthResult: authResult,
                  threeDSCompleted: true,
                  authorized: true,
                  authorized_at: new Date().toISOString()
                }
              })

              console.log("[Iyzico Callback] Payment session status updated to authorized!")
            } else {
              console.error("[Iyzico Callback] No payment session found with conversationId:", callbackData.conversationId)
              
              const availableConversationIds = paymentSessions
                .map((ps: any) => ps.data?.conversationId)
                .filter(Boolean)
              console.error("[Iyzico Callback] Available conversation IDs:", availableConversationIds)
            }
          } catch (updateError: any) {
            console.error("[Iyzico Callback] Failed in payment session update flow:", updateError.message)
            console.error("[Iyzico Callback] Error stack:", updateError.stack)
          }

          // Payment fully authorized - redirect to frontend
          const redirectUrl = `${frontendUrl}/tr/checkout?step=review&payment_status=success&payment_id=${authResult.paymentId}`

          console.log("[Iyzico Callback] Redirecting to:", redirectUrl)
          res.redirect(302, redirectUrl)
          return
        } else {
          // Auth 3DS failed
          const redirectUrl = `${frontendUrl}/tr/checkout?step=payment&payment_status=failed&error=${encodeURIComponent(authResult.errorMessage || 'Ödeme başarısız')}`

          console.log("[Iyzico Callback] Auth failed, redirecting to:", redirectUrl)
          res.redirect(302, redirectUrl)
          return
        }
      } catch (authError: any) {
        console.error("[Iyzico Callback] Auth 3DS error:", authError)

        const redirectUrl = `${frontendUrl}/tr/checkout?step=payment&payment_status=error&error=${encodeURIComponent('Ödeme doğrulama hatası')}`

        res.redirect(302, redirectUrl)
        return
      }
    } else {
      // mdStatus is not 1 - 3D Secure verification failed
      const redirectUrl = `${frontendUrl}/tr/checkout?step=payment&payment_status=failed&error=${encodeURIComponent(callbackData.errorMessage || '3D Secure doğrulama başarısız')}`

      console.log("[Iyzico Callback] mdStatus failed, redirecting to:", redirectUrl)
      res.redirect(302, redirectUrl)
      return
    }
  } catch (error) {
    console.error("[Iyzico Callback] Error processing callback:", error)

    const frontendUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kazakci.com'
    const redirectUrl = `${frontendUrl}/tr/checkout?step=payment&payment_status=error`

    res.redirect(302, redirectUrl)
    return
  }
}
