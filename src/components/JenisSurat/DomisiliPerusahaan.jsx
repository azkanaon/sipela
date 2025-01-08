import PropTypes from "prop-types";
import LampiranSurat from "../SuratWaris/LampiranSurat";
import { formatDateWithoutDay } from "../../utils/formattedData";

const DomisiliPerusahaan = ({ detailData, groupedData }) => {
  const domisili_perusahaan =
    detailData[0]?.surat_pengantar?.domisili_perusahaan[0];

  return (
    <div>
      <div className="w-full rounded-md overflow-hidden mb-10">
        <h2 className="text-lg font-medium text-aqua bg-seaform py-6 pl-2 md:pl-10 w-full">
          Surat Keterangan Domisili Perusahaan
        </h2>
        <div className="w-full text-aqua">
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Nama
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_perusahaan?.nama}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              NIK
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_perusahaan?.nik}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              No. KK, Tanggal KK
            </p>
            <p className="w-2/3 lg:w-3/4">
              {domisili_perusahaan?.kk}, {domisili_perusahaan?.tanggal_kk}{" "}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Jenis Kelamin
            </p>
            <p className="w-2/3 lg:w-3/4">
              {domisili_perusahaan?.jenis_kelamin}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Tempat, Tanggal Lahir
            </p>
            <p className="w-2/3 lg:w-3/4">
              {domisili_perusahaan?.tempat_lahir},{" "}
              {formatDateWithoutDay(domisili_perusahaan?.tanggal_lahir)}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Agama
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_perusahaan?.agama}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Kewarganegaraan
            </p>
            <p className="w-2/3 lg:w-3/4">
              {domisili_perusahaan?.kewarganegaraan}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Alamat
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_perusahaan?.alamat}</p>
          </div>

          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              No. HP
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_perusahaan?.telp}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Jabatan
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_perusahaan?.jabatan}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              RT / RW
            </p>
            <p className="w-2/3 lg:w-3/4">
              {domisili_perusahaan?.rt} / {domisili_perusahaan?.rw}{" "}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Nama Perusahaan
            </p>
            <p className="w-2/3 lg:w-3/4">
              {domisili_perusahaan?.nama_perusahaan}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Alamat Perusahaan
            </p>
            <p className="w-2/3 lg:w-3/4">
              {domisili_perusahaan?.lokasi_usaha}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Tujuan Pembuatan Surat
            </p>
            <p className="w-2/3 lg:w-3/4">
              {domisili_perusahaan?.tujuan_surat}
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

DomisiliPerusahaan.propTypes = {
  detailData: PropTypes.array,
  groupedData: PropTypes.array,
};

export default DomisiliPerusahaan;
