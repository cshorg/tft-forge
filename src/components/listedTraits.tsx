"use client"

import { getTraits, traitInfo, getIcons } from "@/hooks/traits"
import { useEffect, useState } from "react"

export default function ListedTraits({ board, isLoading, data }) {
  const [traitIcons, setTraitIcons] = useState(new Map())

  useEffect(() => {
    if (!isLoading) {
      setTraitIcons(getIcons(data))
    }
  }, [data])

  return (
    <>
      {Array.from(getTraits(JSON.parse(board)))
        .sort((a, b) => b[1] - a[1])
        .map(([trait, value]) => {
          const styles =
            !isLoading &&
            Array.isArray(traitInfo(trait, data["sets"][11]["traits"]).effects)
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
            <div key={trait}>
              {!styles.every((style: any) => style === "") && (
                <div
                  className={`${
                    styles.includes(1)
                      ? "bg-[url(/bronze.svg)] bg-contain"
                      : styles.includes(3)
                      ? "bg-[url(/silver.svg)] bg-contain"
                      : styles.includes(4)
                      ? "bg-[url(/gold.svg)] bg-contain"
                      : styles.includes(5)
                      ? "bg-[url(/gold.svg)] bg-contain"
                      : styles.includes(6)
                      ? "bg-[url(/unique.svg)] bg-contain"
                      : ""
                  } flex items-center justify-center`}
                >
                  <img
                    src={traitIcons.get(trait)}
                    className="h-8 w-8 p-[7px]"
                  />
                </div>
              )}
            </div>
          )
        })}
    </>
  )
}
