import { PageHeader } from "@/components/page-header"
import { MetricCard } from "@/components/metric-card"
import { ProjectCard } from "@/features/projects/project-card"
import { projects } from "@/mock"
import { formatCurrency } from "@/utils/format"
import { Briefcase, DollarSign, Gauge, TrendingUp } from "lucide-react"

export default function PortfolioPage() {
  const active = projects.filter((p) => !p.archived)
  const totalBudget = active.reduce((sum, p) => sum + p.budgetTotal, 0)
  const totalSpent = active.reduce((sum, p) => sum + p.budgetSpent, 0)
  const avgHealth = Math.round(active.reduce((sum, p) => sum + p.health, 0) / active.length)
  const atRisk = active.filter((p) => p.status === "at_risk" || p.status === "delayed").length

  const kpis = [
    { id: "k1", label: "Total budget", value: formatCurrency(totalBudget), delta: 0, trend: "flat" as const },
    { id: "k2", label: "Spent to date", value: formatCurrency(totalSpent), delta: 0, trend: "flat" as const },
    { id: "k3", label: "Avg. health score", value: `${avgHealth}%`, delta: 3.2, trend: "up" as const },
    { id: "k4", label: "Projects at risk", value: String(atRisk), delta: -12, trend: "down" as const },
  ]

  const byDepartment = active.reduce<Record<string, typeof active>>((acc, project) => {
    const key = project.teamIds[0] ?? "other"
    acc[key] = acc[key] ? [...acc[key], project] : [project]
    return acc
  }, {})

  return (
    <div>
      <PageHeader
        title="Portfolio"
        description="Cross-project view of budget, health and delivery risk."
      />

      <div className="mb-gutter grid grid-cols-2 gap-gutter lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <MetricCard key={kpi.id} kpi={kpi} icon={[DollarSign, TrendingUp, Gauge, Briefcase][i]} />
        ))}
      </div>

      <div className="space-y-8">
        {Object.entries(byDepartment).map(([teamId, teamProjects]) => (
          <div key={teamId}>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-text-secondary uppercase">
              {teamProjects.length} project{teamProjects.length > 1 ? "s" : ""}
            </h3>
            <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-3">
              {teamProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
