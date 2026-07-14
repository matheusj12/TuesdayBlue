export interface DocumentItem {
  id: string
  title: string
  icon: string
  updatedAt: string
  authorId: string
  workspace: string
  content: string
}

export type TemplateCategory =
  | "project"
  | "board"
  | "sprint"
  | "checklist"
  | "automation"
  | "dashboard"

export interface Template {
  id: string
  name: string
  description: string
  category: TemplateCategory
  usageCount: number
  author: string
  color: string
}

export type AutomationNodeKind = "trigger" | "condition" | "action"

export interface AutomationNode {
  id: string
  kind: AutomationNodeKind
  label: string
  detail: string
}

export interface Automation {
  id: string
  name: string
  description: string
  active: boolean
  runs: number
  lastRun: string
  nodes: AutomationNode[]
}

export interface AuditLogEntry {
  id: string
  actorId: string
  action: string
  target: string
  ip: string
  device: string
  createdAt: string
}
