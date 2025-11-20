"use client"

import { useState } from "react"
import { Input, Label } from "@medusajs/ui"

type IyzicoCardFormProps = {
  onCardDataChange: (cardData: any) => void
  onValidChange: (isValid: boolean) => void
}

export default function IyzicoCardForm({ onCardDataChange, onValidChange }: IyzicoCardFormProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [cardHolder, setCardHolder] = useState("")
  const [expireMonth, setExpireMonth] = useState("")
  const [expireYear, setExpireYear] = useState("")
  const [cvc, setCvc] = useState("")
  const [agreementAccepted, setAgreementAccepted] = useState(false)

  const validateCard = (data: any) => {
    const cardValid = data.cardNumber.replace(/\s/g, "").length === 16
    const holderValid = data.cardHolder.trim().length > 0
    const monthValid = data.expireMonth.length === 2 && parseInt(data.expireMonth) >= 1 && parseInt(data.expireMonth) <= 12
    const yearValid = data.expireYear.length === 2
    const cvcValid = data.cvc.length === 3
    const agreementValid = data.agreementAccepted === true

    return cardValid && holderValid && monthValid && yearValid && cvcValid && agreementValid
  }

  const handleChange = (field: string, value: string) => {
    let formattedValue = value

    // Format card number with spaces
    if (field === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()
      if (formattedValue.replace(/\s/g, "").length > 16) return
    }

    // Only allow 2 digits for month
    if (field === "expireMonth" && value.length > 2) return

    // Only allow 2 digits for year
    if (field === "expireYear" && value.length > 2) return

    // Only allow 3 digits for CVC
    if (field === "cvc" && value.length > 3) return

    const newData = {
      cardNumber,
      cardHolder,
      expireMonth,
      expireYear,
      cvc,
      agreementAccepted,
      [field]: formattedValue
    }

    // Update state
    if (field === "cardNumber") setCardNumber(formattedValue)
    if (field === "cardHolder") setCardHolder(formattedValue)
    if (field === "expireMonth") setExpireMonth(formattedValue)
    if (field === "expireYear") setExpireYear(formattedValue)
    if (field === "cvc") setCvc(formattedValue)

    // Validate and notify parent
    const isValid = validateCard(newData)
    onValidChange(isValid)

    if (isValid) {
      onCardDataChange({
        cardNumber: newData.cardNumber.replace(/\s/g, ""),
        cardHolderName: newData.cardHolder,
        expireMonth: newData.expireMonth,
        expireYear: newData.expireYear,
        cvc: newData.cvc
      })
    }
  }

  const handleAgreementChange = (checked: boolean) => {
    setAgreementAccepted(checked)

    const newData = {
      cardNumber,
      cardHolder,
      expireMonth,
      expireYear,
      cvc,
      agreementAccepted: checked
    }

    const isValid = validateCard(newData)
    onValidChange(isValid)

    if (isValid) {
      onCardDataChange({
        cardNumber: newData.cardNumber.replace(/\s/g, ""),
        cardHolderName: newData.cardHolder,
        expireMonth: newData.expireMonth,
        expireYear: newData.expireYear,
        cvc: newData.cvc
      })
    }
  }

  return (
    <div className="my-4 space-y-4">
      <p className="text-sm font-medium text-gray-900 mb-3">
        Kart Bilgilerinizi Girin:
      </p>

      <div className="space-y-4">
        {/* Card Number */}
        <div>
          <Label htmlFor="card-number" className="text-sm font-medium text-gray-700">
            Kart Numarası
          </Label>
          <Input
            id="card-number"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => handleChange("cardNumber", e.target.value.replace(/[^\d\s]/g, ""))}
            className="mt-1"
          />
        </div>

        {/* Card Holder */}
        <div>
          <Label htmlFor="card-holder" className="text-sm font-medium text-gray-700">
            Kart Üzerindeki İsim
          </Label>
          <Input
            id="card-holder"
            type="text"
            placeholder="Kart Üzerindeki İsim Soyisim"
            value={cardHolder}
            onChange={(e) => {
              // Sadece harflere ve boşluklara izin ver - uppercase yapma
              const value = e.target.value.replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, "")
              handleChange("cardHolder", value)
            }}
            className="mt-1"
          />
        </div>

        {/* Expiry and CVC */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label htmlFor="expire-month" className="text-sm font-medium text-gray-700">
              Ay
            </Label>
            <Input
              id="expire-month"
              type="text"
              placeholder="MM"
              maxLength={2}
              value={expireMonth}
              onChange={(e) => handleChange("expireMonth", e.target.value.replace(/\D/g, ""))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="expire-year" className="text-sm font-medium text-gray-700">
              Yıl
            </Label>
            <Input
              id="expire-year"
              type="text"
              placeholder="YY"
              maxLength={2}
              value={expireYear}
              onChange={(e) => handleChange("expireYear", e.target.value.replace(/\D/g, ""))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="cvc" className="text-sm font-medium text-gray-700">
              CVC
            </Label>
            <Input
              id="cvc"
              type="text"
              placeholder="123"
              maxLength={3}
              value={cvc}
              onChange={(e) => handleChange("cvc", e.target.value.replace(/\D/g, ""))}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="text-xs text-blue-800">
          Ödemeniz güvenli bir şekilde iyzico tarafından işlenir. Kart bilgileriniz saklanmaz.
        </p>
      </div>

      {/* Sözleşme Onayı */}
      <div className="mt-4 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={agreementAccepted}
            onChange={(e) => handleAgreementChange(e.target.checked)}
            className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 focus:ring-2 cursor-pointer"
          />
          <span className="text-sm text-gray-700 select-none">
            <a
              href="/tr/mesafeli-satis-sozlesmesi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 underline font-medium"
            >
              Mesafeli Satış Sözleşmesi
            </a>
            ,{" "}
            <a
              href="/tr/onbilgilendirme-formu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 underline font-medium"
            >
              Ön Bilgilendirme Formu
            </a>
            {" "}ve{" "}
            <a
              href="/tr/gizlilik-politikasi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 underline font-medium"
            >
              Gizlilik Politikası
            </a>
            'nı okudum, onaylıyorum.
          </span>
        </label>
      </div>
    </div>
  )
}
