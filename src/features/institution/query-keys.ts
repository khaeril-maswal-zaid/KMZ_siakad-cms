export const institutionQueryKeys = {
  all: ["institution"] as const,

  settings: () => [...institutionQueryKeys.all, "settings"] as const,
};
