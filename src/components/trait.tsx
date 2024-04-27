"use client"

import { Play } from "lucide-react"

export function Trait({ trait, value, icon, info }: any) {
  return (
    <div
      key={trait}
      className="flex items-center gap-3 w-full bg-white/20 rounded-sm h-12"
    >
      <div className=" hexagon-small flex items-center justify-center ml-2">
        <img className="w-5" src={icon} />
      </div>

      <div className="w-5 h-[32px] flex items-center justify-center rounded-sm bg-neutral-200/30">
        {value}
      </div>
      <div className="">
        <div className="text-sm">{trait}</div>
        <div className="flex gap-1 text-[12px]">
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
