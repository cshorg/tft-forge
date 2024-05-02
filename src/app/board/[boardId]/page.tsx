import { Button } from "@/components/ui/button"
import { getBoard } from "@/services/boards"
import Link from "next/link"
import ShowBoard from "./show-board"

export default async function Board(props: any) {
  const board = await getBoard(props.params.boardId)

  return (
    <main className="container mx-auto flex justify-center items-center flex-col gap-10">
      <div className="flex justify-between w-full">
        <Button variant={"outline"} asChild>
          <Link href={"/"}>Back</Link>
        </Button>
        <h1 className="font-semibold text-2xl">{board?.title}</h1>
      </div>

      <ShowBoard board={board} />
    </main>
  )
}
