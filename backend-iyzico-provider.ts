import { ModuleProvider, Modules, AbstractPaymentProvider } from "@medusajs/framework/utils"
import Iyzipay from "iyzipay"

type IyzicoOptions = {
  apiKey: string
  secretKey: string
  uri?: string // sandbox or production URI
}

class IyzicoProviderService extends AbstractPaymentProvider<IyzicoOptions> {
  static identifier = "iyzico"
  protected iyzipay_: Iyzipay

  constructor(container: any, options: IyzicoOptions) {
    super(container, options)

    this.iyzipay_ = new Iyzipay({
      apiKey: options.apiKey,
      secretKey: options.secretKey,
      uri: options.uri || "https://api.iyzipay.com" // default to production
    })
  }

  /**
   * Initialize a payment session with Iyzico
   */
  async initiatePayment(
    context: Record<string, unknown>
  ): Promise<{
    status: string
    data: Record<string, unknown>
  }> {
    const { amount, currency_code, customer, cart, data } = context

    try {
      // Create a unique conversation ID for this payment
      const conversationId = `cart_${cart?.id || Date.now()}`

      // Extract card data if provided during initiation
      const paymentMethodData = data?.payment_method_data || null

      // If card data provided, immediately initialize 3DS payment
      if (paymentMethodData) {
        console.log("[Iyzico] initiatePayment - card data provided, starting 3DS flow")

        const totalAmount = (amount as number) / 100
        const cartData = cart as any
        const customerData = customer as any
        const billing_address = context.billing_address as any

        // Build basket items
        let basketItems: any[] = []
        let basketTotalPrice = 0

        if (cartData?.items && cartData.items.length > 0) {
          basketItems = cartData.items.map((item: any, index: number) => {
            const itemPrice = (item.total || 0) / 100
            basketTotalPrice += itemPrice
            return {
              id: item.id || `item_${index}`,
              name: item.title || item.variant?.title || `Product ${index + 1}`,
              category1: item.variant?.product?.collection?.title || "Shopping",
              itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
              price: itemPrice.toFixed(2)
            }
          })
        }

        if (cartData?.shipping_total && cartData.shipping_total > 0) {
          const shippingPrice = cartData.shipping_total / 100
          basketTotalPrice += shippingPrice
          basketItems.push({
            id: "shipping",
            name: "Kargo Ücreti",
            category1: "Shipping",
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: shippingPrice.toFixed(2)
          })
        }

        if (basketItems.length === 0 || Math.abs(basketTotalPrice - totalAmount) > 0.01) {
          basketItems = [{
            id: cartData?.id || "cart_total",
            name: "Sepet Toplamı",
            category1: "Shopping",
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: totalAmount.toFixed(2)
          }]
        }

        const customerIp = context.ip_address || context.ip || "31.97.181.226"
        const callbackUrl = `${process.env.MEDUSA_BACKEND_URL || 'https://admin.kazakci.com'}/iyzico/callback`

        const cardData = paymentMethodData as any
        const request: any = {
          locale: Iyzipay.LOCALE.TR,
          conversationId,
          price: totalAmount.toFixed(2),
          paidPrice: totalAmount.toFixed(2),
          currency: Iyzipay.CURRENCY.TRY,
          installment: "1",
          basketId: cartData?.id || `basket_${Date.now()}`,
          paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
          paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
          callbackUrl,
          buyer: {
            id: customerData?.id || `buyer_${Date.now()}`,
            name: customerData?.first_name || "Müşteri",
            surname: customerData?.last_name || "Adı",
            gsmNumber: customerData?.phone || billing_address?.phone || "+905555555555",
            email: customerData?.email || "musteri@ornek.com",
            identityNumber: "11111111111",
            registrationAddress: billing_address?.address_1 || "Adres Bilgisi",
            ip: customerIp,
            city: billing_address?.city || "İstanbul",
            country: billing_address?.country_code || "TR"
          },
          shippingAddress: {
            contactName: `${customerData?.first_name || 'Müşteri'} ${customerData?.last_name || 'Adı'}`,
            city: billing_address?.city || "İstanbul",
            country: billing_address?.country_code || "TR",
            address: billing_address?.address_1 || "Adres"
          },
          billingAddress: {
            contactName: `${customerData?.first_name || 'Müşteri'} ${customerData?.last_name || 'Adı'}`,
            city: billing_address?.city || "İstanbul",
            country: billing_address?.country_code || "TR",
            address: billing_address?.address_1 || "Adres"
          },
          basketItems,
          paymentCard: {
            cardHolderName: cardData.cardHolderName,
            cardNumber: cardData.cardNumber,
            expireMonth: cardData.expireMonth,
            expireYear: cardData.expireYear,
            cvc: cardData.cvc,
            registerCard: "0"
          }
        }

        console.log("[Iyzico] Calling 3DS initialize with request:", {
          conversationId,
          price: request.price,
          basketItemCount: basketItems.length,
          callbackUrl
        })

        const result = await this.initialize3DSecurePayment(request)

        console.log("[Iyzico] 3DS result:", {
          status: result.status,
          paymentId: result.paymentId,
          conversationId: result.conversationId,
          hasThreeDSHtml: !!result.threeDSHtmlContent,
          errorCode: result.errorCode,
          errorMessage: result.errorMessage
        })

        if (result.status === "success" && result.threeDSHtmlContent) {
          return {
            status: "requires_more",
            data: {
              conversationId,
              iyzicoPaymentId: result.paymentId,
              iyzicoConversationId: result.conversationId,
              threeDSHtmlContent: result.threeDSHtmlContent,
              callbackUrl,
              status: "requires_more",
              action_required: "3d_secure",
              initiated_at: new Date().toISOString(),
              amount,
              currency: currency_code || "TRY",
              customer,
              billing_address: context.billing_address,
              cart
            }
          }
        } else if (result.status === "success") {
          return {
            status: "authorized",
            data: {
              conversationId,
              iyzicoPaymentId: result.paymentId,
              iyzicoConversationId: result.conversationId,
              iyzicoFraudStatus: result.fraudStatus,
              status: "authorized",
              authorized_at: new Date().toISOString(),
              amount,
              currency: currency_code || "TRY",
              customer,
              billing_address: context.billing_address,
              cart
            }
          }
        } else {
          return {
            status: "error",
            data: {
              conversationId,
              error: result.errorMessage || "Ödeme işlemi başarısız oldu.",
              errorCode: result.errorCode,
              errorGroup: result.errorGroup,
              status: "error",
              amount,
              currency: currency_code || "TRY",
              customer,
              billing_address: context.billing_address,
              cart
            }
          }
        }
      }

      // No card data - return pending
      return {
        status: "pending",
        data: {
          conversationId,
          status: "pending",
          amount,
          currency: currency_code || "TRY",
          payment_method_data: paymentMethodData,
          customer,
          billing_address: context.billing_address,
          cart
        }
      }
    } catch (error) {
      console.error("[Iyzico] initiatePayment error:", error)
      return {
        status: "error",
        data: {
          error: error.message,
          ...context
        }
      }
    }
  }

