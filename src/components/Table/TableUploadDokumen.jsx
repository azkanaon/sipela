import PropTypes from "prop-types";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDataLetter } from "../../store/DataLetter";
import { generateDocuments } from "../../hooks/useGenerateDoc";
import {
  FaCloudDownloadAlt,
  FaCloudUploadAlt,
  FaRegCheckCircle,
} from "react-icons/fa";

const TableUploadDokumen = ({ dataUpload }) => {
  const { uploadDocument } = useDataLetter();
  const getUpload = useDataLetter((state) => state.getUploadDokumenRegister);

  const dataTHead = ["No", "NIK", "Nama", "Jenis Surat", "Upload Dokumen", ""];
  const [uploadFiles, setUploadFiles] = useState({});
  // Handle Surat Pengantar upload

  // State untuk pagination dan limitation
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Hitung data yang akan ditampilkan berdasarkan pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataUpload.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataUpload.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChangeOption = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSuratPengantarUpload = (e, rowId) => {
    const file = e.target.files[0];
    // Check file type
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setUploadFiles((prev) => ({
        ...prev,
        [rowId]: {
          ...prev[rowId],
          suratPengantarFile: file,
        },
      }));
      // console.log("Upload Surat Pengantar for ID:", rowId, file);
    } else {
      alert("Hanya file PDF atau DOCX yang diizinkan");
      e.target.value = null;
    }
  };

  // Handle Surat Pengajuan upload
  const handleSuratPengajuanUpload = (e, rowId) => {
    const file = e.target.files[0];
    // Check file type
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setUploadFiles((prev) => ({
        ...prev,
        [rowId]: {
          ...prev[rowId],
          suratPengajuanFile: file,
        },
      }));
      // console.log("Upload Surat Pengajuan for ID:", rowId, file);
    } else {
      alert("Hanya file PDF atau DOCX yang diizinkan");
      e.target.value = null;
    }
  };

  const handleSuratPernyataanUpload = (e, rowId) => {
    const file = e.target.files[0];
    // Check file type
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setUploadFiles((prev) => ({
        ...prev,
        [rowId]: {
          ...prev[rowId],
          suratPernyataanFile: file,
        },
      }));
    } else {
      alert("Hanya file PDF atau DOCX yang diizinkan");
      e.target.value = null;
    }
  };

  // Handle document submission
  const handleSubmitDocuments = async (row) => {
    try {
      const rowFiles = uploadFiles[row.id_pengajuan];

      // Validate files are selected
      if (
        !rowFiles ||
        !rowFiles.suratPengantarFile ||
        !rowFiles.suratPengajuanFile ||
        !rowFiles.suratPernyataanFile
      ) {
        alert("Silakan unggah kedua dokumen terlebih dahulu");
        return;
      }

      // Call the upload document function
      await uploadDocument(
        row.id_pengajuan,
        rowFiles.suratPengajuanFile,
        rowFiles.suratPengantarFile,
        rowFiles.suratPernyataanFile
      );

      // Reset files for this row
      setUploadFiles((prev) => {
        const newUploadFiles = { ...prev };
        delete newUploadFiles[row.id_pengajuan];
        return newUploadFiles;
      });

      // Optional: Show success message
      alert("Dokumen berhasil diunggah");

      // Optionally refresh upload list
      getUpload();
    } catch (error) {
      console.error("Error uploading documents:", error);
      alert("Gagal mengunggah dokumen. Silakan coba lagi.");
    }
  };

  const handleRedownload = async (data) => {
    const checkData = () => {
      if (data?.surat_pengantar?.ahli_waris.length > 1) {
        return "Ahli Waris 2";
      } else {
        return "Ahli Waris 1";
      }
    };
    const documentConfigs = [
      {
        type: "surat_pengantar",
      },
      {
        type: "surat_pernyataan",
      },
      {
        type:
          data?.surat_pengantar?.jenis_surat?.nama === "Ahli Waris"
            ? checkData()
            : data?.surat_pengantar?.jenis_surat?.nama,
      },
    ];

    await generateDocuments(data, documentConfigs);
  };

  return (
    <div>
      <div className="text-aqua font-semibold mb-6">
        {" "}
        <div>
          <h1 className="text-4xl font-bold">Upload Dokumen</h1>{" "}
        </div>{" "}
      </div>
      {/* TABLE USER */}
      <div className="mt-10">
        {/* Limit */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-between mb-3">
          {/* LIMIT */}
          <div className="flex items-center gap-2 font-semibold">
            <label className="text-aqua">Perlihatkan</label>
            <select
              className="px-2 py-1 rounded-md text-aqua outline-none h-10 focus:border-aqua"
              onChange={(e) => handleChangeOption(e)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <label className="text-aqua">Baris</label>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border">
          {/* head */}
          <thead className="bg-seaform">
            <tr className="text-aqua font-semibold ">
              {dataTHead.map((head, index) => (
                <th key={index} className="px-4 py-2 border-2 border-aqua/20 ">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-[#D9F2F9]">
            {currentData.length > 0 ? (
              currentData.map((data, i) => (
                <tr key={i} className="text-aqua h-12">
                  <th className="border-2 border-aqua/20 px-4 py-2 ">
                    {i + 1 + (currentPage - 1) * itemsPerPage}
                  </th>
                  <td className="border-2 border-aqua/20 px-4 py-2">
                    {data?.surat_pengantar?.nik}
                  </td>
                  <td className="border-2 border-aqua/20 px-4 py-2">
                    {data?.surat_pengantar?.nama_lengkap}
                  </td>

                  <td className="border-2 border-aqua/20 px-4 py-2">
                    {data?.surat_pengantar?.jenis_surat?.nama}
                  </td>
                  <td className="px-4 py-2 border-2 border-aqua/20">
                    <div className="flex gap-2">
                      <div className=" bg-green-500 text-overpost font-medium py-1 rounded-md">
                        <button
                          className="w-full px-2 h-full"
                          onClick={() => handleRedownload(data)}
                        >
                          <div className="flex items-center justify-center h-full">
                            <FaCloudDownloadAlt size={24} />
                            <p className="ml-2">Unduh</p>
                          </div>
                        </button>
                      </div>
                      <label
                        htmlFor={`uploadPengantar-${data.id_pengajuan}`}
                        className={`px-4 py-1 rounded cursor-pointer font-medium flex items-center w-48 bg-ocean text-white justify-center`}
                      >
                        {uploadFiles[data.id_pengajuan]?.suratPengantarFile ? (
                          <FaRegCheckCircle size={24} />
                        ) : (
                          <p className="flex items-center justify-center">
                            <FaCloudUploadAlt size={24} className="mr-2" />
                            Surat Pengantar
                          </p>
                        )}
                        <input
                          type="file"
                          id={`uploadPengantar-${data.id_pengajuan}`}
                          className="hidden"
                          accept=".pdf,.docx"
                          onChange={(e) =>
                            handleSuratPengantarUpload(e, data.id_pengajuan)
                          }
                        />
                      </label>
                      <label
                        htmlFor={`uploadPernyataan-${data.id_pengajuan}`}
                        className={`px-4 py-1 rounded cursor-pointer font-medium flex items-center w-48 bg-ocean text-white justify-center`}
                      >
                        {uploadFiles[data.id_pengajuan]?.suratPernyataanFile ? (
                          <FaRegCheckCircle size={24} />
                        ) : (
                          <p className="flex items-center justify-center">
                            <FaCloudUploadAlt size={24} className="mr-2" />
                            Surat Pernyataan
                          </p>
                        )}
                        <input
                          type="file"
                          id={`uploadPernyataan-${data.id_pengajuan}`}
                          className="hidden"
                          accept=".pdf,.docx"
                          onChange={(e) =>
                            handleSuratPernyataanUpload(e, data.id_pengajuan)
                          }
                        />
                      </label>
                      <label
                        htmlFor={`uploadPengajuan-${data.id_pengajuan}`}
                        className={`px-4 py-1 rounded cursor-pointer font-medium flex items-center w-48 bg-ocean text-white justify-center

                          `}
                      >
                        {uploadFiles[data.id_pengajuan]?.suratPengajuanFile ? (
                          <FaRegCheckCircle size={24} />
                        ) : (
                          <p className="flex items-center justify-center">
                            <FaCloudUploadAlt size={24} className="mr-2" />
                            Surat Pengajuan
                          </p>
                        )}

                        <input
                          type="file"
                          id={`uploadPengajuan-${data.id_pengajuan}`}
                          className="hidden"
                          accept=".pdf,.docx"
                          onChange={(e) =>
                            handleSuratPengajuanUpload(e, data.id_pengajuan)
                          }
                        />
                      </label>
                    </div>
                  </td>
                  <td className="px-4 py-2 border-2 border-aqua/20">
                    <button
                      onClick={() => handleSubmitDocuments(data)}
                      disabled={
                        !uploadFiles[data.id_pengajuan]?.suratPengantarFile ||
                        !uploadFiles[data.id_pengajuan]?.suratPengajuanFile
                      }
                      className={`px-6 py-1 rounded transition-colors ${
                        uploadFiles[data.id_pengajuan]?.suratPengantarFile &&
                        uploadFiles[data.id_pengajuan]?.suratPengajuanFile
                          ? "bg-[#004D40] text-white hover:bg-[#003730]"
                          : "bg-gray-400 text-gray-200 cursor-not-allowed"
                      }`}
                    >
                      Kirim
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-aqua/50 h-12">
                <td
                  colSpan={dataTHead.length}
                  className="text-center font-semibold "
                >
                  Data tidak tersedia
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="w-full flex justify-center bg-seaform">
        <div className="flex gap-2 my-2 text-aqua">
          <button
            className="bg-overpost px-2 rounded-md hover:bg-seaform transition-colors"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <IoIosArrowBack />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`bg-overpost px-2 rounded-md hover:bg-seaform transition-colors ${
                currentPage === i + 1 ? "bg-seaform" : ""
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="bg-overpost px-2 rounded-md hover:bg-seaform transition-colors"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

TableUploadDokumen.propTypes = {
  dataTHead: PropTypes.array,
  action: PropTypes.string,
  dataUpload: PropTypes.array,
  query: PropTypes.func,
};

export default TableUploadDokumen;
