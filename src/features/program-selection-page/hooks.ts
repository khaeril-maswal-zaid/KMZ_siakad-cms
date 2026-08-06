import { useMemo } from "react";

import { useAdmissionPaths } from "@/features/master/admission-path";
import { useClassSchedules } from "@/features/master/class-schedule";
import { useStudyPrograms } from "@/features/master/study-program";

import type { ProgramSelectionPageData } from "./types";

export function useProgramSelectionData() {
  const programsQuery = useStudyPrograms({ includeFaculty: true });
  const classSchedulesQuery = useClassSchedules();
  const admissionPathsQuery = useAdmissionPaths();

  const data = useMemo<ProgramSelectionPageData | null>(() => {
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
      waveName: "Gelombang 1",
      registrationFee: 250000,
    };
  }, [admissionPathsQuery.data, classSchedulesQuery.data, programsQuery.data]);

  return {
    data,
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
