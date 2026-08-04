/**
 * ==========================================
 * API Response (Laravel JSON:API)
 * ==========================================
 */

export interface AdmissionPathApiResource {
  id: string;
  type: string;

  attributes: {
    code: string;
    name: string;
    description: string;
  };
}

export interface AdmissionPathApiResponse {
  data: AdmissionPathApiResource[];
}

/**
 * ==========================================
 * Frontend Model
 * ==========================================
 */

export interface AdmissionPath {
  id: string;
  code: string;
  name: string;
  description: string;
}
