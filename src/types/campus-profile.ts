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
