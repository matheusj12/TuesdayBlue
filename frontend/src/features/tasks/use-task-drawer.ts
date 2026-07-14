import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"

export function useTaskDrawer() {
  const [searchParams, setSearchParams] = useSearchParams()
  const taskId = searchParams.get("task")

  const openTask = useCallback(
    (id: string) => {
      const next = new URLSearchParams(searchParams)
      next.set("task", id)
      setSearchParams(next)
    },
    [searchParams, setSearchParams],
  )

  const closeTask = useCallback(() => {
    const next = new URLSearchParams(searchParams)
    next.delete("task")
    setSearchParams(next)
  }, [searchParams, setSearchParams])

  return { taskId, openTask, closeTask }
}
