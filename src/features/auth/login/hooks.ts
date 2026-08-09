import { useMutation, useQueryClient } from "@tanstack/react-query";

import { auth } from "@/lib/token";

import { loginUser } from "./api";
import { authQueryKeys } from "./query-keys";
import type { AuthSession, LoginCredentials } from "./types";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: authQueryKeys.login(),
    mutationFn: async (credentials: LoginCredentials) => {
      return loginUser(credentials);
    },
    onSuccess: async (session: AuthSession) => {
      auth.setToken(session.token);
      queryClient.setQueryData(authQueryKeys.session(), session);
    },
  });
}
