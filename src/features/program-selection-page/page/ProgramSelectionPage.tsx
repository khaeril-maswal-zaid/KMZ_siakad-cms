"use client";

import {
  Check,
  GraduationCap,
  Info,
  MapPin,
  PencilLine,
  Route,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/context/auth-provider";
import { PmbFlowShell } from "@/features/pmb/components/pmb-flow-shell";
import { SelectionSummaryCard } from "@/features/pmb/components/selection-summary-card";
import { usePmbRegistration } from "@/features/pmb/context/pmb-registration-provider";
import { usePmbLanding } from "@/features/pmb/hooks/use-pmb-landing";
import { useRegistrationReferenceOptions } from "@/features/pmb/hooks/use-pmb-references";
import type { StudySelection } from "@/features/pmb/types/registration.types";
import {
  getStudyLevels,
  resolveStudySelection,
} from "@/features/pmb/utils/study-selection";
import { hasStudyProgramSelection } from "@/features/pmb/utils/registration-flow";
import { getApiErrorMessage } from "@/lib/api-error";

const studySessionLabels: Record<string, string> = {
  morning: "Reguler Pagi",
  evening: "Reguler Malam",
  weekend: "Akhir Pekan",
};

export function ProgramSelectionPage({
  initialProgramId,
}: {
  initialProgramId?: string;
}) {
  const router = useRouter();
  const { isAuthenticated, isReady: isAuthReady } = useAuth();
  const landingQuery = usePmbLanding();
  const referenceQuery = useRegistrationReferenceOptions();
  const { data } = landingQuery;
  const { data: referenceOptions } = referenceQuery;
  const {
    applicant,
    selection: existingSelection,
    isReady,
    setSelection,
  } = usePmbRegistration();
  const [changedProgramId, setChangedProgramId] = useState<string | null>(null);
  const [isChangingProgram, setIsChangingProgram] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>();
  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedAdmissionPathId, setSelectedAdmissionPathId] = useState("");

  const shouldReturnToDashboard = Boolean(
    isAuthReady &&
    isReady &&
    isAuthenticated &&
    applicant &&
    hasStudyProgramSelection(existingSelection),
  );

  useEffect(() => {
    if (shouldReturnToDashboard) {
      router.replace("/dashboard");
    }
  }, [router, shouldReturnToDashboard]);

  const levels = useMemo(() => (data ? getStudyLevels(data) : []), [data]);
  const activeLevel =
    selectedLevel && levels.includes(selectedLevel)
      ? selectedLevel
      : levels.includes("S1")
        ? "S1"
        : levels[0];

  const visiblePrograms = useMemo(
    () =>
      data?.programs.filter((program) => program.level === activeLevel) ?? [],
    [activeLevel, data],
  );

  const programId = changedProgramId ?? initialProgramId ?? "";
  const baseSelection = useMemo(
    () => (data && programId ? resolveStudySelection(data, programId) : null),
    [data, programId],
  );
  const selectedAdmissionPath = referenceOptions?.admissionPaths.find(
    (path) => path.id === selectedAdmissionPathId,
  );

  const campuses = useMemo(
    () =>
      referenceOptions
        ? Array.from(
            new Set(
              referenceOptions.studySystems.map((system) => system.campus),
            ),
          )
        : [],
    [referenceOptions],
  );

  const availableStudySystems = useMemo(
    () =>
      referenceOptions?.studySystems.filter(
        (system) => system.campus === selectedCampus,
      ) ?? [],
    [referenceOptions, selectedCampus],
  );

  const selectedStudySystem = availableStudySystems.find(
    (system) => system.session === selectedSession,
  );

  const selectedStudy = useMemo<StudySelection | null>(
    () =>
      baseSelection
        ? {
            ...baseSelection,
            studySystemId: selectedStudySystem?.id ?? "",
            studySystem: selectedStudySystem?.name ?? "",
            admissionPathId: selectedAdmissionPath?.id ?? "",
            admissionPathName: selectedAdmissionPath?.name ?? "",
            admissionPathDescription: selectedAdmissionPath?.description ?? "",
          }
        : null,
    [baseSelection, selectedAdmissionPath, selectedStudySystem],
  );

  const canContinue = Boolean(
    selectedStudy?.programId &&
    selectedStudy.studySystemId &&
    selectedStudy.admissionPathId,
  );

  function continueRegistration() {
    if (!selectedStudy?.programId) {
      toast.error("Pilih program studi terlebih dahulu.");
      return;
    }

    if (!selectedStudy.studySystemId) {
      toast.error("Pilih sistem kuliah terlebih dahulu.");
      return;
    }

    if (!selectedStudy.admissionPathId) {
      toast.error("Pilih jalur masuk terlebih dahulu.");
      return;
    }

    setSelection(selectedStudy);
    router.push(
      isAuthenticated && applicant ? "/dashboard" : "/pendaftaran/registrasi",
    );
  }

  const queryError = landingQuery.error ?? referenceQuery.error;

  if (queryError && !shouldReturnToDashboard) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f5f8fd] px-5">
        <div
          role="alert"
          className="w-full max-w-md rounded-[28px] border border-rose-100 bg-white p-6 text-center shadow-[0_20px_60px_rgba(30,64,110,0.1)]"
        >
          <h1 className="text-lg font-bold text-slate-950">
            Data pilihan belum berhasil dimuat
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {getApiErrorMessage(
              queryError,
              "Terjadi kendala saat memuat program dan pilihan pendaftaran.",
            )}
          </p>
          <button
            type="button"
            onClick={() => {
              void landingQuery.refetch();
              void referenceQuery.refetch();
            }}
            className="mt-5 min-h-11 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition-colors hover:bg-blue-700"
          >
            Coba lagi
          </button>
        </div>
      </div>
    );
  }

  if (
    !isAuthReady ||
    !isReady ||
    shouldReturnToDashboard ||
    !data ||
    !referenceOptions
  ) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f5f8fd]">
        <div className="size-9 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
      </div>
    );
  }

  return (
    <PmbFlowShell
      currentStep={1}
      eyebrow="Tahap 1 dari 5"
      title="Pilih program dan jalur kuliahmu."
      description="Mulai dari program studi, lalu tentukan sistem kuliah dan jalur masuk yang paling sesuai sebelum membuat akun pendaftaran."
    >
      <section className="mx-auto grid max-w-[1180px] gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:px-10">
        <div className="space-y-5">
          {baseSelection && !isChangingProgram ? (
            <div className="overflow-hidden rounded-[28px] border border-blue-200 bg-white shadow-[0_14px_45px_rgba(30,64,110,0.07)]">
              <div className="border-b border-blue-100 bg-blue-50/80 px-5 py-4 sm:px-7">
                <div className="flex items-center gap-2 text-blue-700">
                  <span className="grid size-6 place-items-center rounded-full bg-blue-600 text-white">
                    <Check className="size-3.5" />
                  </span>
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em]">
                    {changedProgramId
                      ? "Pilihan diperbarui"
                      : "Pilihan dari halaman utama"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-extrabold text-slate-500">
                      {baseSelection.level}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-blue-600">
                      {baseSelection.faculty}
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl font-bold tracking-[-0.035em] text-slate-950">
                    {baseSelection.programName}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Lanjutkan dengan memilih sistem kuliah dan jalur masuk.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLevel(baseSelection.level);
                    setIsChangingProgram(true);
                  }}
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <PencilLine className="size-3.5" />
                  Ubah pilihan
                </button>
              </div>
            </div>
          ) : (
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
                      Pilih jenjang lebih dulu. Daftar program akan menyesuaikan
                      tab yang sedang aktif.
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

              <div
                className="mt-6 grid gap-3 sm:grid-cols-2"
                role="radiogroup"
                aria-label="Pilih program studi"
              >
                {visiblePrograms.map((program) => {
                  const isSelected = programId === program.id;

                  return (
                    <button
                      key={program.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => {
                        setChangedProgramId(program.id);
                        setIsChangingProgram(false);
                      }}
                      className={`relative min-h-44 rounded-2xl border p-5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
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
                        {program.faculty}
                      </span>
                      <span className="mt-2 block text-lg font-bold tracking-[-0.025em] text-slate-950">
                        {program.name}
                      </span>
                      <span className="mt-2 block text-xs leading-5 text-slate-500">
                        {program.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <ChoiceSection
            icon={<MapPin className="size-5" />}
            eyebrow="Sistem kuliah"
            title="Pilih lokasi dan waktu belajar."
            description="Pilih sistem kuliah yang paling realistis dengan jadwal harianmu."
          >
            <div>
              <p className="mb-2 text-[11px] font-bold text-slate-500">
                Kampus
              </p>
              <div
                className="grid gap-2 sm:grid-cols-3"
                role="radiogroup"
                aria-label="Pilih kampus"
              >
                {campuses.map((campus) => {
                  const selected = selectedCampus === campus;

                  return (
                    <button
                      key={campus}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => {
                        setSelectedCampus(campus);
                        setSelectedSession("");
                      }}
                      className={`min-h-12 rounded-2xl border px-3 text-left text-xs font-extrabold leading-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                        selected
                          ? "border-blue-600 bg-blue-50 text-blue-700 shadow-[0_8px_22px_rgba(37,99,235,0.1)]"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-slate-50"
                      }`}
                    >
                      {campus}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-[11px] font-bold text-slate-500">
                Waktu kuliah
              </p>
              <div
                className="grid gap-2 sm:grid-cols-3"
                role="radiogroup"
                aria-label="Pilih waktu kuliah"
              >
                {availableStudySystems.map((system) => {
                  const selected = selectedSession === system.session;

                  return (
                    <button
                      key={system.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setSelectedSession(system.session)}
                      className={`min-h-12 rounded-2xl border px-3 text-left text-xs font-extrabold leading-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                        selected
                          ? "border-blue-600 bg-blue-50 text-blue-700 shadow-[0_8px_22px_rgba(37,99,235,0.1)]"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-slate-50"
                      }`}
                    >
                      {studySessionLabels[system.session] ?? system.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </ChoiceSection>

          <ChoiceSection
            icon={<Route className="size-5" />}
            eyebrow="Jalur masuk"
            title="Tentukan jalur pendaftaran."
            description="Pilih jalur yang sesuai dengan riwayat pendidikan dan skema masukmu."
          >
            <div className="grid gap-3" role="radiogroup">
              {referenceOptions.admissionPaths.map((path) => {
                const selected = selectedAdmissionPathId === path.id;

                return (
                  <button
                    key={path.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setSelectedAdmissionPathId(path.id)}
                    className={`group rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      selected
                        ? "border-blue-600 bg-blue-50/80 shadow-[0_10px_30px_rgba(37,99,235,0.1)]"
                        : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span className="min-w-0">
                        <span className="block text-sm font-extrabold leading-5 text-slate-950">
                          {path.name}
                        </span>
                        <span className="mt-2 block text-xs leading-5 text-slate-500">
                          {path.description}
                        </span>
                      </span>
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded-full border ${
                          selected
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-200 text-transparent group-hover:border-blue-200"
                        }`}
                      >
                        <Check className="size-3.5" />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </ChoiceSection>

          <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3.5 text-xs leading-5 text-blue-800">
            <Info className="mt-0.5 size-4 shrink-0" />
            <span>
              Program studi, sistem kuliah, dan jalur masuk akan tersimpan dalam
              ringkasan pendaftaran. Kamu masih dapat memperbaruinya sebelum
              pembayaran dibuat.
            </span>
          </div>
        </div>

        <div className="lg:sticky lg:top-6">
          <SelectionSummaryCard
            selection={selectedStudy}
            waveName={data.activeWave.name}
            registrationFee={data.registrationFee}
            actionLabel="Lanjutkan Registrasi"
            onAction={continueRegistration}
            disabled={!canContinue}
          />
        </div>
      </section>
    </PmbFlowShell>
  );
}

function ChoiceSection({
  icon,
  eyebrow,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(30,64,110,0.06)] sm:p-7">
      <div className="flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-cyan-700">
          {icon}
        </span>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-blue-600">
            {eyebrow}
          </p>
          <h2 className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-slate-950">
            {title}
          </h2>
          <p className="mt-1.5 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
