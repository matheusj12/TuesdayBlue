import { PageHeader } from "@/components/page-header"
import { Progress } from "@/components/ui/progress"
import { roadmapItems } from "@/mock"
import { cn } from "@/lib/utils"
import type { RoadmapItem } from "@/types"

const quarters = ["Q3", "Q4"]

const statusStyles: Record<RoadmapItem["status"], string> = {
  planned: "border-border-subtle bg-white/[0.03]",
  in_progress: "border-primary/30 bg-primary/5",
  done: "border-success/30 bg-success/5",
  at_risk: "border-danger/30 bg-danger/5",
}

export default function RoadmapsPage() {
  const lanes = Array.from(new Set(roadmapItems.map((i) => i.lane)))

  return (
    <div>
      <PageHeader title="Roadmaps" description="Strategic initiatives grouped by workstream and quarter." />

      <div className="glass-card overflow-x-auto rounded-xl p-6">
        <div className="min-w-[760px]">
          <div className="mb-3 grid grid-cols-[180px_1fr_1fr] gap-4">
            <div />
            {quarters.map((q) => (
              <div key={q} className="text-sm font-semibold text-text-primary">
                {q} 2026
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {lanes.map((lane) => (
              <div key={lane} className="grid grid-cols-[180px_1fr_1fr] items-start gap-4">
                <p className="pt-2 text-sm font-medium text-text-secondary">{lane}</p>
                {quarters.map((quarter) => (
                  <div key={quarter} className="space-y-2">
                    {roadmapItems
                      .filter((item) => item.lane === lane && item.quarter === quarter)
                      .map((item) => (
                        <div
                          key={item.id}
                          className={cn("rounded-lg border p-3", statusStyles[item.status])}
                        >
                          <p className="mb-2 text-xs font-medium text-text-primary">{item.title}</p>
                          <Progress value={item.progress} className="h-1.5" />
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
