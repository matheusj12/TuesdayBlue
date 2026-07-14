import { useMemo, useState } from "react"
import {
  AlertCircle,
  AtSign,
  Bell,
  CheckCheck,
  Clock,
  MessageSquare,
  Workflow,
} from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserAvatar } from "@/components/user-avatar"
import { EmptyState } from "@/components/empty-state"
import { getUserById, notifications as initialNotifications } from "@/mock"
import { formatRelativeTime } from "@/utils/format"
import { cn } from "@/lib/utils"
import type { NotificationType } from "@/types"

const typeIcons: Record<NotificationType, typeof Bell> = {
  task_created: Bell,
  task_assigned: Bell,
  comment: MessageSquare,
  change: Clock,
  approval: CheckCheck,
  deadline: Clock,
  sla: AlertCircle,
  automation: Workflow,
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filtered = useMemo(
    () => notifications.filter((n) => (filter === "unread" ? !n.read : true)),
    [notifications, filter],
  )

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Everything that needs your attention, in one place."
        actions={
          <Button variant="outline" className="border-border-subtle" onClick={markAllRead}>
            <CheckCheck className="size-4" />
            Mark all as read
          </Button>
        }
      />

      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="mb-5">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread {notifications.some((n) => !n.read) && `(${notifications.filter((n) => !n.read).length})`}
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <EmptyState icon={AtSign} title="You're all caught up" description="No notifications to show." />
      ) : (
        <div className="glass-card divide-y divide-border-subtle rounded-xl">
          {filtered.map((notification) => {
            const actor = notification.actorId ? getUserById(notification.actorId) : undefined
            const Icon = typeIcons[notification.type]
            return (
              <button
                key={notification.id}
                onClick={() =>
                  setNotifications((prev) =>
                    prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
                  )
                }
                className={cn(
                  "flex w-full items-start gap-3 px-5 py-4 text-left hover:bg-white/5",
                  !notification.read && "bg-primary/[0.03]",
                )}
              >
                {actor ? (
                  <UserAvatar user={actor} size="sm" />
                ) : (
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-accent">
                    <Icon className="size-3.5" />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {!notification.read && <span className="size-1.5 shrink-0 rounded-full bg-accent" />}
                    <p className="truncate text-sm font-medium text-text-primary">{notification.title}</p>
                  </div>
                  <p className="mt-0.5 text-xs text-text-secondary">{notification.description}</p>
                </div>
                <span className="shrink-0 text-xs text-text-secondary">
                  {formatRelativeTime(notification.createdAt)}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
