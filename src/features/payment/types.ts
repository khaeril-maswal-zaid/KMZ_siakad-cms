export type PaymentStatus = "pending" | "paid" | "expired" | "failed";

export type Payment = {
  id: string;
  paymentMethodId: number;
  invoiceNumber: string;
  amount: number;
  virtualAccountNumber: string | null;
  paymentStatus: PaymentStatus;
  expiredAt: string | null;
  paidAt: string | null;
};

export type PaymentApiResource = {
  id: string;
  type: "pmb_payments";
  attributes: {
    payment_method_id: number;
    invoice_number: string;
    amount: string;
    virtual_account_number: string | null;
    payment_status: PaymentStatus;
    expired_at: string | null;
    paid_at: string | null;
  };
};

export type PaymentApiResponse = {
  data: PaymentApiResource | null;
};

export type SelectPaymentMethodPayload = {
  payment_method_id: number;
};
