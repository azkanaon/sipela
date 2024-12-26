import PropTypes from "prop-types";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDataLetter } from "../../store/DataLetter";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PopupRejectLetter = ({ handleOpen, id }) => {
  const updateLetterStatus = useDataLetter((state) => state.updateLetterStatus);
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    updateLetterStatus(id, "Ditolak", note);
    handleOpen();
    setNote("");
    toast.success("Pengajuan berhasil ditolak", { duration: 3000 });
    setTimeout(() => {
      navigate("/pengajuan-surat");
    }, 1000);
  };
  return (
    <div>
      <Toaster />
      <div className="fixed inset-0 bg-black/65">
        <div className="flex items-center justify-center h-screen text-overpost">
          <div className="w-full md:w-2/3 lg:w-2/5 mx-4 md:mx-0  relative bg-aqua rounded-lg flex flex-col items-center ">
            <button
              className="absolute top-4 right-4 text-glacier_blue hover:text-glacier_blue/40"
              onClick={() => {
                handleOpen();
              }}
            >
              <IoMdClose size={32} />
            </button>
            <h1 className="font-semibold mt-4 text-lg md:text-xl">
              Catatan Perbaikan Surat
            </h1>
            <div className="mt-4 w-11/12 sm:w-3/5">
              <textarea
                className="grow placeholder:text-[#727272] h-56 bg-seaform rounded-md w-full outline-none p-2 text-aqua font-medium"
                placeholder="Ketik Perbaikan Surat Disini"
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              />
            </div>
            <div className="mt-4 sm:w-2/5 mb-4">
              <button
                className="bg-ocean rounded-lg font-semibold p-2 w-full transition-all hover:bg-ocean/50"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PopupRejectLetter.propTypes = {
  handleOpen: PropTypes.func,
  id: PropTypes.string,
};

export default PopupRejectLetter;
