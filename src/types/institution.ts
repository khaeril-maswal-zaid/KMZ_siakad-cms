export interface InstitutionSettings {
  general: InstitutionGeneralSettings;
  contact: InstitutionContactSettings;
  social: InstitutionSocialSettings;
}

export interface InstitutionGeneralSettings {
  name?: string;
  logo?: string;
  type?: string;
  description?: string;
}

export interface InstitutionContactSettings {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
}

export interface InstitutionSocialSettings {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
}
