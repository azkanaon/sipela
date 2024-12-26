import PropTypes from "prop-types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TableRegisterNumber = ({ dataRegister }) => {
  const dataTHead = ["No", "NIK", "Nama", "Jenis Surat", ""];
  // State untuk pagination dan limitation
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Navigate
  const navigate = useNavigate();
  const handleUrl = (id) => {
    navigate(`/nomor-register/${id}`);
  };

  // Hitung data yang akan ditampilkan berdasarkan pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = dataRegister.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dataRegister.length / itemsPerPage);

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

  return (
    <div>
      <div className="text-aqua font-semibold mb-6">
        {" "}
        <div>
          <h1 className="text-4xl font-bold">Pemberian Nomor Register</h1>{" "}
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
                  <td className="text-center text-sm md:text-base text-overpost border-2 border-aqua/20">
                    <button
                      className="p-1 rounded-lg font-semibold px-2 bg-aqua text-overpost transition-all duration-300 hover:bg-ocean"
                      onClick={() => {
                        handleUrl(data?.id_pengajuan);
                      }}
                    >
                      Detail
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

TableRegisterNumber.propTypes = {
  dataTHead: PropTypes.array,
  action: PropTypes.string,
  dataRegister: PropTypes.array,
  query: PropTypes.func,
};

export default TableRegisterNumber;
