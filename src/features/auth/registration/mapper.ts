import type {
  ProgramSelectionPageData,
  StudySelection,
} from "@/features/program-selection-page/types";

export function mapStoredSelectionToStudySelection(
  selection: StudySelection | null,
): StudySelection | null {
  return selection;
}

export function createDefaultRegistrationSelection(
  data: ProgramSelectionPageData,
): StudySelection | null {
  const program = data.programs[0];
  const studySystem = data.classSchedules[0];
  const admissionPath = data.admissionPaths[0];

  if (!program || !studySystem || !admissionPath) {
    return null;
  }

  return {
    level: program.level,
    faculty: program.faculty?.name ?? "-",
    programId: program.id,
    programName: program.name,
    studySystemId: studySystem.id,
    studySystem: studySystem.name,
    admissionPathId: admissionPath.id,
    admissionPathName: admissionPath.name,
    admissionPathDescription: admissionPath.description,
    waveId: "wave-1",
    waveName: data.waveName,
    registrationFee: data.registrationFee,
  };
}
