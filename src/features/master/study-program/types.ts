/**
 * ==========================================
 * API Response (Laravel JSON:API)
 * ==========================================
 */

export interface FacultyApiResource {
  id: string;
  type: string;

  attributes: {
    name: string;
    code: string;
  };
}

export interface StudyProgramApiResource {
  id: string;
  type: string;

  attributes: {
    name: string;
    code: string;
    level: string;
    accreditation: string;
  };

  relationships?: {
    faculty?: {
      data: {
        id: string;
        type: string;
      };
    };
  };
}

export interface StudyProgramApiResponse {
  data: StudyProgramApiResource[];
  included?: FacultyApiResource[];
}

/**
 * ==========================================
 * Frontend Model
 * ==========================================
 */

export interface Faculty {
  id: string;
  name: string;
  code: string;
}

export interface StudyProgram {
  id: string;
  name: string;
  code: string;
  level: string;
  accreditation: string;

  faculty?: Faculty;
}
