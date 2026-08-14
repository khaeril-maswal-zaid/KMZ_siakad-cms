"use client";

import { ErrorComponent } from "@/components/ErrorComponent";
import { LoadingComponent } from "@/components/LoadingComponent";
import { useProgramSelectionData } from "@/features/program-selection";
import {
  AlertTriangle,
  Check,
  GraduationCap,
  MapPin,
  Route,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export type StudySelectionDialogValues = {
  programId: string;
  studySystemId: string;
  admissionPathId: string;
};

type DummyStudySystem = {
  id: string;
  name: string;
};

type DummyAdmissionPath = {
  id: string;
  name: string;
  description: string;
};

type CurrentSelection = StudySelectionDialogValues & {
  level: string;
};

const defaultCurrentSelection: CurrentSelection = {
  level: "S1",
  programId: "ilkom",
  studySystemId: "bekasi-pagi",
  admissionPathId: "jalur-reguler",
};

const referenceOptions: {
  studySystems: DummyStudySystem[];
  admissionPaths: DummyAdmissionPath[];
} = {
  studySystems: [
    { id: "bekasi-pagi", name: "Bekasi Pagi" },
    { id: "bekasi-sore", name: "Bekasi Sore" },
    { id: "jakarta-weekend", name: "Jakarta Weekend" },
  ],
  admissionPaths: [
    {
      id: "jalur-reguler",
      name: "PMB Reguler",
      description: "Jalur umum untuk calon mahasiswa baru lulusan SMA/SMK/MA.",
    },
    {
      id: "jalur-khusus",
      name: "PMB Khusus",
      description:
        "Jalur prioritas untuk calon mahasiswa dengan prestasi unggul.",
    },
    {
      id: "jalur-transfer",
      name: "Transfer Mahasiswa",
      description:
        "Jalur pendaftaran untuk mahasiswa pindahan dari institusi lain.",
    },
  ],
};

export function StudyProgramDialog({
  open,
  currentSelection = defaultCurrentSelection,
  resetsProgress = false,
  onClose,
  onConfirm,
  selectedProgramId,
  initialProgramId,
}: {
  open: boolean;
  currentSelection?: CurrentSelection;
  resetsProgress?: boolean;
  onClose: () => void;
  onConfirm: (values: StudySelectionDialogValues) => void;
  selectedProgramId?: string;
  initialProgramId?: string;
}) {
  const {
    data: programSelectionData,
    isLoading,
    error,
    refetch,
  } = useProgramSelectionData();

  if (error) {
    return <ErrorComponent refetch={refetch} />;
  }

  if (isLoading || !programSelectionData) {
    return <LoadingComponent />;
  }

  const programs = programSelectionData.programs;

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

  //----------------------------------------------------------------------

  const safeCurrentSelection = currentSelection ?? defaultCurrentSelection;

  const [studySystemId, setStudySystemId] = useState(
    safeCurrentSelection.studySystemId,
  );

  const [admissionPathId, setAdmissionPathId] = useState(
    safeCurrentSelection.admissionPathId,
  );

  useEffect(() => {
    if (!levels.includes(activeLevel)) {
      setActiveLevel(levels[0] ?? "S1");
    }
  }, [activeLevel, levels]);

  const hasChanges =
    programId !== safeCurrentSelection.programId ||
    studySystemId !== safeCurrentSelection.studySystemId ||
    admissionPathId !== safeCurrentSelection.admissionPathId;

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, open]);

  if (!open || !referenceOptions) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-end bg-slate-950/45 p-0 backdrop-blur-sm sm:place-items-center sm:p-6">
      <button
        type="button"
        aria-label="Tutup dialog ubah pilihan studi"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="study-dialog-title"
        className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-[30px] bg-white shadow-[0_30px_90px_rgba(15,23,42,0.28)] sm:max-w-3xl sm:rounded-[30px]"
      >
        <header className="flex items-start justify-between gap-5 border-b border-slate-100 px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700">
              <GraduationCap className="size-5" />
            </span>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-blue-600">
                Pengaturan pilihan
              </p>
              <h2
                id="study-dialog-title"
                className="mt-1 text-xl font-bold tracking-[-0.03em] text-slate-950"
              >
                Ubah pilihan pendaftaran
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Pilih ulang jenjang, program studi, sistem kuliah, dan jalur
                masuk dalam satu tempat.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Tutup"
            className="grid size-9 shrink-0 place-items-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="space-y-5 overflow-y-auto px-5 py-5 sm:px-7">
          {resetsProgress && hasChanges && (
            <div className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-700" />
              Mengubah program, sistem kuliah, atau jalur masuk akan membuat
              pembayaran dan draft formulir dimulai kembali agar datanya tetap
              sesuai pilihan baru.
            </div>
          )}

          <DialogSection
            icon={<GraduationCap className="size-4" />}
            title="Program studi"
            description="Pilih jenjang lebih dulu agar daftar program lebih mudah dipindai."
          >
            {levels.length > 1 && (
              <div
                className="mb-4 flex w-fit items-center rounded-2xl border border-slate-200 bg-slate-50 p-1.5"
                aria-label="Pilih jenjang pendidikan"
              >
                {levels.map((level) => (
                  <button
                    key={String(level)}
                    type="button"
                    aria-pressed={activeLevel === level}
                    onClick={() => {
                      // setActiveLevel(level);
                      // if (
                      //   !programs.some(
                      //     (item: DummyProgram) =>
                      //       item.id === programId && item.level === level,
                      //   )
                      // ) {
                      //   setProgramId("");
                      // }
                    }}
                    className={`min-h-9 min-w-14 rounded-xl px-3 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      activeLevel === level
                        ? "bg-white text-blue-700 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {String(level)}
                  </button>
                ))}
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2" role="radiogroup">
              {visiblePrograms.map((program) => {
                const selected = program.id === programId;
                return (
                  <button
                    key={program.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setProgramId(program.id)}
                    className={`relative rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      selected
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-lg bg-white px-2 py-1 text-[9px] font-extrabold text-slate-500 shadow-sm">
                        {program.level}
                      </span>
                      <span
                        className={`grid size-5 place-items-center rounded-full ${
                          selected
                            ? "bg-blue-600 text-white"
                            : "border border-slate-200 text-transparent"
                        }`}
                      >
                        <Check className="size-3" />
                      </span>
                    </div>
                    <p className="mt-3 text-[9px] font-extrabold uppercase tracking-[0.1em] text-blue-600">
                      {program.faculty}xxx
                    </p>
                    <p className="mt-1.5 text-sm font-bold text-slate-950">
                      {program.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </DialogSection>

          <DialogSection
            icon={<MapPin className="size-4" />}
            title="Sistem kuliah"
            description="Pilih lokasi dan jadwal belajar yang paling sesuai."
          >
            <div className="grid gap-2 sm:grid-cols-3" role="radiogroup">
              {referenceOptions.studySystems.map((system) => {
                const selected = studySystemId === system.id;
                return (
                  <button
                    key={system.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setStudySystemId(system.id)}
                    className={`min-h-11 rounded-2xl border px-3 text-left text-xs font-extrabold leading-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      selected
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-slate-50"
                    }`}
                  >
                    {system.name}
                  </button>
                );
              })}
            </div>
          </DialogSection>

          <DialogSection
            icon={<Route className="size-4" />}
            title="Jalur masuk"
            description="Sesuaikan dengan riwayat pendidikan calon mahasiswa."
          >
            <div className="grid gap-3" role="radiogroup">
              {referenceOptions.admissionPaths.map((path) => {
                const selected = admissionPathId === path.id;
                return (
                  <button
                    key={path.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setAdmissionPathId(path.id)}
                    className={`rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      selected
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block text-sm font-extrabold text-slate-950">
                          {path.name}
                        </span>
                        <span className="mt-1.5 block text-xs leading-5 text-slate-500">
                          {path.description}
                        </span>
                      </span>
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded-full ${
                          selected
                            ? "bg-blue-600 text-white"
                            : "border border-slate-200 text-transparent"
                        }`}
                      >
                        <Check className="size-3" />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </DialogSection>
        </div>

        <footer className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 rounded-xl px-5 text-sm font-bold text-slate-500 transition-colors hover:bg-white hover:text-slate-800"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={
              !programId || !studySystemId || !admissionPathId || !hasChanges
            }
            onClick={() =>
              onConfirm({
                programId,
                studySystemId,
                admissionPathId,
              })
            }
            className="min-h-11 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            Simpan pilihan baru
          </button>
        </footer>
      </section>
    </div>
  );
}

function DialogSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-start gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
          {icon}
        </span>
        <div>
          <h3 className="text-sm font-extrabold text-slate-950">{title}</h3>
          <p className="mt-0.5 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}
