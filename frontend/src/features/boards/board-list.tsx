import { CheckCircle2, Circle } from "lucide-react"
import { AvatarStack } from "@/components/user-avatar"
import { TaskPriorityBadge } from "@/components/status-badge"
import { getUserById } from "@/mock/users"
import { formatDate } from "@/utils/format"
import type { Board, Task } from "@/types"

export function BoardList({
  board,
  tasks,
  onOpenTask,
}: {
  board: Board
  tasks: Task[]
  onOpenTask: (id: string) => void
}) {
  return (
    <div className="space-y-6">
      {board.groups.map((group) => {
        const groupTasks = tasks.filter((t) => t.groupId === group.id)
        if (groupTasks.length === 0) return null

        return (
          <div key={group.id}>
            <div className="mb-2 flex items-center gap-2 px-1">
              <span className="size-2 rounded-full" style={{ backgroundColor: group.color }} />
              <h3 className="text-sm font-semibold text-text-primary">{group.name}</h3>
              <span className="text-xs text-text-secondary">{groupTasks.length}</span>
            </div>
            <div className="glass-card divide-y divide-border-subtle rounded-xl">
              {groupTasks.map((task) => {
                const assignees = task.assigneeIds.map(getUserById).filter(Boolean) as NonNullable<
                  ReturnType<typeof getUserById>
                >[]
                return (
                  <button
                    key={task.id}
                    onClick={() => onOpenTask(task.id)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/5"
                  >
                    {task.status === "done" ? (
                      <CheckCircle2 className="size-4 shrink-0 text-success" />
                    ) : (
                      <Circle className="size-4 shrink-0 text-text-secondary" />
                    )}
                    <span className="font-mono text-[11px] text-text-secondary">{task.code}</span>
                    <span className="min-w-0 flex-1 truncate text-sm text-text-primary">{task.title}</span>
                    <TaskPriorityBadge priority={task.priority} />
                    {task.dueDate && (
                      <span className="hidden shrink-0 text-xs text-text-secondary sm:block">
                        {formatDate(task.dueDate)}
                      </span>
                    )}
                    {assignees.length > 0 && <AvatarStack users={assignees} max={3} size="xs" />}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
