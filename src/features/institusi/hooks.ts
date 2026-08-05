import { useQuery } from "@tanstack/react-query";

import { getInstitutionSettings } from "./api";
import { institutionQueryKeys } from "./query-keys";

export function useInstitution() {
  return useQuery({
    queryKey: institutionQueryKeys.settings(),

    queryFn: getInstitutionSettings,

    staleTime: 1000 * 60 * 60,
  });
}
