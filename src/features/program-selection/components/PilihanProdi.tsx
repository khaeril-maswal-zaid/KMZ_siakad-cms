import { Check, GraduationCap, PencilLine } from "lucide-react";
import { useMemo, useState } from "react";
import type { StudyProgram } from "@/features/shared/master/study-program";

type PilihanProdiProps = {
  programs: StudyProgram[];
  initialProgramId?: string;
  selectedProgramId: string;
  onProgramChange: (programId: string) => void;
};

export function PilihanProdi({
  programs,
  initialProgramId,
  selectedProgramId,
  onProgramChange,
}: PilihanProdiProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>();
  const [isChangingProgram, setIsChangingProgram] = useState(false);

  const programId = selectedProgramId || initialProgramId || "";

  const selectedProgram = useMemo(
    () => programs.find((program) => program.id === programId),
    [programs, programId],
  );

  const levels = useMemo(
    () => [...new Set(programs.map((program) => program.level))],
    [programs],
  );

  const activeLevel =
    selectedLevel && levels.includes(selectedLevel)
      ? selectedLevel
      : (selectedProgram?.level ?? (levels.includes("S1") ? "S1" : levels[0]));

  const visiblePrograms = useMemo(
    () => programs.filter((program) => program.level === activeLevel),
    [programs, activeLevel],
  );

  function handleChangeProgram(programId: string) {
    onProgramChange(programId);
    setIsChangingProgram(false);
  }

  if (selectedProgram && !isChangingProgram) {
    return (
      <div className="overflow-hidden rounded-[28px] border border-blue-200 bg-white shadow-[0_14px_45px_rgba(30,64,110,0.07)]">
        <div className="border-b border-blue-100 bg-blue-50/80 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-2 text-blue-700">
            <span className="grid size-6 place-items-center rounded-full bg-blue-600 text-white">
              <Check className="size-3.5" />
            </span>

            <p className="text-xs font-extrabold uppercase tracking-[0.12em]">
              {selectedProgramId
                ? "Pilihan diperbarui"
                : "Pilihan dari halaman utama"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold text-slate-500">
                {selectedProgram.level}
              </span>

              <span className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-blue-600">
                {selectedProgram.faculty?.name ?? "-"}
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-[-0.035em] text-slate-950">
              {selectedProgram.name}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Lanjutkan dengan memilih sistem kuliah dan jalur masuk.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedLevel(selectedProgram.level);
              setIsChangingProgram(true);
            }}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <PencilLine className="size-3.5" />
            Ubah pilihan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(30,64,110,0.06)] sm:p-7">
      <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="flex items-start gap-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700">
            <GraduationCap className="size-5" />
          </span>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-600">
              Program studi
            </p>

            <h2 className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-slate-950">
              Pilihan akademikmu.
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Pilih jenjang lebih dulu. Daftar program akan menyesuaikan tab
              yang sedang aktif.
            </p>
          </div>
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
                className={`min-h-10 min-w-16 rounded-xl px-4 text-sm font-bold transition-all ${
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

      <div
        className="mt-6 grid gap-3 sm:grid-cols-2"
        role="radiogroup"
        aria-label="Pilih program studi"
      >
        {visiblePrograms.map((program) => {
          const isSelected = program.id === programId;

          return (
            <button
              key={program.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleChangeProgram(program.id)}
              className={`relative min-h-44 rounded-2xl border p-5 text-left transition-all ${
                isSelected
                  ? "border-blue-600 bg-blue-50/70 shadow-[0_10px_30px_rgba(37,99,235,0.1)]"
                  : "border-slate-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold text-slate-500">
                  {program.level}
                </span>

                <span
                  className={`grid size-6 place-items-center rounded-full border ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 text-transparent"
                  }`}
                >
                  <Check className="size-3.5" />
                </span>
              </div>

              <span className="mt-4 block text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-600">
                {program.faculty?.name ?? "-"}
              </span>

              <span className="mt-2 block text-lg font-bold tracking-[-0.025em] text-slate-950">
                {program.name}
              </span>

              <span className="mt-2 block text-xs leading-5 text-slate-500">
                {program.accreditation}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
