import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthentication: localStorage.getItem("auth") || null,
    setUserData: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("auth", true);
      set({ user: user, isAuthentication: true });
    },
    removeUserData: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("auth");
      set({ user: null, isAuthentication: false });
    },
  }))
);
