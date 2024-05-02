import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { Coins } from "lucide-react"

export function Champion({
  champion,
  children
}: {
  champion: any
  children: any
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-2 p-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{champion.name}</h3>
              <div className="flex gap-1">
                <Coins size={14} />
                {champion.cost}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                {champion.traits.map((trait: any) => (
                  <span key={trait} className="text-xs">
                    {trait}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={`https://raw.communitydragon.org/latest/game/${champion.ability.icon
                    .toLowerCase()
                    .replace(/\.(tex|dds)$/, ".png")}`}
                  className="w-7 h-7"
                />
                <div className="flex flex-col">
                  <span>{champion.ability.name}</span>
                  <span>
                    {champion.stats.initialMana} / {champion.stats.mana}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
