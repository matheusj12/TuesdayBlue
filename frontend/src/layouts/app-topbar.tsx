import { Link } from "react-router-dom"
import { Bell, ChevronDown, Plus, Search, Sparkles } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import { useCommandPalette } from "./command-palette-context"
import { MobileNav } from "./mobile-nav"
import { currentUser, getUnreadCount, notifications } from "@/mock"
import { formatRelativeTime } from "@/utils/format"
import { cn } from "@/lib/utils"

export function AppTopbar() {
  const { open } = useCommandPalette()
  const unread = getUnreadCount()

  return (
    <header className="sticky top-0 z-40 flex h-topbar-height w-full items-center justify-between border-b border-border-subtle bg-background/80 px-4 backdrop-blur-xl md:px-margin-desktop">
      <div className="flex max-w-md flex-1 items-center gap-1">
        <MobileNav />
        <button
          onClick={open}
          className="flex h-10 w-full items-center gap-2 rounded-lg border border-border-subtle bg-surface-card px-3 text-left text-sm text-text-secondary transition-colors hover:border-primary/40"
        >
          <Search className="size-4 shrink-0" />
          <span className="flex-1 truncate">Search across workspace...</span>
          <kbd className="hidden shrink-0 items-center gap-0.5 rounded border border-border-subtle bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-text-secondary sm:flex">
            ⌘K
          </kbd>
        </button>
      </div>

      <div className="ml-4 flex items-center gap-1.5 sm:gap-2.5">
        <Button variant="ghost" size="icon" className="hidden text-text-secondary hover:text-text-primary sm:flex">
          <Sparkles className="size-4.5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-text-secondary hover:text-text-primary">
              <Bell className="size-4.5" />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 flex size-2 rounded-full bg-danger ring-2 ring-background" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <span className="text-xs font-normal text-text-secondary">{unread} unread</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem key={notification.id} asChild>
                <Link to="/notifications" className="flex flex-col items-start gap-0.5 whitespace-normal">
                  <span className="flex w-full items-center gap-2 text-sm font-medium text-text-primary">
                    {!notification.read && <span className="size-1.5 shrink-0 rounded-full bg-accent" />}
                    <span className="truncate">{notification.title}</span>
                  </span>
                  <span className="line-clamp-2 pl-3.5 text-xs text-text-secondary">
                    {notification.description}
                  </span>
                  <span className="pl-3.5 text-[11px] text-text-secondary/70">
                    {formatRelativeTime(notification.createdAt)}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/notifications" className="justify-center text-accent">
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="glow-button ml-1 hidden items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-white transition-all hover:brightness-110 sm:flex">
              <Plus className="size-4" />
              Create
              <ChevronDown className="size-3.5 opacity-70" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>New Project</DropdownMenuItem>
            <DropdownMenuItem>New Board</DropdownMenuItem>
            <DropdownMenuItem>New Task</DropdownMenuItem>
            <DropdownMenuItem>New Document</DropdownMenuItem>
            <DropdownMenuItem>New Automation</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn("ml-1 shrink-0 rounded-full transition-opacity hover:opacity-80")}>
              <UserAvatar user={currentUser} size="md" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="text-sm font-medium text-text-primary">{currentUser.name}</p>
              <p className="text-xs font-normal text-text-secondary">{currentUser.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
