import { useMemo, useState } from "react"
import { isBefore, isToday, isTomorrow, isWithinInterval, addDays } from "date-fns"
import { CheckCircle2, Circle, ListFilter } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { TaskPriorityBadge, TaskStatusBadge } from "@/components/status-badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/empty-state"
import { currentUser, getProjectById, getTasksAssignedTo } from "@/mock"
import { formatDate } from "@/utils/format"
import { useTaskDrawer } from "@/features/tasks/use-task-drawer"
import type { TaskPriority } from "@/types"

type FilterKey = "all" | "today" | "tomorrow" | "week" | "overdue"

const REFERENCE_DATE = new Date(2026, 6, 14)

export default function MyTasksPage() {
  const [filter, setFilter] = useState<FilterKey>("all")
  const [priority, setPriority] = useState<TaskPriority | "all">("all")
  const { openTask } = useTaskDrawer()

  const myTasks = getTasksAssignedTo(currentUser.id)

  const filtered = useMemo(() => {
    return myTasks.filter((task) => {
      if (priority !== "all" && task.priority !== priority) return false
      if (filter === "all") return true
      if (!task.dueDate) return false
      const due = new Date(task.dueDate)
      if (filter === "today") return isToday(due)
      if (filter === "tomorrow") return isTomorrow(due)
      if (filter === "week")
        return isWithinInterval(due, { start: REFERENCE_DATE, end: addDays(REFERENCE_DATE, 7) })
      if (filter === "overdue") return isBefore(due, REFERENCE_DATE) && task.status !== "done"
      return true
    })
  }, [myTasks, filter, priority])

  const overdueCount = myTasks.filter(
    (t) => t.dueDate && isBefore(new Date(t.dueDate), REFERENCE_DATE) && t.status !== "done",
  ).length

  return (
    <div>
      <PageHeader
        title="My Work"
        description={`${myTasks.length} tasks assigned to you across every project.`}
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterKey)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
            <TabsTrigger value="week">This week</TabsTrigger>
            <TabsTrigger value="overdue">
              Overdue {overdueCount > 0 && <span className="ml-1 text-danger">({overdueCount})</span>}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={priority} onValueChange={(v) => setPriority(v as typeof priority)}>
          <SelectTrigger className="w-44 border-border-subtle bg-surface-card">
            <ListFilter className="size-3.5" />
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={CheckCircle2} title="Nothing here" description="No tasks match this filter." />
      ) : (
        <div className="glass-card divide-y divide-border-subtle rounded-xl">
          {filtered.map((task) => {
            const project = getProjectById(task.projectId)
            return (
              <button
                key={task.id}
                onClick={() => openTask(task.id)}
                className="flex w-full items-center gap-3 px-5 py-3.5 text-left hover:bg-white/5"
              >
                {task.status === "done" ? (
                  <CheckCircle2 className="size-4 shrink-0 text-success" />
                ) : (
                  <Circle className="size-4 shrink-0 text-text-secondary" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text-primary">{task.title}</p>
                  <p className="text-xs text-text-secondary">
                    {project?.name} · {task.code}
                  </p>
                </div>
                <TaskStatusBadge status={task.status} />
                <TaskPriorityBadge priority={task.priority} />
                {task.dueDate && (
                  <span className="hidden w-16 shrink-0 text-right text-xs text-text-secondary sm:block">
                    {formatDate(task.dueDate)}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
