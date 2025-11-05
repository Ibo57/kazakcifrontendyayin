"use client"

import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <Table.Row className="w-full border-b border-gray-200" data-testid="product-row">
      <Table.Cell className="!pl-0 p-4 w-32">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={clx("flex", {
            "w-20": type === "preview",
            "w-24": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
            className="rounded-lg"
          />
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="text-left">
        <LocalizedClientLink href={`/products/${item.product_handle}`}>
          <Text
            className="text-base font-semibold text-gray-900 hover:text-orange-600 transition-colors"
            data-testid="product-title"
          >
            {item.product_title}
          </Text>
        </LocalizedClientLink>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />
      </Table.Cell>

      {type === "full" && (
        <Table.Cell>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => changeQuantity(Math.max(1, item.quantity - 1))}
                disabled={updating || item.quantity <= 1}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="decrease-quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-base font-medium min-w-[40px] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => changeQuantity(Math.min(maxQuantity, item.quantity + 1))}
                disabled={updating || item.quantity >= maxQuantity}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-testid="increase-quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {updating && <Spinner />}
          </div>
          <ErrorMessage error={error} data-testid="product-error-message" />
        </Table.Cell>
      )}

      {type === "full" && (
        <Table.Cell className="hidden small:table-cell">
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </Table.Cell>
      )}

      <Table.Cell className="!pr-0">
        <div className="flex items-center justify-end gap-4">
          <span
            className={clx("font-semibold text-gray-900", {
              "flex flex-col items-end": type === "preview",
            })}
          >
            {type === "preview" && (
              <span className="flex gap-x-1 text-sm text-gray-600">
                <Text>{item.quantity}x </Text>
                <LineItemUnitPrice
                  item={item}
                  style="tight"
                  currencyCode={currencyCode}
                />
              </span>
            )}
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </span>
          {type === "full" && (
            <DeleteButton id={item.id} data-testid="product-delete-button" />
          )}
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
