import type { Payment, PaymentApiResponse, PaymentApiResource } from "./types";

export function mapPaymentResource(resource: PaymentApiResource): Payment {
  return {
    id: resource.id,
    paymentMethodId: resource.attributes.payment_method_id,
    invoiceNumber: resource.attributes.invoice_number,
    amount: Number(resource.attributes.amount),
    virtualAccountNumber: resource.attributes.virtual_account_number,
    paymentStatus: resource.attributes.payment_status,
    expiredAt: resource.attributes.expired_at,
    paidAt: resource.attributes.paid_at,
  };
}

export function mapPayment(response: PaymentApiResponse): Payment | null {
  if (!response.data) {
    return null;
  }

  return mapPaymentResource(response.data);
}
