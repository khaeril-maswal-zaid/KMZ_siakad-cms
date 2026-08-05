import api from "@/lib/axios";

import { mapInstitutionSettings } from "./mapper";
import type {
  InstitutionSettingApiResponse,
  InstitutionSettings,
} from "./types";

export async function getInstitutionSettings(): Promise<InstitutionSettings> {
  const { data } =
    await api.get<InstitutionSettingApiResponse>("/master/settings");

  return mapInstitutionSettings(data.data);
}
