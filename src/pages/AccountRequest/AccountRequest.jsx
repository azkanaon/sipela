import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useUserNotVerify } from "../../store/DataUser";
import { formatDate } from "../../utils/formattedData";
import LoadingScreen from "../../components/EmptyPage/LoadingScreen";
import { BiTrash } from "react-icons/bi";
import PopupConfirmation from "../../components/Popup/PopupConfirmation";

const AccountRequest = () => {
  const navigate = useNavigate();
  const getData = useUserNotVerify((state) => state.searchUsersNotVerify);
  const deleteData = useUserNotVerify((state) => state.deleteUsersNotVerify);

  const allData = useUserNotVerify((state) => state.usersNotVerify);

  // State untuk pagination dan limitation
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [querySearch, setQuerySearch] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [idDeleted, setIdDeleted] = useState("");

  // Hitung data yang akan ditampilkan berdasarkan pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = allData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(allData.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getData(querySearch);
      setLoading(false);
    };

    fetchData();
  }, [getData, querySearch]);

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

  const handleDelete = (id) => {
    document.getElementById("my_modal_delete_account").showModal();
    setIdDeleted(id);
  };

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          <PopupConfirmation
            funcConfirmation={deleteData}
            id={idDeleted}
            title={"Hapus Akun"}
            description={
              "Akun yang sudah dihapus tidak akan bisa dikembalikan, apakah anda yakin ingin menghapus akun ini?"
            }
            modal={"my_modal_delete_account"}
            toastMessage={"Akun berhasil dihapus"}
          />
          <div className="px-4 lg:px-12 mt-5 overflow-x-auto w-screen md:w-full h-screen sm:h-fit">
            {/* TITLE */}
            <div className="text-aqua font-semibold">
              <div>
                <h1 className="text-4xl font-bold">
                  Pengajuan Registrasi Akun User
                </h1>
              </div>
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
                    <th className="px-4 py-2  border-2 border-aqua/20">NIK</th>
                    <th className="px-4 py-2  border-2 border-aqua/20">Nama</th>
                    <th className="px-4 py-2  border-2 border-aqua/20">
                      Waktu
                    </th>
                    <th className="px-4 py-2  border-2 border-aqua/20">
                      Status
                    </th>
                    <th className="px-4 py-2  border-2 border-aqua/20">
                      Tindakan
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#D9F2F9]">
                  {currentData.length > 0 ? (
                    currentData.map((data, i) => (
                      <tr key={data.id} className="text-aqua h-12">
                        <th className="border-2 border-aqua/20 px-4 py-2 ">
                          {i + 1 + (currentPage - 1) * itemsPerPage}
                        </th>
                        <td className="border-2 border-aqua/20 px-4 py-2">
                          {data.nik}
                        </td>
                        <td className="border-2 border-aqua/20 px-4 py-2">
                          {data.nama}
                        </td>
                        <td className="border-2 border-aqua/20 px-4 py-2">
                          {formatDate(data.created_at)}
                        </td>
                        <td className="text-center border-2 border-aqua/20">
                          <p className="badge">{data.status} diperiksa</p>
                        </td>
                        <td className="text-center border-2 border-aqua/20 text-sm md:text-base text-overpost flex items-center justify-center h-14 gap-4">
                          <button
                            className="p-1 rounded-lg font-semibold px-2 bg-aqua text-overpost transition-all duration-300 hover:bg-ocean"
                            onClick={() => {
                              navigate(`/registrasi-akun/${data.nik}`);
                            }}
                          >
                            Detail
                          </button>
                          <button onClick={() => handleDelete(data.id)}>
                            <span className="flex items-center">
                              <BiTrash size={28} color="red" />
                            </span>
                          </button>
                        </td>
                      </tr>
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

export default AccountRequest;
