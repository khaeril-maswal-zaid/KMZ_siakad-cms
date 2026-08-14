import api from "@/lib/axios";
import { mapDashboardResponse } from "./mapper";
import type { DashboardApiResponse, DashboardData } from "./types";

export async function getDashboardData(): Promise<DashboardData> {
  const response = await api.get<DashboardApiResponse>("/pmb/aplication");

  return mapDashboardResponse(response.data);
}
