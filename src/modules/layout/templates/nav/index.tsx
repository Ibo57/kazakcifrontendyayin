import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { User, ShoppingCart } from "lucide-react"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)
  // Fetch categories from Medusa backend
  const categories = await listCategories({ limit: 10 }).catch(() => [])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base shadow-sm">
        <nav className="content-container flex items-center justify-between w-full h-full px-4">
          {/* Mobile Menu */}
          <div className="flex items-center lg:hidden">
            <SideMenu regions={regions} categories={categories} />
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-xl md:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              data-testid="nav-store-link"
            >
              Kazakçı
            </LocalizedClientLink>
          </div>

          {/* Desktop Navigation Links - Dynamic Categories from Medusa */}
          <div className="hidden lg:flex items-center gap-6">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <LocalizedClientLink
                  key={category.id}
                  href={`/categories/${category.handle}`}
                  className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
                >
                  {category.name}
                </LocalizedClientLink>
              ))
            ) : null}
            <LocalizedClientLink
              href="/hakkimizda"
              className="text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors"
            >
              Hakkımızda
            </LocalizedClientLink>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <LocalizedClientLink
              className="hover:text-blue-600 transition-colors"
              href="/account"
              data-testid="nav-account-link"
            >
              <User className="w-5 h-5" />
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-blue-600 transition-colors"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingCart className="w-5 h-5" />
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
