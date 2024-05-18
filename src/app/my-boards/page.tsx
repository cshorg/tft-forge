import { getMyBoards } from "@/services/boards"
import BoardCard from "./board-card"

export default async function MyBoards() {
  const myBoards = await getMyBoards()

  return (
    <div className="container">
      <h1 className="text-xl font-semibold"> My Boards</h1>
      <div className="flex flex-col gap-1">
        {myBoards.map((board, i) => {
          const filteredData = JSON.parse(board.board)
            .flat()
            .filter((slot: any) => slot.name !== "")
            .slice(0, 10)

          return (
            <BoardCard
              key={board.id}
              board={board}
              filteredData={filteredData}
            />
          )
        })}
      </div>
    </div>
  )
}
