import { lazy } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import { AppShell } from "@/layouts/app-shell"

const DashboardPage = lazy(() => import("@/features/dashboard/dashboard-page"))
const MyTasksPage = lazy(() => import("@/features/my-tasks/my-tasks-page"))
const ProjectsPage = lazy(() => import("@/features/projects/projects-page"))
const ProjectDetailsPage = lazy(() => import("@/features/projects/project-details-page"))
const PortfolioPage = lazy(() => import("@/features/portfolio/portfolio-page"))
const BoardsPage = lazy(() => import("@/features/boards/boards-page"))
const BoardDetailsPage = lazy(() => import("@/features/boards/board-details-page"))
const TeamsPage = lazy(() => import("@/features/teams/teams-page"))
const CalendarPage = lazy(() => import("@/features/calendar/calendar-page"))
const TimelinePage = lazy(() => import("@/features/timeline/timeline-page"))
const RoadmapsPage = lazy(() => import("@/features/roadmaps/roadmaps-page"))
const DashboardsGalleryPage = lazy(() => import("@/features/dashboards/dashboards-gallery-page"))
const ReportsPage = lazy(() => import("@/features/reports/reports-page"))
const AutomationPage = lazy(() => import("@/features/automation/automation-page"))
const TemplatesPage = lazy(() => import("@/features/templates/templates-page"))
const DocumentsPage = lazy(() => import("@/features/documents/documents-page"))
const NotificationsPage = lazy(() => import("@/features/notifications/notifications-page"))
const AdministrationPage = lazy(() => import("@/features/administration/administration-page"))
const SettingsPage = lazy(() => import("@/features/settings/settings-page"))
const ProfilePage = lazy(() => import("@/features/profile/profile-page"))

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "my-tasks", element: <MyTasksPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/:projectId", element: <ProjectDetailsPage /> },
      { path: "portfolio", element: <PortfolioPage /> },
      { path: "boards", element: <BoardsPage /> },
      { path: "boards/:boardId", element: <BoardDetailsPage /> },
      { path: "teams", element: <TeamsPage /> },
      { path: "calendar", element: <CalendarPage /> },
      { path: "timeline", element: <TimelinePage /> },
      { path: "roadmaps", element: <RoadmapsPage /> },
      { path: "dashboards", element: <DashboardsGalleryPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "automation", element: <AutomationPage /> },
      { path: "templates", element: <TemplatesPage /> },
      { path: "documents", element: <DocumentsPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "administration", element: <AdministrationPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },
])
