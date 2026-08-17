import { useMemo } from "react";
import { useInstitution } from "@/features/shared/institution";
import { useStudyPrograms } from "@/features/shared/master/study-program";
import { useActiveMave } from "@/features/shared/master/active-mave";
import { formatPeriodId } from "@/lib/formatters/date";
import { admissionSteps } from "./constants";

export function useHome() {
  const institutionSettingsQuery = useInstitution();
  const studyProgramsQuery = useStudyPrograms({ includeFaculty: true });
  const activeMaveQuery = useActiveMave();

  const homeData = useMemo(() => {
    if (!institutionSettingsQuery.data) {
      return null;
    }

    const activeMave = activeMaveQuery.data;

    return {
      academicYear: "2026/2027",

      activeWave: activeMave
        ? {
            name: activeMave.name,
            period: formatPeriodId(
              activeMave.registrationStart,
              activeMave.registrationEnd,
            ),
            status: "active" as const,
            academicYear: "2026/2027",
          }
        : null,

      programs: studyProgramsQuery.data ?? [],
      admissionSteps: admissionSteps(),
      faqs: [],
    };
  }, [
    institutionSettingsQuery.data,
    studyProgramsQuery.data,
    activeMaveQuery.data,
  ]);

  return {
    data: homeData,
    isLoading:
      institutionSettingsQuery.isLoading ||
      studyProgramsQuery.isLoading ||
      activeMaveQuery.isLoading,
    error:
      institutionSettingsQuery.error ??
      studyProgramsQuery.error ??
      activeMaveQuery.error,
  };
}
