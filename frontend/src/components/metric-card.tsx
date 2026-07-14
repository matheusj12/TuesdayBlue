import { motion } from "framer-motion"
import { ArrowDownRight, ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Kpi } from "@/types"

interface MetricCardProps {
  kpi: Kpi
  icon?: LucideIcon
  className?: string
}

export function MetricCard({ kpi, icon: Icon, className }: MetricCardProps) {
  const isUp = kpi.trend === "up"
  const isDown = kpi.trend === "down"

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn("glass-card flex flex-col gap-3 rounded-xl p-5", className)}
    >
      <div className="flex items-center justify-between">
        <span className="text-label-md font-semibold tracking-wide text-text-secondary uppercase">
          {kpi.label}
        </span>
        {Icon && (
          <span className="flex size-8 items-center justify-center rounded-lg bg-white/5 text-accent">
            <Icon className="size-4" />
          </span>
        )}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold tracking-tight text-text-primary">{kpi.value}</span>
        <span
          className={cn(
            "flex items-center gap-0.5 text-xs font-semibold",
            isUp && "text-success",
            isDown && "text-danger",
            !isUp && !isDown && "text-text-secondary",
          )}
        >
          {isUp && <ArrowUpRight className="size-3.5" />}
          {isDown && <ArrowDownRight className="size-3.5" />}
          {!isUp && !isDown && <ArrowRight className="size-3.5" />}
          {Math.abs(kpi.delta)}%
        </span>
      </div>
    </motion.div>
  )
}
