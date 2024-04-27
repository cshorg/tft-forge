"use client"

export function Trait({ trait, value, icon, info }: any) {
  return (
    <div key={trait} className="flex items-center gap-2 w-full">
      <div className="w-10 h-10 bg-white/20 flex items-center justify-center">
        <img src={icon} />
      </div>

      <div className="w-6 h-10 bg-white/20 flex items-center justify-center">
        {value}
      </div>
      <div className="flex flex-col">
        <div className="text-sm font-bold">{trait}</div>
        <div className="flex gap-2">
          {info.effects.map((effect: any, index: number) => (
            <div key={index}>{effect.minUnits}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
