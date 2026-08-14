import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDashboardData, updateSelection } from "./api";
import { dashboardQueryKeys } from "./query-keys";
import type { UpdateSelectionPayload } from "./types";

export function useDashboard() {
  return useQuery({
    queryKey: dashboardQueryKeys.detail(),
    queryFn: getDashboardData,
  });
}

export function useUpdateSelection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateSelectionPayload) => updateSelection(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: dashboardQueryKeys.detail(),
      });
    },
  });
}
