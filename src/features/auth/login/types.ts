export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginApiUser {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
}

export interface LoginApiResponse {
  token?: string;
  message?: string;
  user?: LoginApiUser;
  data?: {
    token?: string;
    message?: string;
    user?: LoginApiUser;
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
