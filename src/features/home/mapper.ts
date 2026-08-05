import type { InstitutionSettings } from "@/features/institution";

import type { AdmissionStep, CampusProfile } from "./types.ts";
import { UsersRound } from "lucide-react";

export function mapCampus(settings: InstitutionSettings): CampusProfile {
  return {
    institutionType: "Universitas",
    name: settings.general.nama_kampus ?? "Nama Kampus",
    logo: settings.general.logo_kampus,

    contact: {
      email: settings.contact.email ?? "",
      phone: settings.contact.telepon ?? "",
      whatsapp: settings.contact.whatsapp ?? "",
      whatsappUrl: `https://wa.me/${settings.contact.whatsapp ?? ""}`,
      address: settings.contact.alamat ?? "",
      helpHours: "Senin - Jumat 08.00 - 16.00",
    },

    description: "Penerimaan mahasiswa baru secara digital.",
  };
}

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
