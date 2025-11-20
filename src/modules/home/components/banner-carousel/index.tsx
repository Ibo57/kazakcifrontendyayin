"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

type BannerCarouselProps = {
  collections?: HttpTypes.StoreCollection[]
}

export default function BannerCarousel({ collections }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Create banners from collections or use default
  const banners = collections && collections.length > 0
    ? collections.slice(0, 3).map((collection, idx) => ({
        id: idx + 1,
        image: collection.metadata?.banner_image as string ||
               `https://images.unsplash.com/photo-${['1490481651871-ab68de25d43d', '1445205170230-053b83016050', '1434389677669-e08b4cac3105'][idx]}?w=1200&h=400&fit=crop`,
        title: collection.metadata?.banner_title as string || collection.title || "Koleksiyon",
        subtitle: collection.metadata?.banner_subtitle as string || `${collection.products?.length || 0} Ürün`,
        link: `/collections/${collection.handle}`,
      }))
    : [
        {
          id: 1,
          image: "https://admin.kazakci.com/static/banner-1.png",
          title: "Kış Koleksiyonu",
          subtitle: "Yeni Sezon Kazaklar",
          link: "/store",
        },
        {
          id: 2,
          image: "https://admin.kazakci.com/static/banner-2.png",
          title: "%50'ye Varan İndirim",
          subtitle: "Hırkalar ve Montlar",
          link: "/store",
        },
        {
          id: 3,
          image: "https://admin.kazakci.com/static/banner-3.png",
          title: "Özel Tasarımlar",
          subtitle: "El Yapımı Triko Ürünler",
          link: "/store",
        },
      ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 5000) // Her 5 saniyede bir otomatik değişir

    return () => clearInterval(timer)
  }, [banners.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="content-container py-8">
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl shadow-lg group">
        {/* Banner Images */}
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full h-full relative">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority={banner.id === 1}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="text-white px-8 md:px-16 max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-bold mb-2">
                    {banner.title}
                  </h2>
                  <p className="text-lg md:text-2xl mb-6">{banner.subtitle}</p>
                  <a
                    href={banner.link}
                    className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Keşfet
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Önceki"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Sonraki"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-orange-600 w-8"
                  : "bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Slayt ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
