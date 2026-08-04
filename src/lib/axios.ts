import axios from "axios";
import { auth } from "@/lib/token";
import { env } from "@/lib/env";

const api = axios.create({
  baseURL: env.apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = auth.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      auth.removeToken();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
