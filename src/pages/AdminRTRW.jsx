import { useEffect, useState } from "react";
import PopupConfirmation from "../components/Popup/PopupConfirmation";
import LoadingScreen from "../components/EmptyPage/LoadingScreen";
import { IoAdd } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PopupCreateAdmin from "../components/Popup/PopupCreateAdmin";
import { useDataAdminRTRW } from "../store/DataAdminRTRW";

const News = () => {
  const getAllData = useDataAdminRTRW((state) => state.getData);
  const deleteData = useDataAdminRTRW((state) => state.deleteData);
  const allData = useDataAdminRTRW((state) => state.data);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [idDeleted, setIdDeleted] = useState(0);
  const [querySearch, setQuerySearch] = useState("");
  const [inputSearch, setInputSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // State untuk pagination dan limitation
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllData(querySearch);
      setLoading(false);
    };

    fetchData();
  }, [getAllData, querySearch]);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = (news) => {
    setSelectedAdmin(news); // Simpan berita yang dipilihs
    handleOpen(); // Buka popup
  };

  const handleDelete = (id) => {
    document.getElementById("my_modal_delete_admin").showModal();
    setIdDeleted(id);
  };

  // Hitung data yang akan ditampilkan berdasarkan pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = allData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(allData.length / itemsPerPage);

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
  };

  return (
    <div>
      {/* Popup */}
      {isOpen && (
        <PopupCreateAdmin
          handleOpen={handleOpen}
          selectedAdmin={selectedAdmin}
        />
      )}
      <PopupConfirmation
        funcConfirmation={deleteData}
        id={idDeleted}
        title={"Hapus Akun"}
        description={
          "Akun yang sudah dihapus tidak akan bisa dikembalikan, apakah anda yakin ingin menghapus Akun ini?"
        }
        modal={"my_modal_delete_admin"}
        toastMessage={"Akun berhasil dihapus"}
      />
      <div>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className="px-4 lg:px-12 mt-5 overflow-x-auto w-screen md:w-full h-screen sm:h-fit">
            {/* TITLE */}
            <div className="text-aqua font-semibold">
              <div>
                <h1 className="text-4xl font-bold">Akun RT / RW</h1>
              </div>
            </div>

            {/* TABLE USER */}
            <div className="mt-10">
              {/* Limit and Search Bar */}
              <div className="flex flex-col lg:flex-row items-center gap-4 w-full justify-between mb-3">
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
                  </select>
                  <label className="text-aqua">Baris</label>
                </div>
                {/* SEARCH */}
                <div className="flex items-center gap-2 overflow-hidden md:w-1/2">
                  <label className="input input-bordered flex items-center gap-2 h-10  w-full">
                    <input
                      type="text"
                      className="grow font-semibold focus:outline-none placeholder:font-normal"
                      placeholder="Cari Berdasarkan Username"
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
                      className="h-4 w-4 opacity-70 cursor-pointer"
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

                <div>
                  <button
                    className="btn bg-aqua text-overpost hover:bg-aqua/70 hover:text-aqua"
                    onClick={() => handleEdit()}
                  >
                    <span>
                      <IoAdd />
                    </span>
                    Tambah Akun
                  </button>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto w-full ">
              <table className="min-w-full border">
                {/* head */}
                <thead className="bg-seaform">
                  <tr className="text-aqua font-semibold">
                    <th className="px-4 py-2">No</th>
                    <th className="px-4 py-2">Username</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">RT</th>
                    <th className="px-4 py-2">RW</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-[#D9F2F9]">
                  {currentData.length > 0 ? (
                    currentData.map((data, i) => (
                      <tr key={i} className="text-aqua h-12 text-center">
                        <th className="border px-4 py-2">
                          {i + 1 + (currentPage - 1) * itemsPerPage}
                        </th>
                        <td className="border px-4 py-2">{data.username}</td>

                        <td className="border px-4 py-2">
                          {data?.role?.toUpperCase()}
                        </td>
                        <td className="border px-4 py-2">{data.rt}</td>
                        <td className="border px-4 py-2">{data.rw}</td>
                        <td className="text-center text-sm md:text-base text-overpost">
                          <button
                            className="p-1 rounded-lg font-semibold px-2 text-[#624DE3]"
                            onClick={() => handleEdit(data)}
                          >
                            <FaRegEdit className="w-6 h-6" />
                          </button>
                          <button
                            className="p-1 rounded-lg font-semibold px-2 text-red-500 transition-all duration-300 "
                            onClick={() => {
                              handleDelete(data.id);
                            }}
                          >
                            <RiDeleteBinLine className="w-6 h-6" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-aqua/50 h-12">
                      <td colSpan={6} className="text-center font-semibold ">
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

            <div className="mb-10" />
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
