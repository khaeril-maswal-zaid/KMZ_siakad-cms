import api from "@/lib/axios";

export async function logoutUser(): Promise<void> {
  await api.delete("/auth/logout");
}
