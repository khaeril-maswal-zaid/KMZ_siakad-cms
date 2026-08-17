/**
 * ==========================================
 * API Response (Laravel JSON:API)
 * ==========================================
 */

export interface ActiveMaveApiResource {
  id: string;
  type: "master_admission_periods";

  attributes: {
    re_registration_end: string;
    re_registration_start: string;
    announcement_date: string;
    registration_end: string;
    registration_start: string;
    name: string;
    academic_year_id: number;
  };
}

export interface ActiveMaveApiResponse {
  data: ActiveMaveApiResource[];
}

/**
 * ==========================================
 * Frontend Model
 * ==========================================
 */

export interface ActiveMave {
  id: string;
  name: string;
  registrationStart: string;
  registrationEnd: string;
  reRegistrationStart: string;
  reRegistrationEnd: string;
  announcementDate: string;
  academicYearId: number;
}
