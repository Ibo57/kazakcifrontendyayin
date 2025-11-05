import { Metadata } from "next"
import { notFound } from "next/navigation"
import OrderTracking from "@modules/order/components/order-tracking"

export const metadata: Metadata = {
  title: "Sipariş Takibi | Kazakçı.com",
  description: "Siparişinizin durumunu takip edin. Sipariş numaranız ve e-posta adresiniz ile kolayca sorgulayın.",
}

export default function SiparisTakibiPage() {
  return (
    <div className="content-container py-6">
      <OrderTracking />
    </div>
  )
}
