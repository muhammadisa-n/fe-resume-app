import { create } from "zustand";
import { devtools } from "zustand/middleware";
import api from "../config/axios";

export const useAuthStore = create(
  devtools((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthentication: false,
    isCheckingAuth: true,
    isLoggingOut: false,

    setIsLoggingOut: (value) => set({ isLoggingOut: value }),

    setUserData: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      set({ user, isAuthentication: true });
    },

    removeUserData: () => {
      localStorage.removeItem("user");
      set({ user: null, isAuthentication: false });
    },

    updateUser: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      set({ user });
    },

    checkAuth: async () => {
      try {
        const { data } = await api.get("/auth/me");
        localStorage.setItem("user", JSON.stringify(data.user));

        set({
          user: data.user,
          isAuthentication: true,
        });
      } catch {
        localStorage.removeItem("user");

        set({
          user: null,
          isAuthentication: false,
        });
      } finally {
        set({ isCheckingAuth: false });
      }
    },
  }))
);
