import { useQuery } from "@tanstack/react-query";

import { getClassSchedules } from "./api";
import { classScheduleQueryKeys } from "./query-keys";

export function useClassSchedules() {
  return useQuery({
    queryKey: classScheduleQueryKeys.lists(),

    queryFn: getClassSchedules,
  });
}
