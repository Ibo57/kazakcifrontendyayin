import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Adreslerim | Kazakçı.com",
  description: "Kayıtlı adreslerinizi görüntüleyin ve yönetin",
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Teslimat Adreslerim</h1>
        <p className="text-base text-gray-600">
          Teslimat adreslerinizi görüntüleyin ve güncelleyin. İstediğiniz kadar adres
          ekleyebilirsiniz. Kaydettiğiniz adresler ödeme sırasında kullanılabilir olacaktır.
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
