import { useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, KanbanSquare, LayoutList, Plus, Search, Table2 } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KanbanBoard } from "./kanban-board"
import { BoardTable } from "./board-table"
import { BoardList } from "./board-list"
import { getBoardById, getProjectById, getTasksByBoard } from "@/mock"
import { useTaskDrawer } from "@/features/tasks/use-task-drawer"
import type { BoardType } from "@/types"

const viewIcons: Partial<Record<BoardType, typeof KanbanSquare>> = {
  kanban: KanbanSquare,
  table: Table2,
  list: LayoutList,
}

export default function BoardDetailsPage() {
  const { boardId } = useParams()
  const board = boardId ? getBoardById(boardId) : undefined
  const [query, setQuery] = useState("")
  const { openTask } = useTaskDrawer()

  const availableViews = (["kanban", "table", "list"] as BoardType[]).filter((v) =>
    board?.types.includes(v),
  )
  const [view, setView] = useState<BoardType>(availableViews[0] ?? "kanban")

  if (!board) return <Navigate to="/boards" replace />

  const project = getProjectById(board.projectId)
  const tasks = getTasksByBoard(board.id).filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div>
      <Link
        to="/boards"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="size-3.5" />
        Back to Boards
      </Link>

      <PageHeader
        eyebrow={project?.name}
        title={board.name}
        description={board.description}
        actions={
          <Button className="glow-button">
            <Plus className="size-4" />
            New Task
          </Button>
        }
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-secondary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter tasks..."
            className="border-border-subtle bg-surface-card pl-9"
          />
        </div>

        <Tabs value={view} onValueChange={(v) => setView(v as BoardType)}>
          <TabsList>
            {availableViews.map((v) => {
              const Icon = viewIcons[v]!
              return (
                <TabsTrigger key={v} value={v} className="capitalize">
                  <Icon className="size-4" />
                  {v}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Tabs>
      </div>

      {view === "kanban" && <KanbanBoard board={board} tasks={tasks} onOpenTask={openTask} />}
      {view === "table" && <BoardTable tasks={tasks} onOpenTask={openTask} />}
      {view === "list" && <BoardList board={board} tasks={tasks} onOpenTask={openTask} />}
    </div>
  )
}
