import { db } from "@/db"
import { unstable_noStore } from "next/cache"

export async function getBoards() {
  unstable_noStore()
  const boards = await db.query.boards.findMany()
  return boards
} 