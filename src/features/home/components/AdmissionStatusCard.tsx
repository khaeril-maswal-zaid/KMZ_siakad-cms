import {
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import type { AdmissionWave } from "@/features/home/types";

type AdmissionStatusCardProps = {
  wave: AdmissionWave;
  academicYear: string;
};

export function AdmissionStatusCard({
  wave,
  academicYear,
}: AdmissionStatusCardProps) {
  return (
    <div className="hero-panel relative mx-auto w-full max-w-[500px] lg:ml-auto">
      <div className="absolute -left-10 top-16 hidden h-24 w-24 rounded-[28px] border border-white/80 bg-white/70 shadow-xl shadow-blue-950/10 backdrop-blur-xl xl:grid xl:place-items-center">
        <div className="text-center">
          <BadgeCheck className="mx-auto size-7 text-blue-600" />

          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
            Terverifikasi
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/90 p-3 shadow-[0_32px_80px_rgba(17,65,129,0.16)] backdrop-blur-xl">
        <div className="relative overflow-hidden rounded-[24px] bg-[#0a57c7] px-6 pb-7 pt-6 text-white sm:px-7">
          <div className="absolute -right-14 -top-16 size-48 rounded-full border-[34px] border-white/10" />

          <div className="absolute -bottom-24 right-20 size-40 rounded-full bg-cyan-300/20 blur-2xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
                Penerimaan {academicYear}
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em]">
                {wave?.name}
              </h2>
            </div>

            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-300 px-3 py-1.5 text-[11px] font-bold text-emerald-950">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-700" />
              Aktif
            </span>
          </div>

          <div className="relative mt-7 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5">
            <CalendarDays className="size-5 shrink-0 text-cyan-200" />

            <div>
              <p className="text-[11px] font-medium text-blue-100">
                Periode pendaftaran
              </p>

              <p className="mt-0.5 text-sm font-bold text-white">
                {wave?.period}
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 pb-3 pt-6 sm:px-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Perjalananmu
              </p>

              <p className="mt-1 text-sm font-bold text-slate-900">
                3 langkah untuk memulai
              </p>
            </div>

            <span className="grid size-9 place-items-center rounded-full bg-blue-50 text-xs font-extrabold text-blue-700">
              01
            </span>
          </div>

          <div className="space-y-1">
            {[
              ["Pilih program studi", "Temukan bidang yang paling sesuai"],
              ["Buat akun pendaftaran", "Lengkapi data dasar dengan aman"],
              ["Pantau progresmu", "Semua status dalam satu tempat"],
            ].map(([title, caption], index) => (
              <div
                key={title}
                className="group flex items-center gap-4 rounded-2xl px-2 py-3 transition-colors hover:bg-slate-50"
              >
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full border text-xs font-bold ${
                    index === 0
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 bg-white text-slate-500"
                  }`}
                >
                  {index === 0 ? <Check className="size-4" /> : index + 1}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-900">
                    {title}
                  </span>

                  <span className="mt-0.5 block text-xs text-slate-500">
                    {caption}
                  </span>
                </span>

                <ChevronRight className="size-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-600" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-7 -right-4 hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-xl shadow-blue-950/10 backdrop-blur-xl sm:flex xl:-right-10">
        <span className="grid size-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
          <ShieldCheck className="size-5" />
        </span>

        <div>
          <p className="text-xs font-bold text-slate-900">Proses transparan</p>

          <p className="mt-0.5 text-[11px] text-slate-500">
            Status selalu terpantau
          </p>
        </div>
      </div>
    </div>
  );
}
