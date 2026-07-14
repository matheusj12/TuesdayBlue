import { useMemo, useState } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useDroppable } from "@dnd-kit/core"
import { Plus } from "lucide-react"
import { KanbanCard } from "./kanban-card"
import type { Board, Task } from "@/types"

interface KanbanBoardProps {
  board: Board
  tasks: Task[]
  onOpenTask: (id: string) => void
}

export function KanbanBoard({ board, tasks, onOpenTask }: KanbanBoardProps) {
  const [taskState, setTaskState] = useState(tasks)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  const grouped = useMemo(() => {
    const map = new Map<string, Task[]>()
    board.groups.forEach((group) => map.set(group.id, []))
    taskState.forEach((task) => {
      const list = map.get(task.groupId)
      if (list) list.push(task)
      else map.set(task.groupId, [task])
    })
    return map
  }, [board.groups, taskState])

  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    if (!over) return

    const activeTask = taskState.find((t) => t.id === active.id)
    if (!activeTask) return

    const overGroupId = board.groups.some((g) => g.id === over.id)
      ? String(over.id)
      : taskState.find((t) => t.id === over.id)?.groupId

    if (!overGroupId || overGroupId === activeTask.groupId) return

    setTaskState((prev) =>
      prev.map((t) => (t.id === activeTask.id ? { ...t, groupId: overGroupId } : t)),
    )
  }

  const activeTask = activeId ? taskState.find((t) => t.id === activeId) : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {board.groups.map((group) => (
          <KanbanColumn
            key={group.id}
            id={group.id}
            name={group.name}
            color={group.color}
            tasks={grouped.get(group.id) ?? []}
            onOpenTask={onOpenTask}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="w-72 rotate-2">
            <KanbanCard task={activeTask} onOpen={() => {}} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

function KanbanColumn({
  id,
  name,
  color,
  tasks,
  onOpenTask,
}: {
  id: string
  name: string
  color: string
  tasks: Task[]
  onOpenTask: (id: string) => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <div
      ref={setNodeRef}
      className={`flex w-72 shrink-0 flex-col rounded-xl border border-transparent p-1 transition-colors ${
        isOver ? "border-primary/30 bg-primary/5" : ""
      }`}
    >
      <div className="mb-3 flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="text-sm font-semibold text-text-primary">{name}</h3>
          <span className="text-xs text-text-secondary">{tasks.length}</span>
        </div>
        <button className="text-text-secondary hover:text-text-primary">
          <Plus className="size-3.5" />
        </button>
      </div>

      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2.5">
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} onOpen={onOpenTask} />
          ))}
          {tasks.length === 0 && (
            <div className="rounded-lg border border-dashed border-border-subtle py-8 text-center text-xs text-text-secondary">
              Drop tasks here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}
