export const getTraits = (board: any) => {
  const traitsMap = new Map()
  board.flat().forEach((champion: any) => {
    if (champion.traits) {
      champion.traits.forEach((trait: any) => {
        if (traitsMap.has(trait)) {
          traitsMap.set(trait, traitsMap.get(trait) + 1)
        } else {
          traitsMap.set(trait, 1)
        }
      })
    }
  })
  return traitsMap
}

export const getIcons = (data: any) => {
  const iconsMap = new Map()

  data["sets"][11]["traits"].forEach((trait: any) => {
    iconsMap.set(
      trait.name,
      "https://raw.communitydragon.org/latest/game/" +
        trait.icon.toLowerCase().replace(".tft_set11", "").replace(".tex", ".png")
    )
  })

  return iconsMap
}

export const traitInfo = (trait: any, data: any) => {
  return data.find((tData: any) => tData.name === trait)
}