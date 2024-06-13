export default function ListedChamps({ filteredData }) {
  return (
    <>
      {filteredData.map(
        (slot: any, index: number) =>
          slot &&
          slot.tileIcon && (
            <img
              className={`rounded-sm ${
                slot.cost === 1
                  ? "border-gray-300"
                  : slot.cost === 2
                  ? "border-green-400"
                  : slot.cost === 3
                  ? "border-cyan-500"
                  : slot.cost === 4
                  ? "border-purple-600"
                  : "border-yellow-500"
              } border-[2px] h-[30px] w-[30px] md:h-[46px] md:w-[46px]`}
              key={index}
              src={`https://raw.communitydragon.org/latest/game/${slot.tileIcon
                .toLowerCase()
                .replace(".tft_set11", "")
                .replace(/\.(tex|dds)$/, ".png")}`}
              alt="champion"
            />
          )
      )}
    </>
  )
}
