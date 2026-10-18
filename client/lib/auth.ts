import type { RegisterData } from "./api";

export const TOKEN_STORAGE_KEY = "token";

export type LoginCredentials = { password: string } & (
  | { username: string; email?: never }
  | { email: string; username?: never }
);

export type UserCreate = RegisterData;

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  expiresAt: number;
}

export function getToken(): string | null {
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setToken(token: string): void {
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function removeToken(): void {
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

// Decoded metadata is for display only; the API verifies the JWT signature.
export function decodeToken(token: string): AuthUser | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3 || parts.some((part) => !part)) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
    const payload: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (
      typeof payload !== "object" || payload === null ||
      !("sub" in payload) || typeof payload.sub !== "string" || !payload.sub ||
      !("email" in payload) || typeof payload.email !== "string" || !payload.email ||
      !("exp" in payload) || typeof payload.exp !== "number" ||
      !Number.isFinite(payload.exp) || payload.exp * 1000 <= Date.now()
    ) {
      return null;
    }
    return {
      id: payload.sub,
      email: payload.email,
      name: "name" in payload && typeof payload.name === "string" ? payload.name : undefined,
      expiresAt: payload.exp * 1000,
    };
  } catch {
    return null;
  }
}
