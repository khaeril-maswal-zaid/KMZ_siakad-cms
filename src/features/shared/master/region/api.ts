import api from "@/lib/axios";

import { mapRegions } from "./mapper";
import type { Region, RegionApiResponse } from "./types";

export async function getRegions(keyword: string): Promise<Region[]> {
  const response = await api.get<RegionApiResponse>(
    `/master/wilayah-indonesia/${keyword}`,
  );

  return mapRegions(response.data);
}
