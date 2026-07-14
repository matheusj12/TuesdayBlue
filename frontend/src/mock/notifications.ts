import type { Notification } from "@/types"

export const notifications: Notification[] = [
  {
    id: "n1",
    type: "deadline",
    title: "Milestone due tomorrow",
    description: "\"Board views feature-complete\" is due Jul 28 on Enterprise Platform Migration.",
    read: false,
    createdAt: "2026-07-14T08:30:00Z",
    link: "/projects/p-migration",
  },
  {
    id: "n2",
    type: "comment",
    title: "Alexander Reyes commented",
    description: "on MIG-214 · \"Let's make sure this stays framework-agnostic...\"",
    actorId: "u-alexander",
    read: false,
    createdAt: "2026-07-14T07:10:00Z",
    link: "/boards/b-migration-sprint",
  },
  {
    id: "n3",
    type: "task_assigned",
    title: "You were assigned to MIG-226",
    description: "Notification center: grouped digest mode",
    actorId: "u-elena",
    read: false,
    createdAt: "2026-07-13T19:45:00Z",
  },
  {
    id: "n4",
    type: "sla",
    title: "SLA at risk",
    description: "SLA-41 audit log export is within 8% of its breach threshold.",
    read: true,
    createdAt: "2026-07-13T14:00:00Z",
  },
  {
    id: "n5",
    type: "approval",
    title: "Approval requested",
    description: "Sofia Almeida requested your approval on the Q3 roadmap draft.",
    actorId: "u-sofia",
    read: true,
    createdAt: "2026-07-12T16:20:00Z",
  },
  {
    id: "n6",
    type: "automation",
    title: "Automation ran successfully",
    description: "\"Auto-archive stale tasks\" processed 12 tasks in Migration Sprint 42.",
    read: true,
    createdAt: "2026-07-12T02:00:00Z",
  },
  {
    id: "n7",
    type: "change",
    title: "Priority changed",
    description: "MIG-222 priority changed from Medium to High by Elena Popescu.",
    actorId: "u-elena",
    read: true,
    createdAt: "2026-07-11T11:15:00Z",
  },
  {
    id: "n8",
    type: "task_created",
    title: "New task in AI Insights Layer",
    description: "AI-79 Embedding pipeline cost audit was created.",
    actorId: "u-elena",
    read: true,
    createdAt: "2026-07-10T09:00:00Z",
  },
]

export function getUnreadCount(): number {
  return notifications.filter((n) => !n.read).length
}
