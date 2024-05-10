"use client"

import { useQuery } from "@tanstack/react-query"
import { getData } from "@/app/create-board/page"
import { SquareChevronUp, SquareChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { IsLoading } from "./isLoading"
import { useState, useEffect, use } from "react"
import { getTraits } from "@/hooks/traits"
import { getIcons } from "@/hooks/traits"
import { traitInfo } from "@/hooks/traits"

export default function BoardList({ boards }: any) {
  const [loadMore, setLoadMore] = useState(6) //defaault posts shown on main page
  const [traitIcons, setTraitIcons] = useState(new Map())
  const { data, error, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
    staleTime: Infinity
  })

  // if (error) {
  //   return <div>Erorr loading data</div>
  // }

  // if (isLoading) {
  //   return <IsLoading />
  // }

  useEffect(() => {
    if (!isLoading) {
      setTraitIcons(getIcons(data))
      console.log(data)
    }
  }, [data])

  return (
    <>
      {boards.slice(0, loadMore).map((board: any, i: number) => {
        const filteredData = JSON.parse(board.board)
          .flat()
          .filter((slot: any) => slot.name !== "")

        return (
          <div
            key={board.id}
            className="flex border-[1px] justify-between items-center gap-2 py-5 px-8 w-full mt-4 rounded-sm"
          >
            <div className="flex gap-8 items-center">
              <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-1">
                  <SquareChevronUp
                    size={22}
                    className="cursor-pointer hover:opacity-80 transition ease-in-out duration-150"
                  />
                  <SquareChevronDown
                    size={22}
                    className="cursor-pointer hover:opacity-80 transition ease-in-out duration-150"
                  />
                </div>
                <div className="text-sm">22</div>
              </div>

              <h1 className="text-md capitalize font-semibold min-w-[200px] flex items-center justify-start">
                {board.title}
              </h1>
            </div>

            <div className="flex gap-2 items-center justify-start max-w-[200px] min-w-[200px] flex-wrap">
              {Array.from(getTraits(JSON.parse(board.board)))
                .sort((a, b) => b[1] - a[1])
                .map(([trait, value]) => {
                  const styles =
                    !isLoading &&
                    Array.isArray(
                      traitInfo(trait, data["sets"][11]["traits"]).effects
                    )
                      ? traitInfo(
                          trait,
                          data["sets"][11]["traits"]
                        ).effects.map((effect: any, i: number) => {
                          if (
                            value >= effect.minUnits &&
                            value <= effect.maxUnits
                          ) {
                            return effect.style
                          }
                          return ""
                        })
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
            </div>

            <div className="flex gap-2 items-center justify-start min-w-[540px]">
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
                      } border-[2px]`}
                      key={index}
                      src={`https://raw.communitydragon.org/latest/game/${slot.tileIcon
                        .toLowerCase()
                        .replace(/\.(tex|dds)$/, ".png")}`}
                      alt="champion"
                      height={46}
                      width={46}
                    />
                  )
              )}
            </div>
            <Button asChild variant={"outline"}>
              <Link href={`/board/${board.id}`}>View Build</Link>
            </Button>
          </div>
        )
      })}
      {boards.length > loadMore && (
        <Button
          className="w-[160px] my-6"
          variant={"outline"}
          onClick={() => setLoadMore((prev) => prev + 6)}
        >
          Load More
        </Button>
      )}
    </>
  )
}
