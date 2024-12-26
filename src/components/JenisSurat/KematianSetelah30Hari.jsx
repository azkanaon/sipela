import PropTypes from "prop-types";
import LampiranSurat from "../SuratWaris/LampiranSurat";
import { formatDate, formatDateWithoutDay } from "../../utils/formattedData";

const KematianSetelah30Hari = ({ detailData, groupedData }) => {
  const mati_lebih_30hari = detailData[0]?.surat_pengantar.mati_lebih_30hari[0];
  console.log(mati_lebih_30hari);

  return (
    <div>
      <div className="w-full rounded-md overflow-hidden mb-10">
        <h2 className="text-lg font-medium text-aqua bg-seaform py-6 pl-2 md:pl-10 w-full">
          Surat Kematian Setelah 30 Hari
        </h2>
        <div className="w-full text-aqua">
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Nama
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_lebih_30hari?.nama}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              No. KTP
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_lebih_30hari?.nik}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              No. Kartu Keluarga
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_lebih_30hari?.kk}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Jenis Kelamin
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_lebih_30hari?.jenis_kelamin}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Tempat/Tanggal Lahir
            </p>
            <p className="w-2/3 lg:w-3/4">
              {mati_lebih_30hari?.tempat_lahir} /{" "}
              {formatDateWithoutDay(mati_lebih_30hari?.tanggal_lahir)}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Kewarganegaraan
            </p>
            <p className="w-2/3 lg:w-3/4">
              {mati_lebih_30hari?.kewarganegaraan}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Status Perkawinan
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_lebih_30hari?.status_kawin}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Pekerjaan
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_lebih_30hari?.pekerjaan}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Agama
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_lebih_30hari?.agama}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Alamat
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_lebih_30hari?.alamat}</p>
          </div>
          <h2 className="even:bg-white bg-[#D9F2F9] py-2 font-bold pl-4">
            Telah meninggal dunia pada:
          </h2>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Hari, Tanggal
            </p>
            <p className="w-2/3 lg:w-3/4">
              {formatDate(mati_lebih_30hari?.tanggal_meninggal)}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Jam
            </p>
            <p className="w-2/3 lg:w-3/4">
              {mati_lebih_30hari?.waktu_meninggal}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Bertempat di
            </p>
            <p className="w-2/3 lg:w-3/4">
              {mati_lebih_30hari?.tempat_meninggal}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Dimakamkan di
            </p>
            <p className="w-2/3 lg:w-3/4">
              {mati_lebih_30hari?.tempat_dimakamkan}
            </p>
          </div>

          <h2 className="even:bg-white bg-[#D9F2F9] py-2 font-bold pl-4">
            Data Pelapor:
          </h2>

          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Nama Pelapor
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_lebih_30hari?.nama_pelapor}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              No. KTP Pelapor
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_lebih_30hari?.nik_pelapor}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              No. Kartu Keluarga Pelapor
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_lebih_30hari?.kk_pelapor}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Jenis Kelamin Pelapor
            </p>
            <p className="w-2/3 lg:w-3/4">
              {mati_lebih_30hari?.jenis_kelamin_pelapor}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Tempat/Tanggal Lahir Pelapor
            </p>
            <p className="w-2/3 lg:w-3/4">
              {mati_lebih_30hari?.tempat_lahir} /{" "}
              {formatDateWithoutDay(mati_lebih_30hari?.tanggal_lahir_pelapor)}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Status Perkawinan Pelapor
            </p>
            <p className="w-2/3 lg:w-3/4">
              {mati_lebih_30hari?.status_kawin_pelapor}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Pekerjaan Pelapor
            </p>
            <p className="w-2/3 lg:w-3/4">
              {mati_lebih_30hari?.pekerjaan_pelapor}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Agama Pelapor
            </p>
            <p className="w-2/3 lg:w-3/4">{mati_lebih_30hari?.agama_pelapor}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Alamat Pelapor
            </p>
            <p className="w-2/3 lg:w-3/4">
              {mati_lebih_30hari?.alamat_pelapor}
            </p>
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

KematianSetelah30Hari.propTypes = {
  detailData: PropTypes.array,
  groupedData: PropTypes.array,
};

export default KematianSetelah30Hari;
