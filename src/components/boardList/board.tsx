"use client"

import { Heart } from "lucide-react"
import { upvoteBoard, downvoteBoard, checkVote } from "./actions"
import { useState, useEffect } from "react"
import { useToast } from "../ui/use-toast"
import { Button } from "../ui/button"
import Link from "next/link"
import ListedTraits from "../listedTraits"
import ListedChamps from "../listedChamps"

export default function Board({ board, data, isLoading, filteredData }: any) {
  const [isLiked, setIsLiked] = useState(false)

  const { toast } = useToast()

  useEffect(() => {
    checkLike(board.id)
  }, [board.id])

  async function checkLike(boardId) {
    try {
      const liked = await checkVote(boardId)
      setIsLiked(liked)
    } catch (error) {
      console.error(error)
    }
  }

  async function handleLikeClick() {
    try {
      if (isLiked) {
        await downvoteBoard(board.id)
        toast({
          title: "Successfully unliked board!"
        })
      } else {
        await upvoteBoard(board.id)
        toast({
          title: "Successfully liked board!"
        })
      }
      setIsLiked(!isLiked) // Toggle the like status
    } catch (error) {
      if (
        error.message === "Already upvoted" ||
        error.message === "You have not upvoted this board."
      ) {
        // Handle already liked or unliked errors
        toast({
          title: error.message,
          variant: "destructive"
        })
      } else {
        console.error(error)
      }
    }
  }

  return (
    <div
      key={board.id}
      className="flex flex-col lg:flex-row border-[1px] justify-between items-start gap-4 lg:gap-8 py-5 px-6 w-full mt-4 rounded-sm"
    >
      <div className="flex flex-col basis-1/6">
        <h1 className="text-md md:text-lg capitalize font-semibold flex items-center truncate min-w-[200px] max-w-[200px] justify-start">
          {board.title}
        </h1>
        <div className="text-[10px] lg:text-xs flex gap-1 text-neutral-100/90 text-neutral-900 dark:text-neutral-200">
          <span>{board.votes.length}</span>likes
        </div>
        <div>
          <Button
            onClick={handleLikeClick}
            className="mt-2 hidden lg:flex"
            variant="outline"
          >
            <Heart className={isLiked ? "text-red-500" : "text-cyan-500"} />
          </Button>
        </div>
      </div>

      <div className="flex max-w-[200px] flex-wrap lg:basis-1/2">
        <ListedTraits board={board.board} isLoading={isLoading} data={data} />
      </div>

      <div className="flex gap-2 items-center justify-start flex-wrap grow lg:basis-1/2">
        <ListedChamps filteredData={filteredData} />
      </div>
      <div className="flex justify-between items-center lg:justify-end w-full lg:basis-1/6">
        <Button asChild variant={"outline"}>
          <Link href={`/board/${board.id}`}>View Build</Link>
        </Button>

        <Button
          onClick={handleLikeClick}
          className="mt-2 flex lg:hidden"
          variant="outline"
        >
          <Heart className={isLiked ? "text-red-500" : "text-cyan-500"} />
        </Button>
      </div>
    </div>
  )
}
