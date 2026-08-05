export function LandingSkeleton() {
  return (
    <div className="min-h-screen bg-[#f7faff]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="h-14 animate-pulse rounded-2xl bg-slate-200/70" />
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="h-8 w-44 animate-pulse rounded-full bg-slate-200/70" />
            <div className="h-36 animate-pulse rounded-3xl bg-slate-200/70" />
            <div className="h-20 animate-pulse rounded-2xl bg-slate-200/70" />
          </div>
          <div className="h-[480px] animate-pulse rounded-[32px] bg-slate-200/70" />
        </div>
      </div>
    </div>
  );
}
