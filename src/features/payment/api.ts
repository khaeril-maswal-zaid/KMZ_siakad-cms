import api from "@/lib/axios";

import { mapPayment } from "./mapper";
import type {
  Payment,
  PaymentApiResponse,
  SelectPaymentMethodPayload,
} from "./types";

export async function selectPaymentMethod(
  payload: SelectPaymentMethodPayload,
): Promise<Payment | null> {
  const response = await api.post<PaymentApiResponse>(
    "/pmb/pembayaran-pendaftaran",
    payload,
  );

  return mapPayment(response.data);
}

export async function getPaymentStatus(): Promise<Payment | null> {
  const response = await api.get<PaymentApiResponse>(
    "/pmb/pembayaran-pendaftaran/cek-status",
  );

  return mapPayment(response.data);
}
