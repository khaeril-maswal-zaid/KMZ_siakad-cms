import { Check, Circle, Clock3, Sparkles } from "lucide-react";
import type { DashboardProcessStep } from "../types";

export function ProgressCard({ steps }: { steps: DashboardProcessStep[] }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(30,64,110,0.06)] sm:p-7">
      <div className="flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700">
          <Sparkles className="size-5" />
        </span>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-600">
            Progres PMB
          </p>
          <h2 className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-slate-950">
            Perjalananmu menuju kampus.
          </h2>
          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            Tahap yang sedang aktif ditandai agar kamu tahu apa yang harus
            dilakukan berikutnya.
          </p>
        </div>
      </div>

      <ol className="mt-7 grid gap-0 sm:grid-cols-2">
        {steps.map((step, index) => {
          const isCompleted = step.status === "completed";
          const isCurrent = step.status === "current";

          return (
            <li
              key={step.id}
              className={`relative flex gap-3 border-slate-100 pb-6 ${index % 2 === 0 ? "sm:pr-5" : "sm:pl-5"}`}
            >
              <span
                className={`relative z-10 mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border-2 ${isCompleted ? "border-emerald-500 bg-emerald-500 text-white" : isCurrent ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-300"}`}
              >
                {isCompleted ? (
                  <Check className="size-4" />
                ) : isCurrent ? (
                  <Clock3 className="size-3.5" />
                ) : (
                  <Circle className="size-2.5 fill-current" />
                )}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p
                    className={`text-sm font-bold ${isCurrent ? "text-blue-700" : "text-slate-900"}`}
                  >
                    {step.label}
                  </p>
                  {isCurrent && (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-blue-700">
                      Sekarang
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
