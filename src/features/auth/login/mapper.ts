import type { AuthSession, LoginApiResponse } from "./types";

export function mapLoginApiResponse(response: LoginApiResponse): AuthSession {
  const resource = response?.data;
  const token = response?.meta?.token ?? response?.token;

  if (!token) {
    throw new Error("Login response tidak mengembalikan token");
  }

  const user = resource
    ? {
        id: resource.id,
        type: resource.type,
        ...resource.attributes,
      }
    : response?.user;

  return {
    token,
    user,
    message: response?.meta?.message ?? response?.message,
  };
}
