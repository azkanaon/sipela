import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDataLetter } from "../store/DataLetter";
import toast, { Toaster } from "react-hot-toast";

const RegisterNumberDetail = () => {
  const { id } = useParams();
  const letters = useDataLetter((state) => state.dataDetailRegister);
  const [numberRegisterPengantar, setNumberRegisterPengantar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const updateNumber = useDataLetter((state) => state.updateRegisterNumber);
  const dataSurat = useDataLetter((state) => state.getDetailRegister);

  // Modified RegisterNumberDetail.jsx handleSubmit function
  // Updated handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First update the register numbers
      await updateNumber(id, numberRegisterPengantar);

      setNumberRegisterPengantar("");
      toast.success(
        "Nomor register berhasil ditambahkan dan dokumen telah dibuat",
        { duration: 3000 }
      );
      setTimeout(() => {
        navigate("/nomor-register");
      }, 1000);
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat memproses dokumen: " + error.message,
        { duration: 3000 }
      );
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // POTENSI ERROR
  useEffect(() => {
    dataSurat(id);
  }, [id, dataSurat]);

  if (!letters) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Toaster />
      <div className="bg-[#A7C7C7] p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-4">Pemberian Nomor Register</h2>
        <div className="bg-[#DBF0F0] p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">
            Surat {letters[0]?.surat_pengantar?.jenis_surat?.nama}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <input
                type="text"
                value={letters[0]?.surat_pengantar?.nama_lengkap ?? ""}
                readOnly
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NIK/No. KTP
              </label>
              <input
                type="text"
                value={letters[0]?.surat_pengantar?.nik ?? ""}
                readOnly
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4 flex items-end gap-4">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Register
              </label>
              <input
                type="text"
                placeholder="Masukkan Nomor Register"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-seaform focus:border-seaform"
                onChange={(e) => setNumberRegisterPengantar(e.target.value)}
                value={numberRegisterPengantar}
              />
            </div>
          </div>

          <div className="w-full text-end">
            <button
              className={`mt-4 px-4 py-2 rounded-lg font-medium text-white transition-all ${
                !numberRegisterPengantar || isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#004D40] hover:bg-[#003730] hover:scale-105"
              }`}
              type="submit"
              onClick={handleSubmit}
              disabled={!numberRegisterPengantar || isLoading}
            >
              {isLoading ? "Memproses..." : "Selesai"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterNumberDetail;
