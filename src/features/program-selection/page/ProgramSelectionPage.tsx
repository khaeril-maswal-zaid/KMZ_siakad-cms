"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SelectionSummaryCard } from "@/components/SelectionSummaryCard";
import type { StudySelection } from "@/features/program-selection/types";
import { useProgramSelectionData } from "@/features/program-selection/hooks";
import { saveRegistrationSelection } from "@/features/auth/registration/storage";
import { LoadingComponent } from "@/components/LoadingComponent";
import { ErrorComponent } from "@/components/ErrorComponent";
import {
  Information,
  StudyProgramSelection,
  AdmissionPathSelection,
  ClassScheduleSelection,
} from "@/features/program-selection/components";
import { PmbFlowShell } from "@/components/PmbFlowShell";

export function ProgramSelectionPage({
  initialProgramId,
  nextStep,
}: {
  initialProgramId?: string;
  nextStep: () => void;
}) {
  const queryClient = useQueryClient();
  const {
    data: programSelectionData,
    isLoading,
    error,
    refetch,
  } = useProgramSelectionData();

  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedAdmissionPathId, setSelectedAdmissionPathId] = useState("");
  const [selectedProgramId, setSelectedProgramId] = useState(
    initialProgramId ?? "",
  );

  const campuses = useMemo(() => {
    if (!programSelectionData) return [];

    return [
      ...new Set(
        programSelectionData.classSchedules.map(
          (classSchedule) => classSchedule.campus,
        ),
      ),
    ];
  }, [programSelectionData]);

  const availableClassSchedules = useMemo(() => {
    if (!programSelectionData) return [];

    return programSelectionData.classSchedules.filter(
      (classSchedule) => classSchedule.campus === selectedCampus,
    );
  }, [programSelectionData, selectedCampus]);

  const selectedProgram = programSelectionData?.programs.find(
    (program) => program.id === selectedProgramId,
  );

  const selectedClassSchedule = availableClassSchedules.find(
    (classSchedule) => classSchedule.session === selectedSession,
  );

  const selectedAdmissionPath = programSelectionData?.admissionPaths.find(
    (path) => path.id === selectedAdmissionPathId,
  );

  const selectedStudy: StudySelection | null = selectedProgram
    ? {
        level: selectedProgram.level,
        faculty: selectedProgram.faculty?.name ?? "-",
        programId: selectedProgram.id,
        programName: selectedProgram.name,
        studySystemId: selectedClassSchedule?.id ?? "",
        studySystem: selectedClassSchedule?.name ?? "",
        admissionPathId: selectedAdmissionPath?.id ?? "",
        admissionPathName: selectedAdmissionPath?.name ?? "",
        admissionPathDescription: selectedAdmissionPath?.description ?? "",
        // TODO: Replace with backend admission wave API when available.
        waveId: "wave-1",
        waveName: programSelectionData?.waveName ?? "",
        registrationFee: programSelectionData?.registrationFee ?? 0,
      }
    : null;

  const canContinue = Boolean(
    selectedStudy?.programId &&
    selectedStudy.studySystemId &&
    selectedStudy.admissionPathId,
  );

  function continueRegistration() {
    if (!selectedStudy || !canContinue) return;

    saveRegistrationSelection(selectedStudy);
    queryClient.setQueryData(["registration", "selection"], selectedStudy);
    nextStep();
  }

  if (error) {
    return <ErrorComponent refetch={refetch} />;
  }

  if (isLoading || !programSelectionData) {
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
            <StudyProgramSelection
              programs={programSelectionData.programs}
              selectedProgramId={selectedProgramId}
              onProgramChange={setSelectedProgramId}
            />

            <ClassScheduleSelection
              campuses={campuses}
              availableClassSchedules={availableClassSchedules}
              selectedCampus={selectedCampus}
              selectedSession={selectedSession}
              onCampusChange={(campus) => {
                setSelectedCampus(campus);
                setSelectedSession("");
              }}
              onSessionChange={setSelectedSession}
            />

            <AdmissionPathSelection
              admissionPaths={programSelectionData.admissionPaths}
              selectedAdmissionPathId={selectedAdmissionPathId}
              onAdmissionPathChange={setSelectedAdmissionPathId}
            />

            <Information />
          </div>

          <div className="lg:sticky lg:top-6">
            <SelectionSummaryCard
              selection={selectedStudy}
              waveName={programSelectionData.waveName}
              registrationFee={programSelectionData.registrationFee}
              actionLabel="Lanjutkan Registrasi"
              onAction={continueRegistration}
              disabled={!canContinue}
            />
          </div>
        </section>
      </PmbFlowShell>
    </>
  );
}
