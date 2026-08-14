import api from "@/lib/axios";
import { mapDashboardResponse } from "./mapper";
import type {
  DashboardApiResponse,
  DashboardData,
  UpdateSelectionPayload,
} from "./types";

export async function getDashboardData(): Promise<DashboardData> {
  const response = await api.get<DashboardApiResponse>("/pmb/aplication");

  return mapDashboardResponse(response.data);
}

export async function updateSelection(
  payload: UpdateSelectionPayload,
): Promise<void> {
  await api.patch("/pmb/update-selection", payload);
}
