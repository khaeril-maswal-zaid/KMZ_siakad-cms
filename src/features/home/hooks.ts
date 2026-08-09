import { useMemo } from "react";
import { useInstitution } from "@/features/shared/institution";
import { useStudyPrograms } from "@/features/shared/master/study-program";
import { admissionSteps } from "./mapper";

export function useHome() {
  const institution = useInstitution();
  const studyPrograms = useStudyPrograms({ includeFaculty: true });

  const data = useMemo(() => {
    if (!institution.data) {
      return null;
    }

    return {
      academicYear: "2026/2027",
      activeWave: {
        name: "Gelombang 1",
        period: "1 Januari - 30 Juni 2026",
        status: "active" as const,
        academicYear: "2026/2027",
      },
      programs: studyPrograms.data ?? [],
      admissionSteps: admissionSteps(),
      faqs: [],
    };
  }, [institution.data, studyPrograms.data]);

  return {
    data,
    isLoading: institution.isLoading || studyPrograms.isLoading,
    error: institution.error ?? studyPrograms.error,
  };
}
