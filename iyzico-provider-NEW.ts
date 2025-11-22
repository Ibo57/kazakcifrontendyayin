import { ModuleProvider, Modules, AbstractPaymentProvider } from "@medusajs/framework/utils"
import Iyzipay from "iyzipay"
import {
  PaymentSessionStatus,
} from "@medusajs/framework/utils"

type IyzicoOptions = {
  apiKey: string
  secretKey: string
  uri?: string
}

// iyzico payment session data structure (like Stripe PaymentIntent)
type IyzicoPaymentData = {
  id: string  // conversationId
  status: "pending" | "requires_more" | "authorized" | "captured" | "canceled" | "error"
  amount: number
  currency: string
  threeDSHtmlContent?: string
  threeDSCompleted?: boolean
  iyzicoPaymentId?: string
  iyzicoAuthResult?: any
  conversationId: string
  authorized_at?: string
  error?: string
}

class IyzicoProviderService extends AbstractPaymentProvider<IyzicoOptions> {
  static identifier = "iyzico"
  protected iyzipay_: Iyzipay

  constructor(container: any, options: IyzicoOptions) {
    super(container, options)

    this.iyzipay_ = new Iyzipay({
      apiKey: options.apiKey,
      secretKey: options.secretKey,
      uri: options.uri || "https://api.iyzipay.com"
    })
  }

  /**
   * Map iyzico payment data status to Medusa payment session status
   * EXACTLY like Stripe's getStatus method
   */
  private getStatus(paymentData: IyzicoPaymentData): {
    data: Record<string, unknown>
    status: PaymentSessionStatus
  } {
    console.log("[Iyzico] getStatus called", {
      paymentDataStatus: paymentData.status,
      threeDSCompleted: paymentData.threeDSCompleted
    })

    switch (paymentData.status) {
      case "requires_more":
        return {
          status: PaymentSessionStatus.REQUIRES_MORE,
          data: paymentData as unknown as Record<string, unknown>
        }
      case "authorized":
        return {
          status: PaymentSessionStatus.AUTHORIZED,
          data: paymentData as unknown as Record<string, unknown>
        }
      case "captured":
        return {
          status: PaymentSessionStatus.CAPTURED,
          data: paymentData as unknown as Record<string, unknown>
        }
      case "canceled":
        return {
          status: PaymentSessionStatus.CANCELED,
          data: paymentData as unknown as Record<string, unknown>
        }
      case "error":
        return {
          status: PaymentSessionStatus.ERROR,
          data: paymentData as unknown as Record<string, unknown>
        }
      case "pending":
      default:
        return {
          status: PaymentSessionStatus.PENDING,
          data: paymentData as unknown as Record<string, unknown>
        }
    }
  }

  /**
   * Initialize payment - start 3DS flow
   * LIKE Stripe's initiatePayment
   */
  async initiatePayment(
    context: Record<string, unknown>
  ): Promise<{
    status: string
    data: Record<string, unknown>
  }> {
    const { amount, currency_code, customer, cart, data } = context

    console.log("[Iyzico] initiatePayment called", {
      amount,
      currency_code,
      hasCustomer: !!customer,
      hasCart: !!cart
    })

    try {
      const conversationId = `cart_${Date.now()}`
      const paymentMethodData = data?.payment_method_data || null

      // If card data provided, initialize 3DS
      if (paymentMethodData) {
        console.log("[Iyzico] Card data provided, initializing 3DS...")

        const totalAmount = (amount as number) / 100
        const cartData = cart as any
        const customerData = customer as any
        const billing_address = context.billing_address as any

        // Build basket items
        let basketItems: any[] = [{
          id: cartData?.id || "cart_total",
          name: "Sepet Toplamı",
          category1: "Shopping",
          itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
          price: totalAmount.toFixed(2)
        }]

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

        const result = await this.initialize3DSecurePayment(request)

        console.log("[Iyzico] 3DS result:", {
          status: result.status,
          hasThreeDSHtml: !!result.threeDSHtmlContent
        })

        if (result.status === "success" && result.threeDSHtmlContent) {
          // Build payment data object (like Stripe PaymentIntent)
          const paymentData: IyzicoPaymentData = {
            id: conversationId,
            status: "requires_more",  // 3DS required
            amount: amount as number,
            currency: currency_code as string,
            conversationId,
            threeDSHtmlContent: result.threeDSHtmlContent,
            threeDSCompleted: false,
            iyzicoPaymentId: result.paymentId
          }

          // Map status using getStatus (like Stripe)
          return this.getStatus(paymentData)
        } else if (result.status === "success") {
          // No 3DS needed
          const paymentData: IyzicoPaymentData = {
            id: conversationId,
            status: "authorized",
            amount: amount as number,
            currency: currency_code as string,
            conversationId,
            iyzicoPaymentId: result.paymentId,
            threeDSCompleted: true,
            authorized_at: new Date().toISOString()
          }

          return this.getStatus(paymentData)
        } else {
          // Error
          const paymentData: IyzicoPaymentData = {
            id: conversationId,
            status: "error",
            amount: amount as number,
            currency: currency_code as string,
            conversationId,
            error: result.errorMessage || "Payment failed"
          }

          return this.getStatus(paymentData)
        }
      }

      // No card data - return pending
      const paymentData: IyzicoPaymentData = {
        id: conversationId,
        status: "pending",
        amount: amount as number,
        currency: currency_code as string,
        conversationId
      }

      return this.getStatus(paymentData)

    } catch (error) {
      console.error("[Iyzico] initiatePayment error:", error)

      const paymentData: IyzicoPaymentData = {
        id: `cart_${Date.now()}`,
        status: "error",
        amount: (amount as number) || 0,
        currency: (currency_code as string) || "TRY",
        conversationId: `cart_${Date.now()}`,
        error: error.message
      }

      return this.getStatus(paymentData)
    }
  }

