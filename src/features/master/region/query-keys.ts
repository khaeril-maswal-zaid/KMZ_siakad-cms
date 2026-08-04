export const regionQueryKeys = {
  all: ["region"] as const,

  lists: () => [...regionQueryKeys.all, "list"] as const,

  search: (keyword: string) => [...regionQueryKeys.lists(), keyword] as const,
};
