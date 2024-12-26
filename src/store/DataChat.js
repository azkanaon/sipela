import { create } from "zustand";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

export const useDataChat = create((set) => ({
  chats: [],
  userWithLastChat: [],
  getAllChats: async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${api_url}/pesan/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      set({ chats: data });
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  postChat: async (id, message_content) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${api_url}/pesan/admin/${id}/send?message=${message_content}`,
        {
          user_id: id,
          message: message_content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;

      set((state) => ({
        chats: [...state.chats, data],
      }));
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  getUserWithLastChat: async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${api_url}/get/pesan/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;

      set({ userWithLastChat: data });
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },
}));
