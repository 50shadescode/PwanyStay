"use client";

import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
  type ReactNode,
} from "react";
import { loginUser, registerUser } from "@/lib/api";
import {
  decodeToken, getToken, removeToken, setToken, TOKEN_STORAGE_KEY,
  type AuthUser, type LoginCredentials, type UserCreate,
} from "@/lib/auth";

export type { LoginCredentials, UserCreate } from "@/lib/auth";

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: UserCreate) => Promise<void>;
  logout: () => void;
}

interface AuthSession {
  user: AuthUser;
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const operation = useRef(0);

  useEffect(() => {
    let active = true;
    const restore = (token: string | null) => {
      const user = token ? decodeToken(token) : null;
      if (token && !user) removeToken();
      setSession(token && user ? { token, user } : null);
    };

    // Defer restoration until after the server and first client render agree.
    queueMicrotask(() => {
      if (!active) return;
      try {
        restore(getToken());
      } catch {
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    });

    const handleStorage = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage) return;
      if (event.key !== TOKEN_STORAGE_KEY && event.key !== null) return;
      operation.current += 1;
      try {
        restore(event.newValue);
      } catch {
        setSession(null);
      }
      setIsLoading(false);
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      active = false;
      operation.current += 1;
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const logout = useCallback(() => {
    operation.current += 1;
    try {
      removeToken();
    } finally {
      setSession(null);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!session) return;
    const timeout = window.setTimeout(logout, Math.max(0, session.user.expiresAt - Date.now()));
    return () => window.clearTimeout(timeout);
  }, [session, logout]);

  const authenticate = useCallback(async (credentials: LoginCredentials, data?: UserCreate) => {
    const currentOperation = ++operation.current;
    setIsLoading(true);
    try {
      const registeredUser = data ? await registerUser(data) : null;
      if (currentOperation !== operation.current) return;
      const result = await loginUser(credentials.username ?? credentials.email, credentials.password);
      if (currentOperation !== operation.current) return;
      const user = decodeToken(result.access_token);
      if (!user) throw new Error("The server returned an invalid or expired session.");
      if (registeredUser) user.name = registeredUser.name;
      setToken(result.access_token);
      setSession({ token: result.access_token, user });
    } finally {
      if (currentOperation === operation.current) setIsLoading(false);
    }
  }, []);

  const login = useCallback((credentials: LoginCredentials) => authenticate(credentials), [authenticate]);
  const register = useCallback((data: UserCreate) => authenticate(data, data), [authenticate]);
  const value = useMemo<AuthContextType>(() => ({
    user: session?.user ?? null,
    token: session?.token ?? null,
    isLoading, login, register, logout,
  }), [session, isLoading, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider.");
  return context;
}
