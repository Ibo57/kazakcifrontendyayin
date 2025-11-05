import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6 flex items-center justify-between border border-orange-200">
      <div>
        <Heading level="h2" className="text-xl font-bold text-gray-900">
          Zaten hesabınız var mı?
        </Heading>
        <Text className="text-sm text-gray-700 mt-2">
          Daha iyi bir alışveriş deneyimi için giriş yapın.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button
            variant="secondary"
            className="h-11 px-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold border-0"
            data-testid="sign-in-button"
          >
            Giriş Yap
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
