import type { DashboardStatus } from "../types";

export function StatusCards({ statuses }: { statuses: DashboardStatus[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {statuses.map((status) => {
        const toneClassName = {
          amber: "bg-amber-50 text-amber-700",
          blue: "bg-blue-50 text-blue-700",
          cyan: "bg-cyan-50 text-cyan-700",
          emerald: "bg-emerald-50 text-emerald-700",
        }[status.tone];

        return (
          <article
            key={status.label}
            className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_38px_rgba(30,64,110,0.05)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  {status.label}
                </p>
                <p className="mt-2 text-base font-extrabold leading-6 tracking-[-0.025em] text-slate-950 sm:text-lg">
                  {status.value}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {status.description}
                </p>
              </div>
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-2xl ${toneClassName}`}
              >
                {status.icon}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
