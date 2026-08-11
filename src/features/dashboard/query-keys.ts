export const dashboardQueryKeys = {
  all: ["dashboard"] as const,
  detail: () => [...dashboardQueryKeys.all, "detail"] as const,
};
