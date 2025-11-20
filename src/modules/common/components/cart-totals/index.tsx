"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  // Ücretsiz kargo limiti: 1000 TL = 100000 (kuruş cinsinden)
  const FREE_SHIPPING_THRESHOLD = 100000
  const isFreeShipping = (item_subtotal ?? 0) >= FREE_SHIPPING_THRESHOLD
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - (item_subtotal ?? 0)

  return (
    <div>
      <div className="flex flex-col gap-y-2 txt-medium text-ui-fg-subtle ">
        <div className="flex items-center justify-between">
          <span>Ara Toplam</span>
          <span data-testid="cart-subtotal" data-value={item_subtotal || 0}>
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>

        {/* Ücretsiz Kargo Göstergesi */}
        {!isFreeShipping && remainingForFreeShipping > 0 && (
          <div className="col-span-2 my-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🚚</span>
              <span className="text-sm font-semibold text-orange-800">
                {convertToLocale({
                  amount: remainingForFreeShipping,
                  currency_code,
                })}{" "}
                daha ekle, ücretsiz kargo kazan!
              </span>
            </div>
            <div className="w-full bg-orange-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(((item_subtotal ?? 0) / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span>Kargo</span>
          <span data-testid="cart-shipping" data-value={isFreeShipping ? 0 : shipping_subtotal || 0}>
            {isFreeShipping ? (
              <span className="text-green-600 font-semibold">Ücretsiz</span>
            ) : (
              convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })
            )}
          </span>
        </div>
        {!!discount_subtotal && (
          <div className="flex items-center justify-between">
            <span>İndirim</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-discount"
              data-value={discount_subtotal || 0}
            >
              -{" "}
              {convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="flex gap-x-1 items-center ">Vergiler</span>
          <span data-testid="cart-taxes" data-value={tax_total || 0}>
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
      </div>
      <div className="h-px w-full border-b border-gray-200 my-4" />
      <div className="flex items-center justify-between text-ui-fg-base mb-2 txt-medium ">
        <span>Toplam</span>
        <span
          className="txt-xlarge-plus"
          data-testid="cart-total"
          data-value={isFreeShipping ? (total ?? 0) - (shipping_subtotal ?? 0) : total || 0}
        >
          {convertToLocale({
            amount: isFreeShipping ? (total ?? 0) - (shipping_subtotal ?? 0) : total ?? 0,
            currency_code
          })}
        </span>
      </div>
      {isFreeShipping && (
        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-xl">✅</span>
            <span className="text-sm font-semibold text-green-800">
              Ücretsiz kargo kazandınız!
            </span>
          </div>
        </div>
      )}
      <div className="h-px w-full border-b border-gray-200 mt-4" />
    </div>
  )
}

export default CartTotals
