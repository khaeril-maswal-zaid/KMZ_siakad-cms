import { useMemo } from "react";
import { useInstitution } from "@/features/shared/institution";
import { mapInstitutionSettingsToCampusProfile } from "@/mapper/campus-profile.mapper";

export function useCampusProfile() {
  const institutionSettingsQuery = useInstitution();

  return useMemo(() => {
    if (!institutionSettingsQuery.data) {
      return null;
    }

    return mapInstitutionSettingsToCampusProfile(institutionSettingsQuery.data);
  }, [institutionSettingsQuery.data]);
}
