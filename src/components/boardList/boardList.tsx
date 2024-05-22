"use client"

import { useQuery } from "@tanstack/react-query"
import { getData } from "@/app/create-board/page"
import { useState } from "react"
import { Button } from "../ui/button"
import { IsLoading } from "../isLoading"
import { Input } from "../ui/input"
import {
  ArrowUp01,
  ArrowDown01,
  ArrowUpAZ,
  ArrowDownAZ,
  SquarePen
} from "lucide-react"
import Board from "./board"
import Link from "next/link"

export default function BoardList({ boards }: any) {
  const [loadMore, setLoadMore] = useState(5)
  const [likes, setLikes] = useState(false)
  const [search, setSearch] = useState("")

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
      <div className="flex justify-between w-full">
        <h1 className="text-lg font-semibold md:text-2xl">Popular Boards</h1>
        <div className="flex gap-2 flex-wrap justify-end">
          <Input
            className="w-[200px]"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <Button
            onClick={() => setLikes((prev) => !prev)}
            className={` ${likes && "bg-neutral-800"} flex items-center gap-2`}
            variant={"outline"}
          >
            Likes
            {likes ? <ArrowDown01 size={16} /> : <ArrowUp01 size={16} />}
          </Button>
          <Button
            className="flex items-center gap-2"
            asChild
            variant={"outline"}
          >
            <Link href="/create-board">
              Create <SquarePen size={16} />
            </Link>
          </Button>
        </div>
      </div>
      {boards
        .slice(0, loadMore)
        .sort((a, b) => {
          if (likes) {
            return b.title.localeCompare(a.title)
          } else {
            return a.title.localeCompare(b.title)
          }
        })
        .filter((b) => b.title.toLowerCase().includes(search))
        .map((board: any, i: number) => {
          const filteredData = JSON.parse(board.board)
            .flat()
            .filter((slot: any) => slot.name !== "")
            .slice(0, 10)
          return (
            <Board
              key={board.id}
              board={board}
              data={data}
              isLoading={isLoading}
              filteredData={filteredData}
            />
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
