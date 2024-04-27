"use client"

import { Item } from "@/components/item"

export function ItemsList({ itemData }: any) {
  const filterUniqueItems = (itemData: any[]) => {
    const uniqueIcons = new Set()

    return itemData.filter((item: any) => {
      const standardIcon = item.icon.startsWith(
        "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/"
      )
      const traitIcon = item.icon.startsWith(
        "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/"
      )

      if (
        (item.name !== "Guardian Angel" &&
          item.composition.length > 0 &&
          standardIcon) ||
        traitIcon
      ) {
        if (!uniqueIcons.has(item.icon)) {
          uniqueIcons.add(item.icon)
          return true
        }
      }

      return false
    })
  }

  return (
    <div>
      <div>Items</div>
      <div className="flex gap-2 flex-wrap max-w-[300px]">
        {filterUniqueItems(itemData).map((filteredItem: any, index: number) => (
          <Item key={index} filteredItem={filteredItem} />
        ))}
      </div>
    </div>
  )
}
