import api from "@/lib/axios";

import type {
  RegisterUserPayload,
  RegistrationSession,
  RegisterUserResponse,
} from "./types";

export async function registerUser(
  payload: RegisterUserPayload,
): Promise<RegistrationSession> {
  const response = await api.post<RegisterUserResponse>(
    "/auth/register-user",
    payload,
  );
  const token = response.data.meta?.token;

  if (!token) {
    throw new Error("Response registrasi tidak mengembalikan token");
  }

  return {
    token,
    message: response.data.meta?.message,
  };
}
