"use client";

// Frontend-only auth for now - no backend/database yet.
// Everything here lives in the browser's localStorage, so:
//  - it resets if the user clears their browser data
//  - it is NOT secure (anyone with dev tools could bypass it)
//  - it exists purely so the login screen is functional until real
//    backend auth (e.g. NextAuth + a database) is wired in.

const AUTH_KEY = "bizflow_auth";
const PASSWORD_KEY = "bizflow_password";
const OWNER_NAME_KEY = "bizflow_owner_name";

export const DEFAULT_OWNER_NAME = "Lucy";
export const DEFAULT_PASSWORD = "bizflow123";

export function getOwnerName(): string {
  if (typeof window === "undefined") return DEFAULT_OWNER_NAME;
  return localStorage.getItem(OWNER_NAME_KEY) || DEFAULT_OWNER_NAME;
}

export function setOwnerName(name: string) {
  localStorage.setItem(OWNER_NAME_KEY, name);
}

export function getStoredPassword(): string {
  if (typeof window === "undefined") return DEFAULT_PASSWORD;
  return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
}

export function setStoredPassword(password: string) {
  localStorage.setItem(PASSWORD_KEY, password);
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function login(password: string): boolean {
  if (password === getStoredPassword()) {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}
