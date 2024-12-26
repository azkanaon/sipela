import axios from "axios";
import { create } from "zustand";

const api_url = import.meta.env.VITE_API_URL;

export const useDataAdminRTRW = create((set) => ({
  data: [],

  getData: async (query) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${api_url}/admin/search/query?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data: newData } = response;

      const dataWithoutLurah = newData.filter(
        (item) => item.role !== "kelurahan"
      );
      set({ data: dataWithoutLurah });
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  addData: async (dataRegister) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${api_url}/register/admin`,
        {
          username: dataRegister.username,
          role: dataRegister.role,
          rt: dataRegister.rt,
          rw: dataRegister.rw,
          password_hash: dataRegister.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data: newData } = response;

      set((state) => ({ data: [...state.data, newData] })); // Update state dengan data baru

      return { success: true, newData }; // Mengembalikan objek dengan status keberhasilan
    } catch (error) {
      console.error("Error woy", error.message);

      return { success: false, error: error.message };
    }
  },

  updateData: async (id, dataRegister) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${api_url}/update/admin/${id}`,
        {
          username: dataRegister.username,
          password_hash: dataRegister.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      set((state) => ({
        data: state.data.map((item) => (item.id === id ? data : item)),
      }));
      return data;
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  deleteData: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${api_url}/delete_akun/admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      set((state) => ({
        data: state.data.filter((item) => item.id !== id),
      }));
      return data;
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },
}));
