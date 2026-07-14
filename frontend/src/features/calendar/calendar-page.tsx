import { useMemo, useState } from "react"
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskPriorityBadge } from "@/components/status-badge"
import { tasks } from "@/mock"
import { cn } from "@/lib/utils"
import { useTaskDrawer } from "@/features/tasks/use-task-drawer"

const REFERENCE_DATE = new Date(2026, 6, 14)
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "week" | "day" | "agenda">("month")
  const [cursor, setCursor] = useState(REFERENCE_DATE)
  const { openTask } = useTaskDrawer()

  const eventsByDay = useMemo(() => {
    const map = new Map<string, typeof tasks>()
    tasks
      .filter((t) => t.dueDate)
      .forEach((task) => {
        const key = format(new Date(task.dueDate!), "yyyy-MM-dd")
        map.set(key, [...(map.get(key) ?? []), task])
      })
    return map
  }, [])

  function eventsFor(day: Date) {
    return eventsByDay.get(format(day, "yyyy-MM-dd")) ?? []
  }

  return (
    <div>
      <PageHeader
        title="Calendar"
        description="Deadlines, milestones and sprint events across your workspace."
        actions={
          <Button className="glow-button">
            <Plus className="size-4" />
            New Event
          </Button>
        }
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="border-border-subtle" onClick={() => setCursor((c) => subMonths(c, 1))}>
            <ChevronLeft className="size-4" />
          </Button>
          <span className="w-36 text-center text-sm font-semibold text-text-primary">
            {format(cursor, "MMMM yyyy")}
          </span>
          <Button variant="outline" size="icon" className="border-border-subtle" onClick={() => setCursor((c) => addMonths(c, 1))}>
            <ChevronRight className="size-4" />
          </Button>
          <Button variant="ghost" className="text-xs text-accent" onClick={() => setCursor(REFERENCE_DATE)}>
            Today
          </Button>
        </div>

        <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {view === "month" && (
        <MonthView cursor={cursor} eventsFor={eventsFor} onOpenTask={openTask} />
      )}
      {view === "week" && <WeekView cursor={cursor} eventsFor={eventsFor} onOpenTask={openTask} />}
      {view === "day" && <DayView cursor={cursor} eventsFor={eventsFor} onOpenTask={openTask} />}
      {view === "agenda" && <AgendaView eventsByDay={eventsByDay} onOpenTask={openTask} />}
    </div>
  )
}

function MonthView({
  cursor,
  eventsFor,
  onOpenTask,
}: {
  cursor: Date
  eventsFor: (d: Date) => typeof tasks
  onOpenTask: (id: string) => void
}) {
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(cursor)),
    end: endOfWeek(endOfMonth(cursor)),
  })

  return (
    <div className="glass-card overflow-hidden rounded-xl">
      <div className="grid grid-cols-7 border-b border-border-subtle">
        {WEEKDAYS.map((day) => (
          <div key={day} className="px-3 py-2.5 text-center text-xs font-semibold text-text-secondary">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const events = eventsFor(day)
          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-28 border-r border-b border-border-subtle p-2 last:border-r-0",
                !isSameMonth(day, cursor) && "bg-black/20",
              )}
            >
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full text-xs",
                  isToday(day) ? "bg-primary font-semibold text-white" : "text-text-secondary",
                )}
              >
                {format(day, "d")}
              </span>
              <div className="mt-1.5 space-y-1">
                {events.slice(0, 3).map((task) => (
                  <button
                    key={task.id}
                    onClick={() => onOpenTask(task.id)}
                    className="block w-full truncate rounded bg-primary/15 px-1.5 py-0.5 text-left text-[11px] text-accent hover:bg-primary/25"
                  >
                    {task.title}
                  </button>
                ))}
                {events.length > 3 && (
                  <span className="block px-1.5 text-[10px] text-text-secondary">
                    +{events.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WeekView({
  cursor,
  eventsFor,
  onOpenTask,
}: {
  cursor: Date
  eventsFor: (d: Date) => typeof tasks
  onOpenTask: (id: string) => void
}) {
  const days = eachDayOfInterval({ start: startOfWeek(cursor), end: endOfWeek(cursor) })

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-7">
      {days.map((day) => (
        <div key={day.toISOString()} className="glass-card rounded-xl p-3">
          <p className={cn("mb-2 text-xs font-semibold", isToday(day) ? "text-accent" : "text-text-secondary")}>
            {format(day, "EEE d")}
          </p>
          <div className="space-y-1.5">
            {eventsFor(day).map((task) => (
              <button
                key={task.id}
                onClick={() => onOpenTask(task.id)}
                className="block w-full rounded-lg bg-white/5 px-2 py-1.5 text-left text-xs text-text-primary hover:bg-white/10"
              >
                {task.title}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function DayView({
  cursor,
  eventsFor,
  onOpenTask,
}: {
  cursor: Date
  eventsFor: (d: Date) => typeof tasks
  onOpenTask: (id: string) => void
}) {
  const events = eventsFor(cursor)
  const hours = Array.from({ length: 10 }, (_, i) => 8 + i)

  return (
    <div className="glass-card rounded-xl p-5">
      <p className="mb-4 text-sm font-semibold text-text-primary">{format(cursor, "EEEE, MMMM d")}</p>
      <div className="space-y-0">
        {hours.map((hour) => {
          const hourEvents = hour === 10 ? events : []
          return (
            <div key={hour} className="flex gap-4 border-t border-border-subtle py-3 first:border-t-0">
              <span className="w-14 shrink-0 text-xs text-text-secondary">{hour}:00</span>
              <div className="flex-1 space-y-1.5">
                {hourEvents.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => onOpenTask(task.id)}
                    className="flex w-full items-center justify-between rounded-lg bg-primary/10 px-3 py-2 text-left text-sm text-text-primary hover:bg-primary/15"
                  >
                    {task.title}
                    <TaskPriorityBadge priority={task.priority} />
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AgendaView({
  eventsByDay,
  onOpenTask,
}: {
  eventsByDay: Map<string, typeof tasks>
  onOpenTask: (id: string) => void
}) {
  const entries = Array.from(eventsByDay.entries()).sort(([a], [b]) => a.localeCompare(b))

  return (
    <div className="space-y-4">
      {entries.map(([dateKey, dayTasks]) => (
        <div key={dateKey} className="glass-card rounded-xl p-4">
          <p className="mb-2 text-xs font-semibold text-text-secondary">
            {format(new Date(dateKey), "EEEE, MMMM d yyyy")}
          </p>
          <div className="space-y-1.5">
            {dayTasks.map((task) => (
              <button
                key={task.id}
                onClick={() => onOpenTask(task.id)}
                className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm hover:bg-white/5"
              >
                <span className="truncate text-text-primary">{task.title}</span>
                <TaskPriorityBadge priority={task.priority} />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

