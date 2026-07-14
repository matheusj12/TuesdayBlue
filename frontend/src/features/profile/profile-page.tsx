import { Calendar, Clock, Mail, MapPin } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { UserAvatar } from "@/components/user-avatar"
import { Progress } from "@/components/ui/progress"
import { TaskStatusBadge } from "@/components/status-badge"
import { currentUser, getProjectById, getTasksAssignedTo } from "@/mock"

export default function ProfilePage() {
  const tasks = getTasksAssignedTo(currentUser.id)
  const completed = tasks.filter((t) => t.status === "done").length
  const capacityPct = Math.round((currentUser.workload / currentUser.capacity) * 100)

  return (
    <div>
      <PageHeader title="Profile" description="Your public profile across the workspace." />

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
        <div className="glass-card rounded-xl p-6 text-center lg:col-span-1">
          <UserAvatar user={currentUser} size="lg" className="mx-auto mb-4 size-20 text-xl" />
          <h2 className="text-lg font-semibold text-text-primary">{currentUser.name}</h2>
          <p className="text-sm text-text-secondary">{currentUser.title}</p>

          <div className="mt-5 space-y-2.5 border-t border-border-subtle pt-5 text-left text-sm text-text-secondary">
            <p className="flex items-center gap-2">
              <Mail className="size-3.5" /> {currentUser.email}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="size-3.5" /> {currentUser.department}
            </p>
            <p className="flex items-center gap-2">
              <Clock className="size-3.5" /> {currentUser.timezone}
            </p>
          </div>
        </div>

        <div className="space-y-gutter lg:col-span-2">
          <div className="glass-card rounded-xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-text-primary">Workload</h3>
            <div className="mb-1.5 flex justify-between text-xs text-text-secondary">
              <span>{currentUser.workload}h logged</span>
              <span>{currentUser.capacity}h capacity</span>
            </div>
            <Progress value={capacityPct} className="h-2" />
            <p className="mt-4 text-xs text-text-secondary">
              {completed} of {tasks.length} assigned tasks completed
            </p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-text-primary">
              <Calendar className="size-4" /> Recent tasks
            </h3>
            <div className="space-y-1">
              {tasks.slice(0, 6).map((task) => {
                const project = getProjectById(task.projectId)
                return (
                  <div key={task.id} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/5">
                    <span className="min-w-0 flex-1 truncate text-sm text-text-primary">{task.title}</span>
                    <span className="hidden shrink-0 text-xs text-text-secondary sm:block">
                      {project?.key}
                    </span>
                    <TaskStatusBadge status={task.status} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
