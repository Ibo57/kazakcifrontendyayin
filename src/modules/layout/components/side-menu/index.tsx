"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"
import { Menu, Home, ShoppingBag, User, ShoppingCart, Info } from "lucide-react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenu = ({
  regions,
  categories
}: {
  regions: HttpTypes.StoreRegion[] | null
  categories?: HttpTypes.StoreProductCategory[]
}) => {
  const toggleState = useToggleState()

  // Build menu items dynamically from Medusa categories
  const SideMenuItems: Record<string, { href: string; icon: any }> = {
    "Ana Sayfa": { href: "/", icon: Home },
  }

  // Add dynamic categories from Medusa
  if (categories && categories.length > 0) {
    categories.forEach((category) => {
      SideMenuItems[category.name] = {
        href: `/categories/${category.handle}`,
        icon: ShoppingBag,
      }
    })
  }

  // Add static menu items
  SideMenuItems["Hakkımızda"] = { href: "/hakkimizda", icon: Info }
  SideMenuItems["Tüm Ürünler"] = { href: "/store", icon: ShoppingBag }
  SideMenuItems["Hesabım"] = { href: "/account", icon: User }
  SideMenuItems["Sepetim"] = { href: "/cart", icon: ShoppingCart }

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center gap-2 transition-all ease-out duration-200 focus:outline-none hover:text-orange-600 text-gray-700 font-medium"
                >
                  <Menu className="w-6 h-6" />
                  <span className="text-sm">Menü</span>
                </Popover.Button>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-x-full"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 -translate-x-full"
              >
                <PopoverPanel className="fixed inset-0 z-50 flex">
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={close}
                  />

                  {/* Sidebar */}
                  <div
                    data-testid="nav-menu-popup"
                    className="relative w-80 max-w-[85vw] h-full bg-white shadow-2xl overflow-y-auto"
                  >
                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-orange-500 text-white p-6 shadow-lg z-10">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-bold">Kazakçı</h2>
                          <p className="text-orange-100 text-sm mt-1">Kaliteli Giyim</p>
                        </div>
                        <button
                          data-testid="close-menu-button"
                          onClick={close}
                          className="p-2 hover:bg-orange-700 rounded-full transition-colors"
                        >
                          <XMark className="w-6 h-6" />
                        </button>
                      </div>
                    </div>

                    {/* Menu Items - Dynamic from Medusa */}
                    <nav className="p-4">
                      <ul className="flex flex-col gap-2">
                        {Object.entries(SideMenuItems).map(([name, { href, icon: Icon }]) => {
                          const isCategory = href.includes('/categories/')
                          const isAction = href === '/account' || href === '/cart'

                          return (
                            <li key={name}>
                              <LocalizedClientLink
                                href={href}
                                onClick={close}
                                data-testid={`${name.toLowerCase()}-link`}
                                className={clx(
                                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                                  "hover:bg-orange-50 hover:text-orange-600 hover:translate-x-1",
                                  "text-gray-700 font-medium",
                                  isAction && "border-t border-gray-200 mt-2 pt-4"
                                )}
                              >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                <span>{name}</span>
                              </LocalizedClientLink>
                            </li>
                          )
                        })}
                      </ul>
                    </nav>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-gray-50 p-4 border-t border-gray-200 mt-auto">
                      <Text className="text-xs text-gray-500 text-center">
                        © {new Date().getFullYear()} Kazakçı.com
                        <br />
                        Tüm hakları saklıdır.
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
