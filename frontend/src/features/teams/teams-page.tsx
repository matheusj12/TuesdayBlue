import { PageHeader } from "@/components/page-header"
import { UserAvatar } from "@/components/user-avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { teams, users } from "@/mock"
import { cn } from "@/lib/utils"

const statusMeta: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-success/10 text-success border-success/20" },
  away: { label: "Away", className: "bg-warning/10 text-warning border-warning/20" },
  vacation: { label: "Vacation", className: "bg-accent/10 text-accent border-accent/20" },
  offline: { label: "Offline", className: "bg-white/5 text-text-secondary border-border-subtle" },
}

export default function TeamsPage() {
  return (
    <div>
      <PageHeader title="Teams" description="People directory, capacity and current workload." />

      <div className="mb-10 grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-3">
        {teams.map((team) => {
          const members = users.filter((u) => team.memberIds.includes(u.id))
          const workload = members.reduce((sum, m) => sum + m.workload, 0)
          const capacityPct = Math.round((workload / team.capacity) * 100)

          return (
            <div key={team.id} className="glass-card rounded-xl p-5">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="size-3 rounded-full" style={{ backgroundColor: team.color }} />
                <h3 className="text-sm font-semibold text-text-primary">{team.name}</h3>
              </div>
              <p className="mb-4 text-xs text-text-secondary">{team.description}</p>
              <div className="mb-3">
                <div className="mb-1.5 flex justify-between text-xs text-text-secondary">
                  <span>Capacity</span>
                  <span className="font-medium text-text-primary">{capacityPct}%</span>
                </div>
                <Progress value={capacityPct} className="h-1.5" />
              </div>
              <div className="flex -space-x-2">
                {members.slice(0, 6).map((member) => (
                  <UserAvatar key={member.id} user={member} size="sm" ring />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <h2 className="mb-4 text-lg font-semibold text-text-primary">All members</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {users.map((user) => {
          const status = statusMeta[user.status]
          const workloadPct = Math.round((user.workload / user.capacity) * 100)
          return (
            <div key={user.id} className="glass-card flex items-center gap-4 rounded-xl p-4">
              <UserAvatar user={user} size="lg" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-text-primary">{user.name}</p>
                  <Badge variant="outline" className={cn("shrink-0 text-[10px]", status.className)}>
                    {status.label}
                  </Badge>
                </div>
                <p className="truncate text-xs text-text-secondary">{user.title}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Progress
                    value={workloadPct}
                    className={cn("h-1.5 flex-1", workloadPct > 100 && "[&>div]:bg-danger")}
                  />
                  <span className="text-[11px] text-text-secondary">{user.workload}h/{user.capacity}h</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
