import { create } from "zustand";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

export const useDataEvent = create((set) => ({
  event: [],

  getAllEvent: async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${api_url}/event`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response;

      set({ event: data });
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  addEvent: async (data) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("gambar", data.formData.get("image"));

      const response = await axios.post(`${api_url}/event`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const { data: newEvent } = response;

      set((state) => ({
        event: [...state.event, newEvent],
      }));
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  deleteEvent: async (id) => {
    try {
      await axios.delete(`${api_url}/event?id=${id}`);

      set((state) => ({
        event: state.event.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },
}));
