export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginApiResourceIdentifier {
  id: string;
  type: string;
}

export interface LoginApiApplication {
  id: string;
  registration_number?: string;
  full_name?: string;
  phone?: string;
  created_at?: string;
  admissionPeriod?: {
    id: string;
    name?: string;
  };
  [key: string]: unknown;
}

export interface LoginApiUser {
  id?: string | number;
  type?: string;
  name?: string;
  email?: string;
  role?: string;
  roles?: string[];
  pmbApplication?: LoginApiApplication;
  [key: string]: unknown;
}

export interface LoginApiResponse {
  token?: string;
  message?: string;
  user?: LoginApiUser;
  data?: {
    id: string;
    type: string;
    attributes: {
      email?: string;
      roles?: string[];
      [key: string]: unknown;
    };
    relationships?: {
      pmbApplication?: {
        data: LoginApiResourceIdentifier | null;
      };
      [key: string]: unknown;
    };
  };
  included?: Array<{
    id: string;
    type: string;
    attributes: Record<string, unknown>;
    relationships?: Record<string, unknown>;
  }>;
  meta?: {
    token?: string;
    message?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface AuthSession {
  token: string;
  user?: LoginApiUser;
  message?: string;
}

export interface LoginErrorPayload {
  message?: string;
  errors?: Record<string, string[] | string>;
}
