"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Button } from "@medusajs/ui"

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [order, setOrder] = useState<any | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setOrder(null)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/orders?display_id=${orderId}&email=${email}`,
        {
          headers: {
            "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
          },
        }
      )

      if (!response.ok) {
        throw new Error("Sipariş bulunamadı")
      }

      const data = await response.json()

      if (data.orders && data.orders.length > 0) {
        setOrder(data.orders[0])
      } else {
        setError("Sipariş bulunamadı. Lütfen sipariş numaranızı ve e-posta adresinizi kontrol edin.")
      }
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setLoading(false)
    }
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          color: "text-yellow-600 bg-yellow-50 border-yellow-200",
          text: "Beklemede",
          description: "Siparişiniz işleme alınıyor"
        }
      case "completed":
        return {
          icon: CheckCircle,
          color: "text-green-600 bg-green-50 border-green-200",
          text: "Tamamlandı",
          description: "Siparişiniz teslim edildi"
        }
      case "shipped":
        return {
          icon: Truck,
          color: "text-blue-600 bg-blue-50 border-blue-200",
          text: "Kargoda",
          description: "Siparişiniz kargoya verildi"
        }
      case "canceled":
        return {
          icon: AlertCircle,
          color: "text-red-600 bg-red-50 border-red-200",
          text: "İptal Edildi",
          description: "Sipariş iptal edildi"
        }
      default:
        return {
          icon: Package,
          color: "text-orange-600 bg-orange-50 border-orange-200",
          text: "Hazırlanıyor",
          description: "Siparişiniz hazırlanıyor"
        }
    }
  }

  const formatPrice = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: currencyCode.toUpperCase(),
    }).format(amount / 100)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Sipariş Takibi</h1>
        <p className="text-gray-600">
          Sipariş numaranız ve e-posta adresiniz ile siparişinizin durumunu sorgulayabilirsiniz
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8">
        <form onSubmit={handleSearch} className="space-y-6">
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
              Sipariş Numarası
            </label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Örn: 1001"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              Sipariş onay e-postanızda bulunan sipariş numarasını girin
            </p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              E-posta Adresi
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sorgulanıyor...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Sipariş Sorgula
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Order Details */}
      {order && (
        <div className="space-y-6">
          {/* Status Card */}
          <div className={`rounded-xl border-2 p-6 ${getStatusInfo(order.status).color}`}>
            <div className="flex items-center gap-4">
              {(() => {
                const StatusIcon = getStatusInfo(order.status).icon
                return <StatusIcon className="w-12 h-12" />
              })()}
              <div>
                <h2 className="text-2xl font-bold">{getStatusInfo(order.status).text}</h2>
                <p className="text-sm mt-1">{getStatusInfo(order.status).description}</p>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sipariş Bilgileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Sipariş Numarası</p>
                <p className="text-lg font-semibold text-gray-900">#{order.display_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Sipariş Tarihi</p>
                <p className="text-lg font-semibold text-gray-900">{formatDate(order.created_at)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Toplam Tutar</p>
                <p className="text-lg font-semibold text-orange-600">
                  {formatPrice(order.total, order.currency_code)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ödeme Durumu</p>
                <p className="text-lg font-semibold text-gray-900">
                  {order.payment_status === "captured" ? "Ödendi" : "Beklemede"}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shipping_address && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Teslimat Adresi</h3>
              <div className="text-gray-700">
                <p className="font-semibold">
                  {order.shipping_address.first_name} {order.shipping_address.last_name}
                </p>
                <p className="mt-2">{order.shipping_address.address_1}</p>
                {order.shipping_address.address_2 && <p>{order.shipping_address.address_2}</p>}
                <p>
                  {order.shipping_address.postal_code} {order.shipping_address.city}
                </p>
                <p>{order.shipping_address.province}</p>
                <p className="mt-2 font-semibold">{order.shipping_address.phone}</p>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Yardıma mı ihtiyacınız var?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Siparişinizle ilgili sorularınız için müşteri hizmetlerimizle iletişime geçebilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:info@kazakci.com"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                E-posta Gönder
              </a>
              <a
                href="tel:+905001234567"
                className="inline-flex items-center justify-center px-4 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Bizi Arayın
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
