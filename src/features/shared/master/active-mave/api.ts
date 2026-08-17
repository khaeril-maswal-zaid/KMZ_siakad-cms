import api from "@/lib/axios";
import { mapActiveMaves } from "./mapper";
import type { ActiveMave, ActiveMaveApiResource } from "./types";

export async function getActiveMaves(): Promise<ActiveMave> {
  const response = await api.get<ActiveMaveApiResource>(
    "/master/gelombang-aktif",
  );

  return mapActiveMaves(response.data);
}
