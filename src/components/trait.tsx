"use client"

import { Play } from "lucide-react"

export function Trait({ trait, value, icon, info, styles }: any) {
  return (
    <div
      key={trait}
      className="flex items-center gap-3 w-full bg-neutral-200 dark:bg-white/20 rounded-sm h-12"
    >
      <div
        className={`${
          styles.includes(1)
            ? "bg-[url(/bronze.svg)] bg-contain"
            : styles.includes(3)
            ? "bg-[url(/silver.svg)] bg-contain"
            : styles.includes(4)
            ? "bg-[url(/gold.svg)] bg-contain"
            : styles.includes(5)
            ? "bg-[url(/gold.svg)] bg-contain"
            : styles.includes(6)
            ? "bg-[url(/unique.svg)] bg-contain"
            : ""
        } flex items-center justify-center ml-2`}
      >
        <img className="h-8 min-w-8 p-[7px]" src={icon} />
      </div>

      <div className="w-5 h-[32px] flex items-center justify-center rounded-sm bg-neutral-200/30">
        {value}
      </div>
      <div className="">
        <div className="text-sm pr-2">{trait}</div>
        <div className="flex gap-1 text-[12px] pr-2">
          {info.effects.map((effect: any, index: number) => (
            <div key={index} className="flex items-center gap-1">
              {index !== 0 && index % 2 === 0 && (
                <div>
                  <Play size={8} />
                </div>
              )}
              <div className="">{effect.minUnits}</div>
              {index !== info.effects.length - 1 && index % 2 === 0 && (
                <div>
                  <Play size={8} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
