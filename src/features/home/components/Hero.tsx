import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import Link from "next/link";
import { AdmissionStatusCard } from "./AdmissionStatusCard";
import type { PmbLandingData } from "@/features/home/types";

type HeroProps = {
  data: PmbLandingData;
};

export function Hero({ data }: HeroProps) {
  return (
    <section className="hero-grid relative overflow-hidden bg-[#f4f8ff] pb-24 pt-32 sm:pb-28 sm:pt-36 lg:min-h-[800px] lg:pb-28 lg:pt-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[920px] -translate-x-1/2 rounded-full bg-blue-300/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-48 top-32 size-[560px] rounded-full border border-blue-200/60" />
      <div className="pointer-events-none absolute -right-32 top-48 size-[440px] rounded-full border border-blue-200/60" />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.03fr_0.97fr] lg:gap-12 lg:px-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/75 px-3.5 py-2 text-xs font-bold text-blue-700 shadow-sm backdrop-blur">
            <Sparkles className="size-3.5" />
            Pendaftaran {data.academicYear} telah dibuka
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
            Selamat datang, calon mahasiswa
          </p>

          <h1 className="mt-4 max-w-[720px] text-[clamp(2.8rem,7vw,5.25rem)] font-bold leading-[0.99] tracking-[-0.065em] text-slate-950">
            Masa depanmu{" "}
            <span className="relative whitespace-nowrap text-blue-600">
              dimulai
              <span className="absolute -bottom-1 left-1 h-[5px] w-4/5 rounded-full bg-cyan-300/80" />
            </span>{" "}
            di sini.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Temukan program yang sesuai dengan ambisimu dan jalani proses
            pendaftaran yang sederhana, transparan, dan sepenuhnya digital.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#program-studi"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 text-sm font-bold text-white shadow-[0_14px_32px_rgba(37,99,235,0.28)] transition-all hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Mulai pendaftaran
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="#alur"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-6 text-sm font-bold text-slate-800 transition-colors hover:border-blue-200 hover:bg-white hover:text-blue-700"
            >
              Lihat alur pendaftaran
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-600 sm:text-sm">
            {[
              "Proses transparan",
              "Data tersimpan aman",
              "Bantuan responsif",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />

                {item}
              </span>
            ))}
          </div>
        </div>

        <AdmissionStatusCard
          wave={data.activeWave}
          academicYear={data.academicYear}
        />
      </div>
    </section>
  );
}
