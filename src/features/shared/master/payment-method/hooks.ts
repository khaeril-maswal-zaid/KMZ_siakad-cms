import { useQuery } from "@tanstack/react-query";

import { getPaymentMethodsMaster } from "./api";
import { paymentMethodQueryKeys } from "./query-keys";

export function usePaymentMethodsMaster() {
  return useQuery({
    queryKey: paymentMethodQueryKeys.lists(),
    queryFn: getPaymentMethodsMaster,
  });
}
