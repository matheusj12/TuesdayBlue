export type TaskStatus =
  | "backlog"
  | "todo"
  | "in_progress"
  | "review"
  | "qa"
  | "done"

export type TaskPriority = "low" | "medium" | "high" | "urgent" | "critical"

export interface ChecklistItem {
  id: string
  label: string
  done: boolean
  assigneeId?: string
  dueDate?: string
}

export interface Checklist {
  id: string
  title: string
  items: ChecklistItem[]
}

export interface Comment {
  id: string
  authorId: string
  body: string
  createdAt: string
  reactions: { emoji: string; count: number }[]
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: string
  uploadedById: string
  uploadedAt: string
}

export interface ActivityEvent {
  id: string
  actorId: string
  action: string
  detail?: string
  createdAt: string
}

export interface CustomField {
  id: string
  label: string
  type: "text" | "number" | "date" | "select" | "user"
  value: string
}

export interface Task {
  id: string
  code: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  projectId: string
  boardId: string
  groupId: string
  assigneeIds: string[]
  watcherIds: string[]
  tags: string[]
  startDate?: string
  dueDate?: string
  storyPoints?: number
  estimatedHours?: number
  loggedHours?: number
  sprint?: string
  dependencies: string[]
  checklists: Checklist[]
  comments: Comment[]
  attachments: Attachment[]
  activity: ActivityEvent[]
  customFields: CustomField[]
  isFavorite?: boolean
  isBlocked?: boolean
}
