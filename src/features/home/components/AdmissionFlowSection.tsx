import {
  Headphones,
  GraduationCap,
  UsersRound,
  ReceiptText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import type { AdmissionStep } from "@/features/home/types";

type AdmissionFlowSectionProps = {
  steps: AdmissionStep[];
};

const admissionStepIcons: Record<AdmissionStep["icon"], LucideIcon> = {
  program: GraduationCap,
  account: UsersRound,
  payment: ReceiptText,
  form: ShieldCheck,
};

export function AdmissionFlowSection({ steps }: AdmissionFlowSectionProps) {
  return (
    <section
      id="alur"
      className="scroll-mt-16 bg-[#071d3e] px-5 py-24 text-white sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[1160px]">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
              Alur pendaftaran
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-[1.08] tracking-[-0.05em] sm:text-5xl">
              Sederhana dari awal.
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-blue-100/75">
              Kami merancang proses yang jelas agar kamu selalu tahu langkah
              berikutnya—tanpa formulir yang membingungkan.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <Headphones className="size-5 text-cyan-300" />

              <span className="text-sm font-semibold text-blue-50">
                Tim PMB siap membantu di setiap tahap
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((item) => {
              const StepIcon = admissionStepIcons[item.icon];

              return (
                <article
                  key={`${item.id}-${item.order}`}
                  className="group rounded-[24px] border border-white/10 bg-white/[0.055] p-6 transition-colors hover:bg-white/[0.09]"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-2xl bg-blue-500/15 text-cyan-300">
                      <StepIcon className="size-5" />
                    </span>

                    <span className="text-xs font-black tracking-[0.14em] text-blue-300/60">
                      {String(item.order).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-7 text-lg font-bold">{item.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-blue-100/65">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
