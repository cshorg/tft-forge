"use client"

import { useQuery } from "@tanstack/react-query"
import { getData } from "@/app/create-board/page"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { useState } from "react"
import ListedTraits from "../listedTraits"
import ListedChamps from "../listedChamps"
import { IsLoading } from "../isLoading"
import { upvoteBoard, downvoteBoard } from "./actions"
import { useToast } from "../ui/use-toast"

export default function BoardList({ boards }: any) {
  const [loadMore, setLoadMore] = useState(6) //defaault posts shown on main page

  const { toast } = useToast()

  const { data, error, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
    staleTime: Infinity
  })

  if (error) {
    return <div>Erorr loading data</div>
  }

  if (isLoading) {
    return <IsLoading />
  }

  return (
    <>
      {boards.slice(0, loadMore).map((board: any, i: number) => {
        const filteredData = JSON.parse(board.board)
          .flat()
          .filter((slot: any) => slot.name !== "")
          .slice(0, 10)

        return (
          <div
            key={board.id}
            className="flex border-[1px] justify-between items-center gap-2 py-5 px-8 w-full mt-4 rounded-sm"
          >
            <div className="flex gap-8 items-center">
              <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-1 bg-neutral-900 py-1 px-2 items-center justify-center rounded-sm">
                  <ChevronUp
                    onClick={async () => {
                      try {
                        await upvoteBoard(board.id)
                        toast({
                          title: "Successfully upvoted board!"
                        })
                      } catch (error) {
                        if (error.message === "Already upvoted") {
                          toast({
                            title: "You have already upvoted this board.",
                            variant: "destructive"
                          })
                        }
                      }
                    }}
                    size={22}
                    className="cursor-pointer hover:opacity-80 transition ease-in-out duration-150"
                  />
                  <div className="text-sm font-bold">{board.votes.length}</div>
                  <ChevronDown
                    onClick={async () => {
                      try {
                        await downvoteBoard(board.id)
                        toast({
                          title: "Successfully downvoted board!"
                        })
                      } catch (error) {
                        if (
                          error.message === "You have not upvoted this board."
                        ) {
                          toast({
                            title: "You have not upvoted this board.",
                            variant: "destructive"
                          })
                        }
                      }
                    }}
                    size={24}
                    className="cursor-pointer hover:opacity-80 transition ease-in-out duration-150"
                  />
                </div>
              </div>

              <h1 className="text-md capitalize font-semibold min-w-[200px] flex items-center justify-start">
                {board.title}
              </h1>
            </div>

            <div className="flex items-center justify-start max-w-[200px] min-w-[200px] flex-wrap">
              <ListedTraits
                board={board.board}
                isLoading={isLoading}
                data={data}
              />
            </div>

            <div className="flex gap-2 items-center justify-start min-w-[540px]">
              <ListedChamps filteredData={filteredData} />
            </div>

            <Button asChild variant={"outline"}>
              <Link href={`/board/${board.id}`}>View Build</Link>
            </Button>
          </div>
        )
      })}
      {boards.length > loadMore && (
        <Button
          className="w-[160px] my-6"
          variant={"outline"}
          onClick={() => setLoadMore((prev) => prev + 6)}
        >
          Load More
        </Button>
      )}
    </>
  )
}
