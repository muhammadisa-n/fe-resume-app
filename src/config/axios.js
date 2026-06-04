import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + `/api`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLogoutRequest = error.config?.url?.includes("/auth/logout");

    if (error.response?.status === 401 && !isLogoutRequest) {
      useAuthStore.getState().removeUserData();
      window.location.href = `${import.meta.env.BASE_URL}login`;
    }

    return Promise.reject(error);
  }
);

export default api;
