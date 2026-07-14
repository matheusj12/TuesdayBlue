import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, MessageSquare, Paperclip } from "lucide-react"
import { AvatarStack } from "@/components/user-avatar"
import { TaskPriorityBadge } from "@/components/status-badge"
import { getUserById } from "@/mock/users"
import { formatDate } from "@/utils/format"
import { cn } from "@/lib/utils"
import type { Task } from "@/types"

export function KanbanCard({ task, onOpen }: { task: Task; onOpen: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  })

  const assignees = task.assigneeIds.map(getUserById).filter(Boolean) as NonNullable<
    ReturnType<typeof getUserById>
  >[]

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "glass-card group cursor-pointer rounded-lg p-3.5 select-none",
        isDragging && "opacity-40",
      )}
      onClick={() => onOpen(task.id)}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <span className="font-mono text-[11px] text-text-secondary">{task.code}</span>
        <button
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="cursor-grab text-text-secondary/40 opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
        >
          <GripVertical className="size-3.5" />
        </button>
      </div>
      <p className="mb-3 line-clamp-2 text-sm leading-snug font-medium text-text-primary">{task.title}</p>

      {task.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {task.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-text-secondary">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <TaskPriorityBadge priority={task.priority} />
        {assignees.length > 0 && <AvatarStack users={assignees} max={3} size="xs" />}
      </div>

      {(task.dueDate || task.comments.length > 0 || task.attachments.length > 0) && (
        <div className="mt-3 flex items-center gap-3 border-t border-border-subtle pt-2.5 text-[11px] text-text-secondary">
          {task.dueDate && <span>{formatDate(task.dueDate)}</span>}
          {task.comments.length > 0 && (
            <span className="flex items-center gap-1">
              <MessageSquare className="size-3" />
              {task.comments.length}
            </span>
          )}
          {task.attachments.length > 0 && (
            <span className="flex items-center gap-1">
              <Paperclip className="size-3" />
              {task.attachments.length}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
