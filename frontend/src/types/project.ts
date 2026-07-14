export type ProjectStatus = "on_track" | "at_risk" | "delayed" | "completed" | "planning"

export type ProjectVisibility = "private" | "public" | "department" | "shared"

export interface Milestone {
  id: string
  title: string
  date: string
  done: boolean
}

export interface Risk {
  id: string
  title: string
  severity: "low" | "medium" | "high"
  mitigation: string
}

export interface Project {
  id: string
  key: string
  name: string
  description: string
  status: ProjectStatus
  visibility: ProjectVisibility
  ownerId: string
  teamIds: string[]
  memberIds: string[]
  startDate: string
  endDate: string
  progress: number
  health: number
  budgetTotal: number
  budgetSpent: number
  color: string
  icon: string
  favorite?: boolean
  archived?: boolean
  milestones: Milestone[]
  risks: Risk[]
  tags: string[]
}
