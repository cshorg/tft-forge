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
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Image from "next/image"

const formSchema = z.object({
  title: z.string().min(5).max(50),
  description: z.string().min(2).max(250)
})

export default function CreateBoardForm() {
  // temp data
  const [champs, setChamps] = useState([
    {
      name: "Volibear",
      rarity: 3,
      type: ["InkShadow", "Duelist"],
      about: "Duelist player"
    },
    {
      name: "Tristana",
      rarity: 3,
      type: ["Fortune", "Duelist"],
      about: "Duelist player"
    }
  ])
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
          {champs.map((champ) => (
            <div
              draggable
              className="h-14 rounded-sm w-14 border-[1px] border-neutral-100/10 flex items-center justify-center cursor-pointer text-xs"
            >
              {champ.name}
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
