import {
  Activity,
  BarChart3,
  Calendar,
  ClipboardList,
  Gauge,
  KanbanSquare,
  List,
  Plus,
  Table2,
} from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { getUserById, savedDashboards } from "@/mock"
import { formatRelativeTime } from "@/utils/format"
import type { DashboardWidget } from "@/types"

const widgetIcons: Record<DashboardWidget["type"], typeof Gauge> = {
  kpi: Gauge,
  chart: BarChart3,
  list: List,
  calendar: Calendar,
  timeline: ClipboardList,
  kanban: KanbanSquare,
  activity: Activity,
  table: Table2,
}

export default function DashboardsGalleryPage() {
  return (
    <div>
      <PageHeader
        title="Dashboards"
        description="Saved dashboards curated by teams across the workspace."
        actions={
          <Button className="glow-button">
            <Plus className="size-4" />
            New Dashboard
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-3">
        {savedDashboards.map((dashboard) => {
          const owner = getUserById(dashboard.owner)
          return (
            <div key={dashboard.id} className="glass-card rounded-xl p-5">
              <div className="mb-3 grid grid-cols-3 gap-1.5">
                {dashboard.widgets.slice(0, 3).map((widget) => {
                  const Icon = widgetIcons[widget.type]
                  return (
                    <div
                      key={widget.id}
                      className="flex aspect-video items-center justify-center rounded-md bg-white/5 text-text-secondary"
                    >
                      <Icon className="size-4" />
                    </div>
                  )
                })}
              </div>
              <h3 className="mb-1 text-sm font-semibold text-text-primary">{dashboard.name}</h3>
              <p className="mb-3 line-clamp-2 text-xs text-text-secondary">{dashboard.description}</p>
              <div className="flex items-center justify-between border-t border-border-subtle pt-3 text-xs text-text-secondary">
                <span>{owner?.name}</span>
                <span>Updated {formatRelativeTime(dashboard.updatedAt)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
