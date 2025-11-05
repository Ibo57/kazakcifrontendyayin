import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import CookieConsent from "@modules/common/components/cookie-consent"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Kazakçı.com - Kaliteli Kazak ve Hırkalar",
    template: "%s | Kazakçı.com"
  },
  description: "Kaliteli kazak, hırka ve triko ürünlerinde en iyi seçenekler. %50'ye varan indirimlerle kışın sıcacık kalın!",
  keywords: ["kazak", "hırka", "triko", "kış giyim", "kazak satın al", "hırka modelleri", "online alışveriş"],
  authors: [{ name: "Kazakçı.com" }],
  creator: "Kazakçı.com",
  publisher: "Kazakçı.com",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: getBaseURL(),
    siteName: "Kazakçı.com",
    title: "Kazakçı.com - Kaliteli Kazak ve Hırkalar",
    description: "Kaliteli kazak, hırka ve triko ürünlerinde en iyi seçenekler",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kazakçı.com - Kaliteli Kazak ve Hırkalar",
    description: "Kaliteli kazak, hırka ve triko ürünlerinde en iyi seçenekler",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="tr" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
        <CookieConsent />
      </body>
    </html>
  )
}
