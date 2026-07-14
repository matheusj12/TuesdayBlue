import type { ProjectStatus, TaskPriority, TaskStatus } from "@/types"

interface StatusMeta {
  label: string
  className: string
}

export const taskStatusMeta: Record<TaskStatus, StatusMeta> = {
  backlog: { label: "Backlog", className: "bg-white/5 text-text-secondary border-border-subtle" },
  todo: { label: "To Do", className: "bg-accent/10 text-accent border-accent/20" },
  in_progress: { label: "In Progress", className: "bg-primary/15 text-accent border-primary/30" },
  review: { label: "Review", className: "bg-warning/10 text-warning border-warning/20" },
  qa: { label: "QA", className: "bg-purple-500/10 text-purple-300 border-purple-500/20" },
  done: { label: "Done", className: "bg-success/10 text-success border-success/20" },
}

export const taskPriorityMeta: Record<TaskPriority, StatusMeta> = {
  low: { label: "Low", className: "bg-white/5 text-text-secondary border-border-subtle" },
  medium: { label: "Medium", className: "bg-accent/10 text-accent border-accent/20" },
  high: { label: "High", className: "bg-warning/10 text-warning border-warning/20" },
  urgent: { label: "Urgent", className: "bg-orange-500/10 text-orange-300 border-orange-500/20" },
  critical: { label: "Critical", className: "bg-danger/10 text-danger border-danger/20" },
}

export const projectStatusMeta: Record<ProjectStatus, StatusMeta> = {
  on_track: { label: "On Track", className: "bg-success/10 text-success border-success/20" },
  at_risk: { label: "At Risk", className: "bg-warning/10 text-warning border-warning/20" },
  delayed: { label: "Delayed", className: "bg-danger/10 text-danger border-danger/20" },
  completed: { label: "Completed", className: "bg-white/5 text-text-secondary border-border-subtle" },
  planning: { label: "Planning", className: "bg-accent/10 text-accent border-accent/20" },
}
