import { defineStore } from "pinia";
import api from "../api/client";

interface User {
  id: number;
  username: string;
  email?: string;
  image?: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    restoreSession() {
      const stored = localStorage.getItem("auth");
      if (stored) {
        const { accessToken, refreshToken, user } = JSON.parse(stored);
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.user = user;
      }
    },
    async login(username: string, password: string) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await api.post(
          "/auth/login",
          {
            username,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        this.user = {
          id: data.id,
          username: data.username,
          email: data.email,
          image: data.image,
        };
        localStorage.setItem(
          "auth",
          JSON.stringify({
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
            user: this.user,
          }),
        );
      } catch (err: any) {
        console.error(err);
        this.error =
          err?.response?.data?.message ||
          "Invalid credentials. Please try again.";
        throw err;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;
      localStorage.removeItem("auth");
    },
  },
});
