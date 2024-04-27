import { Button } from "@/components/ui/button"

import { getBoard } from "@/services/boards"
import Link from "next/link"

export default async function Board(props: any) {
  const board = await getBoard(props.params.boardId)

  return (
    <div className="mt-20">
      <Button variant={"outline"} asChild>
        <Link href={"/"}>Back</Link>
      </Button>
      {board?.title}
    </div>
  )
}
