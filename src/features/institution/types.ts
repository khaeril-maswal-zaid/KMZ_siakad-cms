export interface InstitutionSettingApiResource {
  id: string;
  type: "master_settings";
  attributes: {
    category: string;
    key: string;
    value: string;
  };
}

export interface InstitutionSettingApiResponse {
  data: InstitutionSettingApiResource[];
}

export interface InstitutionSettings {
  general: {
    nama_kampus?: string;
    logo_kampus?: string;
    [key: string]: string | undefined;
  };

  contact: {
    email?: string;
    telepon?: string;
    whatsapp?: string;
    alamat?: string;
    [key: string]: string | undefined;
  };

  social: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
    [key: string]: string | undefined;
  };
}
