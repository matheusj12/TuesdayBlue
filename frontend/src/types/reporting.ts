export interface Kpi {
  id: string
  label: string
  value: string
  delta: number
  trend: "up" | "down" | "flat"
  unit?: string
}

export interface ChartPoint {
  label: string
  value: number
  secondary?: number
}

export interface DashboardWidget {
  id: string
  type: "kpi" | "chart" | "list" | "calendar" | "timeline" | "kanban" | "activity" | "table"
  title: string
  size: "sm" | "md" | "lg" | "xl"
}

export interface SavedDashboard {
  id: string
  name: string
  description: string
  owner: string
  widgets: DashboardWidget[]
  updatedAt: string
}

export interface RoadmapItem {
  id: string
  title: string
  quarter: string
  lane: string
  status: "planned" | "in_progress" | "done" | "at_risk"
  progress: number
}
