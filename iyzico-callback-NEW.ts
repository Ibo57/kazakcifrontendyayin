import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import Iyzipay from "iyzipay"
import { Modules } from "@medusajs/framework/utils"

// Disable authentication middleware for this webhook endpoint
export const AUTHENTICATE = false

/**
 * iyzico 3D Secure Callback Endpoint
 * STRIPE WEBHOOK APPROACH: Just update the data, don't call provider methods
 */
export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const callbackData = req.body

    console.log("[Iyzico Callback] Received 3DS callback:", {
      status: callbackData.status,
      mdStatus: callbackData.mdStatus,
      conversationId: callbackData.conversationId,
      paymentId: callbackData.paymentId
    })

    const frontendUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kazakci.com'

    // Check mdStatus - must be "1" for successful 3DS
    if (callbackData.mdStatus === "1" || callbackData.mdStatus === 1) {
      try {
        // Initialize iyzico client
        const iyzipay = new Iyzipay({
          apiKey: process.env.IYZICO_API_KEY!,
          secretKey: process.env.IYZICO_SECRET_KEY!,
          uri: process.env.IYZICO_URI || "https://api.iyzipay.com"
        })

        // Call Auth 3DS to finalize payment
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
          paymentId: authResult.paymentId
        })

        if (authResult.status === "success") {
          // STRIPE APPROACH: Just update payment session DATA
          // Don't call provider methods - Medusa will handle that
          try {
            const paymentModule = req.scope.resolve(Modules.PAYMENT)

            // Find payment session by conversationId
            const paymentSessions = await paymentModule.listPaymentSessions({})
            const session = paymentSessions.find((ps: any) =>
              ps.data?.conversationId === callbackData.conversationId
            )

            if (session) {
              console.log("[Iyzico Callback] Found payment session:", session.id)
              console.log("[Iyzico Callback] Current session data:", JSON.stringify(session.data).substring(0, 200))

              // Update payment session data with 3DS completion
              // CRITICAL: Update the payment data object (like Stripe PaymentIntent)
              const updatedData = {
                ...session.data,
                status: "authorized",  // ← Change status field
                threeDSCompleted: true,
                iyzicoPaymentId: authResult.paymentId,
                iyzicoAuthResult: authResult,
                authorized_at: new Date().toISOString()
              }

              console.log("[Iyzico Callback] Updating payment session with:", {
                status: updatedData.status,
                threeDSCompleted: updatedData.threeDSCompleted
              })

              await paymentModule.updatePaymentSession({
                id: session.id,
                amount: session.amount,  // Required by MikroORM
                currency_code: session.currency_code,  // Required by MikroORM
                data: updatedData
              })

              console.log("[Iyzico Callback] Payment session data updated successfully!")

              // Redirect to frontend
              // Medusa will call updatePayment → getStatus will see status="authorized" → return AUTHORIZED
              const redirectUrl = `${frontendUrl}/tr/checkout?step=review&payment_status=success&payment_id=${authResult.paymentId}`
              console.log("[Iyzico Callback] Redirecting to:", redirectUrl)

              res.redirect(302, redirectUrl)
              return
            } else {
              console.error("[Iyzico Callback] No payment session found!")
              const redirectUrl = `${frontendUrl}/tr/checkout?step=payment&payment_status=error&error=SESSION_NOT_FOUND`
              res.redirect(302, redirectUrl)
              return
            }
          } catch (updateError: any) {
            console.error("[Iyzico Callback] Failed to update payment session:", updateError.message)
            console.error("[Iyzico Callback] Error stack:", updateError.stack)
          }
        }

        // Auth 3DS failed
        const redirectUrl = `${frontendUrl}/tr/checkout?step=payment&payment_status=failed&error=${encodeURIComponent(authResult.errorMessage || 'Ödeme başarısız')}`
        console.log("[Iyzico Callback] Auth failed, redirecting")
        res.redirect(302, redirectUrl)
        return

      } catch (authError: any) {
        console.error("[Iyzico Callback] Auth 3DS error:", authError)
        const redirectUrl = `${frontendUrl}/tr/checkout?step=payment&payment_status=error&error=AUTH_ERROR`
        res.redirect(302, redirectUrl)
        return
      }
    } else {
      // 3DS verification failed
      const redirectUrl = `${frontendUrl}/tr/checkout?step=payment&payment_status=failed&error=${encodeURIComponent(callbackData.errorMessage || '3D Secure başarısız')}`
      console.log("[Iyzico Callback] mdStatus failed")
      res.redirect(302, redirectUrl)
      return
    }
  } catch (error) {
    console.error("[Iyzico Callback] Error:", error)
    const frontendUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://kazakci.com'
    const redirectUrl = `${frontendUrl}/tr/checkout?step=payment&payment_status=error`
    res.redirect(302, redirectUrl)
    return
  }
}
