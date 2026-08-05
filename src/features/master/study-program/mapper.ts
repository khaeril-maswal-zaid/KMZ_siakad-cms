import type {
  Faculty,
  FacultyApiResource,
  StudyProgram,
  StudyProgramApiResource,
} from "./types";

const ACCENTS = ["blue", "cyan", "indigo", "sky"] as const;

function getAccentFromString(value: string): (typeof ACCENTS)[number] {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % ACCENTS.length;

  return ACCENTS[index];
}

function mapFaculty(faculty: FacultyApiResource): Faculty {
  return {
    id: faculty.id,
    name: faculty.attributes.name,
    code: faculty.attributes.code,
  };
}

export function mapStudyProgram(
  resource: StudyProgramApiResource,
  faculties: FacultyApiResource[] = [],
): StudyProgram {
  const facultyRelation = resource.relationships?.faculty?.data;

  const faculty = faculties.find((item) => item.id === facultyRelation?.id);
  const facultyName = faculty?.attributes.name ?? "default";

  return {
    id: resource.id,
    name: resource.attributes.name,
    code: resource.attributes.code,
    level: resource.attributes.level,
    accreditation: resource.attributes.accreditation,
    accent: getAccentFromString(facultyName),

    faculty: faculty ? mapFaculty(faculty) : undefined,
  };
}

export function mapStudyPrograms(
  resources: StudyProgramApiResource[],
  faculties: FacultyApiResource[] = [],
): StudyProgram[] {
  return resources.map((resource) => mapStudyProgram(resource, faculties));
}
