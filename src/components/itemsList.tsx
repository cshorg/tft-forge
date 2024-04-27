"use client"

import { Item } from "@/components/item"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ItemsList({ itemData }: any) {
  const filterTraits = (itemData: any[]) => {
    const traitIcons = new Set()

    return itemData.filter((item: any) => {
      const traitIcon = item.icon.startsWith(
        "ASSETS/Maps/Particles/TFT/Item_Icons/Traits/Spatula/Set11/"
      )

      if (traitIcon && !traitIcons.has(item.icon)) {
        traitIcons.add(item.icon)
        return true
      }

      return false
    })
  }

  const filterNormal = (itemData: any[]) => {
    const normalIcons = new Set()

    return itemData.filter((item: any) => {
      const standardIcon = item.icon.startsWith(
        "ASSETS/Maps/Particles/TFT/Item_Icons/Standard/"
      )

      if (
        item.name !== "Guardian Angel" &&
        item.composition.length > 0 &&
        standardIcon
      ) {
        if (!normalIcons.has(item.icon)) {
          normalIcons.add(item.icon)
          return true
        }
      }

      return false
    })
  }

  return (
    <div className="flex gap-2 flex-wrap min-w-[260px] max-w-[260px]  p-2 h-[100%]">
      <Tabs defaultValue="normal" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-[50%]" value="normal">
            Normal
          </TabsTrigger>
          <TabsTrigger className="w-[50%]" value="traits">
            Traits
          </TabsTrigger>
        </TabsList>
        <TabsContent className="grid grid-cols-6 gap-2" value="normal">
          {filterNormal(itemData).map((filteredItem: any, index: number) => (
            <Item key={index} filteredItem={filteredItem} />
          ))}
        </TabsContent>
        <TabsContent className="grid grid-cols-6 gap-2" value="traits">
          {filterTraits(itemData).map((filteredItem: any, index: number) => (
            <Item key={index} filteredItem={filteredItem} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
