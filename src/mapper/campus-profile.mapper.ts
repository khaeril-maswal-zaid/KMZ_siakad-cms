import { InstitutionSettings } from "@/features/shared/institution";
import { CampusProfile } from "@/types/campus-profile";

export function mapInstitutionSettingsToCampusProfile(
  institutionSettings: InstitutionSettings,
): CampusProfile {
  return {
    institutionType: "Universitas",
    name: institutionSettings.general.nama_kampus ?? "Nama Kampus",
    logo: institutionSettings.general.logo_kampus,

    contact: {
      email: institutionSettings.contact.email ?? "",
      phone: institutionSettings.contact.telepon ?? "",
      whatsapp: institutionSettings.contact.whatsapp ?? "",
      whatsappUrl: `https://wa.me/${institutionSettings.contact.whatsapp ?? ""}`,
      address: institutionSettings.contact.alamat ?? "",
      helpHours: "Senin - Jumat 08.00 - 16.00",
    },

    description: "Penerimaan mahasiswa baru secara digital.",
  };
}
