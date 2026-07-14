import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const workspaces = ["TuesdayBlue HQ", "Acme Client Portal", "Sandbox Workspace"]

export function WorkspaceSwitcher() {
  const [active, setActive] = useState(workspaces[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center justify-between rounded-lg border border-border-subtle bg-white/[0.03] px-3 py-2 text-left text-sm font-medium text-text-primary transition-colors hover:bg-white/5">
          <span className="truncate">{active}</span>
          <ChevronsUpDown className="size-3.5 shrink-0 text-text-secondary" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        {workspaces.map((workspace) => (
          <DropdownMenuItem key={workspace} onSelect={() => setActive(workspace)}>
            <span className="flex-1 truncate">{workspace}</span>
            {workspace === active && <Check className="size-4 text-accent" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
