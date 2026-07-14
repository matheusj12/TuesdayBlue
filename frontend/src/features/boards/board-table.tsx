import { useMemo, useState } from "react"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AvatarStack } from "@/components/user-avatar"
import { TaskPriorityBadge, TaskStatusBadge } from "@/components/status-badge"
import { getUserById } from "@/mock/users"
import { formatDate } from "@/utils/format"
import type { Task } from "@/types"

const columnHelper = createColumnHelper<Task>()

export function BoardTable({ tasks, onOpenTask }: { tasks: Task[]; onOpenTask: (id: string) => void }) {
  const [sorting, setSorting] = useState<SortingState>([])

  const columns = useMemo(
    () => [
      columnHelper.accessor("code", { header: "ID", cell: (info) => info.getValue() }),
      columnHelper.accessor("title", {
        header: "Task",
        cell: (info) => <span className="font-medium text-text-primary">{info.getValue()}</span>,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => <TaskStatusBadge status={info.getValue()} />,
      }),
      columnHelper.accessor("priority", {
        header: "Priority",
        cell: (info) => <TaskPriorityBadge priority={info.getValue()} />,
      }),
      columnHelper.accessor("assigneeIds", {
        header: "Assignees",
        cell: (info) => {
          const users = info.getValue().map(getUserById).filter(Boolean) as NonNullable<
            ReturnType<typeof getUserById>
          >[]
          return users.length ? <AvatarStack users={users} max={3} size="xs" /> : <span className="text-text-secondary">—</span>
        },
        enableSorting: false,
      }),
      columnHelper.accessor("dueDate", {
        header: "Due",
        cell: (info) => (info.getValue() ? formatDate(info.getValue()!) : "—"),
      }),
      columnHelper.accessor("storyPoints", {
        header: "SP",
        cell: (info) => info.getValue() ?? "—",
      }),
    ],
    [],
  )

  const table = useReactTable({
    data: tasks,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="glass-card overflow-x-auto rounded-xl">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-border-subtle hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-text-secondary">
                  {header.isPlaceholder ? null : (
                    <button
                      className="flex items-center gap-1"
                      onClick={header.column.getToggleSortingHandler()}
                      disabled={!header.column.getCanSort()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && <ArrowUpDown className="size-3" />}
                    </button>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer border-border-subtle hover:bg-white/5"
              onClick={() => onOpenTask(row.original.id)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
