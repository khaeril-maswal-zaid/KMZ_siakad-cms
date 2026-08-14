import api from "@/lib/axios";

import { mapAdmissionPaths } from "./mapper";
import type { AdmissionPath, AdmissionPathApiResponse } from "./types";

export async function getAdmissionPaths(): Promise<AdmissionPath[]> {
  const response = await api.get<AdmissionPathApiResponse>(
    "/master/jalur-pendaftaran",
  );

  return mapAdmissionPaths(response.data.data);
}
