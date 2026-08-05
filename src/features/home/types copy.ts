/**
 * Campus information displayed on landing page
 */
export interface CampusProfile {
  name: string;
  institutionType: string;
  description: string;

  contact: {
    whatsappUrl: string;
    whatsappLabel: string;
    email: string;
    address: string;
    helpHours: string;
  };
}

/**
 * Admission period / gelombang PMB
 * Mapping dari master_admission_periods
 */
export interface AdmissionWave {
  id: string;
  name: string;

  academicYear: string;

  period: string;

  status: "active" | "upcoming" | "closed";
}

/**
 * Program Studi
 * Mapping dari master_study_programs
 */
export interface StudyProgram {
  id: string;
  name: string;
  code: string;
  level: string;
  faculty: string;
  description?: string;

  /**
   * hanya kebutuhan UI
   * bukan dari database
   */
  accent: "blue" | "cyan" | "indigo" | "sky";
}

/**
 * Tahapan pendaftaran
 * Mapping dari flow PMB
 */
export interface AdmissionStep {
  id: string;
  order: number;
  title: string;
  description: string;
  icon: "program" | "account" | "payment" | "form";
}

/**
 * FAQ Landing Page
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Data utama landing page
 */
export interface PmbLandingData {
  academicYear: string;
  registrationFee: number;
  campus: CampusProfile;
  activeWave: AdmissionWave;
  programs: StudyProgram[];
  admissionSteps: AdmissionStep[];
  faqs: FaqItem[];
}
