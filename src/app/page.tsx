import { db } from "@/db"

export default async function Home() {
  const boards = await db.query.boards.findMany()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {boards.map((board, i) => {
        return (
          <div key={board.id}>
            <h1>{board.title}</h1>
            <p>{board.description}</p>
          </div>
        )
      })}
    </main>
  )
}
