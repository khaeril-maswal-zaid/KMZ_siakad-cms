import { useQuery } from "@tanstack/react-query";

import { getActiveMave } from "./api";
import { activeMaveQueryKeys } from "./query-keys";

export function useActiveMave() {
  return useQuery({
    queryKey: activeMaveQueryKeys.detail(),
    queryFn: getActiveMave,
  });
}
