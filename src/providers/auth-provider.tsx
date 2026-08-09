"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { auth } from "@/lib/token";

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  refresh: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    auth.isAuthenticated(),
  );

  const refresh = () => {
    setIsAuthenticated(auth.isAuthenticated());
  };

  const login = (token: string) => {
    auth.setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    auth.removeToken();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      login,
      logout,
      refresh,
    }),
    [isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
