"use client"

import { useState } from "react"

export default function ShowBoard({ board }: any) {
  const data = JSON.parse(board.board)

  const [showBoard, setShowBoard] = useState<any[]>(
    Array.from({ length: 4 }, () =>
      Array.from({ length: 7 }, () => ({ name: "", img: "" }))
    )
  )

  return (
    <div className="grid grid-cols-5 mt-10">
      <div className="col-span-1">traits</div>
      <div className="flex flex-col items-center col-span-3">
        {showBoard.map((row: any, rowIndex: number) => (
          <div
            key={rowIndex}
            className={`flex ${
              rowIndex % 2 !== 0 ? "ml-[100px] relative" : ""
            } gap-4 mr-[50px]`}
          >
            {row.map((col: any, colIndex: number) => (
              <div key={colIndex} className="bg-neutral-900 hexagon relative">
                {col.name}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="col-span-1">desc</div>
    </div>
  )
}
