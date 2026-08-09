import api from "@/lib/axios";

import { mapAdmissionPaths } from "./mapper";
import type { AdmissionPath, AdmissionPathApiResponse } from "./types";

export async function getAdmissionPaths(): Promise<AdmissionPath[]> {
  const { data } = await api.get<AdmissionPathApiResponse>(
    "/master/jalur-pendaftaran",
  );

  return mapAdmissionPaths(data.data);
}
