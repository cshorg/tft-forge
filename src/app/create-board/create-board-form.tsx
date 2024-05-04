"use client"

import { useEffect, useState } from "react"
import { TraitsList } from "@/components/traitsList"
import { ItemsList } from "@/components/itemsList"
import { BoardForm } from "@/components/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { getData } from "./page"
import { Champion } from "@/components/champion"

export default function CreateBoardForm() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
    staleTime: Infinity
  })

  const [board, setBoard] = useState<any[]>(
    Array.from({ length: 4 }, () =>
      Array.from({ length: 7 }, () => ({ name: "", img: "" }))
    )
  )
  const [search, setSearch] = useState("")

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

  const handleClear = () => {
    setSearch("")
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <svg
          aria-hidden="true"
          className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-4 mb-[100px]">
      <div className="col-span-1 row-span-2">
        <TraitsList data={data} board={board} />
      </div>

      <div className="flex flex-col col-span-3 items-center min-h-[450px]">
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
        <BoardForm board={board} traits={TraitsList} />
      </div>

      <div className="w-full p-2 col-span-3 min-h-[400px]">
        <Tabs defaultValue="name">
          <div className="flex items-center justify-between">
            <TabsList className="grid grid-cols-2 w-[300px]">
              <TabsTrigger className="w-[100%]" value="name">
                Name
              </TabsTrigger>
              <TabsTrigger className="w-[100%]" value="cost">
                Cost
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Search..."
                className="min-w-[200px] max-w-[200px] p-2 rounded-md"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                value={search}
              />
              <Button variant={"outline"} onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>

          <TabsContent value="name" className="grid grid-cols-12 gap-2 mt-2">
            {data["sets"][11]["champions"]
              .filter(
                (champ: any) =>
                  champ.traits.length > 0 &&
                  champ.name.toLowerCase().includes(search)
              )
              .map((champion: any) => {
                const style =
                  champion.cost === 1
                    ? "border-gray-300"
                    : champion.cost === 2
                    ? "border-green-400"
                    : champion.cost === 3
                    ? "border-cyan-500"
                    : champion.cost === 4
                    ? "border-purple-600"
                    : "border-yellow-500"

                return (
                  <Champion champion={champion} key={champion.name}>
                    <img
                      src={`https://raw.communitydragon.org/latest/game/${champion.tileIcon
                        .toLowerCase()
                        .replace(/\.(tex|dds)$/, ".png")}`}
                      alt="champion"
                      draggable
                      key={champion.name}
                      onClick={() => handleAdd(champion)}
                      onDragStart={(e) => handleDrag(e, champion)}
                      className={` ${style} border-[2px] cursor-pointer rounded-sm flex items-center justify-center`}
                    />
                  </Champion>
                )
              })}
          </TabsContent>
          <TabsContent value="cost" className="grid grid-cols-12 gap-2">
            {data["sets"][11]["champions"]
              .filter(
                (champ: any) =>
                  champ.traits.length > 0 &&
                  champ.name.toLowerCase().includes(search)
              )
              .sort((a: any, b: any) => a.cost - b.cost)
              .map((champion: any) => {
                const style =
                  champion.cost === 1
                    ? "border-gray-300"
                    : champion.cost === 2
                    ? "border-green-400"
                    : champion.cost === 3
                    ? "border-cyan-500"
                    : champion.cost === 4
                    ? "border-purple-600"
                    : "border-yellow-500"
                return (
                  <Champion champion={champion} key={champion.name}>
                    <img
                      src={`https://raw.communitydragon.org/latest/game/${champion.tileIcon
                        .toLowerCase()
                        .replace(/\.(tex|dds)$/, ".png")}`}
                      alt="champion"
                      draggable
                      key={champion.name}
                      onClick={() => handleAdd(champion)}
                      onDragStart={(e) => handleDrag(e, champion)}
                      className={` ${style} border-[2px] cursor-pointer rounded-sm flex items-center justify-center`}
                    />
                  </Champion>
                )
              })}
          </TabsContent>
        </Tabs>
      </div>
      <div className="span-col-1">
        <ItemsList itemData={data["items"]} />
      </div>
    </div>
  )
}
