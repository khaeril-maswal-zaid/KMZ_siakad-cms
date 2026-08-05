"use client";

import { useMemo, useState } from "react";
import { ProgramCard } from "./ProgramCard";
import type { StudyProgram } from "@/features/home/types";

type ProgramSectionProps = {
  programs: StudyProgram[];
};

export function ProgramSection({ programs }: ProgramSectionProps) {
  const levels = useMemo(
    () => Array.from(new Set(programs.map((item) => item.level))),
    [programs],
  );

  const [selectedLevel, setSelectedLevel] = useState<string>();

  const activeLevel = selectedLevel ?? levels[0];

  const visiblePrograms = useMemo(
    () => programs.filter((program) => program.level === activeLevel),
    [activeLevel, programs],
  );

  return (
    <section
      id="program-studi"
      className="scroll-mt-10 px-5 py-24 sm:px-8 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1160px]">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="section-kicker">Temukan jalurmu</p>

            <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-0.05em] text-slate-950 sm:text-5xl">
              Program yang bertumbuh bersama ambisimu.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Pilih jenjang pendidikan untuk melihat program studi yang
              tersedia. Setiap pilihan dapat kamu ubah sebelum pembayaran.
            </p>
          </div>

          {levels.length > 1 && (
            <div
              className="flex w-fit items-center rounded-2xl border border-slate-200 bg-slate-50 p-1.5"
              aria-label="Pilih jenjang pendidikan"
            >
              {levels.map((level) => (
                <button
                  key={level}
                  type="button"
                  aria-pressed={activeLevel === level}
                  onClick={() => setSelectedLevel(level)}
                  className={`min-h-10 min-w-16 rounded-xl px-4 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    activeLevel === level
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visiblePrograms.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
