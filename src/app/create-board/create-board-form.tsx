"use client"

import { createBoardAction } from "./actions"
import { z } from "zod"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  title: z.string().min(5).max(50),
  description: z.string().min(2).max(250)
})

export default function CreateBoardForm() {
  const router = useRouter()
  const [board, setBoard] = useState<any[]>(
    Array.from({ length: 4 }, () =>
      Array.from({ length: 7 }, () => ({ name: "", img: "" }))
    )
  )
  const [champions, setChampions] = useState([
    { name: "Volibear" },
    { name: "Teemo" }
  ])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const boardString = JSON.stringify(board)
    const data = { ...values, board: boardString }
    await createBoardAction(data)
    router.push("/")
  }

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
      updatedBoard[selectedChampion.x][selectedChampion.y] = {
        name: "",
        image: ""
      }
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
      console.log("swapped")
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

  return (
    <>
      <div className="flex justify-between">
        <Card className="p-6">
          <CardTitle>Traits</CardTitle>
        </Card>
        <div className="flex flex-col justify-center items-center">
          {board.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex ${
                rowIndex % 2 !== 0 ? "ml-[108px] relative" : ""
              } gap-3`}
            >
              {row.map((slot: any, slotIndex: number) => (
                <div
                  key={slotIndex}
                  onClick={() => handleRemove(rowIndex, slotIndex)}
                  onDragStart={(e) => handleDrag(e, slot)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, rowIndex, slotIndex)}
                  className="w-[65px] rounded-sm h-[65px] mt-3 bg-neutral-900 flex items-center justify-center cursor-pointer"
                >
                  {slot.name}
                </div>
              ))}
            </div>
          ))}
        </div>
        <Card className="p-6">
          <CardTitle> Items</CardTitle>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Select Champions</CardTitle>
          <CardDescription>
            Click and drag your desired champions to the board.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2 flex-wrap">
          {champions.map((champion) => (
            <div
              draggable
              key={champion.name}
              onClick={() => handleAdd(champion)}
              onDragStart={(e) => handleDrag(e, champion)}
              className="w-20 h-20 border-[1px] cursor-pointer rounded-sm flex items-center justify-center"
            >
              {champion.name}
            </div>
          ))}
        </CardContent>
      </Card>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-[300px]"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  )
}
