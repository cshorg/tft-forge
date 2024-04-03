"use server"

import { db } from "@/db"
import { getSession } from "@/lib/auth"

export async function createBoardAction() {
  const session = getSession()

}