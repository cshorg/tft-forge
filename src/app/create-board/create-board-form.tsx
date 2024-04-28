"use client"

import { useState } from "react"
import { TraitsList } from "@/components/traitsList"
import { ItemsList } from "@/components/itemsList"
import { BoardForm } from "@/components/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { getData } from "./page"

export default function CreateBoardForm() {
  const [board, setBoard] = useState<any[]>(
    Array.from({ length: 4 }, () =>
      Array.from({ length: 7 }, () => ({ name: "", img: "" }))
    )
  )

  const { data, error, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
    staleTime: Infinity
  })

  const handleDrag = (e: any, champ: any) => {
    e.dataTransfer.setData("selectedChamp", JSON.stringify(champ))
  }

  const handleDragOver = (e: any) => {
    e.preventDefault()
  }

  const handleDrop = (e: any, row: number, col: number) => {
    e.preventDefault()
    const selectedChampion = JSON.parse(e.dataTransfer.getData("selectedChamp"))
    const updatedBoard = [...board]

    // remove from previous position if it exists
    if (selectedChampion.x !== undefined && selectedChampion.y !== undefined) {
      updatedBoard[selectedChampion.x][selectedChampion.y] = {}
    }

    // check if slot is occupied && selectedChampion has x/y
    if (
      updatedBoard[row][col].name !== "" &&
      selectedChampion.x !== undefined &&
      selectedChampion.y !== undefined
    ) {
      // swap the champions
      const tempChampion = updatedBoard[row][col]
      updatedBoard[row][col] = selectedChampion
      updatedBoard[selectedChampion.x][selectedChampion.y] = tempChampion
      tempChampion.x = selectedChampion.x
      tempChampion.y = selectedChampion.y
      selectedChampion.x = row
      selectedChampion.y = col
    } else {
      updatedBoard[row][col] = {
        ...selectedChampion,
        x: row,
        y: col
      }
    }

    setBoard(updatedBoard)
    console.log(board)
  }

  const handleAdd = (champion: any) => {
    const updatedBoard = [...board]
    let rowIndex = 0
    let slotIndex = 0

    for (let i = 0; i < updatedBoard.length; i++) {
      for (let j = 0; j < updatedBoard[i].length; j++) {
        if (Object.keys(updatedBoard[i][j]).length === 0) {
          rowIndex = i
          slotIndex = j
          break
        }
      }
    }

    const updatedChampion = Object.assign({}, champion, {
      x: rowIndex,
      y: slotIndex
    })

    updatedBoard[rowIndex][slotIndex] = updatedChampion
    setBoard(updatedBoard)
  }

  const handleRemove = (rowIndex: number, slotIndex: number) => {
    const updatedBoard = [...board]
    updatedBoard[rowIndex][slotIndex] = {}
    setBoard(updatedBoard)
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-4 mb-[100px]">
      <div className="col-span-1 row-span-2">
        <TraitsList data={data} board={board} />
      </div>

      <div className="flex flex-col col-span-3 items-center">
        {board.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex ${
              rowIndex % 2 !== 0 ? "ml-[100px] relative" : ""
            } gap-4 mr-[50px]`}
          >
            {row.map((slot: any, slotIndex: number) => (
              <div
                key={slotIndex}
                onClick={() => handleRemove(rowIndex, slotIndex)}
                onDragStart={(e) => handleDrag(e, slot)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, rowIndex, slotIndex)}
                className=" bg-neutral-900 hexagon relative"
              >
                {slot.name && (
                  <img
                    src={`https://raw.communitydragon.org/latest/game/${slot.tileIcon
                      .toLowerCase()
                      .replace(/\.(tex|dds)$/, ".png")}`}
                    alt="champion"
                    className="block object-cover w-[100%] h-auto"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="col-span-1">
        <BoardForm board={board} />
      </div>

      <div className="w-full p-2 col-span-3 ">
        <div className="flex justify-between">
          <Tabs defaultValue="normal" className="w-[300px]">
            <TabsList className="w-full ">
              <TabsTrigger className="w-[50%]" value="normal">
                Name
              </TabsTrigger>
              <TabsTrigger className="w-[50%]" value="traits">
                Cost
              </TabsTrigger>
            </TabsList>
            <TabsContent value="normal"></TabsContent>
            <TabsContent value="traits"></TabsContent>
          </Tabs>

          <Input className="w-[200px]" type="search" placeholder="Search" />
        </div>
        <div className="grid grid-cols-12 gap-2">
          {data["sets"][11]["champions"]
            .filter((champ: any) => champ.traits.length > 0)
            .map((champion: any) => (
              <img
                src={`https://raw.communitydragon.org/latest/game/${champion.tileIcon
                  .toLowerCase()
                  .replace(/\.(tex|dds)$/, ".png")}`}
                alt="champion"
                draggable
                key={champion.name}
                onClick={() => handleAdd(champion)}
                onDragStart={(e) => handleDrag(e, champion)}
                className="cursor-pointer rounded-sm flex items-center justify-center"
              />
            ))}
        </div>
      </div>
      <div className="span-col-1">
        <ItemsList itemData={data["items"]} />
      </div>
    </div>
  )
}
