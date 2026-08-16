export type PaymentBankId = "bni" | "bri" | "mandiri";

export type PaymentInstruction = {
  channel: string;
  steps: string[];
};

export type PaymentMethod = {
  id: PaymentBankId;
  name: string;
  shortName: string;
  description: string;
  accent: "orange" | "blue" | "navy";
  instructions: PaymentInstruction[];
};

export type VirtualAccount = {
  number: string;
  bankId: PaymentBankId;
  bankName: string;
  amount: number;
  generatedAt: string;
  expiresAt: string;
  status: "active" | "paid";
};

export type PaymentReceipt = {
  referenceNumber: string;
  bankId: PaymentBankId;
  bankName: string;
  paidAt: string;
};

export type PaymentState = {
  selectedBankId: PaymentBankId | null;
  virtualAccount: VirtualAccount | null;
  receipt: PaymentReceipt | null;
};

export type GenerateVirtualAccountPayload = {
  accountId: string;
  bankId: PaymentBankId;
  amount: number;
};

export type SimulatePaymentPayload = {
  virtualAccount: VirtualAccount;
};
