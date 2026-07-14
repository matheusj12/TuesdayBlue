import type { ReactNode } from "react"
import { MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  action?: ReactNode
}

export function ChartCard({ title, subtitle, children, className, action }: ChartCardProps) {
  return (
    <div className={cn("glass-card flex flex-col rounded-xl p-6", className)}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>}
        </div>
        {action ?? (
          <Button variant="ghost" size="icon" className="size-8 text-text-secondary">
            <MoreHorizontal className="size-4" />
          </Button>
        )}
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  )
}
