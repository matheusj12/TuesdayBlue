import { cn } from "@/lib/utils"
import type { ProjectStatus, TaskPriority, TaskStatus } from "@/types"
import { projectStatusMeta, taskPriorityMeta, taskStatusMeta } from "@/utils/status"

function BadgeBase({ label, className }: { label: string; className: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        className,
      )}
    >
      {label}
    </span>
  )
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const meta = taskStatusMeta[status]
  return <BadgeBase label={meta.label} className={meta.className} />
}

export function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  const meta = taskPriorityMeta[priority]
  return <BadgeBase label={meta.label} className={meta.className} />
}

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const meta = projectStatusMeta[status]
  return <BadgeBase label={meta.label} className={meta.className} />
}
