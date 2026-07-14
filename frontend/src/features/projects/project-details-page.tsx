import { Link, Navigate, useParams } from "react-router-dom"
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  KanbanSquare,
} from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ProjectStatusBadge } from "@/components/status-badge"
import { UserAvatar } from "@/components/user-avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { getProjectById, getUserById, getBoardsByProject, getTasksByProject } from "@/mock"
import { formatCurrency, formatDate } from "@/utils/format"
import { TaskStatusBadge } from "@/components/status-badge"

export default function ProjectDetailsPage() {
  const { projectId } = useParams()
  const project = projectId ? getProjectById(projectId) : undefined

  if (!project) return <Navigate to="/projects" replace />

  const owner = getUserById(project.ownerId)
  const members = project.memberIds.map(getUserById).filter(Boolean) as NonNullable<
    ReturnType<typeof getUserById>
  >[]
  const boards = getBoardsByProject(project.id)
  const tasks = getTasksByProject(project.id)
  const budgetPct = Math.round((project.budgetSpent / project.budgetTotal) * 100)

  return (
    <div>
      <Link
        to="/projects"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="size-3.5" />
        Back to Projects
      </Link>

      <PageHeader
        eyebrow={project.key}
        title={project.name}
        description={project.description}
        actions={
          <div className="flex items-center gap-2">
            <ProjectStatusBadge status={project.status} />
            <Button variant="outline" className="border-border-subtle">
              Share
            </Button>
          </div>
        }
      />

      <div className="mb-gutter grid grid-cols-2 gap-gutter lg:grid-cols-4">
        <StatBlock label="Progress" value={`${project.progress}%`}>
          <Progress value={project.progress} className="mt-2 h-1.5" />
        </StatBlock>
        <StatBlock label="Health score" value={`${project.health}%`}>
          <Progress value={project.health} className="mt-2 h-1.5" />
        </StatBlock>
        <StatBlock label="Budget used" value={`${budgetPct}%`}>
          <p className="mt-2 text-xs text-text-secondary">
            {formatCurrency(project.budgetSpent)} of {formatCurrency(project.budgetTotal)}
          </p>
        </StatBlock>
        <StatBlock label="Timeline" value={formatDate(project.endDate)}>
          <p className="mt-2 text-xs text-text-secondary">Started {formatDate(project.startDate)}</p>
        </StatBlock>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="boards">Boards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
          <div className="glass-card rounded-xl p-6 lg:col-span-2">
            <h3 className="mb-4 text-base font-semibold text-text-primary">Recent tasks</h3>
            <div className="space-y-1">
              {tasks.slice(0, 8).map((task) => (
                <div key={task.id} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/5">
                  <span className="flex-1 truncate text-sm text-text-primary">{task.title}</span>
                  <TaskStatusBadge status={task.status} />
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-xl p-6">
            <h3 className="mb-4 text-base font-semibold text-text-primary">Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-text-secondary">Owner</dt>
                <dd className="flex items-center gap-1.5 text-text-primary">
                  {owner && <UserAvatar user={owner} size="xs" />}
                  {owner?.name}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-secondary">Visibility</dt>
                <dd className="text-text-primary capitalize">{project.visibility}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-secondary">Members</dt>
                <dd className="text-text-primary">{members.length}</dd>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-text-secondary">
                    #{tag}
                  </span>
                ))}
              </div>
            </dl>
          </div>
        </TabsContent>

        <TabsContent value="milestones">
          <div className="glass-card rounded-xl p-6">
            <ol className="space-y-5 border-l border-border-subtle pl-5">
              {project.milestones.map((milestone) => (
                <li key={milestone.id} className="relative">
                  <span
                    className={`absolute top-1 -left-[25px] flex size-4 items-center justify-center rounded-full ${
                      milestone.done ? "bg-success" : "bg-white/10"
                    }`}
                  >
                    {milestone.done ? (
                      <CheckCircle2 className="size-4 text-success" />
                    ) : (
                      <Circle className="size-3 text-text-secondary" />
                    )}
                  </span>
                  <p className={`text-sm font-medium ${milestone.done ? "text-text-secondary line-through" : "text-text-primary"}`}>
                    {milestone.title}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-text-secondary">
                    <Calendar className="size-3" />
                    {formatDate(milestone.date)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <div key={member.id} className="glass-card flex items-center gap-3 rounded-xl p-4">
                <UserAvatar user={member} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-text-primary">{member.name}</p>
                  <p className="truncate text-xs text-text-secondary">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risks">
          {project.risks.length === 0 ? (
            <div className="glass-card rounded-xl p-8 text-center text-sm text-text-secondary">
              No risks logged for this project.
            </div>
          ) : (
            <div className="space-y-3">
              {project.risks.map((risk) => (
                <div key={risk.id} className="glass-card flex items-start gap-3 rounded-xl p-4">
                  <AlertTriangle
                    className={`mt-0.5 size-4 shrink-0 ${
                      risk.severity === "high"
                        ? "text-danger"
                        : risk.severity === "medium"
                          ? "text-warning"
                          : "text-text-secondary"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{risk.title}</p>
                    <p className="mt-1 text-xs text-text-secondary">{risk.mitigation}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="boards">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {boards.map((board) => (
              <Link
                key={board.id}
                to={`/boards/${board.id}`}
                className="glass-card flex items-center gap-3 rounded-xl p-4"
              >
                <span
                  className="flex size-9 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: board.color }}
                >
                  <KanbanSquare className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-text-primary">{board.name}</p>
                  <p className="truncate text-xs text-text-secondary">{board.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatBlock({
  label,
  value,
  children,
}: {
  label: string
  value: string
  children?: React.ReactNode
}) {
  return (
    <div className="glass-card rounded-xl p-5">
      <p className="text-label-md font-semibold tracking-wide text-text-secondary uppercase">{label}</p>
      <p className="mt-1 text-2xl font-bold text-text-primary">{value}</p>
      {children}
    </div>
  )
}
