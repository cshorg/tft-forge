"use client"

import { TraitsList } from "@/components/traitsList"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getData } from "@/app/create-board/page"
import { IsLoading } from "@/components/isLoading"
import { useEffect } from "react"
import { Champion } from "@/components/champion"

export default function ShowBoard({ board }: any) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
    staleTime: Infinity
  })

  const [showBoard, setShowBoard] = useState<any[]>(
    Array.from({ length: 4 }, () =>
      Array.from({ length: 7 }, () => ({ name: "", img: "" }))
    )
  )

  useEffect(() => {
    if (board) {
      const parsedBoard = JSON.parse(board.board)
      const updatedShowBoard = [...showBoard]

      parsedBoard.forEach((col, i) => {
        col.forEach((row, j) => {
          const { x, y } = row
          if (
            x !== undefined &&
            y !== undefined &&
            x >= 0 &&
            x < updatedShowBoard.length &&
            y >= 0 &&
            y < updatedShowBoard[x].length
          ) {
            updatedShowBoard[x][y] = row
          }
        })
      })

      setShowBoard(updatedShowBoard)
      console.log(updatedShowBoard)
    }
  }, [])

  if (error) {
    return <div>error loading data</div>
  }

  if (isLoading) {
    return <IsLoading />
  }

  return (
    <div className="grid xl:grid-cols-5 mt-10">
      <div className="xl:col-span-1 mx-10 xl:mx-0 overflow-y-auto">
        <TraitsList data={data} board={showBoard} />
      </div>
      <div className="flex flex-col items-center mt-6 xl:mt-0 xl:col-span-3">
        {showBoard.map((row: any, rowIndex: number) => (
          <div
            key={rowIndex}
            className={`flex ${
              rowIndex % 2 !== 0
                ? "xl:ml-[100px] lg:ml-[90px] md:ml-[90px] ml-[40px] relative"
                : ""
            } gap-2 md:gap-4 xl:gap-4 mr-[20px] xl:mr-[50px]`}
          >
            {row.map((champ: any, idx: number) => {
              return (
                <div
                  key={idx}
                  className="bg-neutral-200 dark:bg-neutral-900 hexagon relative"
                >
                  <img
                    src={`https://raw.communitydragon.org/latest/game/${champ.tileIcon
                      ?.toString()
                      .toLowerCase()
                      .replace(".tft_set11", "")
                      .replace(/\.(tex|dds)$/, ".png")}`}
                    className="block object-cover w-[100%] h-auto"
                    alt=""
                  />
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div className="xl:col-span-1 mx-10 xl:mx-0 mt-6 xl:mt-0">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">{board?.title}</h1>
          <p className="text-sm text-wrap">{board.description}</p>
        </div>
      </div>
    </div>
  )
}
