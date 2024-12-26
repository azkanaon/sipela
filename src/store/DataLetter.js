import { create } from "zustand";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

export const useDataLetter = create((set) => ({
  letters: [],
  detailLetter: {},
  dataRegister: [],
  uploadRegister: [],
  dataDetailRegister: {},
  history: [],
  tracking: [],
  getAllLetters: async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${api_url}/pengajuan/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response;

      set({ letters: data });
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  getDetailLetter: async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${api_url}/pengajuan/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response;

      set({ detailLetter: data });
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  searchLetter: async (query, role) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${api_url}/pengajuan/search/query?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;

      const dataStatusPending = data.filter((dat) => {
        if (role === "rt") {
          return dat.status_rt === "Menunggu Verifikasi";
        } else if (role === "rw") {
          return dat.status_rw === "Menunggu Verifikasi";
        } else {
          return dat.status_kelurahan === "Menunggu Verifikasi";
        }
      });

      set({ letters: dataStatusPending });
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  searchLetterTracking: async (query) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${api_url}/pengajuan/search/query?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      console.log(data);
      const dataUpdate = data.filter((dat) => {
        return (
          dat.surat_pengantar.nomor_register_pengantar_rt === null ||
          dat.surat_pengantar.nomor_register_pengantar_rw === null ||
          dat.surat_pengantar.nomor_register_pengantar_kelurahan === null
        );
      });
      console.log(dataUpdate);

      set({ tracking: dataUpdate });
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  searchLetterHistory: async (query) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${api_url}/pengajuan/search/query?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = response;
      const dataUpdate = data.filter((dat) => {
        return (
          dat.dokumen_pengantar !== null &&
          dat.dokumen_pernyataan !== null &&
          dat.dokumen_pengajuan !== null
        );
      });
      set({ history: dataUpdate });
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  getRegisterNumber: async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${api_url}/nomor_register/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response;

      set({ dataRegister: data });
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  getUploadDokumenRegister: async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${api_url}/list_dokumen/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response;

      set({ uploadRegister: data });
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  updateLetterStatus: async (id, status, catatan) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${api_url}/pengajuan/${id}`,
        {
          status_rt: status,
          status_rw: status,
          status_kelurahan: status,
          catatan_admin: catatan,
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

  updateRegisterNumber: async (id, nomorRegisterPengantar) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${api_url}/nomor_register/${id}`,
        {
          nomor_register_pengantar: nomorRegisterPengantar,
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

  getDetailRegister: async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${api_url}/pengajuan/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response;

      set({ dataDetailRegister: data });
      // console.log("ikanasin")
    } catch (error) {
      console.log("Error woy", error.message);
    }
  },

  uploadDocument: async (
    pengajuanId,
    pengajuanFile,
    pengantarFile,
    pernyataanFile
  ) => {
    try {
      const token = localStorage.getItem("token");

      // Create FormData to send files
      const formData = new FormData();

      // Append files if they exist
      if (pengajuanFile) {
        formData.append("pengajuan_file", pengajuanFile);
      }

      if (pengantarFile) {
        formData.append("pengantar_file", pengantarFile);
      }

      if (pernyataanFile) {
        formData.append("pernyataan_file", pernyataanFile);
      }

      const response = await axios.post(
        `${api_url}/upload_dokumen/admin/${pengajuanId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // You can return the response data if needed
      return response.data;
    } catch (error) {
      console.log("Error uploading documents", error.message);
      throw error; // Re-throw to allow error handling in the component
    }
  },
}));
