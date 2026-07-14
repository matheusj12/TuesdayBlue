import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Menu, Sparkles } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { navGroups } from "./nav-config"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-text-secondary md:hidden">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 border-border-subtle bg-surface-sidebar p-4">
        <SheetHeader className="mb-4 p-0">
          <SheetTitle className="flex items-center gap-2.5 text-text-primary">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="size-4 text-white" />
            </span>
            TuesdayBlue
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-5 overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.label ?? "primary"}>
              {group.label && (
                <p className="mb-1.5 px-3 text-label-md font-semibold tracking-wide text-text-secondary/70 uppercase">
                  {group.label}
                </p>
              )}
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                        isActive ? "bg-white/5 text-accent" : "text-text-secondary hover:bg-white/5 hover:text-text-primary",
                      )
                    }
                  >
                    <item.icon className="size-4.5 shrink-0" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
