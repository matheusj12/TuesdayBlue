import { Link } from "react-router-dom"
import { Calendar, KanbanSquare, LayoutList, Map, Plus, Table2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { boards, getProjectById, getTasksByBoard } from "@/mock"
import type { BoardType } from "@/types"

const typeIcons: Record<BoardType, typeof KanbanSquare> = {
  kanban: KanbanSquare,
  table: Table2,
  list: LayoutList,
  timeline: Calendar,
  calendar: Calendar,
  roadmap: Map,
  sprint: KanbanSquare,
  gallery: LayoutList,
}

export default function BoardsPage() {
  return (
    <div>
      <PageHeader
        title="Boards"
        description="Every board across your active projects, ready in Kanban, Table, List and more."
        actions={
          <Button className="glow-button">
            <Plus className="size-4" />
            New Board
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-3">
        {boards.map((board) => {
          const project = getProjectById(board.projectId)
          const taskCount = getTasksByBoard(board.id).length
          const Icon = typeIcons[board.defaultType]

          return (
            <Link key={board.id} to={`/boards/${board.id}`} className="glass-card rounded-xl p-5">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="flex size-10 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: board.color }}
                >
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-text-primary">{board.name}</h3>
                  <p className="truncate text-xs text-text-secondary">{project?.name}</p>
                </div>
              </div>
              <p className="mb-4 line-clamp-2 text-xs text-text-secondary">{board.description}</p>
              <div className="flex items-center justify-between border-t border-border-subtle pt-3 text-xs text-text-secondary">
                <span>{taskCount} tasks</span>
                <div className="flex gap-1">
                  {board.types.slice(0, 4).map((type) => {
                    const TypeIcon = typeIcons[type]
                    return (
                      <span
                        key={type}
                        className="flex size-6 items-center justify-center rounded-md bg-white/5"
                        title={type}
                      >
                        <TypeIcon className="size-3.5" />
                      </span>
                    )
                  })}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
