import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { isSsoActive, getSsoLoginUrl } from "./sso";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + `/api`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers["x-origin-url"] = window.location.href;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLogoutRequest = error.config?.url?.includes("/auth/logout");

    if (error.response?.status === 401 && !isLogoutRequest) {
      useAuthStore.getState().removeUserData();

      if (isSsoActive()) {
        window.location.href = getSsoLoginUrl();
      } else {
        window.location.href = `${import.meta.env.BASE_URL}login`;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
