import { useState } from "react";
import { useDetailUser, useUserNotVerify } from "../../store/DataUser";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import PopupConfirmationNavigation from "../Popup/PopupConfirmationNavigation";

const CardCheckIdentity = ({ detailData }) => {
  const dataUpdating = useDetailUser((state) => state.updateStatus);
  const dataDecline = useUserNotVerify((state) => state.updateDecline);
  const navigate = useNavigate();
  const checks = [
    {
      id: 1,
      name: "NIK",
    },
    {
      id: 2,
      name: "KTP",
    },
    {
      id: 3,
      name: "Nama",
    },
    {
      id: 4,
      name: "KK",
    },
  ];

  const [catatan, setCatatan] = useState("");

  // State untuk melacak status centang setiap checkbox
  const [checkedItems, setCheckedItems] = useState(
    checks.reduce((acc, check) => {
      acc[check.id] = false; // Inisialisasi semua checkbox dengan false
      return acc;
    }, {})
  );

  // Handler untuk mengubah status checkbox
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle status checkbox
    }));
  };

  // Cek apakah semua checkbox sudah dicentang
  const allChecked = Object.values(checkedItems).every(
    (isChecked) => isChecked
  );

  const handleDecline = () => {
    const nik = detailData && detailData.nik;
    dataDecline(nik, catatan);
    toast.success(
      "Nomor register berhasil ditambahkan dan dokumen telah dibuat",
      { duration: 3000 }
    );
    setCatatan("");
    setTimeout(() => {
      navigate("/registrasi-akun");
    }, 1000);
  };
  return (
    <div>
      <Toaster />
      <PopupConfirmationNavigation
        funcConfirmation={dataUpdating}
        id={parseInt(detailData.nik)}
        title={"Persetujuan Akun"}
        description={"Apakah anda yakin ingin menerima data ini?"}
        url={"/registrasi-akun"}
        modal={"confirm_register"}
        pesanSukses={`Status user ${detailData.nama} berhasil diubah`}
      />

      <div className="flex justify-center">
        <div className="mt-12 md:mt-0 w-full md:w-4/5 lg:w-11/12 xl:w-4/6 bg-aqua md:rounded-xl">
          <div className="pt-4 font-semibold">
            <h2 className="text-center text-lg font-bold">Pemeriksaan</h2>
            {/* CheckBOX */}
            <div className="mt-4">
              <div className="ml-10 form-control ">
                {checks.map((check) => (
                  <label
                    key={check.id}
                    className="label cursor-pointer flex justify-start -mt-2"
                  >
                    <input
                      type="checkbox"
                      className="checkbox checkbox-success bg-overpost "
                      checked={checkedItems[check.id]} // Set status checkbox
                      onChange={() => handleCheckboxChange(check.id)} // Handle perubahan status
                    />
                    <span className="text-overpost ml-2">{check.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Textarea untuk catatan */}
            <div className="mt-4">
              <h2 className="ml-8 text-xl">Catatan</h2>
              <div className="flex justify-center">
                <div className=" w-5/6">
                  <textarea
                    className="textarea textarea-bordered w-full h-52 bg-white/50 placeholder:text-overpost/70 text-overpost font-semibold"
                    onChange={(e) => {
                      setCatatan(e.target.value);
                    }}
                    placeholder="Diisi jika ada perbaikan"
                  />
                </div>
              </div>
            </div>

            {/* button perbaiki dan diterima */}
            <div className="flex justify-center mt-4 pb-7">
              <button
                className="w-24 h-9 rounded-lg bg-ice text-aqua font-semibold hover:bg-ocean hover:text-overpost transition-all"
                onClick={handleDecline}
              >
                Perbaiki
              </button>
              <button
                className={`ml-8 w-24 h-9 rounded-lg font-semibold text-overpost hover:bg-ocean transition-all ${
                  allChecked
                    ? "bg-glacier_blue"
                    : "bg-warm_grey cursor-not-allowed hover:bg-warm_grey/55"
                }`} // Tombol berubah warna saat enabled
                disabled={!allChecked} // Disabled jika belum semua dicentang
                onClick={() => {
                  document
                    .getElementById("my_modal_confirm_register")
                    .showModal();
                }}
              >
                Diterima
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardCheckIdentity.propTypes = {
  detailData: PropTypes.object,
};

export default CardCheckIdentity;
