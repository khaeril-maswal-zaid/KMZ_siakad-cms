import type {
  PaymentMethod,
  PaymentBankId,
  VirtualAccount,
  PaymentReceipt,
} from "./types/payment.types";
import { getPaymentMethodsMaster } from "@/features/shared/master/payment-method";
import type { PaymentMethodMaster } from "@/features/shared/master/payment-method";

function toPaymentBankId(code: string): PaymentBankId {
  const normalized = code.toLowerCase();

  if (normalized === "bni") return "bni";
  if (normalized === "bri") return "bri";
  if (normalized === "mandiri") return "mandiri";
  if (normalized === "qris") return "qris";

  return "bri";
}

function mapMasterPaymentMethod(resource: PaymentMethodMaster): PaymentMethod {
  const id = toPaymentBankId(resource.code);
  const isQrCode = resource.type === "qris" || id === "qris";

  return {
    id,
    name: resource.name,
    shortName: resource.code,
    description: isQrCode
      ? "Scan QRIS untuk melakukan pembayaran digital."
      : `Transfer via ${resource.name} Virtual Account`,
    accent: isQrCode
      ? "slate"
      : id === "bni"
        ? "navy"
        : id === "bri"
          ? "blue"
          : "orange",
    instructions: [
      {
        channel: isQrCode ? "QRIS" : "Virtual Account",
        steps: isQrCode
          ? [
              "Buka aplikasi e-wallet atau mobile banking.",
              "Pilih menu scan QRIS.",
              "Arahkan kamera ke QR code dan konfirmasi pembayaran.",
            ]
          : [
              "Pilih menu bayar atau transfer.",
              "Masukkan nomor Virtual Account yang tersedia.",
              "Konfirmasi pembayaran dan tunggu verifikasi.",
            ],
      },
    ],
  };
}

export async function getPaymentMethods(): Promise<PaymentMethod[]> {
  const masterMethods = await getPaymentMethodsMaster();

  return masterMethods.map(mapMasterPaymentMethod);
}

export const dummyApplicant = {
  accountId: "applicant-123",
  fullName: "Budi Setiawan",
};

export const dummySelection = {
  waveName: "Gelombang 1",
  level: "S1",
  faculty: "Teknik",
  programName: "Teknik Informatika",
  studySystem: "Reguler",
  admissionPathName: "Jalur Prestasi",
  registrationFee: 150000,
};

export function makeVirtualAccount(
  bankId: PaymentBankId,
  amount: number,
): VirtualAccount {
  const bankNameMap: Record<PaymentBankId, string> = {
    bni: "Bank BNI",
    bri: "Bank BRI",
    mandiri: "Bank Mandiri",
    qris: "QRIS",
  };

  return {
    number: `${bankId.toUpperCase()}-${Math.floor(Math.random() * 1000000000)}`,
    bankId,
    bankName: bankNameMap[bankId],
    amount,
    generatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    status: "active",
  };
}

export function makeReceipt(va: VirtualAccount): PaymentReceipt {
  return {
    referenceNumber: `R-${Math.floor(Math.random() * 1000000)}`,
    bankId: va.bankId,
    bankName: va.bankName,
    paidAt: new Date().toISOString(),
  };
}
