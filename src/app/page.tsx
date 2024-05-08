import { Button } from "@/components/ui/button"
import { getBoards } from "@/services/boards"
import Link from "next/link"
import BoardList from "@/components/boardList"

export default async function Home() {
  const boards = await getBoards()

  return (
    <main className="flex min-h-screen flex-col items-center container ">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-semibold">Popular Boards</h1>
        <div className="flex gap-2">
          <Button asChild variant={"outline"}>
            <Link href="/create-board">Create</Link>
          </Button>
        </div>
      </div>

      <BoardList boards={boards} />
    </main>
  )
}
