import type { LucideIcon } from "lucide-react"
import {
  Bot,
  Calendar,
  CheckSquare,
  ClipboardList,
  FileText,
  Folder,
  GanttChartSquare,
  KanbanSquare,
  LayoutDashboard,
  LayoutGrid,
  Map,
  Settings,
  Shield,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react"

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
}

export interface NavGroup {
  label?: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    items: [
      { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
      { label: "My Work", to: "/my-tasks", icon: CheckSquare },
    ],
  },
  {
    label: "Work",
    items: [
      { label: "Projects", to: "/projects", icon: Folder },
      { label: "Portfolio", to: "/portfolio", icon: LayoutGrid },
      { label: "Boards", to: "/boards", icon: KanbanSquare },
      { label: "Teams", to: "/teams", icon: Users },
    ],
  },
  {
    label: "Planning",
    items: [
      { label: "Calendar", to: "/calendar", icon: Calendar },
      { label: "Timeline", to: "/timeline", icon: GanttChartSquare },
      { label: "Roadmaps", to: "/roadmaps", icon: Map },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Dashboards", to: "/dashboards", icon: LayoutDashboard },
      { label: "Reports", to: "/reports", icon: ClipboardList },
    ],
  },
  {
    label: "Workspace",
    items: [
      { label: "Automation", to: "/automation", icon: Workflow },
      { label: "Templates", to: "/templates", icon: Sparkles },
      { label: "Documents", to: "/documents", icon: FileText },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Administration", to: "/administration", icon: Shield },
      { label: "Settings", to: "/settings", icon: Settings },
    ],
  },
]

export const allNavItems: NavItem[] = navGroups.flatMap((group) => group.items)

export const aiAssistantIcon: LucideIcon = Bot
