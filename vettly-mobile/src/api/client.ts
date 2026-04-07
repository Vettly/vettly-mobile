import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "@/stores/authStore";

const BASE_URL = process.env.EXPO_PUBLIC_AUTH_API_URL;

export const client = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const { user, setAccessToken, logout } = useAuthStore.getState();
      if (!user) {
        logout();
        throw error;
      }

      try {
        const refreshToken = await SecureStore.getItemAsync("vettly-refresh-token");
        const res = await axios.post(
          `${BASE_URL}/api/auth/refresh`,
          { userId: user.id },
          { headers: { Cookie: `refreshToken=${refreshToken}` } }
        );

        const newToken = res.data.accessToken;
        setAccessToken(newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return client(original);
      } catch {
        logout();
        throw error;
      }
    }

    throw error;
  }
);
