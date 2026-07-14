import { Plus, Shield } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserAvatar } from "@/components/user-avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { auditLog, getUserById, users } from "@/mock"
import { formatDateTime } from "@/utils/format"
import { cn } from "@/lib/utils"

const roleStyles: Record<string, string> = {
  admin: "bg-danger/10 text-danger border-danger/20",
  manager: "bg-warning/10 text-warning border-warning/20",
  member: "bg-accent/10 text-accent border-accent/20",
  viewer: "bg-white/5 text-text-secondary border-border-subtle",
}

const permissions = [
  { id: "p1", label: "Manage billing", description: "Update plan, payment method and invoices." },
  { id: "p2", label: "Manage integrations", description: "Connect and configure third-party apps." },
  { id: "p3", label: "Export data", description: "Export projects, tasks and audit logs." },
  { id: "p4", label: "Manage automations", description: "Create and edit workspace automations." },
]

export default function AdministrationPage() {
  return (
    <div>
      <PageHeader
        title="Administration"
        description="Manage users, roles, permissions and the audit trail."
        actions={
          <Button className="glow-button">
            <Plus className="size-4" />
            Invite User
          </Button>
        }
      />

      <Tabs defaultValue="users">
        <TabsList className="mb-6">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="permissions">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <div className="glass-card divide-y divide-border-subtle rounded-xl">
            {users.map((user) => (
              <div key={user.id} className="flex items-center gap-3 px-5 py-3.5">
                <UserAvatar user={user} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-text-primary">{user.name}</p>
                  <p className="truncate text-xs text-text-secondary">{user.email}</p>
                </div>
                <Badge variant="outline" className={cn("capitalize", roleStyles[user.role])}>
                  {user.role}
                </Badge>
                <span className="hidden text-xs text-text-secondary sm:block">{user.department}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-5">
          <div className="glass-card rounded-xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <Shield className="size-4 text-accent" />
              <h3 className="text-sm font-semibold text-text-primary">Admin capabilities</h3>
            </div>
            <div className="space-y-4">
              {permissions.map((permission) => (
                <div key={permission.id} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-text-primary">{permission.label}</p>
                    <p className="text-xs text-text-secondary">{permission.description}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audit">
          <div className="glass-card divide-y divide-border-subtle rounded-xl">
            {auditLog.map((entry) => {
              const actor = getUserById(entry.actorId)
              return (
                <div key={entry.id} className="flex items-center gap-3 px-5 py-3.5">
                  {actor && <UserAvatar user={actor} size="xs" />}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-text-primary">
                      <span className="font-medium">{actor?.name}</span> {entry.action.toLowerCase()}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {entry.target} · {entry.device} · {entry.ip}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-text-secondary">{formatDateTime(entry.createdAt)}</span>
                </div>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
