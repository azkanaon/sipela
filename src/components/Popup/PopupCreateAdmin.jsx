import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import {
  handleContentClick,
  handleOutsideClick,
  useClosePopupWithEscKey,
} from "../../hooks/useClosePopup";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDataAdminRTRW } from "../../store/DataAdminRTRW";

const PopupCreateAdmin = ({ handleOpen, selectedAdmin }) => {
  const [username, setUsername] = useState(
    selectedAdmin ? selectedAdmin.username : ""
  );
  const [password, setPassword] = useState("");
  const [rt, setRT] = useState(selectedAdmin ? selectedAdmin.rt : "");
  const [rw, setRW] = useState(selectedAdmin ? selectedAdmin.rw : "");
  const [role, setRole] = useState(selectedAdmin ? selectedAdmin.role : "");

  const [isFull, setIsFull] = useState(false);

  const addData = useDataAdminRTRW((state) => state.addData);
  const updateData = useDataAdminRTRW((state) => state.updateData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Jika selectedAdmin ada, lakukan update
    if (selectedAdmin) {
      updateData(selectedAdmin.id, {
        username,
        password,
      });
      toast.success("Akun berhasil diupdate", { duration: 3000 });
    } else {
      const result = await addData({ username, password, role, rt, rw });

      if (result.success) {
        toast.success("Akun baru berhasil ditambahkan", { duration: 3000 });
      } else {
        toast.error(`Gagal menambahkan Akun: ${result.error}`, {
          duration: 3000,
        });
      }
    }
    handleOpen();
  };

  useEffect(() => {
    const handleFull = () => {
      if (username && password && role && rt && rw) {
        setIsFull(true);
      }
    };
    handleFull();
  }, [username, password, role, rt, rw]);

  useClosePopupWithEscKey(handleOpen);
  return (
    <div
      className="fixed inset-0 h-screen w-screen bg-black/70 z-40"
      onClick={() => {
        handleOutsideClick(handleOpen);
      }}
    >
      <Toaster />
      <div className="flex items-center justify-center w-screen h-screen">
        <div
          className="relative w-full lg:w-5/12 rounded-lg bg-overpost"
          onClick={handleContentClick}
        >
          <div className="absolute top-3 right-5 cursor-pointer">
            <div>
              <IoClose
                className="h-6 w-6 transition-all hover:text-red-500"
                onClick={handleOpen}
              />
            </div>
          </div>
          {/* title */}
          <h1 className="text-aqua text-xl text-center font-bold my-4">
            {selectedAdmin ? "Update" : "Tambah"} Admin RT / RW
          </h1>

          {/* Form */}
          <form action="" className="flex justify-center">
            {/* input title */}
            <div className="flex flex-col w-11/12  ">
              {/* Username */}
              <div className="mmb-2 lg:mb-4">
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="font-medium lg:font-bold text-aqua text-base lg:text-lg lg:mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="px-2 py-2 lg:px-3 rounded-md text-sm lg:text-base font-medium lg:font-semibold focus:outline-none placeholder:font-normal placeholder:text-sm placeholder:lg:text-base placeholder:tracking-wide"
                    placeholder="Ketikkan Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-2 lg:mb-4">
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="font-medium lg:font-bold text-aqua text-base lg:text-lg lg:mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="px-2 py-2 lg:px-3 rounded-md text-sm lg:text-base font-medium lg:font-semibold focus:outline-none placeholder:font-normal placeholder:text-sm placeholder:lg:text-base placeholder:tracking-wide"
                    placeholder={
                      selectedAdmin
                        ? "Masukkan Password Baru"
                        : "Masukkan Password"
                    }
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              {/* Role */}
              <div className="mb-2 lg:mb-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="role"
                    className="font-medium lg:font-bold text-aqua text-base lg:text-lg lg:mb-2"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    className="px-2 py-2 lg:px-3 rounded-md text-sm lg:text-base font-medium lg:font-semibold focus:outline-none placeholder:font-normal placeholder:text-sm placeholder:lg:text-base placeholder:tracking-wide cursor-pointer disabled:bg-white disabled:text-aqua"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                    disabled={selectedAdmin ? true : false}
                    required
                  >
                    <option value="" className="" disabled>
                      Pilih Role
                    </option>
                    <option className="cursor-pointer" value="rt">
                      RT
                    </option>
                    <option className="cursor-pointer" value="rw">
                      RW
                    </option>
                  </select>
                </div>
              </div>

              {/* RT */}
              <div className="mb-2 lg:mb-4">
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="font-medium lg:font-bold text-aqua text-base lg:text-lg lg:mb-2"
                  >
                    RT
                  </label>
                  <input
                    type="text"
                    className="px-2 py-2 lg:px-3 rounded-md text-sm lg:text-base font-medium lg:font-semibold focus:outline-none placeholder:font-normal placeholder:text-sm placeholder:lg:text-base placeholder:tracking-wide"
                    placeholder="RT"
                    value={rt}
                    maxLength={2}
                    onChange={(e) => {
                      setRT(e.target.value);
                    }}
                    readOnly={selectedAdmin ? true : false}
                    required
                  />
                </div>
              </div>

              {/* RW */}
              <div className="mb-4">
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="font-medium lg:font-bold text-aqua text-base lg:text-lg lg:mb-2"
                  >
                    RW
                  </label>
                  <input
                    type="text"
                    className="px-2 py-2 lg:px-3 rounded-md text-sm lg:text-base font-medium lg:font-semibold focus:outline-none placeholder:font-normal placeholder:text-sm placeholder:lg:text-base placeholder:tracking-wide"
                    placeholder="Ketikkan RW"
                    value={rw}
                    onChange={(e) => {
                      setRW(e.target.value);
                    }}
                    maxLength={2}
                    readOnly={selectedAdmin ? true : false}
                    required
                  />
                </div>
              </div>

              {/* Button Tambah */}
              <div className="mb-4">
                <button
                  className="py-2 lg:py-3 text-sm lg:text-base rounded-md font-semibold w-full bg-aqua text-white transition-all hover:bg-aqua/70"
                  onClick={handleSubmit}
                  disabled={!isFull}
                >
                  {selectedAdmin ? "Update" : "Tambah"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

PopupCreateAdmin.propTypes = {
  // Add your prop types here
  handleOpen: PropTypes.func,
  status: PropTypes.string,
  selectedAdmin: PropTypes.object,
};

export default PopupCreateAdmin;
