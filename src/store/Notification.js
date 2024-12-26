import { create } from "zustand";
import { useAuthStore } from "./Auth";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

export const useNotificationStore = create((set) => ({
  notifications: [],
  countNotif: [],

  fetchNotifications: async () => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      console.log("User is not authenticated");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${api_url}/notifikasi/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data } = response;
      set({ notifications: data });
    } catch (error) {
      console.log("Gagal mendapatkan data", error.message);
    }
  },

  getCountNotif: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      console.log("User is not authenticated");
      return;
    }
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${api_url}/notifikasi_count`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data } = response;
      set({ countNotif: data });
    } catch (error) {
      console.log("Gagal mendapatkan data", error.message);
    }
  },
}));
