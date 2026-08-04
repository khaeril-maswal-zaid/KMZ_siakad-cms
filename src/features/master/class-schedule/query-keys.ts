export const classScheduleQueryKeys = {
  all: ["class-schedule"] as const,

  lists: () => [...classScheduleQueryKeys.all, "list"] as const,

  detail: (id: string) =>
    [...classScheduleQueryKeys.all, "detail", id] as const,
};
