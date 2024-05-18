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
  }, [data])

  return (
    <div className="flex xl:flex-col gap-2">
      {traitList.size <= 0 && (
        <div className="xl:h-[140px] border-[1px] rounded-md w-full flex xl:flex-col py-4 items-center justify-center opacity-70">
          <ShieldAlert />
          <p className="text-xs w-[140px] text-center mt-2">
            Select champions to activate traits
          </p>
        </div>
      )}
      {Array.from(traitList)
        .sort((a, b) => b[1] - a[1])
        .map(([trait, value]) => {
          const styles = Array.isArray(
            traitInfo(trait, data["sets"][11]["traits"]).effects
          )
            ? traitInfo(trait, data["sets"][11]["traits"]).effects.map(
                (effect: any, i: number) => {
                  if (value >= effect.minUnits && value <= effect.maxUnits) {
                    return effect.style
                  }
                  return ""
                }
              )
            : []
          return (
            <>
              {
                <Trait
                  key={trait}
                  trait={trait}
                  value={value}
                  icon={traitIcons.get(trait)}
                  info={traitInfo(trait, data["sets"][11]["traits"])}
                  styles={styles}
                />
              }
            </>
          )
        })}
    </div>
  )
}
