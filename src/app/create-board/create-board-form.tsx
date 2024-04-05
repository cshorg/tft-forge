"use client"

import { createBoardAction } from "./actions"
import { z } from "zod"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
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

interface Champion {
  name: string
  apiName: string
  traits: string
  squareIcon: string
  cost: number
}

export default function CreateBoardForm() {
  const [champions, setChampions] = useState<Champion[]>([])
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createBoardAction(values)
    router.push("/")
  }

  const getData = async () => {
    fetch("https://raw.communitydragon.org/14.6/cdragon/tft/en_us.json")
      .then((res) => {
        res.json().then((data) => {
          setChampions(data["sets"][11]["champions"])
          console.log(data["sets"][11]["champions"])
        })
      })
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="flex justify-between">
        <Card className="p-6">
          <CardTitle>Traits</CardTitle>
        </Card>
        <div className="flex flex-col justify-center items-center">
          {new Array(4).fill(null).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex ${
                rowIndex % 2 !== 0 ? "ml-[108px] relative" : ""
              } gap-3`}
            >
              {new Array(7).fill(null).map((slot, slotIndex) => (
                <div
                  key={slotIndex}
                  className="w-[65px] rounded-sm h-[65px] mt-3 bg-neutral-900"
                ></div>
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
          {champions!.map((champ) => {
            const borderColor =
              champ.cost === 1
                ? "border-[#b5b5b5]"
                : champ.cost === 2
                ? "border-[#5e5e5e]"
                : champ.cost === 3
                ? "border-[#4b8f00]"
                : champ.cost === 4
                ? "border-[#0077c8]"
                : champ.cost === 5
                ? "border-[#a335ee]"
                : "border-[#ff8000]"

            return (
              champ.traits.length > 0 && (
                <div
                  draggable
                  key={champ.apiName}
                  className={`${borderColor} rounded-sm border-[2px] flex items-center justify-center cursor-pointer text-xs`}
                >
                  <Image
                    src={`https://raw.communitydragon.org/latest/game/${champ.squareIcon
                      ?.toLowerCase()
                      ?.replace(/\.(tex|dds)$/, ".png")}`}
                    width={60}
                    height={60}
                    alt="image"
                  />
                </div>
              )
            )
          })}
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
