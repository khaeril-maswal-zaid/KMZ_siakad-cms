import api from "@/lib/axios";

import { mapPaymentMethods } from "./mapper";
import type { PaymentMethodApiResponse, PaymentMethodMaster } from "./types";

export async function getPaymentMethodsMaster(): Promise<
  PaymentMethodMaster[]
> {
  const response = await api.get<PaymentMethodApiResponse>(
    "/master/metode-pembayaran",
  );

  return mapPaymentMethods(response.data);
}
