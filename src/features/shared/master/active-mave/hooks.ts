import { useQuery } from "@tanstack/react-query";

import { getActiveMaves } from "./api";

interface UseStudyProgramsOptions {
  includeFaculty?: boolean;
}

export function useStudyPrograms(options: UseStudyProgramsOptions = {}) {
  const { includeFaculty = false } = options;

  return useQuery({
    queryKey: ,
    queryFn: () => getActiveMaves(),
  });
}
