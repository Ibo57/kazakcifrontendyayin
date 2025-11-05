import { Heading, Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url('/kazakci-storefront.jpg')"
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-8">
        <div className="max-w-4xl">
          <Heading
            level="h1"
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6"
          >
            Kışın Sıcacık Dokunuşu
          </Heading>
          <Heading
            level="h2"
            className="text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 font-normal"
          >
            Kaliteli Kazak ve Hırkalar ile Sıcacık Kalın. %25'e Varan İndirim Fırsatı!
          </Heading>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <LocalizedClientLink href="/store">
              <Button
                size="large"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors w-full sm:w-auto"
              >
                Alışverişe Başla
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/collections/kampanyalar">
              <Button
                size="large"
                variant="secondary"
                className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-md font-medium transition-colors w-full sm:w-auto"
              >
                Kampanyaları Gör
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
