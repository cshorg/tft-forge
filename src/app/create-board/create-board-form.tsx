"use client"

import { useState } from "react"
import { TraitsList } from "@/components/traitsList"
import { ItemsList } from "@/components/itemsList"
import { BoardForm } from "@/components/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import { getData } from "./page"
import { Champion } from "@/components/champion"
import { IsLoading } from "@/components/isLoading"

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

  const handleTouchStart = (e: any, champ: any) => {
    e.preventDefault()
    e.stopPropagation()
    e.target.classList.add("dragging")
    const touch = e.targetTouches[0]
    e.dataTransfer = {
      setData: (type: string, val: string) => {
        e.target.dataset[type] = val
      },
      getData: (type: string) => {
        return e.target.dataset[type]
      }
    }
    e.dataTransfer.setData("selectedChamp", JSON.stringify(champ))
  }

  const handleTouchMove = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const touch = e.targetTouches[0]
    const element = document.querySelector(".dragging") as HTMLElement // Explicitly type element as HTMLElement
    if (element) {
      element.style.position = "absolute"
      element.style.left = `${touch.pageX - element.offsetWidth / 2}px`
      element.style.top = `${touch.pageY - element.offsetHeight / 2}px`
    }
  }

  const handleTouchEnd = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const element = document.querySelector(".dragging") as HTMLElement
    if (element) {
      element.classList.remove("dragging")
      element.style.position = "static"
      element.style.left = "auto"
      element.style.top = "auto"
      const dropTarget = document.elementFromPoint(
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY
      ) as HTMLElement
      if (dropTarget && dropTarget.dataset.dropTarget) {
        const [row, col] = dropTarget.dataset.dropTarget.split("-").map(Number)
        handleDrop({ dataTransfer: element.dataset }, row, col)
      }
    }
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (isLoading) {
    return <IsLoading />
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 xl:grid-rows-2 gap-4 mb-[100px]">
      <div className="xl:col-span-1 max-w-full overflow-x-auto row-span-2">
        <TraitsList data={data} board={board} />
      </div>

      <div className="flex flex-col xl:col-span-3 items-center xl:min-h-[450px]">
        {board.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`flex ${
              rowIndex % 2 !== 0
                ? "xl:ml-[100px] lg:ml-[90px] md:ml-[90px] ml-[40px] relative"
                : ""
            } gap-2 md:gap-4 xl:gap-4 mr-[20px] xl:mr-[50px]`}
          >
            {row.map((slot: any, slotIndex: number) => (
              <div
                key={slotIndex}
                onClick={() => handleRemove(rowIndex, slotIndex)}
                onDragStart={(e) => handleDrag(e, slot)}
                onDragOver={handleDragOver}
                onTouchStart={(e) => handleTouchStart(e, slot)}
                onTouchMove={(e) => handleTouchMove(e)}
                onTouchEnd={(e) => handleTouchEnd(e)}
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

      <div className="order-last xl:-order-none xl:col-span-1">
        <BoardForm board={board} traits={TraitsList} />
      </div>

      <div className="w-full p-2 xl:col-span-3 min-h-[400px]">
        <Tabs defaultValue="name">
          <div className="flex xl:flex-row flex-col gap-2 items-start xl:items-center justify-between">
            <TabsList className="grid grid-cols-2 w-full xl:w-[300px]">
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
                className="xl:min-w-[200px] xl:max-w-[200px] p-2 rounded-md"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                value={search}
              />
              <Button variant={"outline"} onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>

          <TabsContent
            value="name"
            className="grid grid-cols-7 md:grid-cols-10 xl:grid-cols-12 gap-1 xl:gap-2 mt-2 max-h-[312px] xl:max-h-[400px] overflow-y-auto"
          >
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
          <TabsContent
            value="cost"
            className="grid grid-cols-7 md:grid-cols-10 xl:grid-cols-12 gap-1 xl:gap-2 mt-2 max-h-[312px] xl:max-h-[400px] overflow-y-auto"
          >
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
      <div className="xl:span-col-1">
        <ItemsList itemData={data["items"]} />
      </div>
    </div>
  )
}
