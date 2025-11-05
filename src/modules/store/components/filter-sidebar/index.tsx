"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { HttpTypes } from "@medusajs/types"

type FilterSidebarProps = {
  categories?: HttpTypes.StoreProductCategory[]
  onCategoryChange?: (categories: string[]) => void
  onPriceChange?: (min: number, max: number) => void
  onSizeChange?: (sizes: string[]) => void
}

export default function FilterSidebar({
  categories = [],
  onCategoryChange,
  onPriceChange,
  onSizeChange,
}: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    size: true,
  })

  // Use dynamic categories from Medusa instead of hardcoded
  const availableCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    handle: cat.handle,
  }))

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"]

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleCategoryToggle = (categoryId: string) => {
    const updated = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((c) => c !== categoryId)
      : [...selectedCategories, categoryId]
    setSelectedCategories(updated)
    onCategoryChange?.(updated)
  }

  const handleSizeToggle = (size: string) => {
    const updated = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size]
    setSelectedSizes(updated)
    onSizeChange?.(updated)
  }

  const handlePriceFilter = () => {
    const min = minPrice ? parseFloat(minPrice) : 0
    const max = maxPrice ? parseFloat(maxPrice) : Infinity
    onPriceChange?.(min, max)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedSizes([])
    setMinPrice("")
    setMaxPrice("")
    onCategoryChange?.([])
    onSizeChange?.([])
    onPriceChange?.(0, Infinity)
  }

  return (
    <div className="w-full small:w-64 pr-0 small:pr-8 mb-8 small:mb-0">
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Filtrele</h2>
          <button
            onClick={clearFilters}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Temizle
          </button>
        </div>

        {/* Category Filter - Dynamic from Medusa */}
        {availableCategories.length > 0 && (
          <div className="mb-6 border-b border-gray-200 pb-6">
            <button
              onClick={() => toggleSection("category")}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="font-semibold text-gray-900">Kategori</h3>
              {openSections.category ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            {openSections.category && (
              <div className="space-y-3">
                {availableCategories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Price Filter */}
        <div className="mb-6 border-b border-gray-200 pb-6">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full mb-4"
          >
            <h3 className="font-semibold text-gray-900">Fiyat Aralığı</h3>
            {openSections.price ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {openSections.price && (
            <div className="space-y-3">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handlePriceFilter}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors font-medium"
              >
                Uygula
              </button>
            </div>
          )}
        </div>

        {/* Size Filter */}
        <div>
          <button
            onClick={() => toggleSection("size")}
            className="flex items-center justify-between w-full mb-4"
          >
            <h3 className="font-semibold text-gray-900">Beden</h3>
            {openSections.size ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {openSections.size && (
            <div className="grid grid-cols-3 gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`py-2 px-3 border rounded-lg text-sm font-medium transition-colors ${
                    selectedSizes.includes(size)
                      ? "bg-orange-600 text-white border-orange-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-orange-600"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
