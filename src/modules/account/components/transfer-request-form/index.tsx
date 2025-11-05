"use client"

import { useActionState } from "react"
import { createTransferRequest } from "@lib/data/orders"
import { Text, Heading, Input, Button, IconButton, Toaster } from "@medusajs/ui"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { CheckCircleMiniSolid, XCircleSolid } from "@medusajs/icons"
import { useEffect, useState } from "react"

export default function TransferRequestForm() {
  const [showSuccess, setShowSuccess] = useState(false)

  const [state, formAction] = useActionState(createTransferRequest, {
    success: false,
    error: null,
    order: null,
  })

  useEffect(() => {
    if (state.success && state.order) {
      setShowSuccess(true)
    }
  }, [state.success, state.order])

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <div className="grid sm:grid-cols-2 items-center gap-x-8 gap-y-4 w-full bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-full p-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <Heading level="h3" className="text-lg font-bold text-gray-900">
              Sipariş Aktarımı
            </Heading>
          </div>
          <Text className="text-sm text-gray-700">
            Aradığınız siparişi bulamadınız mı?
            <br /> Bir siparişi hesabınıza bağlayın.
          </Text>
        </div>
        <form
          action={formAction}
          className="flex flex-col gap-y-1 sm:items-end"
        >
          <div className="flex flex-col gap-y-2 w-full">
            <Input className="w-full bg-white" name="order_id" placeholder="Sipariş No" />
            <SubmitButton
              variant="secondary"
              className="w-fit whitespace-nowrap self-end bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg"
            >
              Aktarım Talebi Gönder
            </SubmitButton>
          </div>
        </form>
      </div>
      {!state.success && state.error && (
        <Text className="text-base-regular text-rose-500 text-right">
          {state.error}
        </Text>
      )}
      {showSuccess && (
        <div className="flex justify-between p-5 bg-green-50 border-2 border-green-200 rounded-xl w-full self-stretch items-center">
          <div className="flex gap-x-3 items-center">
            <div className="bg-green-600 rounded-full p-2">
              <CheckCircleMiniSolid className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col gap-y-1">
              <Text className="text-sm font-semibold text-gray-900">
                #{state.order?.id} numaralı sipariş için aktarım talebi gönderildi
              </Text>
              <Text className="text-sm text-gray-600">
                {state.order?.email} adresine aktarım talebi e-postası gönderildi
              </Text>
            </div>
          </div>
          <IconButton
            variant="transparent"
            className="h-fit hover:bg-green-200 rounded-full p-2 transition-colors"
            onClick={() => setShowSuccess(false)}
          >
            <XCircleSolid className="w-5 h-5 text-gray-600" />
          </IconButton>
        </div>
      )}
    </div>
  )
}
