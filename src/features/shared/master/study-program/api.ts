import api from "@/lib/axios";
import { mapStudyPrograms } from "./mapper";
import type { StudyProgram, StudyProgramApiResponse } from "./types";

interface GetStudyProgramsOptions {
  includeFaculty?: boolean;
}

export async function getStudyPrograms(
  options: GetStudyProgramsOptions = {},
): Promise<StudyProgram[]> {
  const { includeFaculty = false } = options;

  const response = await api.get<StudyProgramApiResponse>(
    "/master/studi-program",
    {
      params: includeFaculty
        ? {
            include: "faculty",
          }
        : undefined,
    },
  );

  return mapStudyPrograms(
    response.data.data,
    response.data.included ?? [],
  );
}
