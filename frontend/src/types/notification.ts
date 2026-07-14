export type NotificationType =
  | "task_created"
  | "task_assigned"
  | "comment"
  | "change"
  | "approval"
  | "deadline"
  | "sla"
  | "automation"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  actorId?: string
  read: boolean
  createdAt: string
  link?: string
}
