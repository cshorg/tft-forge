import { db } from "@/db"
import { boards } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getSession } from "@/lib/auth"
import { unstable_noStore } from "next/cache"

export async function getBoard(boardId: string) {
  unstable_noStore()
  
  const board = await db.query.boards.findFirst({
    where: eq(boards.id, boardId)
  })

  return board
} 

export async function getBoards() {
  unstable_noStore()

  const boards = await db.query.boards.findMany()

  return boards
} 

export async function getMyBoards() {
  unstable_noStore()

  const session = await getSession()

  if (!session) throw new Error("Unauthorized") 

  const board = await db.query.boards.findMany({
    where: eq(boards.userId, session.user.id)
  })

  return board
} 

export async function deleteBoard(boardId: string) {
  await db.delete(boards).where(eq(boards.id, boardId))
}

