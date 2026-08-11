import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "./api";
import { dashboardQueryKeys } from "./query-keys";

export function useDashboard() {
  return useQuery({
    queryKey: dashboardQueryKeys.detail(),
    queryFn: getDashboardData,
  });
}
