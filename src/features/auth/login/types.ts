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
  access_token?: string;
  bearer_token?: string;
  type?: string;
  message?: string;
  user?: LoginApiUser;
  data?: {
    token?: string;
    access_token?: string;
    bearer_token?: string;
    type?: string;
    user?: LoginApiUser;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface AuthSession {
  token: string;
  tokenType?: string;
  expiresIn?: number;
  user?: LoginApiUser;
  message?: string;
}

export interface LoginErrorPayload {
  message?: string;
  errors?: Record<string, string[] | string>;
}
