import { Link, useParams } from "react-router-dom";
import SuratPengantar from "../../components/SuratPengantar/SuratPengantar";
import { useDataLetter } from "../../store/DataLetter";
import { useEffect, useState } from "react";
import { MdEditDocument } from "react-icons/md";
import PopupUpdateLetter from "../../components/Popup/PopupUpdateLetter";
import PopupRejectLetter from "../../components/Popup/PopupRejectLetter";
import LoadingScreen from "../../components/EmptyPage/LoadingScreen";
import AhliWaris from "../../components/JenisSurat/AhliWaris";
import KeteranganUsaha from "../../components/JenisSurat/KeteranganUsaha";
import DomisiliTidakTetap from "../../components/JenisSurat/DomisiliTidakTetap";
import BedaNama from "../../components/JenisSurat/BedaNama";
import DomisiliWNA from "../../components/JenisSurat/DomisiliWNA";
import DomisiliWNITetap from "../../components/JenisSurat/DomisiliWNITetap";
import KematianSebelum30Hari from "../../components/JenisSurat/KematianSebelum30Hari";
import TidakMenikah from "../../components/JenisSurat/TidakMenikah";
import KematianSetelah30Hari from "../../components/JenisSurat/KematianSetelah30Hari";
import DomisiliLembaga from "../../components/JenisSurat/DomisiliLembaga";
import DomisiliPerusahaan from "../../components/JenisSurat/DomisiliPerusahaan";
import TidakMampuBerobat from "../../components/JenisSurat/TidakMampuBerobat";
import KurangPbb from "../../components/JenisSurat/KurangPbb";

const DetailLetterRequest = () => {
  const detailData = useDataLetter((state) => state.detailLetter);
  const getDetailLetter = useDataLetter((state) => state.getDetailLetter);
  const updateLetterStatus = useDataLetter((state) => state.updateLetterStatus);

  const { id } = useParams();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getDetailLetter(id);
      setLoading(false);
    };

    fetchData(); // Call the function
  }, [getDetailLetter, id]);

  const suratComponents = {
    "Ahli Waris": AhliWaris,
    "Keterangan Usaha": KeteranganUsaha,
    "Kematian Kurang dari 30 hari": KematianSebelum30Hari,
    "Kematian Lebih dari 30 hari": KematianSetelah30Hari,
    "Domisili WNI Tetap": DomisiliWNITetap,
    "Domisili Tidak Tetap": DomisiliTidakTetap,
    "Beda Nama": BedaNama,
    "Domisili WNA": DomisiliWNA,
    "Tidak Menikah Lagi Duda Janda": TidakMenikah,
    "Domisili Lembaga": DomisiliLembaga,
    "Domisili Perusahaan": DomisiliPerusahaan,
    "Tidak Mampu Berobat": TidakMampuBerobat,
    "Kurang Pbb": KurangPbb,
  };

  const namaSurat = detailData[0]?.surat_pengantar?.jenis_surat?.nama;
  const SuratComponent = suratComponents[namaSurat];
  // console.log(detailData[0]);

  const groupedData =
    detailData[0]?.surat_pengantar?.jenis_surat?.persyaratan.reduce(
      (acc, item) => {
        // Ambil kategori sebelum koma
        const category = item.nama.split(",")[0];
        // Ambil nama setelah koma dan hilangkan spasi di awal
        const newName = item.nama.split(",")[1]?.trim() || "";
        // Jika kategori belum ada di accumulator, buat array baru
        if (!acc[category]) {
          acc[category] = [];
        }
        // Tambahkan item dengan nama baru
        acc[category].push({
          ...item,
          nama: newName,
        });

        return acc;
      },
      {}
    ) || null;

  // Bungkus objek di dalam groupedData menjadi array
  const groupedDataArray = groupedData
    ? Object.entries(groupedData).map(([key, value]) => ({
        category: key,
        items: value,
      }))
    : null;

  return (
    <div>
      <PopupUpdateLetter
        funcConfirmation={updateLetterStatus}
        id={id}
        title={"Persetujuan Pengajuan Surat"}
        description={
          "Apakah anda yakin untuk menyetujui pengajuan ini ? Data yang sudah diterima tidak bisa diedit lagi"
        }
        url={"/pengajuan-surat"}
        modal={"confirm_letter"}
        pesanSukses={`Pengajuan surat berhasil disetujui`}
      />
      {isPopupOpen && <PopupRejectLetter handleOpen={handlePopup} id={id} />}
      <div>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className="md:mx-12 mt-5 overflow-hidden">
            {/* Title */}
            <div className="">
              <div className="breadcrumbs text-aqua md:text-xl lg:text-3xl font-semibold">
                <ul className="flex flex-wrap">
                  <li className="">
                    <MdEditDocument className="ml-7 h-8 w-8" />
                    <div className="hidden md:flex hover:underline transition-all ml-2">
                      <Link to="/pengajuan-surat">Pengajuan Surat </Link>
                    </div>
                  </li>
                  <li className="text-xl lg:text-3xl">Detail</li>
                  <li className="text-xl lg:text-3xl">
                    <div className="hidden md:flex">
                      Surat {detailData[0]?.surat_pengantar?.jenis_surat?.nama}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full  mt-3 pb-10 rounded-lg">
              <div className="ml-8 mr-2 md:ml-0 md:mr-0 md:mx-8">
                <div className="py-2 text-aqua">
                  <h2 className="text-2xl md:text-3xl font-medium">
                    Surat {detailData[0]?.surat_pengantar?.jenis_surat?.nama}
                  </h2>
                </div>
                <div className="w-full">
                  <SuratPengantar data={detailData[0]?.surat_pengantar} />
                  {SuratComponent ? (
                    <SuratComponent
                      detailData={detailData}
                      groupedData={groupedDataArray}
                    />
                  ) : (
                    <p>Jenis surat tidak dikenali</p>
                  )}
                </div>
                <div className="w-full">
                  <div className="w-full flex justify-center lg:justify-end gap-4 lg:gap-10">
                    <button
                      className="btn bg-overpost border-none"
                      onClick={handlePopup}
                    >
                      Perbaiki
                    </button>
                    <button
                      className="btn bg-aqua text-white border-none"
                      onClick={() => {
                        document
                          .getElementById("my_modal_confirm_letter")
                          .showModal();
                      }}
                    >
                      Verifikasi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailLetterRequest;
