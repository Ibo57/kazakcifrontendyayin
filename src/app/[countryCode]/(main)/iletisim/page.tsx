import { Metadata } from "next"
import ContactForm from "@modules/contact/components/contact-form"

export const metadata: Metadata = {
  title: "İletişim | Kazakçı.com",
  description: "Bizimle iletişime geçin. Sorularınız, önerileriniz ve şikayetleriniz için bize ulaşın.",
}

export default function IletisimPage() {
  return (
    <div className="content-container py-6">
      <ContactForm />
    </div>
  )
}
