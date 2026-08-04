export const admissionPathQueryKeys = {
  all: ["admission-path"] as const,

  lists: () => [...admissionPathQueryKeys.all, "list"] as const,

  detail: (id: string) =>
    [...admissionPathQueryKeys.all, "detail", id] as const,
};
