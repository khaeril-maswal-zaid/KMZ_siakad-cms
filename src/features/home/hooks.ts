import { useMemo } from "react";
import { useInstitution } from "@/features/institution";
import { mapCampus } from "./mapper";
import { useStudyPrograms } from "../master/study-program";

export function useHome() {
  const institution = useInstitution();
  // const programs = useStudyPrograms();

  const data = useMemo(() => {
    if (!institution.data) {
      return null;
    }

    return {
      campus: mapCampus(institution.data),
      academicYear: "2026/2027",
      activeWave: {
        name: "Gelombang 1",
        period: "1 Januari - 30 Juni 2026",
        status: "active" as const,
        academicYear: "2026/2027",
      },
      programs: [],
      admissionSteps: [],
      faqs: [],
    };
  }, [institution.data]);

  return {
    data,
    isLoading: institution.isLoading,
    error: institution.error,
  };
}
