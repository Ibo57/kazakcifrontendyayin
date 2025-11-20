import { Heading, Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type HeroProps = {
  collection?: HttpTypes.StoreCollection
}

const Hero = ({ collection }: HeroProps) => {
  // Metadata'dan dinamik içerik al veya varsayılan değerleri kullan
  const heroTitle = (collection?.metadata?.hero_title as string) || "Kışın Sıcacık Dokunuşu"
  const heroSubtitle = (collection?.metadata?.hero_subtitle as string) || "Kaliteli Kazak ve Hırkalar ile Sıcacık Kalın. %25'e Varan İndirim Fırsatı!"
  const heroImage = (collection?.metadata?.hero_image as string) || "/kazakci-storefront.jpg"
  const primaryButtonText = (collection?.metadata?.hero_button_text as string) || "Alışverişe Başla"
  const primaryButtonLink = (collection?.metadata?.hero_button_link as string) || "/store"
  const secondaryButtonText = (collection?.metadata?.hero_secondary_button_text as string) || "Kampanyaları Gör"
  const secondaryButtonLink = collection?.handle ? `/collections/${collection.handle}` : "/collections/kampanyalar"

  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url('${heroImage}')`
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-8">
        <div className="max-w-4xl">
          <Heading
            level="h1"
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
          >
            {heroTitle}
          </Heading>
          <Heading
            level="h2"
            className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 font-normal"
          >
            {heroSubtitle}
          </Heading>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <LocalizedClientLink href={primaryButtonLink}>
              <Button
                size="large"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors w-full sm:w-auto"
              >
                {primaryButtonText}
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href={secondaryButtonLink}>
              <Button
                size="large"
                variant="secondary"
                className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-md font-medium transition-colors w-full sm:w-auto"
              >
                {secondaryButtonText}
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
