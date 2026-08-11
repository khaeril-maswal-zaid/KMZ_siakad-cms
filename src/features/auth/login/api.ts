import api from "@/lib/axios";
import { mapLoginApiResponse } from "./mapper";
import type { AuthSession, LoginApiResponse, LoginCredentials } from "./types";

export async function loginUser(
  credentials: LoginCredentials,
): Promise<AuthSession> {
  const { data } = await api.post<LoginApiResponse>("/auth/login", credentials);

  return mapLoginApiResponse(data);
}
