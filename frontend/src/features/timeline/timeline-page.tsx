import { Link } from "react-router-dom"
import { differenceInCalendarDays, format } from "date-fns"
import { Milestone } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ProjectStatusBadge } from "@/components/status-badge"
import { projects } from "@/mock"

const active = projects.filter((p) => !p.archived)
const rangeStart = new Date(Math.min(...active.map((p) => new Date(p.startDate).getTime())))
const rangeEnd = new Date(Math.max(...active.map((p) => new Date(p.endDate).getTime())))
const totalDays = differenceInCalendarDays(rangeEnd, rangeStart) || 1

function pct(date: string) {
  return (differenceInCalendarDays(new Date(date), rangeStart) / totalDays) * 100
}

const months = Array.from({ length: Math.ceil(totalDays / 30) + 1 }, (_, i) => {
  const d = new Date(rangeStart)
  d.setDate(d.getDate() + i * 30)
  return d
})

export default function TimelinePage() {
  return (
    <div>
      <PageHeader
        title="Timeline"
        description="Cross-project schedule with milestones and dependencies at a glance."
      />

      <div className="glass-card overflow-x-auto rounded-xl p-6">
        <div className="min-w-[900px]">
          <div className="mb-4 grid grid-cols-[220px_1fr] gap-4">
            <div />
            <div className="relative h-5 border-b border-border-subtle">
              {months.map((month, i) => (
                <span
                  key={i}
                  className="absolute -translate-x-1/2 text-[11px] text-text-secondary"
                  style={{ left: `${pct(month.toISOString())}%` }}
                >
                  {format(month, "MMM yyyy")}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {active.map((project) => {
              const left = Math.max(0, pct(project.startDate))
              const right = Math.min(100, pct(project.endDate))
              const width = Math.max(right - left, 2)

              return (
                <div key={project.id} className="grid grid-cols-[220px_1fr] items-center gap-4">
                  <Link
                    to={`/projects/${project.id}`}
                    className="min-w-0 truncate text-sm font-medium text-text-primary hover:text-accent"
                  >
                    {project.name}
                  </Link>
                  <div className="relative h-8 rounded-lg bg-white/[0.03]">
                    <div
                      className="absolute top-1/2 flex h-6 -translate-y-1/2 items-center rounded-md px-2 text-[11px] font-medium text-white shadow-sm"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        backgroundColor: project.color,
                      }}
                      title={`${format(new Date(project.startDate), "MMM d")} – ${format(new Date(project.endDate), "MMM d")}`}
                    >
                      <span className="truncate">{project.progress}%</span>
                    </div>
                    {project.milestones.map((milestone) => (
                      <span
                        key={milestone.id}
                        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-warning"
                        style={{ left: `${pct(milestone.date)}%` }}
                        title={milestone.title}
                      >
                        <Milestone className="size-3.5" />
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-xs text-text-secondary">
        <span className="flex items-center gap-1.5">
          <Milestone className="size-3.5 text-warning" /> Milestone
        </span>
        {active.slice(0, 4).map((p) => (
          <span key={p.id} className="flex items-center gap-1.5">
            <ProjectStatusBadge status={p.status} />
            {p.key}
          </span>
        ))}
      </div>
    </div>
  )
}
