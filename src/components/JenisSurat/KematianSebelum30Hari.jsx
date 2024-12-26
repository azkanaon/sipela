import PropTypes from "prop-types";
import LampiranSurat from "../SuratWaris/LampiranSurat";
import { formatDateWithoutDay, numberToWords } from "../../utils/formattedData";

const KematianSebelum30Hari = ({ detailData, groupedData }) => {
  const mati_kurang_30hari =
    detailData[0]?.surat_pengantar.mati_kurang_30hari[0];

  return (
    <div>
      <div className="w-full rounded-md overflow-hidden mb-10">
        <h2 className="text-lg font-medium text-aqua bg-seaform py-6 pl-2 md:pl-10 w-full">
          Surat Kematian Sebelum 30 Hari
        </h2>
        <div className="w-full text-aqua">
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Nama
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_kurang_30hari?.nama}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              No. KTP
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_kurang_30hari?.nik}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              No. Kartu Keluarga
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_kurang_30hari?.kk}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Usia
            </p>
            <p className="w-2/3 lg:w-3/4">
              {mati_kurang_30hari?.usia} (
              {numberToWords(mati_kurang_30hari?.usia)})
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Jenis Kelamin
            </p>
            <p className="w-2/3 lg:w-3/4">
              {mati_kurang_30hari?.jenis_kelamin}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Tempat/Tanggal Lahir
            </p>
            <p className="w-2/3 lg:w-3/4">
              {mati_kurang_30hari?.tempat_lahir} /{" "}
              {formatDateWithoutDay(mati_kurang_30hari?.tanggal_lahir)}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Kewarganegaraan
            </p>
            <p className="w-2/3 lg:w-3/4">
              {mati_kurang_30hari?.kewarganegaraan}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Status Perkawinan
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_kurang_30hari?.status_kawin}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Pekerjaan
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_kurang_30hari?.pekerjaan}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Agama
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_kurang_30hari?.agama}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Alamat
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_kurang_30hari?.alamat}</p>
          </div>
          <div className="even:bg-white bg-[#D9F2F9] py-2" />
          <h2 className="even:bg-white bg-[#D9F2F9] py-2 font-bold pl-4">
            Surat ini dibuat atas dasar yang sebenarnya.
          </h2>
          <div className="even:bg-white bg-[#D9F2F9] py-2" />
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Nama yang melapor
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_kurang_30hari?.nama_pelapor}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Hubungan dengan yang mati
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_kurang_30hari?.hubungan}</p>
          </div>
        </div>
        <div className="w-full py-8 bg-seaform" />
      </div>
      {groupedData?.map((data) => (
        <div key={data?.category}>
          <div className="my-4" />
          <LampiranSurat title={data?.category} data={data?.items} />
        </div>
      ))}
    </div>
  );
};

KematianSebelum30Hari.propTypes = {
  detailData: PropTypes.array,
  groupedData: PropTypes.array,
};

export default KematianSebelum30Hari;
