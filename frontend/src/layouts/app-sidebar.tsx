import { NavLink } from "react-router-dom"
import { Plus, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { navGroups } from "./nav-config"
import { WorkspaceSwitcher } from "./workspace-switcher"

export function AppSidebar() {
  return (
    <nav className="fixed top-0 left-0 z-50 hidden h-screen w-sidebar-width flex-col border-r border-border-subtle bg-surface-sidebar p-gutter md:flex">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary shadow-[0_0_20px_rgba(37,99,235,0.4)]">
          <Sparkles className="size-4.5 text-white" />
        </div>
        <div>
          <h1 className="text-base leading-tight font-bold text-text-primary">TuesdayBlue</h1>
          <p className="text-label-md tracking-wide text-text-secondary uppercase">Enterprise OS</p>
        </div>
      </div>

      <WorkspaceSwitcher />

      <button className="glow-button mt-4 mb-6 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-white transition-all hover:brightness-110 active:scale-[0.98]">
        <Plus className="size-4" />
        New Project
      </button>

      <div className="scrollbar-none flex-1 space-y-5 overflow-y-auto">
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
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                      isActive
                        ? "bg-white/5 text-accent"
                        : "text-text-secondary hover:bg-white/5 hover:text-text-primary",
                    )
                  }
                >
                  <item.icon className="size-4.5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-col gap-1 border-t border-border-subtle pt-3">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              isActive ? "bg-white/5 text-accent" : "text-text-secondary hover:bg-white/5 hover:text-text-primary",
            )
          }
        >
          <div className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
            AR
          </div>
          Profile
        </NavLink>
      </div>
    </nav>
  )
}
