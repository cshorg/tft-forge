import { Button } from "@/components/ui/button"
import { getBoard } from "@/services/boards"
import Link from "next/link"
import ShowBoard from "./show-board"

export default async function Board(props: any) {
  const board = await getBoard(props.params.boardId)

  return (
    <main className="container mx-auto flex items-center flex-col">
      <div className="flex justify-between w-full">
        <Button variant={"outline"} asChild>
          <Link href={"/"}>Back</Link>
        </Button>
      </div>

      <ShowBoard board={board} />
    </main>
  )
}
