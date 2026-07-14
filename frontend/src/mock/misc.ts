import type { AuditLogEntry, Automation, DocumentItem, Template } from "@/types"

export const documents: DocumentItem[] = [
  {
    id: "doc1",
    title: "Platform Migration — Technical RFC",
    icon: "file-text",
    updatedAt: "2026-07-12T10:00:00Z",
    authorId: "u-alexander",
    workspace: "Engineering",
    content:
      "## Summary\nThis RFC defines the data-model mapping strategy for migrating boards, groups and automations from the legacy tool into TuesdayBlue's native schema.\n\n## Goals\n- Zero data loss during cutover\n- Preserve automation history\n- Support incremental, project-by-project migration\n\n```ts\ninterface MigrationBatch {\n  projectId: string\n  boards: string[]\n  cutoverAt: string\n}\n```\n",
  },
  {
    id: "doc2",
    title: "Design System 3.0 — Token Reference",
    icon: "palette",
    updatedAt: "2026-07-10T15:30:00Z",
    authorId: "u-priya",
    workspace: "Design",
    content:
      "## Color tokens\n| Token | Value |\n|---|---|\n| primary | #2563EB |\n| accent | #5AA9FF |\n| success | #22C55E |\n\nAll surfaces derive from the `surface-*` scale defined in DESIGN.md.",
  },
  {
    id: "doc3",
    title: "SOC2 Control Narrative — Draft",
    icon: "shield",
    updatedAt: "2026-07-09T12:00:00Z",
    authorId: "u-elena",
    workspace: "Compliance",
    content:
      "## Access control\nAll production access requires SSO + hardware key MFA. Access reviews occur quarterly and are logged in the audit trail.",
  },
  {
    id: "doc4",
    title: "Mobile Companion — Offline Strategy",
    icon: "smartphone",
    updatedAt: "2026-07-08T09:20:00Z",
    authorId: "u-mariana",
    workspace: "Product",
    content:
      "## Conflict resolution\nWe evaluated last-write-wins, CRDT merge, and manual resolution. Manual resolution wins for task edits; CRDT for checklist items.",
  },
  {
    id: "doc5",
    title: "Q3 Operational Excellence — Retro Notes",
    icon: "check-circle",
    updatedAt: "2026-06-30T17:00:00Z",
    authorId: "u-lucas",
    workspace: "Quality",
    content: "## What went well\n- Cycle time down 32%\n- Zero SLA breaches in June\n\n## What to improve\n- Bug triage SLA still inconsistent across squads",
  },
]

export const templates: Template[] = [
  { id: "tp1", name: "Agile Sprint Board", description: "Kanban board pre-configured with sprint groups and story points.", category: "board", usageCount: 482, author: "TuesdayBlue", color: "#2563EB" },
  { id: "tp2", name: "Product Launch Plan", description: "Cross-functional project template with milestones and risk register.", category: "project", usageCount: 311, author: "TuesdayBlue", color: "#5AA9FF" },
  { id: "tp3", name: "Bug Triage Automation", description: "Auto-assigns and prioritizes incoming bug reports by severity.", category: "automation", usageCount: 205, author: "Elena Popescu", color: "#EF4444" },
  { id: "tp4", name: "Onboarding Checklist", description: "New-hire onboarding checklist with role-based branches.", category: "checklist", usageCount: 178, author: "TuesdayBlue", color: "#22C55E" },
  { id: "tp5", name: "Executive Dashboard", description: "Company KPIs, burndown and capacity in a single view.", category: "dashboard", usageCount: 264, author: "Alexander Reyes", color: "#F59E0B" },
  { id: "tp6", name: "Two-Week Sprint Cycle", description: "Sprint template with planning, review and retro checkpoints.", category: "sprint", usageCount: 397, author: "TuesdayBlue", color: "#A855F7" },
  { id: "tp7", name: "Design Review Board", description: "Kanban tuned for design critique and handoff status.", category: "board", usageCount: 143, author: "Priya Nandakumar", color: "#F472B6" },
  { id: "tp8", name: "SLA Escalation Flow", description: "Escalates tasks nearing SLA breach to the responsible manager.", category: "automation", usageCount: 96, author: "TuesdayBlue", color: "#0EA5E9" },
]

