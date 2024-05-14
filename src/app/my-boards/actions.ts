"use server"

import { getSession } from "@/lib/auth"
import { getBoard, deleteBoard } from "@/services/boards"
import { revalidatePath } from "next/cache"

export async function deleteMyBoard(boardId: string) {
  const session = await getSession()

  if (!session) throw new Error("Unauthorized")

  const board = await getBoard(boardId)

  if (board?.userId !== session.user.id) throw new Error("Unauthorized")

  await deleteBoard(boardId)

  revalidatePath("/my-boards")
}