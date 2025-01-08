import PropTypes from "prop-types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { formatDate } from "../../utils/formattedData";

const TableHistory = ({ dataHistory, query }) => {
  const dataTHead = [
    "No",
    "NIK",
    "Nama",
    "Jenis Surat",
    "Status",
    "Tanggal Disetujui",
  ];
  const [inputSearch, setInputSearch] = useState("");
  // State untuk pagination dan limitation
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Hitung data yang akan ditampilkan berdasarkan pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataHistory.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataHistory.length / itemsPerPage);

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

  const handleSearch = () => {
    query(inputSearch);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="text-aqua font-semibold mb-6">
        {" "}
        <div>
          <h1 className="text-4xl font-bold">Riwayat Surat</h1>{" "}
        </div>{" "}
      </div>
      {/* TABLE USER */}
      <div className="mt-10">
        {/* Limit and Search Bar */}
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
          <div className="flex items-center gap-2 overflow-hidden ">
            <label className="input input-bordered flex items-center gap-2 h-10">
              <input
                type="text"
                className="grow"
                placeholder="Cari"
                onChange={(e) => setInputSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
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
                  <td className="border-2 border-aqua/20 px-4 py-2">
                    <p
                      className={`text-sm text-center rounded-full bg-overpost border font-bold py-[1px] px-[2px] border-aqua/40 ${
                        data?.is_deleted === true
                          ? "text-violet-700"
                          : data?.dokumen_pengantar !== null &&
                            data?.dokumen_pernyataan !== null &&
                            data?.dokumen_pengajuan !== null
                          ? "text-aqua"
                          : "text-red-500"
                      }`}
                    >
                      {data?.is_deleted === true
                        ? "Dibatalkan User"
                        : data?.dokumen_pengantar !== null &&
                          data?.dokumen_pernyataan !== null &&
                          data?.dokumen_pengajuan !== null
                        ? "Diterima"
                        : "Ditolak"}
                    </p>
                  </td>
                  <td className="border-2 border-aqua/20 px-4 py-2 text-center">
                    {data?.dokumen_pengantar !== null &&
                    data?.dokumen_pernyataan !== null &&
                    data?.dokumen_pengajuan !== null
                      ? formatDate(data.tanggal_disetujui)
                      : "-"}
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

TableHistory.propTypes = {
  dataTHead: PropTypes.array,
  action: PropTypes.string,
  dataHistory: PropTypes.array,
  query: PropTypes.func,
};

export default TableHistory;
