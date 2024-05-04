"use client"

import { Input } from "@/components/ui/input"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createBoardAction } from "@/app/create-board/actions"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  title: z.string().min(5).max(50),
  description: z.string().min(2).max(250)
})

export function BoardForm({ board, traits }: any) {
  const router = useRouter()
  const { toast } = useToast()
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

    try {
      await createBoardAction(data)

      toast({
        title: "Successfully created board!"
      })
    } catch (e) {
      toast({
        title: "Error creating board!",
        description: `${e}`
      })
    }

    router.push("/")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-[260px]"
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
                <Textarea className="max-h-[240px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={"outline"} className="w-full" type="submit">
          Submit Board
        </Button>
      </form>
    </Form>
  )
}
