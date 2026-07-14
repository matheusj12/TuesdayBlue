import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { AlertTriangle, Calendar, LayoutList } from "lucide-react"
import { AvatarStack } from "@/components/user-avatar"
import { ProjectStatusBadge } from "@/components/status-badge"
import { Progress } from "@/components/ui/progress"
import { getUserById } from "@/mock/users"
import { formatCurrency, formatDate } from "@/utils/format"
import type { Project } from "@/types"

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const members = project.memberIds.map(getUserById).filter(Boolean) as NonNullable<
    ReturnType<typeof getUserById>
  >[]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="glass-card group flex h-full flex-col rounded-xl p-5"
      >
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span
              className="flex size-9 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ backgroundColor: project.color }}
            >
              {project.key.slice(0, 2)}
            </span>
            <div>
              <p className="font-mono text-[11px] text-text-secondary">{project.key}</p>
              <h3 className="line-clamp-1 text-sm font-semibold text-text-primary group-hover:text-accent">
                {project.name}
              </h3>
            </div>
          </div>
          <ProjectStatusBadge status={project.status} />
        </div>

        <p className="mb-4 line-clamp-2 flex-1 text-xs leading-relaxed text-text-secondary">
          {project.description}
        </p>

        <div className="mb-3">
          <div className="mb-1.5 flex items-center justify-between text-xs text-text-secondary">
            <span>Progress</span>
            <span className="font-medium text-text-primary">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-1.5" />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-text-secondary">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            {formatDate(project.endDate)}
          </span>
          <span className="flex items-center gap-1.5">
            <LayoutList className="size-3.5" />
            {formatCurrency(project.budgetSpent)} / {formatCurrency(project.budgetTotal)}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-border-subtle pt-3">
          <AvatarStack users={members} max={4} size="xs" />
          {project.risks.length > 0 && (
            <span className="flex items-center gap-1 text-xs text-warning">
              <AlertTriangle className="size-3.5" />
              {project.risks.length} risk{project.risks.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
