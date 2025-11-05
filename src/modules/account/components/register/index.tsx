"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div
      className="max-w-md w-full flex flex-col items-center bg-white rounded-lg border border-gray-200 p-8 shadow-sm"
      data-testid="register-page"
    >
      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-3xl">✨</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Kazakçı Üyesi Olun
      </h1>
      <p className="text-center text-base text-gray-600 mb-8">
        Üyelik profilinizi oluşturun ve gelişmiş alışveriş deneyiminin tadını çıkarın.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="Ad"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
            className="h-12"
          />
          <Input
            label="Soyad"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
            className="h-12"
          />
          <Input
            label="E-posta"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
            className="h-12"
          />
          <Input
            label="Telefon"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
            className="h-12"
          />
          <Input
            label="Şifre"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
            className="h-12"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />

        <div className="mt-6 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="kvkk_consent"
              required
              className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">
              <LocalizedClientLink
                href="/legal/kvkk"
                className="text-orange-600 hover:text-orange-700 underline font-medium"
                target="_blank"
              >
                KVKK Aydınlatma Metni
              </LocalizedClientLink>
              &apos;ni okudum, anladım ve kişisel verilerimin işlenmesini kabul ediyorum. <span className="text-red-600">*</span>
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="terms_consent"
              required
              className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">
              <LocalizedClientLink
                href="/legal/kullanim-kosullari"
                className="text-orange-600 hover:text-orange-700 underline font-medium"
                target="_blank"
              >
                Kullanım Koşulları
              </LocalizedClientLink>
              {" "}ve{" "}
              <LocalizedClientLink
                href="/legal/gizlilik-politikasi"
                className="text-orange-600 hover:text-orange-700 underline font-medium"
                target="_blank"
              >
                Gizlilik Politikası
              </LocalizedClientLink>
              &apos;nı okudum ve kabul ediyorum. <span className="text-red-600">*</span>
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="marketing_consent"
              className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">
              Kampanya, promosyon ve yeni ürünler hakkında e-posta almak istiyorum. (İsteğe bağlı)
            </span>
          </label>
        </div>
        <SubmitButton
          className="w-full mt-6 h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-base"
          data-testid="register-button"
        >
          Üye Ol
        </SubmitButton>
      </form>
      <span className="text-center text-gray-700 text-base mt-6">
        Zaten üye misiniz?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="text-orange-600 hover:text-orange-700 font-semibold underline"
        >
          Giriş Yapın
        </button>
      </span>
    </div>
  )
}

export default Register
