'use server'

import { db } from "@/db"
import {  boards } from "@/db/schema"
import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { unstable_noStore } from "next/cache"
import { eq } from "drizzle-orm"

export async function upvoteBoard( boardId: string) {
  unstable_noStore()

  const session = await getSession()

  if (!session) throw new Error("Unauthorized") 

  // find board by id
  const foundBoard = await db.query.boards.findFirst({ where: eq(boards.id, boardId) })

  // check if user has already upvoted
  if (foundBoard && foundBoard.votes.includes(session.user.id)) {
    throw new Error("Already upvoted")
  } 

  if (foundBoard && !foundBoard.votes.includes(session.user.id)) {
    await db.update(boards).set({
      votes: [...foundBoard.votes, session.user.id]
    }).where(eq(boards.id, boardId))
  }

  revalidatePath("/")
}

export async function downvoteBoard(boardId: string) {
  unstable_noStore()

  const session = await getSession()

  if (!session) throw new Error("Unauthorized") 

  // find board by id
  const foundBoard = await db.query.boards.findFirst({ where: eq(boards.id, boardId) })

  // check if user has voted
  if (foundBoard && !foundBoard.votes.includes(session.user.id)) {
    throw new Error("You have not upvoted this board.")
  }

  if (foundBoard && foundBoard.votes.includes(session.user.id)) {
    await db.update(boards).set({
      votes: foundBoard.votes.filter((vote) => vote !== session.user.id)
    }).where(eq(boards.id, boardId))
  }

  revalidatePath("/")
}