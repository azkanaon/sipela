import { create } from "zustand";
import { useAuthStore } from "./Auth";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

export const useUserNotVerify = create((set) => ({
  usersNotVerify: [],

  fetchUsersNotVerify: async (status) => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      console.log("User is not authenticated");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${api_url}/user/status/${status}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data } = response;
      set({ usersNotVerify: data });
    } catch (error) {
      console.log("Gagal mendapatkan data", error.message);
    }
  },

  updateDecline: async (id, catatan) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${api_url}/user/ditolak/${id}`,
        {
          catatan: catatan,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  searchUsersNotVerify: async (query) => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      console.log("User is not authenticated");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${api_url}/user/search/belum/query?query=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { data } = response;
      set({ usersNotVerify: data });
    } catch (error) {
      console.log("Gagal mendapatkan data", error.message);
    }
  },

  deleteUsersNotVerify: async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${api_url}/delete_akun/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },
}));

export const useDetailUser = create((set) => ({
  userDetail: {},

  getUserDetail: async (nik) => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      console.log("User is not authenticated");
      return;
    }

    try {
      const response = await axios.get(`${api_url}/user/nik/${nik}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const { data } = response;

      set({ userDetail: data });
    } catch (error) {
      console.log("Gagal mendapatkan detail user", error.message);
    }
  },

  updateStatus: async (nik) => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      console.log("User is not authenticated");
      return;
    }

    try {
      const response = await axios.patch(`${api_url}/user/acc/${nik}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const { data } = response;

      console.log(data.message);
    } catch (error) {
      console.log("Gagal mengupdate status user", error.message);
    }
  },

  resetPasswordUser: async (nik, newPassword) => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      console.log("User is not authenticated");
      return;
    }
    try {
      const response = await axios.patch(
        `${api_url}/reset_password/${nik}`,
        {
          password: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const { data } = response;

      console.log(data.message);
    } catch (error) {
      console.log("Gagal mengupdate password user", error.message);
    }
  },
}));

export const useVerifyUser = create((set) => ({
  verifyAccount: [],
  getVerifyAccount: async (status) => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      console.log("User is not authenticated");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${api_url}/user/status/${status}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data } = response;
      set({ verifyAccount: data });
    } catch (error) {
      console.log("Gagal mendapatkan data", error.message);
    }
  },

  searchVerifyAccount: async (query) => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      console.log("User is not authenticated");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${api_url}/user/search/diterima/query?query=${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { data } = response;
      set({ verifyAccount: data });
    } catch (error) {
      console.log("Gagal mendapatkan data", error.message);
    }
  },
}));
