import { useDataLetter } from "../../store/DataLetter";
import React, { useEffect, useState } from "react";
import LoadingScreen from "../../components/EmptyPage/LoadingScreen";
import { formatDate } from "../../utils/formattedData";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Tracking from "../../components/Table/Tracking";

const TrackingLetterRequest = () => {
  const trackLetter = useDataLetter((state) => state.tracking);
  const getData = useDataLetter((state) => state.searchLetterTracking);
  const [expandedRow, setExpandedRow] = useState(null);

  // State untuk pagination dan limitation
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [querySearch, setQuerySearch] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = trackLetter.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(trackLetter.length / itemsPerPage);

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
    setQuerySearch(inputSearch);
    setInputSearch("");
  };

  const handleTrackClick = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getData(querySearch);
      setLoading(false);
    };

    fetchData();
  }, [getData, querySearch]);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="px-4 lg:px-12 mt-5 overflow-x-auto w-screen md:w-full h-screen sm:h-fit">
            {/* TITLE */}
            <div className="text-aqua font-semibold">
              <div>
                <h1 className="text-4xl font-bold">Lacak Surat</h1>
              </div>
            </div>

            {/* TABLE TRACKING */}
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
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                  <label className="text-aqua">Baris</label>
                </div>
                {/* SEARCH */}
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
                      onClick={handleSearch}
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
            <div className="overflow-x-auto w-full ">
              <table className="min-w-full border">
                {/* head */}
                <thead className="bg-seaform">
                  <tr className="text-aqua font-semibold border-2">
                    <th className="px-4 py-2  border-2 border-aqua/20">No</th>
                    <th className="px-4 py-2  border-2 border-aqua/20">
                      Nama Pengaju
                    </th>
                    <th className="px-4 py-2  border-2 border-aqua/20">
                      Jenis Surat
                    </th>
                    <th className="px-4 py-2  border-2 border-aqua/20">
                      Waktu Pengajuan
                    </th>
                    <th className="px-4 py-2  border-2 border-aqua/20" />
                  </tr>
                </thead>
                <tbody className="bg-[#D9F2F9]">
                  {currentData.length > 0 ? (
                    currentData.map((data, i) => (
                      <React.Fragment key={data.id_pengajuan}>
                        <tr className="text-aqua h-12 transform transition-all">
                          <th className="border-2 border-aqua/20 px-4 py-2 ">
                            {i + 1 + (currentPage - 1) * itemsPerPage}
                          </th>
                          <td className="border-2 border-aqua/20 px-4 py-2">
                            {data.surat_pengantar.nama_lengkap}
                          </td>
                          <td className="border-2 border-aqua/20 px-4 py-2">
                            {data.surat_pengantar.jenis_surat.nama}
                          </td>
                          <td className="border-2 border-aqua/20 px-4 py-2">
                            {formatDate(data.tanggal_pengajuan)}
                          </td>
                          <td className="text-center border-2 border-aqua/20">
                            <button
                              className="py-1 px-2 rounded-md font-medium bg-aqua text-overpost transition-all hover:bg-overpost hover:text-aqua"
                              onClick={() =>
                                handleTrackClick(data.id_pengajuan)
                              }
                            >
                              {expandedRow === data.id_pengajuan
                                ? "Tutup"
                                : "Lacak"}
                            </button>
                          </td>
                        </tr>
                        <tr
                          className={`transition-all duration-300 ease-in-out transform  ${
                            expandedRow === data.id_pengajuan
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-95"
                          }`}
                        >
                          <td
                            colSpan="5"
                            className={`${
                              expandedRow === data.id_pengajuan
                                ? "p-4"
                                : "hidden"
                            }`}
                          >
                            <Tracking data={data} />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                  ) : (
                    <tr className="text-aqua/50 h-12">
                      <td colSpan="6" className="text-center font-semibold ">
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
        </div>
      )}
    </div>
  );
};

export default TrackingLetterRequest;
