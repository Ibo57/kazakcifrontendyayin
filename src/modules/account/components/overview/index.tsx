import { Container } from "@medusajs/ui"

import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper" className="w-full">
      <div className="hidden small:block">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 mb-8 border-2 border-orange-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="welcome-message" data-value={customer?.first_name}>
                Merhaba {customer?.first_name}! 👋
              </h1>
              <p className="text-gray-600">
                Hesap bilgilerinize ve siparişlerinize buradan ulaşabilirsiniz
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Giriş yapılan hesap:</p>
              <p
                className="font-semibold text-orange-600"
                data-testid="customer-email"
                data-value={customer?.email}
              >
                {customer?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Profile Completion Card */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-orange-400 transition-all duration-200 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profil Tamamlanma</h3>
                <div className="flex items-end gap-x-3">
                  <span
                    className="text-5xl font-bold text-orange-600"
                    data-testid="customer-profile-completion"
                    data-value={getProfileCompletion(customer)}
                  >
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="text-sm text-gray-600 mb-2 uppercase font-medium">
                    Tamamlandı
                  </span>
                </div>
                {getProfileCompletion(customer) < 100 && (
                  <p className="text-sm text-gray-500 mt-3">
                    Profilinizi tamamlayarak daha iyi hizmet alabilirsiniz
                  </p>
                )}
              </div>
              <div className="bg-orange-100 rounded-full p-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-orange-600 h-full transition-all duration-500"
                style={{ width: `${getProfileCompletion(customer)}%` }}
              />
            </div>
          </div>

          {/* Addresses Card */}
          <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-400 transition-all duration-200 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kayıtlı Adresler</h3>
                <div className="flex items-end gap-x-3">
                  <span
                    className="text-5xl font-bold text-blue-600"
                    data-testid="addresses-count"
                    data-value={customer?.addresses?.length || 0}
                  >
                    {customer?.addresses?.length || 0}
                  </span>
                  <span className="text-sm text-gray-600 mb-2 uppercase font-medium">
                    Adres
                  </span>
                </div>
                {(!customer?.addresses || customer.addresses.length === 0) && (
                  <p className="text-sm text-gray-500 mt-3">
                    Hızlı teslimat için adresinizi ekleyin
                  </p>
                )}
              </div>
              <div className="bg-blue-100 rounded-full p-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Son Siparişler</h3>
              <p className="text-sm text-gray-600 mt-1">En son verdiğiniz siparişleri buradan görebilirsiniz</p>
            </div>
            {orders && orders.length > 0 && (
              <LocalizedClientLink
                href="/account/orders"
                className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
              >
                Tümünü Gör
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </LocalizedClientLink>
            )}
          </div>

          <ul
            className="flex flex-col gap-y-4"
            data-testid="orders-wrapper"
          >
            {orders && orders.length > 0 ? (
              orders.slice(0, 5).map((order) => {
                return (
                  <li
                    key={order.id}
                    data-testid="order-wrapper"
                    data-value={order.id}
                  >
                    <LocalizedClientLink
                      href={`/account/orders/details/${order.id}`}
                    >
                      <Container className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-orange-50 hover:to-orange-100 border-2 border-gray-200 hover:border-orange-400 transition-all duration-200 flex justify-between items-center p-5 rounded-lg hover:shadow-md">
                        <div className="grid grid-cols-3 grid-rows-2 text-sm gap-x-6 gap-y-2 flex-1">
                          <span className="font-bold text-gray-700">Sipariş Tarihi</span>
                          <span className="font-bold text-gray-700">Sipariş No</span>
                          <span className="font-bold text-gray-700">Toplam Tutar</span>

                          <span className="text-gray-600" data-testid="order-created-date">
                            {new Date(order.created_at).toLocaleDateString("tr-TR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })}
                          </span>
                          <span
                            className="text-orange-600 font-semibold"
                            data-testid="order-id"
                            data-value={order.display_id}
                          >
                            #{order.display_id}
                          </span>
                          <span className="text-gray-900 font-bold" data-testid="order-amount">
                            {convertToLocale({
                              amount: order.total,
                              currency_code: order.currency_code,
                            })}
                          </span>
                        </div>
                        <button
                          className="flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white rounded-full p-2 transition-colors"
                          data-testid="open-order-button"
                        >
                          <span className="sr-only">
                            Sipariş #{order.display_id} detaylarına git
                          </span>
                          <ChevronDown className="-rotate-90 w-5 h-5" />
                        </button>
                      </Container>
                    </LocalizedClientLink>
                  </li>
                )
              })
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium mb-2" data-testid="no-orders-message">
                  Henüz sipariş vermediniz
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Alışverişe başlamak için ürünlerimize göz atın
                </p>
                <LocalizedClientLink
                  href="/store"
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Alışverişe Başla
                </LocalizedClientLink>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
