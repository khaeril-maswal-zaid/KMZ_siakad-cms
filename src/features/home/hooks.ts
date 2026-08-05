import { useMemo } from "react";
import { useInstitution } from "@/features/institution";
import { mapCampus } from "./mapper";

export function useHome() {
  const institution = useInstitution();

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
