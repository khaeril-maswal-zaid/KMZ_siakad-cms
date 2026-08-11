import api from "@/lib/axios";
import { mapDashboardResponse } from "./mapper";
import type { DashboardApiResponse, DashboardData } from "./types";

export async function getDashboardData(): Promise<DashboardData> {
  const { data } = await api.get<DashboardApiResponse>("/pmb/aplication");

  return mapDashboardResponse(data);
}
