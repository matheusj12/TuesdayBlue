import { Link } from "react-router-dom"
import { AvatarStack } from "@/components/user-avatar"
import { ProjectStatusBadge } from "@/components/status-badge"
import { Progress } from "@/components/ui/progress"
import { getUserById } from "@/mock/users"
import { formatDate } from "@/utils/format"
import type { Project } from "@/types"

export function ProjectRow({ project }: { project: Project }) {
  const members = project.memberIds.map(getUserById).filter(Boolean) as NonNullable<
    ReturnType<typeof getUserById>
  >[]

  return (
    <Link
      to={`/projects/${project.id}`}
      className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-white/5"
    >
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
        style={{ backgroundColor: project.color }}
      >
        {project.key.slice(0, 2)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text-primary">{project.name}</p>
        <p className="font-mono text-[11px] text-text-secondary">{project.key}</p>
      </div>
      <div className="hidden w-32 shrink-0 items-center gap-2 md:flex">
        <Progress value={project.progress} className="h-1.5" />
        <span className="w-8 text-right text-xs text-text-secondary">{project.progress}%</span>
      </div>
      <span className="hidden w-24 shrink-0 text-xs text-text-secondary sm:block">
        {formatDate(project.endDate)}
      </span>
      <div className="hidden shrink-0 sm:block">
        <AvatarStack users={members} max={3} size="xs" />
      </div>
      <div className="w-24 shrink-0 text-right">
        <ProjectStatusBadge status={project.status} />
      </div>
    </Link>
  )
}
