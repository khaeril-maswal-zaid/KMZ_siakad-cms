import { useMemo } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useProgramSelectionData } from "@/features/program-selection/hooks";
import type { StudySelection } from "@/features/program-selection/types";
import { getStoredRegistrationSelection, registerUser } from "./api";
import { mapStoredSelectionToStudySelection } from "./mapper";
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
    queryFn: getStoredRegistrationSelection,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const selection = useMemo<StudySelection | null>(() => {
    if (storageQuery.data) {
      return mapStoredSelectionToStudySelection(storageQuery.data);
    }
    return null;
  }, [storageQuery.data]);

  return {
    selection,
    waveName: programSelection.data?.waveName ?? "Gelombang 1",
    registrationFee: programSelection.data?.registrationFee ?? 250000,
    isLoading: programSelection.isLoading || storageQuery.isLoading,
    error: programSelection.error ?? storageQuery.error,
    refetch: async () => {
      await Promise.all([programSelection.refetch(), storageQuery.refetch()]);
    },
  };
}
