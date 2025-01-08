import { create } from "zustand";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

export const useDataNews = create((set) => ({
  news: [],

  getAllNews: async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${api_url}/berita`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response;

      set({ news: data });
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  addNews: async (data) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("judul", data.title); // Append title to formData
      formData.append("description", data.description); // Append description to formData
      formData.append("gambar", data.formData.get("image")); // Append file to formData

      const response = await axios.post(
        `${api_url}/berita`,
        formData, // Kirim formData, bukan JSON
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Pastikan tipe konten multipart/form-data
          },
        }
      );

      const { data: newNews } = response;

      set((state) => ({
        news: [...state.news, newNews],
      }));
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  updateNews: async (id, data) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("judul", data.title);
      formData.append("description", data.description);
      formData.append("gambar", data.formData.get("image"));

      const response = await axios.patch(
        `${api_url}/berita?id=${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { data: newNews } = response;
      set((state) => ({
        news: state.news.map((item) => (item.id === id ? newNews : item)),
      }));
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  deleteNews: async (id) => {
    try {
      await axios.delete(`${api_url}/berita?id=${id}`);

      set((state) => ({
        news: state.news.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  searchNews: async (query) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${api_url}/berita/search/query?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      set({ news: data });
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },
}));
