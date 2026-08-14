import api from "@/lib/axios";

import { mapClassSchedules } from "./mapper";
import type { ClassSchedule, ClassScheduleApiResponse } from "./types";

export async function getClassSchedules(): Promise<ClassSchedule[]> {
  const response = await api.get<ClassScheduleApiResponse>(
    "/master/sistem-kuliah",
  );

  return mapClassSchedules(response.data.data);
}
