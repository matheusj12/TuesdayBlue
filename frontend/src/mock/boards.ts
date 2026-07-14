import type { Board } from "@/types"

export const boards: Board[] = [
  {
    id: "b-migration-sprint",
    projectId: "p-migration",
    name: "Migration Sprint 42",
    description: "Active sprint board for the platform migration squad.",
    types: ["kanban", "table", "list", "sprint"],
    defaultType: "kanban",
    color: "#2563EB",
    favorite: true,
    groups: [
      { id: "backlog", name: "Backlog", color: "#94A3B8", statusMap: "backlog" },
      { id: "todo", name: "To Do", color: "#5AA9FF", statusMap: "todo" },
      { id: "in_progress", name: "In Progress", color: "#2563EB", statusMap: "in_progress" },
      { id: "review", name: "Review", color: "#F59E0B", statusMap: "review" },
      { id: "qa", name: "QA", color: "#A855F7", statusMap: "qa" },
      { id: "done", name: "Done", color: "#22C55E", statusMap: "done" },
    ],
  },
  {
    id: "b-mobile-roadmap",
    projectId: "p-mobile",
    name: "Mobile Roadmap Board",
    description: "Feature roadmap and release planning for the companion app.",
    types: ["kanban", "table", "roadmap", "timeline"],
    defaultType: "kanban",
    color: "#5AA9FF",
    groups: [
      { id: "backlog", name: "Backlog", color: "#94A3B8", statusMap: "backlog" },
      { id: "todo", name: "To Do", color: "#5AA9FF", statusMap: "todo" },
      { id: "in_progress", name: "In Progress", color: "#2563EB", statusMap: "in_progress" },
      { id: "done", name: "Shipped", color: "#22C55E", statusMap: "done" },
    ],
  },
  {
    id: "b-ai-pipeline",
    projectId: "p-ai-insights",
    name: "AI Pipeline Board",
    description: "Model training, evaluation and rollout tracking.",
    types: ["kanban", "table"],
    defaultType: "kanban",
    color: "#22C55E",
    groups: [
      { id: "backlog", name: "Backlog", color: "#94A3B8", statusMap: "backlog" },
      { id: "in_progress", name: "In Progress", color: "#2563EB", statusMap: "in_progress" },
      { id: "review", name: "Review", color: "#F59E0B", statusMap: "review" },
      { id: "done", name: "Done", color: "#22C55E", statusMap: "done" },
    ],
  },
  {
    id: "b-sla-compliance",
    projectId: "p-sla",
    name: "Compliance Tracker",
    description: "SOC2 and SLA workstream tracking.",
    types: ["table", "list", "kanban"],
    defaultType: "table",
    color: "#EF4444",
    groups: [
      { id: "todo", name: "To Do", color: "#5AA9FF", statusMap: "todo" },
      { id: "in_progress", name: "In Progress", color: "#2563EB", statusMap: "in_progress" },
      { id: "qa", name: "Audit Review", color: "#A855F7", statusMap: "qa" },
      { id: "done", name: "Closed", color: "#22C55E", statusMap: "done" },
    ],
  },
]

export function getBoardsByProject(projectId: string): Board[] {
  return boards.filter((board) => board.projectId === projectId)
}

export function getBoardById(id: string): Board | undefined {
  return boards.find((board) => board.id === id)
}
