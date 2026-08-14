import api from "@/lib/axios";

import { mapInstitutionSettingResourcesToSettings } from "./mapper";
import type {
  InstitutionSettingApiResponse,
  InstitutionSettings,
} from "./types";

export async function getInstitutionSettings(): Promise<InstitutionSettings> {
  const response = await api.get<InstitutionSettingApiResponse>(
    "/master/institusi",
  );

  return mapInstitutionSettingResourcesToSettings(response.data.data);
}
