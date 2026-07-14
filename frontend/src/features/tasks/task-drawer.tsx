import { useMemo, useState } from "react"
import {
  CheckCircle2,
  Circle,
  Clock,
  Link2,
  MessageSquare,
  Paperclip,
  Plus,
  Star,
  Tag,
  Timer,
  Users,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { UserAvatar, AvatarStack } from "@/components/user-avatar"
import { TaskPriorityBadge, TaskStatusBadge } from "@/components/status-badge"
import { getTaskById } from "@/mock/tasks"
import { getUserById, users } from "@/mock/users"
import { getProjectById } from "@/mock/projects"
import { formatDate, formatDateTime } from "@/utils/format"
import { taskPriorityMeta, taskStatusMeta } from "@/utils/status"
import type { TaskPriority, TaskStatus } from "@/types"
import { useTaskDrawer } from "./use-task-drawer"

export function TaskDrawer() {
  const { taskId, closeTask } = useTaskDrawer()
  const task = taskId ? getTaskById(taskId) : undefined

  return (
    <Sheet open={Boolean(task)} onOpenChange={(open) => !open && closeTask()}>
      <SheetContent
        side="right"
        className="w-full gap-0 overflow-y-auto bg-surface-card p-0 sm:max-w-2xl"
      >
        {task && <TaskDrawerContent taskId={task.id} />}
      </SheetContent>
    </Sheet>
  )
}

function TaskDrawerContent({ taskId }: { taskId: string }) {
  const initialTask = getTaskById(taskId)!
  const [checklists, setChecklists] = useState(initialTask.checklists)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(initialTask.comments)
  const [status, setStatus] = useState<TaskStatus>(initialTask.status)
  const [priority, setPriority] = useState<TaskPriority>(initialTask.priority)

  const project = getProjectById(initialTask.projectId)
  const assignees = initialTask.assigneeIds.map(getUserById).filter(Boolean) as NonNullable<
    ReturnType<typeof getUserById>
  >[]

  const checklistProgress = useMemo(() => {
    const allItems = checklists.flatMap((c) => c.items)
    if (allItems.length === 0) return 0
    return Math.round((allItems.filter((i) => i.done).length / allItems.length) * 100)
  }, [checklists])

  function toggleItem(checklistId: string, itemId: string) {
    setChecklists((prev) =>
      prev.map((c) =>
        c.id !== checklistId
          ? c
          : { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, done: !i.done } : i)) },
      ),
    )
  }

  function submitComment() {
    if (!newComment.trim()) return
    setComments((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        authorId: "u-alexander",
        body: newComment,
        createdAt: new Date().toISOString(),
        reactions: [],
      },
    ])
    setNewComment("")
  }

  return (
    <div className="flex h-full flex-col">
      <SheetHeader className="gap-3 border-b border-border-subtle px-6 py-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span className="font-mono">{initialTask.code}</span>
            {project && (
              <>
                <span>·</span>
                <span
                  className="rounded px-1.5 py-0.5 text-xs font-medium"
                  style={{ backgroundColor: `${project.color}22`, color: project.color }}
                >
                  {project.name}
                </span>
              </>
            )}
          </div>
          <Button variant="ghost" size="icon" className="size-8 text-text-secondary">
            <Star className={initialTask.isFavorite ? "size-4 fill-warning text-warning" : "size-4"} />
          </Button>
        </div>
        <SheetTitle className="text-left text-xl leading-snug font-semibold text-text-primary">
          {initialTask.title}
        </SheetTitle>
        <SheetDescription className="sr-only">Task details for {initialTask.title}</SheetDescription>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Select value={status} onValueChange={(value) => setStatus(value as TaskStatus)}>
            <SelectTrigger size="sm" className="h-8 w-auto border-none bg-transparent p-0 shadow-none">
              <TaskStatusBadge status={status} />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(taskStatusMeta) as TaskStatus[]).map((s) => (
                <SelectItem key={s} value={s}>
                  {taskStatusMeta[s].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priority} onValueChange={(value) => setPriority(value as TaskPriority)}>
            <SelectTrigger size="sm" className="h-8 w-auto border-none bg-transparent p-0 shadow-none">
              <TaskPriorityBadge priority={priority} />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(taskPriorityMeta) as TaskPriority[]).map((p) => (
                <SelectItem key={p} value={p}>
                  {taskPriorityMeta[p].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {initialTask.isBlocked && (
            <Badge variant="outline" className="border-danger/30 bg-danger/10 text-danger">
              Blocked
            </Badge>
          )}
        </div>
      </SheetHeader>

      <div className="grid flex-1 grid-cols-1 overflow-hidden md:grid-cols-[1fr_240px]">
        <Tabs defaultValue="overview" className="flex min-h-0 flex-col">
          <TabsList className="mx-6 mt-4 w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="checklist">
              Checklist
              {checklists.length > 0 && (
                <span className="ml-1 text-[10px] text-text-secondary">{checklistProgress}%</span>
              )}
            </TabsTrigger>
            <TabsTrigger value="comments">Comments ({comments.length})</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            <TabsContent value="overview" className="mt-0 space-y-6">
              <div>
                <h4 className="mb-2 text-sm font-semibold text-text-primary">Description</h4>
                <p className="text-sm leading-relaxed text-text-secondary">{initialTask.description}</p>
              </div>

              {initialTask.customFields.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-text-primary">Custom fields</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {initialTask.customFields.map((field) => (
                      <div key={field.id} className="rounded-lg border border-border-subtle p-3">
                        <p className="text-xs text-text-secondary">{field.label}</p>
                        <p className="mt-0.5 text-sm text-text-primary">{field.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {initialTask.dependencies.length > 0 && (
                <div>
                  <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                    <Link2 className="size-3.5" /> Dependencies
                  </h4>
                  <div className="space-y-1.5">
                    {initialTask.dependencies.map((depId) => {
                      const dep = getTaskById(depId)
                      if (!dep) return null
                      return (
                        <div
                          key={depId}
                          className="flex items-center justify-between rounded-lg border border-border-subtle px-3 py-2 text-sm"
                        >
                          <span className="truncate text-text-primary">{dep.title}</span>
                          <TaskStatusBadge status={dep.status} />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div>
                <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                  <Paperclip className="size-3.5" /> Attachments ({initialTask.attachments.length})
                </h4>
                {initialTask.attachments.length === 0 ? (
                  <p className="text-sm text-text-secondary">No attachments yet.</p>
                ) : (
                  <div className="space-y-1.5">
                    {initialTask.attachments.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between rounded-lg border border-border-subtle px-3 py-2 text-sm"
                      >
                        <span className="truncate text-text-primary">{file.name}</span>
                        <span className="shrink-0 text-xs text-text-secondary">{file.size}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="checklist" className="mt-0 space-y-5">
              {checklists.length === 0 ? (
                <p className="text-sm text-text-secondary">No checklists yet.</p>
              ) : (
                checklists.map((checklist) => (
                  <div key={checklist.id}>
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-text-primary">{checklist.title}</h4>
                      <span className="text-xs text-text-secondary">
                        {checklist.items.filter((i) => i.done).length}/{checklist.items.length}
                      </span>
                    </div>
                    <Progress
                      value={
                        (checklist.items.filter((i) => i.done).length / (checklist.items.length || 1)) * 100
                      }
                      className="mb-3 h-1.5"
                    />
                    <div className="space-y-1">
                      {checklist.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => toggleItem(checklist.id, item.id)}
                          className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm hover:bg-white/5"
                        >
                          {item.done ? (
                            <CheckCircle2 className="size-4 shrink-0 text-success" />
                          ) : (
                            <Circle className="size-4 shrink-0 text-text-secondary" />
                          )}
                          <span className={item.done ? "text-text-secondary line-through" : "text-text-primary"}>
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="comments" className="mt-0 space-y-4">
              {comments.map((comment) => {
                const author = getUserById(comment.authorId)
                if (!author) return null
                return (
                  <div key={comment.id} className="flex gap-3">
                    <UserAvatar user={author} size="sm" />
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-medium text-text-primary">{author.name}</span>
                        <span className="text-xs text-text-secondary">{formatDateTime(comment.createdAt)}</span>
                      </div>
                      <p className="mt-0.5 text-sm text-text-secondary">{comment.body}</p>
                    </div>
                  </div>
                )
              })}
              <div className="flex gap-3 pt-2">
                <UserAvatar user={users[0]} size="sm" />
                <div className="flex-1 space-y-2">
                  <Textarea
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    placeholder="Write a comment... use @ to mention"
                    className="min-h-16 resize-none border-border-subtle bg-background"
                  />
                  <div className="flex justify-end">
                    <Button size="sm" onClick={submitComment} disabled={!newComment.trim()}>
                      <MessageSquare className="size-3.5" />
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-0 space-y-4">
              {initialTask.activity.length === 0 ? (
                <p className="text-sm text-text-secondary">No activity recorded.</p>
              ) : (
                <ol className="space-y-4 border-l border-border-subtle pl-4">
                  {initialTask.activity.map((event) => {
                    const actor = getUserById(event.actorId)
                    return (
                      <li key={event.id} className="relative text-sm">
                        <span className="absolute top-1.5 -left-[21px] size-2 rounded-full bg-primary" />
                        <p className="text-text-primary">
                          <span className="font-medium">{actor?.name ?? "Someone"}</span> {event.action}
                          {event.detail && <span className="text-text-secondary"> · {event.detail}</span>}
                        </p>
                        <p className="text-xs text-text-secondary">{formatDateTime(event.createdAt)}</p>
                      </li>
                    )
                  })}
                </ol>
              )}
            </TabsContent>
          </div>
        </Tabs>

        <aside className="space-y-5 overflow-y-auto border-t border-border-subtle p-5 md:border-t-0 md:border-l">
          <MetaBlock icon={Users} label="Assignees">
            {assignees.length > 0 ? (
              <div className="space-y-2">
                {assignees.map((user) => (
                  <div key={user.id} className="flex items-center gap-2">
                    <UserAvatar user={user} size="xs" />
                    <span className="truncate text-xs text-text-primary">{user.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-xs text-text-secondary">Unassigned</span>
            )}
          </MetaBlock>

          <MetaBlock icon={Clock} label="Dates">
            <div className="space-y-1 text-xs text-text-secondary">
              {initialTask.startDate && <p>Start: {formatDate(initialTask.startDate)}</p>}
              {initialTask.dueDate && <p>Due: {formatDate(initialTask.dueDate)}</p>}
              {initialTask.sprint && <p>Sprint: {initialTask.sprint}</p>}
            </div>
          </MetaBlock>

          <MetaBlock icon={Timer} label="Time tracking">
            <div className="space-y-1 text-xs text-text-secondary">
              <p>Estimated: {initialTask.estimatedHours ?? 0}h</p>
              <p>Logged: {initialTask.loggedHours ?? 0}h</p>
              {initialTask.storyPoints && <p>Story points: {initialTask.storyPoints}</p>}
            </div>
            <Progress
              value={
                initialTask.estimatedHours
                  ? Math.min(100, ((initialTask.loggedHours ?? 0) / initialTask.estimatedHours) * 100)
                  : 0
              }
              className="mt-2 h-1.5"
            />
          </MetaBlock>

          <MetaBlock icon={Tag} label="Tags">
            {initialTask.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {initialTask.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-border-subtle text-text-secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-xs text-text-secondary">No tags</span>
            )}
          </MetaBlock>

          {initialTask.watcherIds.length > 0 && (
            <MetaBlock icon={Users} label="Watchers">
              <AvatarStack
                users={initialTask.watcherIds.map(getUserById).filter(Boolean) as any}
                size="xs"
              />
            </MetaBlock>
          )}

          <button className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border-subtle py-2 text-xs text-text-secondary transition-colors hover:border-accent/40 hover:text-accent">
            <Plus className="size-3.5" />
            Add custom field
          </button>
        </aside>
      </div>
    </div>
  )
}

function MetaBlock({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Users
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-text-secondary uppercase">
        <Icon className="size-3.5" />
        {label}
      </h4>
      {children}
    </div>
  )
}
