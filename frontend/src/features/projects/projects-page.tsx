import { useMemo, useState } from "react"
import { LayoutGrid, List, Plus, Search } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ProjectCard } from "./project-card"
import { ProjectRow } from "./project-row"
import { projects } from "@/mock"
import { EmptyState } from "@/components/empty-state"
import type { ProjectStatus } from "@/types"

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<ProjectStatus | "all">("all")

  const filtered = useMemo(() => {
    return projects
      .filter((p) => !p.archived)
      .filter((p) => (status === "all" ? true : p.status === status))
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
  }, [query, status])

  return (
    <div>
      <PageHeader
        title="Projects"
        description={`${filtered.length} active initiatives across the workspace`}
        actions={
          <Button className="glow-button">
            <Plus className="size-4" />
            New Project
          </Button>
        }
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-secondary" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="border-border-subtle bg-surface-card pl-9"
            />
          </div>
          <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
            <SelectTrigger className="w-40 border-border-subtle bg-surface-card">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="on_track">On Track</SelectItem>
              <SelectItem value="at_risk">At Risk</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
          <TabsList>
            <TabsTrigger value="grid">
              <LayoutGrid className="size-4" />
            </TabsTrigger>
            <TabsTrigger value="list">
              <List className="size-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No projects match your filters"
          description="Try a different search term or clear the status filter."
        />
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="glass-card divide-y divide-border-subtle rounded-xl">
          {filtered.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
