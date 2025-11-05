import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="max-w-md w-full flex flex-col items-center bg-white rounded-lg border border-gray-200 p-8 shadow-sm"
      data-testid="login-page"
    >
      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-3xl">👋</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Tekrar Hoş Geldiniz</h1>
      <p className="text-center text-base text-gray-600 mb-8">
        Gelişmiş alışveriş deneyimi için giriş yapın.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="E-posta"
            name="email"
            type="email"
            title="Geçerli bir e-posta adresi girin."
            autoComplete="email"
            required
            data-testid="email-input"
            className="h-12"
          />
          <Input
            label="Şifre"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
            className="h-12"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton
          data-testid="sign-in-button"
          className="w-full mt-6 h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-base"
        >
          Giriş Yap
        </SubmitButton>
      </form>
      <span className="text-center text-gray-700 text-base mt-6">
        Hesabınız yok mu?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="text-orange-600 hover:text-orange-700 font-semibold underline"
          data-testid="register-button"
        >
          Kayıt Olun
        </button>
      </span>
    </div>
  )
}

export default Login
