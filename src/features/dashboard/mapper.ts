import { Clock3, ReceiptText, UserRound } from "lucide-react";
import { createElement } from "react";
import type { DashboardData } from "./types";

export function getDashboardData(): DashboardData {
  return {
    firstName: "Alya",
    eyebrow: "Tahap 3 dari 5",
    titleDescription:
      "Akunmu sudah aktif. Pantau progres, periksa pilihan studi, dan lanjutkan setiap tahap penerimaan dari dashboard ini.",
    statuses: [
      {
        label: "Status pendaftaran",
        value: "Menunggu pembayaran",
        description: "Perlu tindakanmu",
        icon: createElement(Clock3, { className: "size-5" }),
        tone: "amber",
      },
      {
        label: "Status akun",
        value: "Akun Camaba aktif",
        description: "Dibuat 12 Januari 2026",
        icon: createElement(UserRound, { className: "size-5" }),
        tone: "blue",
      },
      {
        label: "Biaya pendaftaran",
        value: "Rp250.000",
        description: "Belum dibayar",
        icon: createElement(ReceiptText, { className: "size-5" }),
        tone: "cyan",
      },
    ],
    processSteps: [
      {
        id: "program",
        label: "Pilih program studi",
        description: "Program studi dan jalur masuk sudah dipilih.",
        status: "completed",
      },
      {
        id: "account",
        label: "Buat akun",
        description: "Akun pendaftaranmu sudah aktif.",
        status: "completed",
      },
      {
        id: "payment",
        label: "Pembayaran",
        description: "Bayar biaya pendaftaran untuk membuka formulir.",
        status: "current",
      },
      {
        id: "form",
        label: "Isi formulir",
        description: "Lengkapi data diri dan dokumen pendaftaran.",
        status: "upcoming",
      },
      {
        id: "selection",
        label: "Jadwal seleksi",
        description: "Pantau jadwal dan hasil seleksi penerimaan.",
        status: "upcoming",
      },
    ],
    selection: {
      institutionName: "Universitas Arunika",
      level: "Sarjana (S1)",
      faculty: "Fakultas Teknologi Informasi",
      programName: "Sistem Informasi",
      waveName: "Gelombang 1",
      studySystem: "Reguler Pagi",
      admissionPathName: "Jalur Umum",
      registrationFee: "Rp250.000",
    },
    nextAction: "Selesaikan pembayaran agar formulir pendaftaran dapat diisi.",
    nextActionLabel: "Lanjutkan pembayaran",
    nextActionHref: "/pendaftaran",
  };
}
