import { Skeleton } from "@/components/ui/skeleton"

export function PageLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64 bg-white/5" />
      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-28 bg-white/5" />
        ))}
      </div>
      <Skeleton className="h-80 bg-white/5" />
    </div>
  )
}
