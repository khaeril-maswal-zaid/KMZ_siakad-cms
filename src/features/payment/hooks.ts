import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getPaymentStatus, selectPaymentMethod } from "./api";
import { paymentQueryKeys } from "./query-keys";
import type { SelectPaymentMethodPayload } from "./types";

export function usePaymentStatus() {
  return useQuery({
    queryKey: paymentQueryKeys.status(),
    queryFn: getPaymentStatus,
  });
}

export function useSelectPaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SelectPaymentMethodPayload) =>
      selectPaymentMethod(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: paymentQueryKeys.status(),
      });
    },
  });
}
