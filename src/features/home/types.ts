import { StudyProgram } from "@/features/master/study-program";

/**
 * Campus information displayed on landing page
 */
export interface CampusProfile {
  name: string;
  institutionType: string;
  description?: string;
  logo?: string;

  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    whatsappUrl: string;
    helpHours: string;
  };
}

/**
 * Admission period / gelombang PMB
 * Mapping dari master_admission_periods
 */
export interface AdmissionWave {
  name: string;
  academicYear: string;
  period: string;
  status: "active" | "upcoming" | "closed";
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
  // registrationFee: number;
  campus: CampusProfile;
  activeWave: AdmissionWave;
  programs: StudyProgram[];
  admissionSteps: AdmissionStep[];
  faqs: FaqItem[];
}
