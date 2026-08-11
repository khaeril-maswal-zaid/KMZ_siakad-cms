import { useMutation } from "@tanstack/react-query";

import { logoutUser } from "./api";

export function useLogout() {
  return useMutation({
    mutationFn: logoutUser,
  });
}
