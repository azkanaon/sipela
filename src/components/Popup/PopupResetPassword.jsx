import PropTypes from "prop-types";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDetailUser } from "../../store/DataUser";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PopupConfirmationNavigation from "./PopupConfirmationNavigation";

const PopupResetPassword = ({ handleOpen, nik, nama }) => {
  const [newPassword, setNewPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const resetPasswordUser = useDetailUser((state) => state.resetPasswordUser);

  const handleSubmit = () => {
    resetPasswordUser(nik, newPassword);
    handleOpen();
  };

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <div className="fixed inset-0 bg-black/65">
      <PopupConfirmationNavigation
        funcConfirmation={handleSubmit}
        title={"Reset Password"}
        description={"Apakah anda yakin ingin mereset password akun ini ?"}
        modal={"3"}
        pesanSukses={`Reset Password untuk ${nama} telah berhasil`}
      />
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
            Reset Password
          </h1>
          <div className="w-4/5 sm:w-3/5 mt-4 font-semibold">
            <p>Untuk</p>
            <p>Nama : {nama}</p>
            <p>NIK : {nik}</p>
          </div>
          <div className="mt-4 sm:w-3/5">
            <label className="input input-bordered flex items-center gap-2 bg-[#FFFFFF]/50 h-10 relative">
              <div
                className="absolute text-overpost right-4 top-4 md:right-3 md:top-2 cursor-pointer"
                onClick={handlePasswordVisibility}
              >
                {passwordVisibility ? (
                  <FaEyeSlash className="h-4 w-4  md:h-5 md:w-5" />
                ) : (
                  <FaEye className="h-4 w-4 md:h-5 md:w-5" />
                )}
              </div>
              <input
                type={passwordVisibility ? "text" : "password"}
                className="grow placeholder:text-[#727272]"
                placeholder="**********"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="mt-4 sm:w-2/5 mb-4">
            <button
              className="bg-ocean rounded-lg font-semibold py-2 w-full transition-all hover:bg-ocean/50"
              onClick={() => {
                document.getElementById("my_modal_3").showModal();
              }}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PopupResetPassword.propTypes = {
  handleOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  nik: PropTypes.string,
  nama: PropTypes.string,
};

export default PopupResetPassword;
