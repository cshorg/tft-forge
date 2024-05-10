import { getMyBoards } from "@/services/boards"

export default async function MyBoards() {
  const myBoards = await getMyBoards()

  return (
    <div className="container">
      <h1 className="text-xl font-semibold"> My Boards</h1>
      {myBoards.map((board, i) => (
        <div key={i}>{board.id}</div>
      ))}
    </div>
  )
}
