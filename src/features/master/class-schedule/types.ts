/**
 * ==========================================
 * API Response (Laravel JSON:API)
 * ==========================================
 */

export interface ClassScheduleApiResource {
  id: string;
  type: string;

  attributes: {
    name: string;
    campus: string;
    session: string;
  };
}

export interface ClassScheduleApiResponse {
  data: ClassScheduleApiResource[];
}

/**
 * ==========================================
 * Frontend Model
 * ==========================================
 */

export interface ClassSchedule {
  id: string;
  name: string;
  campus: string;
  session: string;
}
