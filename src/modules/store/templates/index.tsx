import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import FilterSidebar from "@modules/store/components/filter-sidebar"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  category,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  category?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Category titles
  const categoryTitles: { [key: string]: string } = {
    "kazak-triko": "Kazak & Triko",
    "hirka": "Hırka",
    "kampanyalar": "Kampanyalar",
  }

  const pageTitle = category ? categoryTitles[category] || "Tüm Ürünler" : "Tüm Ürünler"

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <FilterSidebar />
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900" data-testid="store-page-title">
            {pageTitle}
          </h1>
          <p className="text-gray-600 mt-2">
            Kaliteli ve şık ürünleri keşfedin
          </p>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            category={category}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
