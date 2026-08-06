import type { AdmissionStep } from "./types.ts";

export function admissionSteps(): AdmissionStep[] {
  return [
    {
      id: "1",
      order: 1,
      title: "Pilih Program Studi",
      description:
        "Tentukan jenjang dan program studi yang sesuai dengan tujuanmu.",
      icon: "program",
    },
    {
      id: "2",
      order: 2,
      title: "Buat akun",
      description: "Isi data akun dasar untuk menyimpan pilihan dan progresmu.",
      icon: "account",
    },
    {
      id: "3",
      order: 3,
      title: "Isi formulir",
      description:
        "Lengkapi data diri dan dokumen yang dibutuhkan dengan mudah.",
      icon: "form",
    },
    {
      id: "4",
      order: 4,
      title: "Pembayaran",
      description:
        "Lakukan pembayaran biaya pendaftaran melalui metode yang tersedia.",
      icon: "payment",
    },
  ];
}
