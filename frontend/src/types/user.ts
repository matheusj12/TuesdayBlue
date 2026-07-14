export type UserRole = "admin" | "manager" | "member" | "viewer"

export type UserStatus = "active" | "away" | "vacation" | "offline"

export interface User {
  id: string
  name: string
  email: string
  avatarColor: string
  initials: string
  role: UserRole
  title: string
  department: string
  status: UserStatus
  capacity: number
  workload: number
  timezone: string
}
