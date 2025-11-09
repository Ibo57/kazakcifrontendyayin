import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import { Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import NodusSignature from "@modules/layout/components/nodus-signature"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="bg-gray-50 border-t border-gray-200 w-full">
      <div className="content-container flex flex-col w-full">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 py-12 md:py-16">
          {/* Company Info */}
          <div className="col-span-1">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors"
            >
              Kazakçı
            </LocalizedClientLink>
            <p className="mt-4 text-sm text-gray-600">
              Kaliteli kazak ve hırkalar ile sıcacık kalın. En yeni modeller ve kampanyalar için bizi takip edin.
            </p>
            {/* Social Media */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            
            {/* Payment Methods */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-gray-700 mb-3">Güvenli Ödeme</h4>
              <div className="flex items-center gap-3 flex-wrap">
                <Image 
                  src="/visa-logo.svg" 
                  alt="Visa" 
                  width={50} 
                  height={30}
                  className="h-7 w-auto"
                />
                <Image 
                  src="/mastercard-logo.svg" 
                  alt="MasterCard" 
                  width={50} 
                  height={30}
                  className="h-7 w-auto"
                />
                <Image 
                  src="/iyzico-logo.png" 
                  alt="iyzico ile Öde" 
                  width={100} 
                  height={30}
                  className="h-7 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Hızlı Linkler</h3>
            <ul className="space-y-3">
              <li>
                <LocalizedClientLink
                  href="/store"
                  className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Tüm Ürünler
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/collections/kampanyalar"
                  className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Kampanyalar
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/account"
                  className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Hesabım
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Müşteri Hizmetleri</h3>
            <ul className="space-y-3">
              <li>
                <LocalizedClientLink
                  href="/siparis-takibi"
                  className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Sipariş Takibi
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/legal/iade-degisim"
                  className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  İade ve Değişim
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/legal/gizlilik-politikasi"
                  className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Gizlilik Politikası
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/iletisim"
                  className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  İletişim
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Yasal</h3>
            <ul className="space-y-3">
              <li>
                <LocalizedClientLink
                  href="/legal/kvkk"
                  className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  KVKK Aydınlatma Metni
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/legal/mesafeli-satis-sozlesmesi"
                  className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Mesafeli Satış Sözleşmesi
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/legal/kullanim-kosullari"
                  className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Kullanım Koşulları
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink
                  href="/legal/cerez-politikasi"
                  className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  Çerez Politikası
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Categories - Dynamic from Medusa */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Kategoriler</h3>
            <ul className="space-y-3">
              {productCategories && productCategories.length > 0 ? (
                productCategories.slice(0, 6).map((category) => (
                  <li key={category.id}>
                    <LocalizedClientLink
                      href={`/categories/${category.handle}`}
                      className="text-sm text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      {category.name}
                    </LocalizedClientLink>
                  </li>
                ))
              ) : (
                <li>
                  <span className="text-sm text-gray-500">Kategori bulunamadı</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* NodusCode Signature */}
        <div className="border-t border-gray-200">
          <NodusSignature />
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 py-6">
          <Text className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} Kazakçı. Tüm hakları saklıdır.
          </Text>
        </div>
      </div>
    </footer>
  )
}
