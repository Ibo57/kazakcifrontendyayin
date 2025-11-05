import { isEmpty } from "./isEmpty"

type ConvertToLocaleParams = {
  amount: number
  currency_code: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale,
}: ConvertToLocaleParams) => {
  if (!currency_code || isEmpty(currency_code)) {
    return amount.toString()
  }

  // Türk Lirası için otomatik locale seçimi
  const finalLocale = locale || (currency_code.toLowerCase() === 'try' ? 'tr-TR' : 'en-US')
  
  // Medusa fiyatları kuruş/cent cinsinden tutuyor, liraya çevir
  // NOT: get-product-price.ts'de zaten 100 ile çarpıldı, burada sadece 100'e böl
  const amountInMainUnit = amount / 100

  // Akıllı ondalık gösterimi: Tam sayıysa kuruş gösterme, değilse göster
  const isWholeNumber = amountInMainUnit % 1 === 0
  const finalMinDigits = minimumFractionDigits !== undefined 
    ? minimumFractionDigits 
    : (isWholeNumber ? 0 : 2)
  const finalMaxDigits = maximumFractionDigits !== undefined
    ? maximumFractionDigits
    : 2

  return new Intl.NumberFormat(finalLocale, {
    style: "currency",
    currency: currency_code,
    minimumFractionDigits: finalMinDigits,
    maximumFractionDigits: finalMaxDigits,
  }).format(amountInMainUnit)
}
