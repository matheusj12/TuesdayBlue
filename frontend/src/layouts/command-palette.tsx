import { useNavigate } from "react-router-dom"
import { Folder, Search } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { allNavItems } from "./nav-config"
import { useCommandPalette } from "./command-palette-context"
import { projects } from "@/mock"

export function AppCommandPalette() {
  const { isOpen, setOpen } = useCommandPalette()
  const navigate = useNavigate()

  function go(to: string) {
    setOpen(false)
    navigate(to)
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={setOpen} title="Command Palette" description="Search TuesdayBlue">
      <CommandInput placeholder="Search projects, boards, tasks, or type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {allNavItems.map((item) => (
            <CommandItem key={item.to} onSelect={() => go(item.to)}>
              <item.icon className="size-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Projects">
          {projects.slice(0, 6).map((project) => (
            <CommandItem key={project.id} onSelect={() => go(`/projects/${project.id}`)}>
              <Folder className="size-4" />
              {project.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick actions">
          <CommandItem onSelect={() => go("/projects")}>
            <Search className="size-4" />
            Search across workspace
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
