import { Button } from "@/components/ui/button"
import { getBoards } from "@/services/boards"

import { Card } from "@/components/ui/card"

import Link from "next/link"

export default async function Home() {
  const boards = await getBoards()

  return (
    <main className="flex min-h-screen flex-col items-center pt-20 px-10 gap-2">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-semibold">Meta Boards</h1>
        <div className="flex gap-2">
          <Button asChild variant={"outline"}>
            <Link href="/create-board">Create</Link>
          </Button>
        </div>
      </div>
      <div></div>

      {boards.map((board, i) => {
        const filteredData = JSON.parse(board.board)
          .flat()
          .filter((slot: any) => slot.name !== "")

        return (
          <Card
            key={board.id}
            className="flex justify-between items-center gap-2 p-6 w-full mt-4"
          >
            <div className="flex gap-8 items-center">
              <div className="flex flex-col gap-2">
                <div className="w-6 h-6 border-[1px] rounded-sm"></div>
                <div className="w-6 h-6 border-[1px] rounded-sm"></div>
              </div>

              <h1 className="text-lg capitalize font-semibold w-[260px]">
                {board.title}
              </h1>
            </div>

            <div className="flex gap-2">
              {board.description &&
                new Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 border-[1px] rounded-sm"
                    ></div>
                  ))}
            </div>

            {filteredData.map((slot: any, index: number) => (
              <div key={index}>
                {slot.name}, Image: {slot.img}
              </div>
            ))}

            <div className="flex gap-2"></div>
            <Button asChild variant={"outline"}>
              <Link href={`/board/${board.id}`}>View Build</Link>
            </Button>
          </Card>
        )
      })}
    </main>
  )
}
