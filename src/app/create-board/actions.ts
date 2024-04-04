"use server"

import { db } from "@/db"
import { Board, boards } from "@/db/schema"
import { getSession } from "@/lib/auth"

export async function createBoardAction(boardData: Omit<Board, "id" | "userId">) {
  const session = await getSession()
  console.log(session)

  if (!session) {
    throw new Error("Unauthorized")
  }

  await db.insert(boards).values({...boardData, userId: session.user.id})
}