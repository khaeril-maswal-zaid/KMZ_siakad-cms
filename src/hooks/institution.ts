import { useMemo } from "react";
import { useInstitution } from "@/features/institution";
import { mapCampusProfile } from "@/mapper/institution";

export function useFooterData() {
  const institution = useInstitution();

  return useMemo(() => {
    if (!institution.data) {
      return {
        campus: null,
      };
    }

    return {
      campus: mapCampusProfile(institution.data),
    };
  }, [institution.data]);
}
