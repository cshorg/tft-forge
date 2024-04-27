"use client"

import { useState, useEffect } from "react"
import { Trait } from "./trait"

export function TraitsList({ data, board }: any) {
  const [traitList, setTraitList] = useState(new Map())
  const [traitIcons, setTraitIcons] = useState(new Map())
  const traitData = data["sets"][11]["traits"]

  const traitInfo = (trait: any) => {
    return traitData.find((tData: any) => tData.name === trait)
  }

  // fix duplicate champs adding to the traits list
  const getTraits = () => {
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
    setTraitList(traitsMap)
  }

  const getIcons = () => {
    const iconsMap = new Map()

    data["sets"][11]["traits"].forEach((trait: any) => {
      iconsMap.set(
        trait.name,
        "https://raw.communitydragon.org/latest/game/" +
          trait.icon.toLowerCase().replace(".tex", ".png")
      )
    })

    setTraitIcons(iconsMap)
  }

  useEffect(() => {
    getTraits()
  }, [board])

  useEffect(() => {
    getIcons()
  }, [])

  return (
    <div>
      <div>Traits</div>
      <div>
        {Array.from(traitList).map(([trait, value]) => (
          <Trait
            trait={trait}
            value={value}
            icon={traitIcons.get(trait)}
            info={traitInfo(trait)}
          />
        ))}
      </div>
    </div>
  )
}
