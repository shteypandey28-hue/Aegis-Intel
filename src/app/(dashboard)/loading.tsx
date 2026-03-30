export default function DashboardLoading() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full">
      {/* Header Skeleton */}
      <div className="flex justify-between items-end">
        <div>
          <div className="h-8 w-64 bg-sidebar rounded-md animate-pulse mb-2" />
          <div className="h-4 w-96 bg-sidebar rounded-md animate-pulse" />
        </div>
      </div>

      {/* 4 Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg border border-border/50 bg-card/50 h-32 animate-pulse" />
        ))}
      </div>

      {/* Bottom Layout Skeleton */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-1 lg:col-span-4 rounded-lg border border-border/50 bg-card/50 h-[400px] animate-pulse" />
        <div className="col-span-1 lg:col-span-3 rounded-lg border border-border/50 bg-card/50 h-[400px] animate-pulse" />
      </div>
    </div>
  )
}
