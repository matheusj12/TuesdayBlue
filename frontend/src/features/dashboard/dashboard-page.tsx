import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  ArrowUpRight,
  Bug,
  CheckCircle2,
  Clock,
  Flame,
  Gauge,
  Lightbulb,
  ListChecks,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { MetricCard } from "@/components/metric-card"
import { ChartCard } from "@/components/chart-card"
import { UserAvatar } from "@/components/user-avatar"
import { TaskStatusBadge } from "@/components/status-badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { chartTooltipStyle } from "@/components/chart-theme"
import {
  burndownData,
  currentUser,
  executiveKpis,
  getTasksAssignedTo,
  getUserById,
  notifications,
  personalKpis,
  projects,
  velocityData,
} from "@/mock"
import { formatDate, formatRelativeTime } from "@/utils/format"
import { useTaskDrawer } from "@/features/tasks/use-task-drawer"

export default function DashboardPage() {
  const [mode, setMode] = useState<"personal" | "executive">("personal")
  const { openTask } = useTaskDrawer()

  const myTasks = getTasksAssignedTo(currentUser.id)
  const favoriteProjects = projects.filter((p) => p.favorite)

  return (
    <div>
      <PageHeader
        eyebrow={mode === "personal" ? "Personal dashboard" : "Executive dashboard"}
        title={mode === "personal" ? `Good morning, ${currentUser.name.split(" ")[0]}.` : "Company overview"}
        description={
          mode === "personal"
            ? "Here's your workspace overview."
            : "Real-time indicators across every active initiative."
        }
        actions={
          <Tabs value={mode} onValueChange={(value) => setMode(value as typeof mode)}>
            <TabsList>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="executive">Executive</TabsTrigger>
            </TabsList>
          </Tabs>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.3 }}
        className="glass-card mb-8 flex items-start gap-4 rounded-xl border-l-4 border-l-warning p-4"
      >
        <Lightbulb className="mt-0.5 size-5 shrink-0 text-warning" />
        <div className="flex-1">
          <h4 className="mb-1 text-base font-semibold text-text-primary">AI Insight</h4>
          <p className="text-sm text-text-secondary">
            {mode === "personal"
              ? "You have 4 tasks due this week and 1 overdue item on SLA-41. Consider rescheduling low-priority work."
              : "3 projects are at risk of missing milestones due to resource constraints in the Design organization."}
          </p>
        </div>
        <button className="ml-auto shrink-0 text-sm font-medium whitespace-nowrap text-primary hover:underline">
          View details
        </button>
      </motion.div>

      <div className="mb-gutter grid grid-cols-2 gap-gutter lg:grid-cols-4">
        {(mode === "personal" ? personalKpis : executiveKpis).map((kpi, i) => (
          <MetricCard
            key={kpi.id}
            kpi={kpi}
            icon={[ListChecks, Clock, TrendingUp, Gauge, Flame, Bug][i % 6]}
          />
        ))}
      </div>

      <div className="mb-gutter grid grid-cols-1 gap-gutter lg:grid-cols-3">
        <ChartCard title="Sprint 42 Burndown" subtitle="Enterprise Platform Migration" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={burndownData} margin={{ left: -20, top: 8 }}>
              <defs>
                <linearGradient id="burndownFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="label" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area
                type="monotone"
                dataKey="secondary"
                stroke="#434655"
                strokeDasharray="4 4"
                fill="none"
                name="Ideal"
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563EB"
                strokeWidth={2.5}
                fill="url(#burndownFill)"
                name="Actual"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Velocity" subtitle="Story points per sprint">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={velocityData} margin={{ left: -20, top: 8 }}>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="label" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="value" fill="#5AA9FF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
        <div className="glass-card rounded-xl p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-text-primary">
              {mode === "personal" ? "My tasks" : "Tasks needing attention"}
            </h3>
            <Link to="/my-tasks" className="text-sm font-medium text-accent hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-1">
            {myTasks.slice(0, 6).map((task) => (
              <button
                key={task.id}
                onClick={() => openTask(task.id)}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-white/5"
              >
                <CheckCircle2
                  className={`size-4 shrink-0 ${task.status === "done" ? "text-success" : "text-text-secondary"}`}
                />
                <span className="flex-1 truncate text-sm text-text-primary">{task.title}</span>
                <TaskStatusBadge status={task.status} />
                {task.dueDate && (
                  <span className="hidden shrink-0 text-xs text-text-secondary sm:block">
                    {formatDate(task.dueDate)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-gutter">
          <div className="glass-card rounded-xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-text-primary">Favorite projects</h3>
              <Link to="/projects" className="text-xs font-medium text-accent hover:underline">
                See all
              </Link>
            </div>
            <div className="space-y-3">
              {favoriteProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="block rounded-lg px-1 py-1.5 transition-colors hover:bg-white/5"
                >
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="truncate font-medium text-text-primary">{project.name}</span>
                    <ArrowUpRight className="size-3.5 shrink-0 text-text-secondary" />
                  </div>
                  <Progress value={project.progress} className="h-1.5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h3 className="mb-4 text-base font-semibold text-text-primary">Recent activity</h3>
            <div className="space-y-3.5">
              {notifications.slice(0, 4).map((notification) => {
                const actor = notification.actorId ? getUserById(notification.actorId) : undefined
                return (
                  <div key={notification.id} className="flex gap-2.5">
                    {actor ? (
                      <UserAvatar user={actor} size="xs" />
                    ) : (
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-accent">
                        <Sparkles className="size-3" />
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs text-text-primary">{notification.title}</p>
                      <p className="text-[11px] text-text-secondary">
                        {formatRelativeTime(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {mode === "executive" && (
        <div className="mt-gutter glass-card flex items-center gap-4 rounded-xl p-5">
          <Users className="size-5 text-accent" />
          <p className="text-sm text-text-secondary">
            Team capacity is at <span className="font-semibold text-text-primary">82%</span> across 5 squads
            this sprint.
          </p>
          <Link to="/teams" className="ml-auto text-sm font-medium text-accent hover:underline">
            View teams
          </Link>
        </div>
      )}
    </div>
  )
}