  /**
   * Authorize payment - just get status
   * EXACTLY like Stripe's authorizePayment
   */
  async authorizePayment(
    input: Record<string, unknown>
  ): Promise<{
    status: string
    data: Record<string, unknown>
  }> {
    console.log("[Iyzico] authorizePayment called", {
      inputKeys: Object.keys(input),
      hasData: !!input.data,
      dataStatus: (input.data as any)?.status
    })

    // EXACTLY like Stripe: just call getPaymentStatus
    return this.getPaymentStatus(input)
  }

  /**
   * Get payment status
   * Like Stripe's getPaymentStatus
   */
  async getPaymentStatus(
    input: Record<string, unknown>
  ): Promise<{
    status: string
    data: Record<string, unknown>
  }> {
    console.log("[Iyzico] getPaymentStatus called", {
      inputKeys: Object.keys(input),
      hasData: !!input.data,
      dataStatus: (input.data as any)?.status,
      dataThreeDSCompleted: (input.data as any)?.threeDSCompleted
    })

    // Medusa passes { data: IyzicoPaymentData }
    // Extract the actual payment data
    const paymentData = input.data as IyzicoPaymentData

    if (!paymentData) {
      throw this.buildError("No payment data in getPaymentStatus", new Error("Missing payment data"))
    }

    // Just map it using getStatus (like Stripe does with PaymentIntent)
    return this.getStatus(paymentData)
  }

  /**
   * Update payment
   * EXACTLY like Stripe's updatePayment
   */
  async updatePayment(
    context: any
  ): Promise<{
    status: string
    data: Record<string, unknown>
  }> {
    console.log("[Iyzico] updatePayment called", {
      contextKeys: Object.keys(context),
      hasData: !!context.data,
      dataKeys: context.data ? Object.keys(context.data) : [],
      dataStatus: context.data?.status,
      dataThreeDSCompleted: context.data?.threeDSCompleted
    })

    // Medusa passes { data, amount, currency_code, context }
    // The actual payment data is in context.data
    const paymentData = context.data as IyzicoPaymentData

    if (!paymentData) {
      throw this.buildError("No payment data in updatePayment", new Error("Missing payment data"))
    }

    // Map using getStatus
    return this.getStatus(paymentData)
  }

  /**
   * Capture payment
   */
  async capturePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    // iyzico auto-captures on authorization
    return {
      ...paymentSessionData,
      status: "captured"
    }
  }

  /**
   * Cancel payment
   */
  async cancelPayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    return {
      ...paymentSessionData,
      status: "canceled"
    }
  }

  /**
   * Refund payment
   */
  async refundPayment(
    paymentSessionData: Record<string, unknown>,
    refundAmount: number
  ): Promise<Record<string, unknown>> {
    // TODO: Implement iyzico refund API
    return {
      ...paymentSessionData,
      status: "refunded"
    }
  }

  /**
   * Delete payment
   */
  async deletePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    return paymentSessionData
  }

  /**
   * Retrieve payment
   */
  async retrievePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    return paymentSessionData
  }

  /**
   * Webhook handler
   */
  async getWebhookActionAndData(
    payload: any
  ): Promise<{ action: any; data?: Record<string, unknown> }> {
    return {
      action: "not_supported" as any,
      data: payload.data || payload
    }
  }

  /**
   * Helper: Initialize 3DS payment
   */
  private initialize3DSecurePayment(request: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.iyzipay_.threedsInitialize.create(request, (err: any, result: any) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
  }
}

export default ModuleProvider(Modules.PAYMENT, {
  services: [IyzicoProviderService],
})
