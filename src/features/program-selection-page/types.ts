import type { AdmissionPath } from "@/features/master/admission-path";
import type { ClassSchedule } from "@/features/master/class-schedule";
import type { StudyProgram } from "@/features/master/study-program";

export type StudySelection = {
  level: string;
  faculty: string;
  programId: string;
  programName: string;
  studySystemId: string;
  studySystem: string;
  admissionPathId: string;
  admissionPathName: string;
  admissionPathDescription: string;
  waveId: string;
  waveName: string;
  registrationFee: number;
};

export type ProgramSelectionPageData = {
  programs: StudyProgram[];
  classSchedules: ClassSchedule[];
  admissionPaths: AdmissionPath[];
  waveName: string;
  registrationFee: number;
};
