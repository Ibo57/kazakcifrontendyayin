"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all")
    setIsVisible(false)
  }

  const acceptNecessary = () => {
    localStorage.setItem("cookie-consent", "necessary")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-orange-600 shadow-2xl">
      <div className="content-container py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              🍪 Çerez Kullanımı
            </h3>
            <p className="text-sm text-gray-700 mb-3">
              Web sitemiz, deneyiminizi geliştirmek için çerezler kullanır. Zorunlu çerezler sitenin
              çalışması için gereklidir. Diğer çerezler için onayınızı istiyoruz.
            </p>
            <LocalizedClientLink
              href="/legal/cerez-politikasi"
              className="text-sm text-orange-600 hover:text-orange-700 font-semibold underline"
            >
              Çerez Politikamızı İnceleyin →
            </LocalizedClientLink>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={acceptNecessary}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              Sadece Gerekli
            </button>
            <button
              onClick={acceptAll}
              className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
            >
              Tümünü Kabul Et
            </button>
          </div>

          <button
            onClick={acceptNecessary}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
