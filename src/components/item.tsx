"use client"

export function Item({ filteredItem }: any) {
  return (
    <div>
      <img
        src={`https://raw.communitydragon.org/latest/game/${filteredItem.icon
          .toLowerCase()
          .replace(/\.(tex|dds)$/, ".png")}`}
        alt="item"
      />
    </div>
  )
}
