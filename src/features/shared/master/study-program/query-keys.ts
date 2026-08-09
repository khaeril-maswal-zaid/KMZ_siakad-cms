export const studyProgramQueryKeys = {
  all: ["study-program"] as const,

  lists: (includeFaculty = false) =>
    [...studyProgramQueryKeys.all, "list", { includeFaculty }] as const,

  detail: (id: string) => [...studyProgramQueryKeys.all, "detail", id] as const,
};
