import Cookies from "js-cookie";
import { STORAGE_KEYS } from "@/constants/storage-keys";

const TOKEN_KEY = STORAGE_KEYS.TOKEN;

export const auth = {
  setToken(token: string) {
    Cookies.set(TOKEN_KEY, token, {
      expires: 1,
      path: "/",
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });
  },

  getToken() {
    return Cookies.get(TOKEN_KEY);
  },

  removeToken() {
    Cookies.remove(TOKEN_KEY, {
      path: "/",
    });
  },

  isAuthenticated() {
    return !!Cookies.get(TOKEN_KEY);
  },
};
