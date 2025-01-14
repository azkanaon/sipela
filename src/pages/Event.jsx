import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import LoadingScreen from "../components/EmptyPage/LoadingScreen";
import { IoAdd } from "react-icons/io5";
import { formatDate } from "../utils/formattedData";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDataEvent } from "../store/DataEvent";
import PopupEvent from "../components/Popup/PopupEvent";
import PopupConfirmation from "../components/Popup/PopupConfirmation";

const Event = () => {
  const allData = useDataEvent((state) => state.event);
  const getAllData = useDataEvent((state) => state.getAllEvent);
  const deleteData = useDataEvent((state) => state.deleteEvent);
  const [idDeleted, setIdDeleted] = useState(0);

  // const [querySearch, setQuerySearch] = useState("");
  // const [inputSearch, setInputSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // State untuk pagination dan limitation
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      getAllData();
      setLoading(false);
    };

    fetchData();
  }, [getAllData]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    handleOpen(); // Buka popup
  };

  const handleDelete = (id) => {
    document.getElementById("my_modal_delete_event").showModal();
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

  // const handleSearch = () => {
  //   setQuerySearch(inputSearch);
  // };

  return (
    <div>
      {/* Popup */}
      {isOpen && <PopupEvent handleOpen={handleOpen} />}
      <PopupConfirmation
        funcConfirmation={deleteData}
        id={idDeleted}
        title={"Hapus Event"}
        description={
          "Event yang sudah dihapus tidak akan bisa dikembalikan, apakah anda yakin ingin menghapus event?"
        }
        modal={"my_modal_delete_event"}
        toastMessage={"Event berhasil dihapus"}
      />
      <div>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className="px-4 lg:px-12 mt-5 overflow-x-auto w-screen md:w-full h-screen sm:h-fit">
            {/* TITLE */}
            <div className="text-aqua font-semibold">
              <div>
                <h1 className="text-4xl font-bold">Event / Acara</h1>
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
                    <option value="100">100</option>
                  </select>
                  <label className="text-aqua">Baris</label>
                </div>

                <div>
                  <button
                    className="rounded flex items-center p-2 bg-aqua font-medium transition-all text-overpost hover:scale-105 hover:bg-aqua/70 hover:text-aqua"
                    onClick={() => handleEdit()}
                  >
                    <span>
                      <IoAdd />
                    </span>
                    Tambah Event
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
                    <th className="px-4 py-2">Gambar</th>
                    {/* <th className="px-4 py-2">Judul</th>
                    <th className="px-4 py-2">Deskripsi</th> */}
                    <th className="px-4 py-2">Tanggal Upload</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-[#D9F2F9]">
                  {currentData.length > 0 ? (
                    currentData.map((data, i) => (
                      <tr key={data.id} className="text-aqua h-12">
                        <th className="border px-4 py-2">
                          {i + 1 + (currentPage - 1) * itemsPerPage}
                        </th>
                        <td className="border px-4 py-2 overflow-hidden">
                          <div className="flex items-center justify-center">
                            <img
                              src={`${data.gambar}`}
                              alt=""
                              className=" rounded-lg lg:w-3/5 h-24 object-cover object-center border border-aqua "
                            />
                          </div>
                        </td>
                        {/* <td className="border px-4 py-2">{data.judul}</td>
                        <td className="border px-4 py-1 line-clamp-5">
                          {data.description}
                        </td> */}
                        <td className="border px-4 py-2">
                          {formatDate(data.tanggal)}
                        </td>
                        <td className="text-center text-sm md:text-base text-overpost">
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

export default Event;
