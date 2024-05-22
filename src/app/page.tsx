import { getBoards } from "@/services/boards"
import BoardList from "@/components/boardList/boardList"

export default async function Home() {
  const boards = await getBoards()

  return (
    <main className="flex flex-col items-center container mb-6">
      <BoardList boards={boards} />
    </main>
  )
}
