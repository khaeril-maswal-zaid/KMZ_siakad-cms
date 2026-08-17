import api from "@/lib/axios";
import { mapActiveMave } from "./mapper";
import { ActiveMave, ActiveMaveApiResponse } from "./types";

export async function getActiveMave(): Promise<ActiveMave | null> {
  const response = await api.get<ActiveMaveApiResponse>(
    "/master/gelombang-aktif",
  );

  return mapActiveMave(response.data);
}
