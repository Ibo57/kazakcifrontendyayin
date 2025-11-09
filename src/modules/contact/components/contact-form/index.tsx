"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from "lucide-react"
import { Button } from "@medusajs/ui"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Burada gerçek bir API çağrısı yapılabilir
      // Şimdilik simüle ediyoruz
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Backend'e mesaj gönderme işlemi burada yapılacak
      // Örnek: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })

      // 5 saniye sonra success mesajını kaldır
      setTimeout(() => setSuccess(false), 5000)
    } catch (err: any) {
      setError("Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Bize Ulaşın</h1>
        <p className="text-lg text-gray-600">
          Sorularınız, önerileriniz veya şikayetleriniz için bizimle iletişime geçebilirsiniz
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Email */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all duration-200 transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-orange-600 rounded-full p-3">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">E-posta</h3>
                <a
                  href="mailto:info@roygarage.com"
                  className="text-orange-600 hover:text-orange-700 hover:underline"
                >
                  info@roygarage.com
                </a>
                <p className="text-sm text-gray-600 mt-2">
                  7/24 e-posta desteği
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all duration-200 transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 rounded-full p-3">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Telefon</h3>
                <a
                  href="tel:+905322807944"
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                >
                  0532 280 79 44
                </a>
                <p className="text-sm text-gray-600 mt-2">
                  Hafta içi: 09:00 - 18:00
                </p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200 hover:border-green-400 transition-all duration-200 transform hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="bg-green-600 rounded-full p-3">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Adres</h3>
                <p className="text-gray-700">
                  Orta Mah. Eminefendi Cad.<br />
                  No: 12/B<br />
                  Bayrampaşa/İstanbul
                </p>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="bg-purple-600 rounded-full p-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Çalışma Saatleri</h3>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><span className="font-semibold">Pazartesi - Cuma:</span> 09:00 - 18:00</p>
                  <p><span className="font-semibold">Cumartesi:</span> 10:00 - 16:00</p>
                  <p><span className="font-semibold">Pazar:</span> Kapalı</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Mesaj Gönderin</h2>

            {success && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm font-semibold text-green-700">Mesajınız başarıyla gönderildi!</p>
                    <p className="text-xs text-green-600 mt-1">
                      En kısa sürede size geri dönüş yapacağız.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="+90 (5XX) XXX XX XX"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Konu <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  >
                    <option value="">Konu seçiniz</option>
                    <option value="siparis">Sipariş Bilgisi</option>
                    <option value="urun">Ürün Hakkında</option>
                    <option value="iade">İade ve Değişim</option>
                    <option value="oneri">Öneri</option>
                    <option value="sikayet">Şikayet</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mesajınız <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none"
                  placeholder="Mesajınızı buraya yazın..."
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Mesaj Gönder
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                <span className="text-red-500">*</span> ile işaretli alanlar zorunludur
              </p>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Sıkça Sorulan Sorular</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <p className="font-semibold">Sipariş ne zaman kargoya verilir?</p>
                <p className="text-gray-600 mt-1">
                  Siparişleriniz ödeme onayından sonra 1-2 iş günü içinde kargoya verilir.
                </p>
              </div>
              <div>
                <p className="font-semibold">İade süreci nasıl işliyor?</p>
                <p className="text-gray-600 mt-1">
                  14 gün içinde kullanılmamış ve etiketli ürünleri iade edebilirsiniz.
                </p>
              </div>
              <div>
                <p className="font-semibold">Kargo ücretsiz mi?</p>
                <p className="text-gray-600 mt-1">
                  1000 TL ve üzeri alışverişlerde kargo ücretsizdir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
