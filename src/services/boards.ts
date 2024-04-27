import { db } from "@/db"
import { boards } from "@/db/schema"
import { eq } from "drizzle-orm"
import { unstable_noStore } from "next/cache"

export async function getBoards() {
  unstable_noStore()
  const boards = await db.query.boards.findMany()
  return boards
} 

export async function getBoard(boardId: string) {
  unstable_noStore()
  const board = await db.query.boards.findFirst({
    where: eq(boards.id, boardId)
  })
  return board
} 