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

  // Check if order is eligible for return (within 14 days, not already returned, and paid)
  const isReturnEligible = () => {
    if (!order.created_at) return false

    // Only allow returns for paid orders (not cash on delivery)
    const isPaid = order.payment_status === "captured" || order.payment_status === "paid"
    if (!isPaid) return false

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

        {/* Return Request Button for Paid Orders */}
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

        {/* Cash on Delivery Return Info */}
        {!isReturnEligible() && order.payment_status !== "captured" && order.payment_status !== "paid" && order.fulfillment_status !== "returned" && (
          <div className="border-t pt-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">📦 Kapıda Ödeme İade İşlemi</h3>
              <p className="text-sm text-blue-800 mb-3">
                Kapıda ödemeli siparişler için iade işlemini WhatsApp veya e-posta üzerinden yapabilirsiniz.
              </p>
              <div className="space-y-2">
                <a
                  href={`https://wa.me/905XXXXXXXXX?text=Merhaba,%20sipariş%20numarası%20${order.display_id}%20için%20iade%20talebim%20var`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp ile İletişime Geç
                </a>
                <a
                  href={`mailto:info@kazakci.com?subject=İade Talebi - Sipariş ${order.display_id}`}
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  E-posta Gönder
                </a>
              </div>
            </div>
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
