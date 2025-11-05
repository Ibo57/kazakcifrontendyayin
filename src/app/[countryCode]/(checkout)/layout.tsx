import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import Footer from "@modules/layout/templates/footer"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white relative min-h-screen flex flex-col">
      <div className="h-16 bg-white border-b">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-sm text-gray-700 flex items-center gap-x-2 flex-1 basis-0 hover:text-orange-600 transition-colors"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block font-medium">
              Alışveriş Sepetine Dön
            </span>
            <span className="mt-px block small:hidden font-medium">
              Geri
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors"
            data-testid="store-link"
          >
            Kazakçı
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative flex-1" data-testid="checkout-container">{children}</div>
      <Footer />
    </div>
  )
}
