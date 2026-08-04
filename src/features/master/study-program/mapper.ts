import type {
  Faculty,
  FacultyApiResource,
  StudyProgram,
  StudyProgramApiResource,
} from "./types";

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

  return {
    id: resource.id,
    name: resource.attributes.name,
    code: resource.attributes.code,
    level: resource.attributes.level,
    accreditation: resource.attributes.accreditation,

    faculty: faculty ? mapFaculty(faculty) : undefined,
  };
}

export function mapStudyPrograms(
  resources: StudyProgramApiResource[],
  faculties: FacultyApiResource[] = [],
): StudyProgram[] {
  return resources.map((resource) => mapStudyProgram(resource, faculties));
}
