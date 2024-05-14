"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import ListedChamps from "@/components/listedChamps"
import ListedTraits from "@/components/listedTraits"
import { Trash2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getData } from "@/app/create-board/page"
import { IsLoading } from "@/components/isLoading"

export default function BoardCard({ board, filteredData }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
    staleTime: Infinity
  })

  if (error) {
    return <div>Error loading data</div>
  }

  if (isLoading) {
    return (
      <div>
        <IsLoading />
      </div>
    )
  }

  return (
    <div className="flex border-[1px] justify-between items-center gap-2 py-5 px-8 w-full mt-4 rounded-sm">
      <h1 className="text-md capitalize font-semibold min-w-[200px] flex items-center justify-start">
        {board.title}
      </h1>
      <div className="flex items-center justify-start max-w-[200px] min-w-[200px] flex-wrap">
        <ListedTraits board={board.board} isLoading={false} data={data} />
      </div>
      <div className="flex gap-2 items-center justify-start min-w-[540px]">
        <ListedChamps filteredData={filteredData} />
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant={"outline"}>
          <Link href={`/board/${board.id}`}>View Build</Link>
        </Button>

        <Button variant="outline">
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  )
}
