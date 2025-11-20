"use client"

import React from "react"
import { HttpTypes } from "@medusajs/types"
// Stripe removed - using iyzico only
// import { loadStripe } from "@stripe/stripe-js"
// import StripeWrapper from "./stripe-wrapper"
// import { isStripe } from "@lib/constants"

type PaymentWrapperProps = {
  cart: HttpTypes.StoreCart
  children: React.ReactNode
}

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({ cart, children }) => {
  // Stripe wrapper removed - using iyzico only
  return <div>{children}</div>
}

export default PaymentWrapper
