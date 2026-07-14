import { useMemo, useState } from "react"
import { Search, Sparkles, Star } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { templates } from "@/mock"
import type { TemplateCategory } from "@/types"

const categories: (TemplateCategory | "all")[] = [
  "all",
  "project",
  "board",
  "sprint",
  "checklist",
  "automation",
  "dashboard",
]

export default function TemplatesPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    return templates
      .filter((t) => category === "all" || t.category === category)
      .filter((t) => t.name.toLowerCase().includes(query.toLowerCase()))
  }, [category, query])

  return (
    <div>
      <PageHeader
        title="Templates"
        description="Jumpstart your work with curated project, board and automation templates."
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-secondary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates..."
            className="border-border-subtle bg-surface-card pl-9"
          />
        </div>
        <Tabs value={category} onValueChange={(v) => setCategory(v as typeof category)}>
          <TabsList className="flex-wrap">
            {categories.map((c) => (
              <TabsTrigger key={c} value={c} className="capitalize">
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-4">
        {filtered.map((template) => (
          <div key={template.id} className="glass-card flex flex-col rounded-xl p-5">
            <div
              className="mb-4 flex h-24 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${template.color}1a` }}
            >
              <Sparkles className="size-6" style={{ color: template.color }} />
            </div>
            <span className="mb-1 text-[10px] font-semibold tracking-wide text-text-secondary uppercase">
              {template.category}
            </span>
            <h3 className="mb-1 text-sm font-semibold text-text-primary">{template.name}</h3>
            <p className="mb-4 line-clamp-2 flex-1 text-xs text-text-secondary">{template.description}</p>
            <div className="flex items-center justify-between border-t border-border-subtle pt-3">
              <span className="flex items-center gap-1 text-xs text-text-secondary">
                <Star className="size-3.5 fill-warning text-warning" />
                {template.usageCount}
              </span>
              <Button size="sm" variant="outline" className="border-border-subtle text-xs">
                Use template
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
