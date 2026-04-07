import type { AuthResponse, UserRole } from "@/types/auth";
import { useAuthStore } from "@/stores/authStore";

export const applyAuthResponse = (
  data: AuthResponse,
  setAuth: ReturnType<typeof useAuthStore.getState>["setAuth"]
) => {
  const payload = JSON.parse(atob(data.accessToken.split(".")[1]));
  setAuth(
    {
      id: payload.sub,
      email: data.email,
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
    },
    data.accessToken
  );
};

export const applyOAuthToken = (
  token: string,
  setAuth: ReturnType<typeof useAuthStore.getState>["setAuth"]
) => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  setAuth(
    {
      id:        payload.sub,
      email:     payload.email,
      role:      payload.role as UserRole,
      firstName: payload.firstName,
      lastName:  payload.lastName ?? "",
    },
    token
  );
};
