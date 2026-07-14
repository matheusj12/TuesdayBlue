export type BoardType =
  | "kanban"
  | "table"
  | "list"
  | "timeline"
  | "calendar"
  | "roadmap"
  | "sprint"
  | "gallery"

export interface BoardGroup {
  id: string
  name: string
  color: string
  statusMap?: string
}

export interface Board {
  id: string
  projectId: string
  name: string
  description: string
  types: BoardType[]
  defaultType: BoardType
  groups: BoardGroup[]
  color: string
  favorite?: boolean
}
