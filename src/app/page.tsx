import { Button } from "@/components/ui/button"
import { db } from "@/db"
import Link from "next/link"

export default async function Home() {
  const boards = await db.query.boards.findMany()

  return (
    <main className="flex min-h-screen flex-col items-center pt-20 px-10 gap-2">
      <Link href="/create-board">
        <Button variant={"outline"}>Create</Button>
      </Link>
      {boards.map((board, i) => {
        return (
          <div
            key={board.id}
            className="border border-indigo-200 flex flex-col gap-2 w-[400px] rounded-sm p-6"
          >
            <h1>title: {board.title}</h1>
            <p>desc: {board.description}</p>
          </div>
        )
      })}
    </main>
  )
}
