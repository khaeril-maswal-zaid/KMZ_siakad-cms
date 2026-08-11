export type RegistrationFormValues = {
  fullName: string;
  email: string;
  whatsapp: string;
  password: string;
  confirmPassword: string;
};

export type RegisterUserPayload = {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  admission_path_id: string;
  class_schedule_id: string;
  study_program_id: string;
};
