import { useMemo } from "react";
import { useInstitution } from "@/features/shared/institution";
import { useStudyPrograms } from "@/features/shared/master/study-program";
import { admissionSteps } from "./constants";

export function useHome() {
  const institutionSettingsQuery = useInstitution();
  const studyProgramsQuery = useStudyPrograms({ includeFaculty: true });

  const homeData = useMemo(() => {
    if (!institutionSettingsQuery.data) {
      return null;
    }

    return {
      // TODO: Replace with backend admission wave API when available.
      academicYear: "2026/2027",
      activeWave: {
        name: "Gelombang 1",
        period: "1 Januari - 30 Juni 2026",
        status: "active" as const,
        academicYear: "2026/2027",
      },
      programs: studyProgramsQuery.data ?? [],
      admissionSteps: admissionSteps(),
      faqs: [],
    };
  }, [institutionSettingsQuery.data, studyProgramsQuery.data]);

  return {
    data: homeData,
    isLoading:
      institutionSettingsQuery.isLoading || studyProgramsQuery.isLoading,
    error: institutionSettingsQuery.error ?? studyProgramsQuery.error,
  };
}
