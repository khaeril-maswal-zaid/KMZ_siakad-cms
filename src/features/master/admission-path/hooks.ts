import { useQuery } from "@tanstack/react-query";

import { getAdmissionPaths } from "./api";
import { admissionPathQueryKeys } from "./query-keys";

export function useAdmissionPaths() {
  return useQuery({
    queryKey: admissionPathQueryKeys.lists(),

    queryFn: getAdmissionPaths,
  });
}
