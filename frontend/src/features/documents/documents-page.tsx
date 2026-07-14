import { useState } from "react"
import { FileText, Plus, Search } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import { documents, getUserById } from "@/mock"
import { formatRelativeTime } from "@/utils/format"
import { cn } from "@/lib/utils"
import { SimpleMarkdown } from "./simple-markdown"

export default function DocumentsPage() {
  const [activeId, setActiveId] = useState(documents[0]?.id)
  const [query, setQuery] = useState("")

  const filtered = documents.filter((d) => d.title.toLowerCase().includes(query.toLowerCase()))
  const active = documents.find((d) => d.id === activeId) ?? documents[0]
  const author = active ? getUserById(active.authorId) : undefined

  return (
    <div>
      <PageHeader
        title="Documents"
        description="Notion-style knowledge base for specs, runbooks and decisions."
        actions={
          <Button className="glow-button">
            <Plus className="size-4" />
            New Document
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-[280px_1fr]">
        <div className="glass-card h-fit rounded-xl p-3">
          <div className="relative mb-2">
            <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-text-secondary" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documents..."
              className="h-9 border-border-subtle bg-background pl-8 text-sm"
            />
          </div>
          <div className="space-y-0.5">
            {filtered.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setActiveId(doc.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm",
                  doc.id === activeId
                    ? "bg-white/5 text-text-primary"
                    : "text-text-secondary hover:bg-white/5 hover:text-text-primary",
                )}
              >
                <FileText className="size-4 shrink-0" />
                <span className="truncate">{doc.title}</span>
              </button>
            ))}
          </div>
        </div>

        {active && (
          <div className="glass-card rounded-xl p-8">
            <p className="mb-2 text-xs font-semibold tracking-wide text-accent uppercase">
              {active.workspace}
            </p>
            <h1 className="mb-4 text-2xl font-bold text-text-primary">{active.title}</h1>
            <div className="mb-8 flex items-center gap-2 border-b border-border-subtle pb-6 text-xs text-text-secondary">
              {author && <UserAvatar user={author} size="xs" />}
              <span>{author?.name}</span>
              <span>·</span>
              <span>Updated {formatRelativeTime(active.updatedAt)}</span>
            </div>
            <SimpleMarkdown content={active.content} />
          </div>
        )}
      </div>
    </div>
  )
}
