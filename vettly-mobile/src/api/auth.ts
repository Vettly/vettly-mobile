import * as SecureStore from "expo-secure-store";
import { client } from "./client";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";

const persistRefreshToken = async (headers: Record<string, any>) => {
  const setCookie: string = headers["set-cookie"]?.[0] ?? "";
  const match = setCookie.match(/refreshToken=([^;]+)/);
  if (match?.[1]) {
    await SecureStore.setItemAsync("vettly-refresh-token", match[1]);
  }
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const res = await client.post<AuthResponse>("/api/auth/login", data);
  await persistRefreshToken(res.headers);
  return res.data;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const res = await client.post<AuthResponse>("/api/auth/register", data);
  await persistRefreshToken(res.headers);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await client.post("/api/auth/logout");
  await SecureStore.deleteItemAsync("vettly-refresh-token");
};
