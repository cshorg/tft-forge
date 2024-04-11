"use server"

import { db } from "@/db"
import { Board, boards } from "@/db/schema"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function createBoardAction(boardData: Omit<Board, "id" | "userId">) {
  const session = await getSession()

  if (!session) {
    throw new Error("Unauthorized")
  }

  await db.insert(boards).values({...boardData, userId: session.user.id})

  revalidatePath("/")
}