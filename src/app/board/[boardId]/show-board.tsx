"use client"

import { TraitsList } from "@/components/traitsList"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getData } from "@/app/create-board/page"
import { IsLoading } from "@/components/isLoading"
import { useEffect } from "react"

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
          const { x, y, name, img } = row
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
    <div className="grid grid-cols-5 mt-10">
      <div className="col-span-1">
        <TraitsList data={data} board={showBoard} />
      </div>
      <div className="flex flex-col items-center col-span-3">
        {showBoard.map((row: any, rowIndex: number) => (
          <div
            key={rowIndex}
            className={`flex ${
              rowIndex % 2 !== 0 ? "ml-[100px] relative" : ""
            } gap-4 mr-[50px]`}
          >
            {row.map((col: any, colIndex: number) => {
              return (
                <div key={colIndex} className="bg-neutral-900 hexagon relative">
                  <img
                    src={`https://raw.communitydragon.org/latest/game/${col.tileIcon
                      ?.toString()
                      .toLowerCase()
                      .replace(/\.(tex|dds)$/, ".png")}`}
                    className="block object-cover w-[100%] h-auto"
                  />
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-xl">Build Description</h1>
          <p className="text-sm text-wrap">{board.description}</p>
        </div>
      </div>
    </div>
  )
}
