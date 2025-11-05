import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div>
      <Table>
        <Table.Header className="border-b border-gray-200">
          <Table.Row className="text-gray-700 text-sm font-medium">
            <Table.HeaderCell className="!pl-0 pb-4">Ürün</Table.HeaderCell>
            <Table.HeaderCell className="pb-4"></Table.HeaderCell>
            <Table.HeaderCell className="pb-4">Adet</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell pb-4">
              Fiyat
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right pb-4">
              Toplam
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={cart?.currency_code}
                    />
                  )
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate
