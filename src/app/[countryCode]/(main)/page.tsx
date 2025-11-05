import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import BestSellers from "@modules/home/components/best-sellers"
import BannerCarousel from "@modules/home/components/banner-carousel"
import DiscountedProducts from "@modules/home/components/discounted-products"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Kazakçı - Kaliteli Kazak ve Hırkalar",
  description:
    "Kışın sıcacık dokunuşu! Kaliteli kazak ve hırkalar ile sıcacık kalın. %25'e varan indirim fırsatları ile en yeni modelleri keşfedin.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <BestSellers region={region} />
      <BannerCarousel />
      <DiscountedProducts region={region} />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
