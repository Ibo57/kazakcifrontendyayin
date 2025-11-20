"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="hover:text-orange-600 flex items-center gap-2 relative transition-colors"
            href="/cart"
            data-testid="nav-cart-link"
          >
            <div className="relative">
              <span className="text-3xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-br from-orange-500 to-orange-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 shadow-lg border-2 border-white animate-in zoom-in duration-200">
                  {totalItems}
                </span>
              )}
            </div>
          </LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white rounded-lg shadow-xl border border-gray-200 w-[420px] text-ui-fg-base"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">Sepetim</h3>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[450px] px-6 py-4 grid grid-cols-1 gap-y-6 no-scrollbar">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[100px_1fr] gap-x-4 pb-6 border-b border-gray-100 last:border-0"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-full"
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                            className="rounded-lg border border-gray-200"
                          />
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between">
                          <div className="flex flex-col">
                            <LocalizedClientLink
                              href={`/products/${item.product_handle}`}
                              data-testid="product-link"
                            >
                              <h3 className="text-base font-semibold text-gray-900 hover:text-orange-600 transition-colors line-clamp-2">
                                {item.title}
                              </h3>
                            </LocalizedClientLink>
                            <LineItemOptions
                              variant={item.variant}
                              data-testid="cart-item-variant"
                              data-value={item.variant}
                              className="text-sm text-gray-600 mt-1"
                            />
                            <div className="flex items-center justify-between mt-2">
                              <span
                                className="text-sm text-gray-600"
                                data-testid="cart-item-quantity"
                                data-value={item.quantity}
                              >
                                Adet: {item.quantity}
                              </span>
                              <div className="text-base font-bold text-gray-900">
                                <LineItemPrice
                                  item={item}
                                  style="tight"
                                  currencyCode={cartState.currency_code}
                                />
                              </div>
                            </div>
                          </div>
                          <DeleteButton
                            id={item.id}
                            className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
                            data-testid="cart-item-remove-button"
                          >
                            Kaldır
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-semibold text-gray-900">
                      Ara Toplam
                    </span>
                    <span
                      className="text-xl font-bold text-gray-900"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>

                  {/* Ücretsiz Kargo Göstergesi */}
                  {subtotal < 100000 ? (
                    <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🚚</span>
                        <span className="text-sm font-semibold text-orange-800">
                          {convertToLocale({
                            amount: 100000 - subtotal,
                            currency_code: cartState.currency_code,
                          })}{" "}
                          daha ekle, ücretsiz kargo kazan!
                        </span>
                      </div>
                      <div className="w-full bg-orange-200 rounded-full h-2">
                        <div
                          className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((subtotal / 100000) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">✅</span>
                        <span className="text-sm font-semibold text-green-800">
                          Ücretsiz kargo kazandınız!
                        </span>
                      </div>
                    </div>
                  )}

                  <p className="text-sm text-gray-600 mb-4">Kargo ve vergiler ödeme sırasında hesaplanacaktır</p>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-base"
                      size="large"
                      data-testid="go-to-cart-button"
                    >
                      Sepete Git
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 px-6 flex-col gap-y-4 items-center justify-center">
                  <div className="bg-orange-100 text-orange-600 flex items-center justify-center w-16 h-16 rounded-full">
                    <span className="text-3xl">🛒</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">Sepetiniz Boş</span>
                  <span className="text-sm text-gray-600 text-center">Alışverişe başlamak için ürünlerimize göz atın</span>
                  <div className="mt-2">
                    <LocalizedClientLink href="/store">
                      <>
                        <span className="sr-only">Tüm ürünler sayfasına git</span>
                        <Button onClick={close} className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6">
                          Ürünleri Keşfet
                        </Button>
                      </>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
