import { Suspense } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Toaster } from "@/components/ui/sonner"
import { AppSidebar } from "./app-sidebar"
import { AppTopbar } from "./app-topbar"
import { AppCommandPalette } from "./command-palette"
import { CommandPaletteProvider } from "./command-palette-context"
import { AiAssistant } from "./ai-assistant"
import { TaskDrawer } from "@/features/tasks/task-drawer"
import { PageLoading } from "@/components/page-loading"

export function AppShell() {
  const location = useLocation()

  return (
    <CommandPaletteProvider>
      <div className="flex min-h-screen bg-background text-text-primary">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col md:pl-sidebar-width">
          <AppTopbar />
          <main className="flex-1 overflow-x-hidden p-margin-mobile md:p-margin-desktop">
            <div className="mx-auto w-full max-w-container-max">
              <Suspense fallback={<PageLoading />}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <Outlet />
                  </motion.div>
                </AnimatePresence>
              </Suspense>
            </div>
          </main>
        </div>
      </div>

      <AppCommandPalette />
      <AiAssistant />
      <TaskDrawer />
      <Toaster position="bottom-right" theme="dark" />
    </CommandPaletteProvider>
  )
}
