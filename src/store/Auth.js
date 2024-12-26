import axios from "axios";
import { create } from "zustand";

const api_url = import.meta.env.VITE_API_URL;

export const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
  me: null,

  login: async (credentials, navigate) => {
    try {
      const response = await axios.post(
        `${api_url}/login/admin`,
        {
          username: credentials.username,
          password: credentials.password,
        },
        {
          "Content-Type": "application/json",
        }
      );

      // Ambil data dari response
      const { data } = response;

      if (data.access_token) {
        set({ isAuthenticated: true, token: data.access_token });
        localStorage.setItem("token", data.access_token); // Simpan token jika diperlukan
        navigate("/");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  },

  logout: (navigate) => {
    set({ me: null, isAuthenticated: false, token: null });
    localStorage.removeItem("token"); // Hapus token saat logout
    navigate("/login_admin");
  },

  getMe: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${api_url}/admin/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      set({ me: data });
    } catch (error) {
      console.log("Get me failed: " + error.message);
    }
  },
}));
