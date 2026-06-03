export function LoadingSkeleton() {
  return (
    <div role="status" aria-busy="true" className="flex flex-col items-center gap-6 text-center animate-pulse">
      <div className="w-32 h-32 rounded-full bg-stardust" />
      <div className="h-8 w-48 rounded bg-stardust" />
      <div className="h-6 w-32 rounded bg-stardust" />
      <div className="h-5 w-64 rounded bg-stardust" />
      <span className="sr-only">Loading moon phase...</span>
    </div>
  )
}
