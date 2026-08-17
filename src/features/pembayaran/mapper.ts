import type {
  PaymentMethod,
  PaymentBankId,
  VirtualAccount,
  PaymentReceipt,
} from "./types/payment.types";

export function getPaymentMethods(): PaymentMethod[] {
  return [
    {
      id: "bni",
      name: "Bank Negara Indonesia",
      shortName: "BNI",
      description: "Transfer via BNI Virtual Account",
      accent: "navy",
      instructions: [
        {
          channel: "Mobile Banking",
          steps: [
            "Buka aplikasi mobile banking.",
            "Pilih menu bayar > Virtual Account.",
            "Masukkan nomor Virtual Account dan konfirmasi.",
          ],
        },
      ],
    },
    {
      id: "bri",
      name: "Bank Rakyat Indonesia",
      shortName: "BRI",
      description: "Transfer via BRI Virtual Account",
      accent: "blue",
      instructions: [
        {
          channel: "ATM",
          steps: [
            "Masukkan kartu dan PIN.",
            "Pilih Transaksi Lain > Pembayaran > Virtual Account.",
            "Masukkan nomor dan konfirmasi.",
          ],
        },
      ],
    },
    {
      id: "mandiri",
      name: "Bank Mandiri",
      shortName: "MANDIRI",
      description: "Transfer via Mandiri Virtual Account",
      accent: "orange",
      instructions: [
        {
          channel: "Internet Banking",
          steps: [
            "Login internet banking.",
            "Pilih Pembayaran > Virtual Account.",
            "Masukkan nomor dan lakukan pembayaran.",
          ],
        },
      ],
    },
  ];
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
