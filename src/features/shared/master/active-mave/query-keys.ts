export const activeMaveQueryKeys = {
  all: ["active-mave"] as const,

  detail: () => [...activeMaveQueryKeys.all, "detail"] as const,
};
