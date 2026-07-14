import type { ChartPoint, Kpi, RoadmapItem, SavedDashboard } from "@/types"

export const executiveKpis: Kpi[] = [
  { id: "k1", label: "Active projects", value: "8", delta: 12.5, trend: "up" },
  { id: "k2", label: "Projects at risk", value: "2", delta: -8, trend: "down" },
  { id: "k3", label: "Completion rate", value: "76%", delta: 4.1, trend: "up" },
  { id: "k4", label: "SLA compliance", value: "94.2%", delta: -1.3, trend: "down" },
  { id: "k5", label: "Team capacity", value: "82%", delta: 2.4, trend: "up" },
  { id: "k6", label: "Open bugs", value: "17", delta: -22, trend: "down" },
]

export const personalKpis: Kpi[] = [
  { id: "pk1", label: "My open tasks", value: "9", delta: -2, trend: "down" },
  { id: "pk2", label: "Due this week", value: "4", delta: 1, trend: "up" },
  { id: "pk3", label: "Hours logged", value: "31.5h", delta: 6.2, trend: "up" },
  { id: "pk4", label: "Overdue", value: "1", delta: 0, trend: "flat" },
]

export const burndownData: ChartPoint[] = [
  { label: "Day 1", value: 120, secondary: 120 },
  { label: "Day 3", value: 108, secondary: 100 },
  { label: "Day 5", value: 96, secondary: 80 },
  { label: "Day 7", value: 84, secondary: 60 },
  { label: "Day 9", value: 70, secondary: 40 },
  { label: "Day 11", value: 58, secondary: 20 },
  { label: "Day 13", value: 40, secondary: 0 },
]

export const velocityData: ChartPoint[] = [
  { label: "Sprint 38", value: 34 },
  { label: "Sprint 39", value: 41 },
  { label: "Sprint 40", value: 38 },
  { label: "Sprint 41", value: 46 },
  { label: "Sprint 42", value: 44 },
]

export const cycleTimeData: ChartPoint[] = [
  { label: "Week 1", value: 3.4 },
  { label: "Week 2", value: 2.9 },
  { label: "Week 3", value: 3.1 },
  { label: "Week 4", value: 2.4 },
  { label: "Week 5", value: 2.1 },
]

export const leadTimeData: ChartPoint[] = [
  { label: "Week 1", value: 6.2 },
  { label: "Week 2", value: 5.8 },
  { label: "Week 3", value: 5.1 },
  { label: "Week 4", value: 4.6 },
  { label: "Week 5", value: 4.3 },
]

export const capacityData: ChartPoint[] = [
  { label: "Platform", value: 92 },
  { label: "Product", value: 78 },
  { label: "Design", value: 65 },
  { label: "Quality", value: 71 },
  { label: "Growth", value: 44 },
]

export const slaTrendData: ChartPoint[] = [
  { label: "Mar", value: 96 },
  { label: "Apr", value: 95 },
  { label: "May", value: 97 },
  { label: "Jun", value: 93 },
  { label: "Jul", value: 94.2 },
]

export const statusDistribution: ChartPoint[] = [
  { label: "Backlog", value: 24 },
  { label: "To Do", value: 18 },
  { label: "In Progress", value: 21 },
  { label: "Review", value: 9 },
  { label: "QA", value: 6 },
  { label: "Done", value: 58 },
]

export const savedDashboards: SavedDashboard[] = [
  {
    id: "d1",
    name: "Executive Overview",
    description: "Company-wide health, budget and delivery KPIs.",
    owner: "u-alexander",
    updatedAt: "2026-07-13T10:00:00Z",
    widgets: [
      { id: "w1", type: "kpi", title: "Active projects", size: "sm" },
      { id: "w2", type: "chart", title: "Burndown", size: "lg" },
      { id: "w3", type: "list", title: "Projects at risk", size: "md" },
    ],
  },
  {
    id: "d2",
    name: "Engineering Delivery",
    description: "Velocity, cycle time and capacity for engineering squads.",
    owner: "u-elena",
    updatedAt: "2026-07-12T14:30:00Z",
    widgets: [
      { id: "w1", type: "chart", title: "Velocity", size: "md" },
      { id: "w2", type: "chart", title: "Cycle time", size: "md" },
      { id: "w3", type: "table", title: "Open bugs", size: "lg" },
    ],
  },
  {
    id: "d3",
    name: "Design Ops",
    description: "Design system adoption and review turnaround.",
    owner: "u-priya",
    updatedAt: "2026-07-09T09:15:00Z",
    widgets: [
      { id: "w1", type: "kpi", title: "Components shipped", size: "sm" },
      { id: "w2", type: "activity", title: "Recent reviews", size: "md" },
    ],
  },
  {
    id: "d4",
    name: "Personal Workspace",
    description: "Your tasks, calendar and time tracking.",
    owner: "u-alexander",
    updatedAt: "2026-07-14T08:00:00Z",
    widgets: [
      { id: "w1", type: "list", title: "My tasks", size: "md" },
      { id: "w2", type: "calendar", title: "This week", size: "lg" },
    ],
  },
]

export const roadmapItems: RoadmapItem[] = [
  { id: "rm1", title: "Board views feature-complete", quarter: "Q3", lane: "Platform Migration", status: "in_progress", progress: 62 },
  { id: "rm2", title: "Automation webhook triggers", quarter: "Q3", lane: "Platform Migration", status: "planned", progress: 10 },
  { id: "rm3", title: "Offline sync engine", quarter: "Q3", lane: "Mobile", status: "in_progress", progress: 35 },
  { id: "rm4", title: "TestFlight / Play beta", quarter: "Q3", lane: "Mobile", status: "planned", progress: 0 },
  { id: "rm5", title: "Insight scoring model", quarter: "Q3", lane: "AI Insights", status: "in_progress", progress: 55 },
  { id: "rm6", title: "SOC2 readiness review", quarter: "Q3", lane: "Compliance", status: "at_risk", progress: 34 },
  { id: "rm7", title: "Design system migration guide", quarter: "Q3", lane: "Design System", status: "in_progress", progress: 78 },
  { id: "rm8", title: "Self-serve onboarding discovery", quarter: "Q4", lane: "Growth", status: "planned", progress: 8 },
  { id: "rm9", title: "Template marketplace launch", quarter: "Q4", lane: "Platform", status: "planned", progress: 47 },
  { id: "rm10", title: "Mobile GA release", quarter: "Q4", lane: "Mobile", status: "planned", progress: 0 },
  { id: "rm11", title: "AI search GA", quarter: "Q4", lane: "AI Insights", status: "planned", progress: 0 },
  { id: "rm12", title: "Full legacy cutover", quarter: "Q4", lane: "Platform Migration", status: "planned", progress: 0 },
]
