import Medusa from "@medusajs/js-sdk"

// Production backend URL - use port 9001 for production
let MEDUSA_BACKEND_URL = "http://127.0.0.1:9001"

// Override with environment variable if provided
if (process.env.MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL.replace('localhost', '127.0.0.1')
}

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})
