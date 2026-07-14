import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="glass-card flex flex-col items-center justify-center gap-3 rounded-xl px-6 py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-white/5 text-text-secondary">
        <Icon className="size-6" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        {description && <p className="mt-1 max-w-sm text-sm text-text-secondary">{description}</p>}
      </div>
      {action}
    </div>
  )
}
