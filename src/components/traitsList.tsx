"use client"

import { useState, useEffect } from "react"
import { Trait } from "./trait"
import { ShieldAlert } from "lucide-react"
import { getIcons } from "@/hooks/traits"
import { getTraits } from "@/hooks/traits"
import { traitInfo } from "@/hooks/traits"

export function TraitsList({ data, board }: any) {
  const [traitList, setTraitList] = useState(new Map())
  const [traitIcons, setTraitIcons] = useState(new Map())

  useEffect(() => {
    setTraitList(getTraits(board))
  }, [board])

  useEffect(() => {
    setTraitIcons(getIcons(data))
  }, [])

  return (
    <div className="flex flex-col gap-2">
      {traitList.size <= 0 && (
        <div className=" h-[140px] border-[1px] rounded-md flex flex-col items-center justify-center opacity-70">
          <ShieldAlert />
          <p className="text-xs w-[140px] text-center mt-2">
            Select champions to activate traits
          </p>
        </div>
      )}
      {Array.from(traitList).map(([trait, value]) => (
        <Trait
          trait={trait}
          value={value}
          icon={traitIcons.get(trait)}
          info={traitInfo(trait, data["sets"][11]["traits"])}
        />
      ))}
    </div>
  )
}
