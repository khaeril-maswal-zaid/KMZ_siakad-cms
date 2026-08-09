"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SelectionSummaryCard } from "@/components/SelectionSummaryCard";
import type { StudySelection } from "@/features/program-selection-page/types";
import { useProgramSelectionData } from "@/features/program-selection-page/hooks";
import { LoadingComponent } from "@/components/LoadingComponent";
import { ErrorComponent } from "@/components/ErrorComponent";
import {
  Information,
  PilihanProdi,
  JalurMasuk,
  SistemKuliah,
} from "@/features/program-selection-page/components/";
import { PmbFlowShell } from "@/components/PmbFowShell";

export function ProgramSelectionPage({
  initialProgramId,
  nextStep,
}: {
  initialProgramId?: string;
  nextStep: () => void;
}) {
  const router = useRouter();

  const { data, isLoading, error, refetch } = useProgramSelectionData();
  const [selectedProgramId, setSelectedProgramId] = useState(
    initialProgramId ?? "",
  );

  const [selectedCampus, setSelectedCampus] = useState(""); //kampus
  const [selectedSession, setSelectedSession] = useState(""); //waktu kuliah
  const [selectedAdmissionPathId, setSelectedAdmissionPathId] = useState(""); //jalur masuk

  const campuses = useMemo(() => {
    if (!data) return [];

    return [...new Set(data.classSchedules.map((item) => item.campus))];
  }, [data]);

  const availableStudySystems = useMemo(() => {
    if (!data) return [];

    return data.classSchedules.filter((item) => item.campus === selectedCampus);
  }, [data, selectedCampus]);

  const selectedProgram = data?.programs.find(
    (program) => program.id === selectedProgramId,
  );

  const selectedStudySystem = availableStudySystems.find(
    (system) => system.session === selectedSession,
  );

  const selectedAdmissionPath = data?.admissionPaths.find(
    (path) => path.id === selectedAdmissionPathId,
  );

  const selectedStudy: StudySelection | null = selectedProgram
    ? {
        level: selectedProgram.level,
        faculty: selectedProgram.faculty?.name ?? "-",
        programId: selectedProgram.id,
        programName: selectedProgram.name,
        studySystemId: selectedStudySystem?.id ?? "",
        studySystem: selectedStudySystem?.name ?? "",
        admissionPathId: selectedAdmissionPath?.id ?? "",
        admissionPathName: selectedAdmissionPath?.name ?? "",
        admissionPathDescription: selectedAdmissionPath?.description ?? "",
        waveId: "wave-1",
        waveName: data?.waveName ?? "",
        registrationFee: data?.registrationFee ?? 0,
      }
    : null;

  const canContinue = Boolean(
    selectedStudy?.programId &&
    selectedStudy.studySystemId &&
    selectedStudy.admissionPathId,
  );

  useEffect(() => {
    if (!data) return;
  }, [campuses, data, selectedCampus]);

  useEffect(() => {
    if (!selectedCampus) return;
    if (selectedSession) return;
  }, [availableStudySystems, selectedCampus, selectedSession]);

  function continueRegistrationX() {
    if (!canContinue) return;
    router.push("/pendaftaran/registrasi");
  }

  if (error) {
    return <ErrorComponent refetch={refetch} />;
  }

  if (isLoading || !data) {
    return <LoadingComponent />;
  }

  return (
    <>
      <PmbFlowShell
        currentStep={1}
        eyebrow="Tahap 1 dari 5"
        title="Pilih program dan jalur kuliahmu."
        description="Mulai dari program studi, lalu tentukan sistem kuliah dan jalur masuk yang paling sesuai sebelum membuat akun pendaftaran."
      >
        <section className="mx-auto grid max-w-295 gap-8 px-5 py-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-5">
            <PilihanProdi
              programs={data.programs}
              selectedProgramId={selectedProgramId}
              onProgramChange={setSelectedProgramId}
            />

            <SistemKuliah
              campuses={campuses}
              availableStudySystems={availableStudySystems}
              selectedCampus={selectedCampus}
              selectedSession={selectedSession}
              onCampusChange={(campus) => {
                setSelectedCampus(campus);
                setSelectedSession("");
              }}
              onSessionChange={setSelectedSession}
            />

            <JalurMasuk
              admissionPaths={data.admissionPaths}
              selectedAdmissionPathId={selectedAdmissionPathId}
              onAdmissionPathChange={setSelectedAdmissionPathId}
            />

            <Information />
          </div>

          <div className="lg:sticky lg:top-6">
            <SelectionSummaryCard
              selection={selectedStudy}
              waveName={data.waveName}
              registrationFee={data.registrationFee}
              actionLabel="Lanjutkan Registrasi"
              onAction={nextStep}
              disabled={!canContinue}
            />
          </div>
        </section>
      </PmbFlowShell>
    </>
  );
}
