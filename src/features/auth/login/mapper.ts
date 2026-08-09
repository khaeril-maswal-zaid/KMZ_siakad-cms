import type { AuthSession, LoginApiResponse } from "./types";

export function mapLoginApiResponse(response: LoginApiResponse): AuthSession {
  const payload = response?.data ?? response;

  const token =
    payload?.token ??
    payload?.access_token ??
    payload?.bearer_token ??
    (typeof payload?.token === "string" ? payload.token : undefined);

  if (!token) {
    throw new Error("Login response tidak mengembalikan token");
  }

  return {
    token,
    tokenType: payload?.type ?? "Bearer",
    user: payload?.user ?? payload?.data?.user,
    message: response?.message,
  };
}
