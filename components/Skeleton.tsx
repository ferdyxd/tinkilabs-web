export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-neutral-100 bg-white p-6">
      <div className="mb-4 h-4 w-20 rounded bg-neutral-100" />
      <div className="mb-3 h-5 w-3/4 rounded bg-neutral-100" />
      <div className="mb-2 h-3 w-full rounded bg-neutral-50" />
      <div className="h-3 w-2/3 rounded bg-neutral-50" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="animate-pulse flex items-center gap-4 border-b border-neutral-50 py-4">
      <div className="h-10 w-10 rounded-lg bg-neutral-100" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-40 rounded bg-neutral-100" />
        <div className="h-3 w-24 rounded bg-neutral-50" />
      </div>
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-32 rounded-xl bg-neutral-100" />
      <div className="h-24 rounded-xl bg-neutral-50" />
    </div>
  );
}
