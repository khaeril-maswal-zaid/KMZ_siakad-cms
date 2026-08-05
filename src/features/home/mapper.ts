import type { InstitutionSettings } from "@/features/institution";

import type { Campus } from "./types";

export function mapCampus(settings: InstitutionSettings): Campus {
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
