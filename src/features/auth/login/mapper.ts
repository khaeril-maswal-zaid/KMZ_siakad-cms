import type { AuthSession, LoginApiResponse } from "./types";

export function mapLoginApiResponse(response: LoginApiResponse): AuthSession {
  const payload = response?.data ?? response;

  const token = payload?.token;

  if (!token) {
    throw new Error("Login response tidak mengembalikan token");
  }

  return {
    token,
    user: payload?.user ?? response?.user,
    message: payload?.message ?? response?.message,
  };
}
