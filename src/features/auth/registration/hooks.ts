import { useMutation, useQuery } from "@tanstack/react-query";

import { useProgramSelectionData } from "@/features/program-selection/hooks";
import { registerUser } from "./api";
import { getRegistrationSelection } from "./storage";
import type { RegisterUserPayload } from "./types";

export function useRegisterUser() {
  return useMutation({
    mutationFn: (payload: RegisterUserPayload) => registerUser(payload),
  });
}

export function useRegistrationData() {
  const programSelection = useProgramSelectionData();
  const storageQuery = useQuery({
    queryKey: ["registration", "selection"],
    queryFn: getRegistrationSelection,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  return {
    selection: storageQuery.data ?? null,
    // TODO: Replace with backend admission wave API when available.
    waveName: programSelection.data?.waveName ?? "Gelombang 1",
    registrationFee: programSelection.data?.registrationFee ?? 250000,
    isLoading: programSelection.isLoading || storageQuery.isLoading,
    error: programSelection.error ?? storageQuery.error,
    refetch: async () => {
      await Promise.all([programSelection.refetch(), storageQuery.refetch()]);
    },
  };
}
