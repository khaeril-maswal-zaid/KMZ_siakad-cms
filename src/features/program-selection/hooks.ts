import { useMemo } from "react";
import { useAdmissionPaths } from "@/features/shared/master/admission-path";
import { useClassSchedules } from "@/features/shared/master/class-schedule";
import { useStudyPrograms } from "@/features/shared/master/study-program";

import type { ProgramSelectionPageData } from "./types";

export function useProgramSelectionData() {
  const programsQuery = useStudyPrograms({ includeFaculty: true });
  const classSchedulesQuery = useClassSchedules();
  const admissionPathsQuery = useAdmissionPaths();

  const programSelectionData = useMemo<ProgramSelectionPageData | null>(() => {
    if (
      !programsQuery.data ||
      !classSchedulesQuery.data ||
      !admissionPathsQuery.data
    ) {
      return null;
    }

    return {
      programs: programsQuery.data,
      classSchedules: classSchedulesQuery.data,
      admissionPaths: admissionPathsQuery.data,
      // TODO: Replace with backend admission wave API when available.
      waveName: "Gelombang 1",
      registrationFee: 250000,
    };
  }, [admissionPathsQuery.data, classSchedulesQuery.data, programsQuery.data]);

  return {
    data: programSelectionData,
    isLoading:
      programsQuery.isLoading ||
      classSchedulesQuery.isLoading ||
      admissionPathsQuery.isLoading,
    error:
      programsQuery.error ??
      classSchedulesQuery.error ??
      admissionPathsQuery.error,
    refetch: async () => {
      await Promise.all([
        programsQuery.refetch(),
        classSchedulesQuery.refetch(),
        admissionPathsQuery.refetch(),
      ]);
    },
  };
}
