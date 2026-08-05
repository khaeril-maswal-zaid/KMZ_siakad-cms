import type { InstitutionSettings } from "@/features/institution";

export type Campus = {
  institutionType: string;
  name: string;
  logo?: string;

  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    whatsappUrl: string;
    helpHours: string;
  };

  description?: string;
};

export type HomeLanding = {
  campus: Campus;

  academicYear: string;

  activeWave: {
    name: string;
    period: string;
    status: "active" | "upcoming" | "closed";
  };

  programs: any[];

  admissionSteps: any[];

  faqs: any[];
};