export const automations: Automation[] = [
  {
    id: "au1",
    name: "Auto-archive stale tasks",
    description: "Archives tasks untouched for 30 days in Done columns.",
    active: true,
    runs: 1284,
    lastRun: "2026-07-14T02:00:00Z",
    nodes: [
      { id: "n1", kind: "trigger", label: "Schedule", detail: "Daily at 02:00" },
      { id: "n2", kind: "condition", label: "Status = Done", detail: "for 30+ days" },
      { id: "n3", kind: "action", label: "Archive task", detail: "Move to archive" },
    ],
  },
  {
    id: "au2",
    name: "SLA breach escalation",
    description: "Notifies manager when a task is within 10% of its SLA deadline.",
    active: true,
    runs: 412,
    lastRun: "2026-07-13T22:15:00Z",
    nodes: [
      { id: "n1", kind: "trigger", label: "SLA threshold", detail: "90% elapsed" },
      { id: "n2", kind: "condition", label: "Priority ≥ High", detail: "" },
      { id: "n3", kind: "action", label: "Notify manager", detail: "Slack + email" },
      { id: "n4", kind: "action", label: "Add tag", detail: "at-risk" },
    ],
  },
  {
    id: "au3",
    name: "New bug triage",
    description: "Assigns severity and routes newly created bugs to the QA lead.",
    active: true,
    runs: 863,
    lastRun: "2026-07-14T07:40:00Z",
    nodes: [
      { id: "n1", kind: "trigger", label: "Task created", detail: "Tag = bug" },
      { id: "n2", kind: "action", label: "Set assignee", detail: "QA Lead" },
      { id: "n3", kind: "action", label: "Post to #bugs", detail: "Webhook" },
    ],
  },
  {
    id: "au4",
    name: "Weekly digest email",
    description: "Sends a weekly summary of project health to stakeholders.",
    active: false,
    runs: 26,
    lastRun: "2026-07-06T09:00:00Z",
    nodes: [
      { id: "n1", kind: "trigger", label: "Schedule", detail: "Mondays 09:00" },
      { id: "n2", kind: "action", label: "Send email", detail: "Stakeholder group" },
    ],
  },
]

export const auditLog: AuditLogEntry[] = [
  { id: "al1", actorId: "u-alexander", action: "Updated permissions", target: "Workspace / Roles", ip: "187.44.12.9", device: "Chrome · macOS", createdAt: "2026-07-14T09:12:00Z" },
  { id: "al2", actorId: "u-elena", action: "Exported audit log", target: "Compliance / SLA-41", ip: "91.203.4.71", device: "Firefox · Windows", createdAt: "2026-07-14T08:02:00Z" },
  { id: "al3", actorId: "u-mariana", action: "Invited user", target: "victor.prado@tuesdayblue.io", ip: "187.44.12.9", device: "Chrome · macOS", createdAt: "2026-07-13T18:45:00Z" },
  { id: "al4", actorId: "u-ken", action: "Rotated API key", target: "Workspace / Integrations", ip: "133.1.88.4", device: "Safari · iOS", createdAt: "2026-07-13T11:30:00Z" },
  { id: "al5", actorId: "u-lucas", action: "Archived project", target: "Q3 Operational Excellence", ip: "187.44.12.9", device: "Chrome · macOS", createdAt: "2026-07-12T16:05:00Z" },
  { id: "al6", actorId: "u-alexander", action: "Login", target: "SSO / Okta", ip: "187.44.12.9", device: "Chrome · macOS", createdAt: "2026-07-12T08:00:00Z" },
]
