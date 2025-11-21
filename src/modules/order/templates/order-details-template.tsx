"use client"

import { XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import React, { useState } from "react"
import { requestReturn } from "@lib/data/orders"
import { Button } from "@medusajs/ui"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  const [showReturnForm, setShowReturnForm] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Record<string, { quantity: number; reason: string }>>({})
  const [returnNote, setReturnNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [returnSuccess, setReturnSuccess] = useState(false)
  const [returnError, setReturnError] = useState<string | null>(null)

  // Check if order is eligible for return (within 14 days, not already returned)
  const isReturnEligible = () => {
    if (!order.created_at) return false
    const orderDate = new Date(order.created_at)
    const now = new Date()
    const daysSinceOrder = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24))
    return daysSinceOrder <= 14 && order.fulfillment_status !== "returned"
  }

  const handleItemSelection = (itemId: string, quantity: number, reason: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: { quantity, reason }
    }))
  }

  const handleSubmitReturn = async () => {
    const items = Object.entries(selectedItems).map(([id, { quantity, reason }]) => ({
      id,
      quantity,
      reason
    }))

    if (items.length === 0) {
      setReturnError("Lütfen iade etmek istediğiniz ürünleri seçin")
      return
    }

    setIsSubmitting(true)
    setReturnError(null)

    const result = await requestReturn(order.id, items, returnNote)

    if (result.success) {
      setReturnSuccess(true)
      setShowReturnForm(false)
      setSelectedItems({})
      setReturnNote("")
    } else {
      setReturnError(result.error)
    }

    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="text-2xl-semi">Sipariş Detayları</h1>
        <LocalizedClientLink
          href="/account/orders"
          className="flex gap-2 items-center text-ui-fg-subtle hover:text-ui-fg-base"
          data-testid="back-to-overview-button"
        >
          <XMark /> Siparişlere Dön
        </LocalizedClientLink>
      </div>

      {/* Return Success Message */}
      {returnSuccess && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-green-800 font-semibold">İade Talebiniz Alındı</h3>
              <p className="text-green-700 text-sm mt-1">
                İade talebiniz başarıyla oluşturuldu. En kısa sürede incelenecek ve size bilgi verilecektir.
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        className="flex flex-col gap-4 h-full bg-white w-full"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        <Items order={order} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />

        {/* Return Request Button */}
        {isReturnEligible() && !returnSuccess && (
          <div className="border-t pt-4">
            <Button
              onClick={() => setShowReturnForm(!showReturnForm)}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            >
              {showReturnForm ? "İade Formunu Kapat" : "İade Talebi Oluştur"}
            </Button>
          </div>
        )}

        {/* Return Form */}
        {showReturnForm && (
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">İade Edilecek Ürünleri Seçin</h3>

            <div className="space-y-4 mb-6">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-start gap-4 p-4 bg-white rounded-lg border">
                  <img
                    src={item.thumbnail || "/placeholder.png"}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-600">Adet: {item.quantity}</p>

                    <div className="mt-3 space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleItemSelection(item.id, item.quantity, "")
                            } else {
                              setSelectedItems(prev => {
                                const updated = { ...prev }
                                delete updated[item.id]
                                return updated
                              })
                            }
                          }}
                          className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                        />
                        <span className="text-sm">Bu ürünü iade et</span>
                      </label>

                      {selectedItems[item.id] && (
                        <select
                          value={selectedItems[item.id].reason}
                          onChange={(e) => handleItemSelection(item.id, item.quantity, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        >
                          <option value="">İade sebebi seçin</option>
                          <option value="size">Beden uygun değil</option>
                          <option value="quality">Kalite beklentimi karşılamadı</option>
                          <option value="color">Renk farklı geldi</option>
                          <option value="defect">Ürün hasarlı/kusurlu</option>
                          <option value="other">Diğer</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Açıklama (İsteğe bağlı)
              </label>
              <textarea
                value={returnNote}
                onChange={(e) => setReturnNote(e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="İade sebebinizi detaylı olarak açıklayabilirsiniz..."
              />
            </div>

            {returnError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {returnError}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleSubmitReturn}
                disabled={isSubmitting || Object.keys(selectedItems).length === 0}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white disabled:bg-gray-300"
              >
                {isSubmitting ? "Gönderiliyor..." : "İade Talebini Gönder"}
              </Button>
              <Button
                onClick={() => setShowReturnForm(false)}
                variant="secondary"
                className="flex-1"
              >
                İptal
              </Button>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Önemli:</strong> İade talebiniz onaylandıktan sonra ürünleri kargo ile gönderebilirsiniz.
                Ürünler tarafımıza ulaştıktan sonra ödemeniz 2-7 iş günü içinde kartınıza iade edilecektir.
              </p>
            </div>
          </div>
        )}

        <Help />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