  /**
   * Authorize a payment session during checkout
   */
  async authorizePayment(
    paymentSessionData: Record<string, unknown>,
    context: Record<string, unknown>
  ): Promise<{
    status: string
    data: Record<string, unknown>
  }> {
    console.log("[Iyzico] authorizePayment called with:", {
      sessionData: JSON.stringify(paymentSessionData),
      contextKeys: context ? Object.keys(context) : []
    })


    // CRITICAL FIX: Check if 3DS was already completed (called from callback)
    // If so, immediately return authorized status without re-initializing payment
    if (context?.threeDSCompleted || context?.authorized || paymentSessionData.authorized) {
      console.log("[Iyzico] 3DS already completed, returning authorized status")
      console.log("[Iyzico] Context data:", {
        threeDSCompleted: context.threeDSCompleted,
        authorized: context.authorized,
        iyzicoPaymentId: context.iyzicoPaymentId
      })
      
      return {
        status: "authorized",
        data: {
          ...paymentSessionData,
          iyzicoPaymentId: context.iyzicoPaymentId || paymentSessionData.iyzicoPaymentId,
          iyzicoAuthResult: context.iyzicoAuthResult,
          threeDSCompleted: true,
          authorized: true,
          status: "authorized",
          authorized_at: new Date().toISOString()
        }
      }
    }

    const { conversationId, payment_method_data } = paymentSessionData
    const { amount, currency_code } = context

    // Get customer and billing address from session data (stored during initiate) or context
    const customer = (paymentSessionData.customer || context.customer) as any
    const billing_address = (paymentSessionData.billing_address || context.billing_address) as any
    const cart = paymentSessionData.cart || context.cart

    // Check if card data exists
    if (!payment_method_data) {
      console.error("[Iyzico] No payment_method_data found in session!")
      console.error("[Iyzico] paymentSessionData keys:", Object.keys(paymentSessionData))

      return {
        status: "error",
        data: {
          ...paymentSessionData,
          error: "Kart bilgileri bulunamadı. Lütfen tekrar deneyin.",
          error_code: "NO_CARD_DATA"
        }
      }
    }

    try {
      // Calculate total amounts
      const totalAmount = (amount as number) / 100
      const cartData = cart as any

      // Get actual cart items for basket
      let basketItems: any[] = []
      let basketTotalPrice = 0

      if (cartData?.items && cartData.items.length > 0) {
        // Map real cart items to Iyzico basket items
        basketItems = cartData.items.map((item: any, index: number) => {
          const itemPrice = (item.total || 0) / 100 // Convert cents to TRY
          basketTotalPrice += itemPrice

          return {
            id: item.id || `item_${index}`,
            name: item.title || item.variant?.title || `Product ${index + 1}`,
            category1: item.variant?.product?.collection?.title || "Shopping",
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: itemPrice.toFixed(2)
          }
        })
      }

      // If shipping cost exists, add it as separate item
      if (cartData?.shipping_total && cartData.shipping_total > 0) {
        const shippingPrice = cartData.shipping_total / 100
        basketTotalPrice += shippingPrice
        basketItems.push({
          id: "shipping",
          name: "Kargo Ücreti",
          category1: "Shipping",
          itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
          price: shippingPrice.toFixed(2)
        })
      }

      // Fallback: if no items or total doesn't match, use single item
      if (basketItems.length === 0 || Math.abs(basketTotalPrice - totalAmount) > 0.01) {
        basketItems = [{
          id: cartData?.id || "cart_total",
          name: "Sepet Toplamı",
          category1: "Shopping",
          itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
          price: totalAmount.toFixed(2)
        }]
      }

      // Get customer IP from request context or use fallback
      const customerIp = context.ip_address || context.ip || "31.97.181.226"

      // Prepare payment request for Iyzico
      const request: any = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: conversationId as string,
        price: totalAmount.toFixed(2), // Total cart price
        paidPrice: totalAmount.toFixed(2), // Amount customer pays (after discounts)
        currency: Iyzipay.CURRENCY.TRY,
        installment: "1", // Single payment (no installments)
        basketId: cartData?.id || `basket_${Date.now()}`,
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        buyer: {
          id: customer?.id || `buyer_${Date.now()}`,
          name: customer?.first_name || "Müşteri",
          surname: customer?.last_name || "Adı",
          gsmNumber: customer?.phone || billing_address?.phone || "+905555555555",
          email: customer?.email || "musteri@ornek.com",
          identityNumber: "11111111111", // TODO: Get from customer in production
          registrationAddress: billing_address?.address_1 || "Adres Bilgisi",
          ip: customerIp,
          city: billing_address?.city || "İstanbul",
          country: billing_address?.country_code || "TR"
        },
        shippingAddress: {
          contactName: `${customer?.first_name || 'Müşteri'} ${customer?.last_name || 'Adı'}`,
          city: billing_address?.city || "İstanbul",
          country: billing_address?.country_code || "TR",
          address: billing_address?.address_1 || "Adres"
        },
        billingAddress: {
          contactName: `${customer?.first_name || 'Müşteri'} ${customer?.last_name || 'Adı'}`,
          city: billing_address?.city || "İstanbul",
          country: billing_address?.country_code || "TR",
          address: billing_address?.address_1 || "Adres"
        },
        basketItems: basketItems
      }

      // Add card details from payment session data
      if (payment_method_data) {
        const cardData = payment_method_data as any
        request.paymentCard = {
          cardHolderName: cardData.holder_name || cardData.cardHolderName,
          cardNumber: cardData.number || cardData.cardNumber,
          expireMonth: cardData.exp_month || cardData.expireMonth,
          expireYear: cardData.exp_year || cardData.expireYear,
          cvc: cardData.cvc,
          registerCard: "0"
        }
      } else {
        // If no card data, return error
        return {
          status: "error",
          data: {
            ...paymentSessionData,
            error: "Kart bilgileri eksik. Lütfen ödeme adımından kart bilgilerinizi girin."
          }
        }
      }

      // Log request for debugging (remove sensitive data in production logs)
      console.log("[Iyzico] Payment request prepared:", {
        conversationId: request.conversationId,
        price: request.price,
        paidPrice: request.paidPrice,
        currency: request.currency,
        basketItemCount: request.basketItems.length,
        customerEmail: request.buyer.email
      })

      // Use 3D Secure for secure payment (recommended by banks and PCI DSS)
      // Add callback URLs for 3D Secure redirect
      const callbackUrl = `${process.env.MEDUSA_BACKEND_URL || 'https://admin.kazakci.com'}/iyzico/callback`

      request.callbackUrl = callbackUrl

      // Initialize 3D Secure payment with Iyzico
      const result = await this.initialize3DSecurePayment(request)

      // Log result
      console.log("[Iyzico] 3D Secure initialization result:", {
        status: result.status,
        conversationId: result.conversationId,
        paymentId: result.paymentId,
        threeDSHtmlContent: result.threeDSHtmlContent ? "Present" : "Not present",
        errorCode: result.errorCode,
        errorMessage: result.errorMessage
      })

      if (result.status === "success" && result.threeDSHtmlContent) {
        // 3D Secure page needs to be shown to customer
        return {
          status: "requires_more",
          data: {
            ...paymentSessionData,
            iyzicoPaymentId: result.paymentId,
            iyzicoConversationId: result.conversationId,
            threeDSHtmlContent: result.threeDSHtmlContent, // HTML content for 3DS page
            callbackUrl: callbackUrl,
            status: "requires_more",
            action_required: "3d_secure",
            initiated_at: new Date().toISOString()
          }
        }
      } else if (result.status === "success") {
        // Payment succeeded without 3DS (rare case)
        return {
          status: "authorized",
          data: {
            ...paymentSessionData,
            iyzicoPaymentId: result.paymentId,
            iyzicoConversationId: result.conversationId,
            iyzicoFraudStatus: result.fraudStatus,
            status: "authorized",
            authorized_at: new Date().toISOString()
          }
        }
      } else {
        // Return detailed error for failed payment
        console.error("[Iyzico] Payment failed:", {
          errorCode: result.errorCode,
          errorMessage: result.errorMessage,
          errorGroup: result.errorGroup
        })

        return {
          status: "error",
          data: {
            ...paymentSessionData,
            error: result.errorMessage || "Ödeme işlemi başarısız oldu. Lütfen kart bilgilerinizi kontrol edin.",
            errorCode: result.errorCode,
            errorGroup: result.errorGroup,
            status: "error"
          }
        }
      }
    } catch (error) {
      console.error("[Iyzico] Payment error:", error)

      return {
        status: "error",
        data: {
          ...paymentSessionData,
          error: "Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.",
          technicalError: error.message,
          status: "error"
        }
      }
    }
  }

  /**
   * Capture an authorized payment
   */
  async capturePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    const { iyzicoPaymentId } = paymentSessionData

    if (!iyzicoPaymentId) {
      return {
        ...paymentSessionData,
        status: "error",
        error: "No Iyzico payment ID found"
      }
    }

    // In Iyzico, payments are typically captured immediately upon authorization
    // This method confirms the capture
    return {
      ...paymentSessionData,
      status: "captured",
      capturedAt: new Date().toISOString()
    }
  }

  /**
   * Cancel an authorized payment
   */
  async cancelPayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    const { iyzicoPaymentId } = paymentSessionData

    try {
      if (iyzicoPaymentId) {
        // Cancel payment via Iyzico API
        const cancelRequest = {
          locale: Iyzipay.LOCALE.TR,
          conversationId: paymentSessionData.conversationId as string,
          paymentId: iyzicoPaymentId as string,
          ip: "31.97.181.226" // Get from context in production
        }

        const result = await this.cancelIyzicoPayment(cancelRequest)

        return {
          ...paymentSessionData,
          status: "canceled",
          cancelResult: result
        }
      }

      return {
        ...paymentSessionData,
        status: "canceled"
      }
    } catch (error) {
      return {
        ...paymentSessionData,
        status: "error",
        error: error.message
      }
    }
  }

  /**
   * Refund a captured payment
   */
  async refundPayment(
    paymentSessionData: Record<string, unknown>,
    refundAmount: number,
    _context?: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    const { iyzicoPaymentId, currency } = paymentSessionData

    try {
      if (!iyzicoPaymentId) {
        throw new Error("No Iyzico payment ID found")
      }

      const refundRequest = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: paymentSessionData.conversationId as string,
        paymentTransactionId: iyzicoPaymentId as string,
        price: (refundAmount / 100).toFixed(2), // Convert cents to currency
        ip: "31.97.181.226", // Get from context in production
        currency: (currency as string) || "TRY"
      }

      const result = await this.refundIyzicoPayment(refundRequest)

      if (result.status === "success") {
        return {
          ...paymentSessionData,
          status: "refunded",
          refundAmount,
          refundResult: result
        }
      } else {
        return {
          ...paymentSessionData,
          status: "error",
          error: result.errorMessage || "Refund failed"
        }
      }
    } catch (error) {
      return {
        ...paymentSessionData,
        status: "error",
        error: error.message
      }
    }
  }

  /**
   * Delete a payment session
   */
  async deletePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    return paymentSessionData
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(
    paymentSessionData: Record<string, unknown>
  ): Promise<any> {
    return (paymentSessionData.status as string) || "pending"
  }

  /**
   * Retrieve payment details
   */
  async retrievePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    return paymentSessionData
  }

  /**
   * Update payment session
   */
  async updatePayment(
    context: any
  ): Promise<{
    status: string
    data: Record<string, unknown>
  }> {
    return {
      status: "pending",
      data: {
        ...context,
        status: "pending"
      }
    }
  }

  /**
   * Handle webhook events from Iyzico
   */
  async getWebhookActionAndData(
    payload: any
  ): Promise<{ action: any; data?: Record<string, unknown> }> {
    // Iyzico webhook handling
    // You can implement webhook processing here
    return {
      action: "not_supported" as any,
      data: payload.data || payload
    }
  }

  /**
   * Helper method to initialize 3D Secure payment with Iyzico
   */
  private initialize3DSecurePayment(request: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.iyzipay_.threedsInitialize.create(request, (err: any, result: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  /**
   * Helper method to create payment with Iyzico (non-3DS - kept for fallback)
   */
  private createIyzicoPayment(request: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.iyzipay_.payment.create(request, (err: any, result: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  /**
   * Helper method to cancel payment with Iyzico
   */
  private cancelIyzicoPayment(request: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.iyzipay_.cancel.create(request, (err: any, result: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  /**
   * Helper method to refund payment with Iyzico
   */
  private refundIyzicoPayment(request: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.iyzipay_.refund.create(request, (err: any, result: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

export default ModuleProvider(Modules.PAYMENT, {
  services: [IyzicoProviderService],
})
