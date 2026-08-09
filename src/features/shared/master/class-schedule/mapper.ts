import type { ClassSchedule, ClassScheduleApiResource } from "./types";

export function mapClassSchedule(
  resource: ClassScheduleApiResource,
): ClassSchedule {
  return {
    id: resource.id,
    name: resource.attributes.name,
    campus: resource.attributes.campus,
    session: resource.attributes.session,
  };
}

export function mapClassSchedules(
  resources: ClassScheduleApiResource[],
): ClassSchedule[] {
  return resources.map(mapClassSchedule);
}
