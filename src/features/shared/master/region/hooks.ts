import { useQuery } from "@tanstack/react-query";
import { getRegions } from "./api";
import { regionQueryKeys } from "./query-keys";

export function useRegions(keyword: string) {
  return useQuery({
    queryKey: regionQueryKeys.search(keyword),

    queryFn: () => getRegions(keyword),

    enabled: keyword.length >= 2,
  });
}
