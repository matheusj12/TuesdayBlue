import { useState } from "react"
import { ArrowRight, Plus, Workflow, Zap } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { automations } from "@/mock"
import { formatRelativeTime } from "@/utils/format"
import { cn } from "@/lib/utils"
import type { AutomationNode } from "@/types"

const nodeStyles: Record<AutomationNode["kind"], string> = {
  trigger: "border-accent/30 bg-accent/10 text-accent",
  condition: "border-warning/30 bg-warning/10 text-warning",
  action: "border-primary/30 bg-primary/10 text-accent",
}

export default function AutomationPage() {
  const [active, setActive] = useState(
    Object.fromEntries(automations.map((a) => [a.id, a.active])),
  )

  return (
    <div>
      <PageHeader
        title="Automation"
        description="No-code workflow builder — trigger, condition, action."
        actions={
          <Button className="glow-button">
            <Plus className="size-4" />
            New Automation
          </Button>
        }
      />

      <div className="space-y-4">
        {automations.map((automation) => (
          <div key={automation.id} className="glass-card rounded-xl p-5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-accent">
                  <Workflow className="size-4.5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">{automation.name}</h3>
                  <p className="text-xs text-text-secondary">{automation.description}</p>
                  <p className="mt-1 text-[11px] text-text-secondary">
                    {automation.runs.toLocaleString()} runs · last run {formatRelativeTime(automation.lastRun)}
                  </p>
                </div>
              </div>
              <Switch
                checked={active[automation.id]}
                onCheckedChange={(checked) => setActive((prev) => ({ ...prev, [automation.id]: checked }))}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
              {automation.nodes.map((node, index) => (
                <div key={node.id} className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex min-w-40 flex-col rounded-lg border px-3 py-2",
                      nodeStyles[node.kind],
                    )}
                  >
                    <span className="flex items-center gap-1 text-[10px] font-semibold tracking-wide uppercase opacity-80">
                      {node.kind === "trigger" && <Zap className="size-3" />}
                      {node.kind}
                    </span>
                    <span className="text-xs font-medium text-text-primary">{node.label}</span>
                    {node.detail && <span className="text-[11px] opacity-70">{node.detail}</span>}
                  </div>
                  {index < automation.nodes.length - 1 && (
                    <ArrowRight className="size-3.5 shrink-0 text-text-secondary" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
