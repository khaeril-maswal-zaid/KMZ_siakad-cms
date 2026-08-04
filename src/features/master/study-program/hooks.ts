import { useQuery } from "@tanstack/react-query";

import { getStudyPrograms } from "./api";
import { studyProgramQueryKeys } from "./query-keys";

interface UseStudyProgramsOptions {
  includeFaculty?: boolean;
}

export function useStudyPrograms(options: UseStudyProgramsOptions = {}) {
  const { includeFaculty = false } = options;

  return useQuery({
    queryKey: studyProgramQueryKeys.lists(includeFaculty),

    queryFn: () => getStudyPrograms({ includeFaculty }),
  });
}
