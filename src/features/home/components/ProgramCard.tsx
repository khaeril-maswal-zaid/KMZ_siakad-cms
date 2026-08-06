import { BookOpen, MoveUpRight } from "lucide-react";
import Link from "next/link";
import type { StudyProgram } from "@/features/master/study-program";

type ProgramCardProps = {
  program: StudyProgram;
  index: number;
};

const accentStyles: Record<
  StudyProgram["accent"],
  {
    icon: string;
    glow: string;
    line: string;
  }
> = {
  blue: {
    icon: "bg-blue-50 text-blue-700",
    glow: "from-blue-100/80",
    line: "bg-blue-600",
  },

  cyan: {
    icon: "bg-cyan-50 text-cyan-700",
    glow: "from-cyan-100/80",
    line: "bg-cyan-500",
  },

  indigo: {
    icon: "bg-indigo-50 text-indigo-700",
    glow: "from-indigo-100/80",
    line: "bg-indigo-600",
  },

  sky: {
    icon: "bg-sky-50 text-sky-700",
    glow: "from-sky-100/80",
    line: "bg-sky-500",
  },
};

export function ProgramCard({ program, index }: ProgramCardProps) {
  const accent = accentStyles[program.accent];

  return (
    <article
      className="program-card group relative flex min-h-[330px] flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(25,66,120,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_54px_rgba(25,66,120,0.12)] sm:p-7"
      style={{
        animationDelay: `${index * 70}ms`,
      }}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${accent.glow} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-60`}
      />

      <div
        className={`absolute left-7 top-0 h-1 w-10 rounded-b-full ${accent.line}`}
      />

      <div className="relative flex items-start justify-between">
        <span
          className={`grid size-12 place-items-center rounded-2xl ${accent.icon}`}
        >
          <BookOpen className="size-5" strokeWidth={2} />
        </span>

        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-600">
          {program.level}
        </span>
      </div>

      <div className="relative mt-8 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600">
          {program.faculty?.name}
        </p>

        <h3 className="mt-3 text-[23px] font-bold tracking-[-0.035em] text-slate-950">
          {program.name}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {program.name} dengan akreditas {program.accreditation}.
        </p>
      </div>

      <Link
        href={`/pendaftaran/pilih-program?program_studi=${program.id}`}
        className="relative mt-7 inline-flex min-h-11 items-center justify-between rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-800 transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        Daftar sekarang
        <MoveUpRight className="size-4" />
      </Link>
    </article>
  );
}
