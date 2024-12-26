import PropTypes from "prop-types";
import { formatDateWithoutDay } from "../../utils/formattedData?";

const SuratPengantar = ({ data }) => {
  return (
    <div className="w-full rounded-md overflow-hidden mb-10 ">
      <h2 className="text-lg font-medium text-aqua bg-seaform py-6 pl-2 md:pl-10 w-full">
        Rincian Surat Pengantar
      </h2>
      <div className="w-full">
        {/* Keterangan */}
        <div className="flex bg-white even:bg-[#D9F2F9] py-2">
          <p className="font-medium ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4">
            Nama
          </p>
          <p className="w-2/3 lg:w-3/4">{data?.nama_lengkap}</p>
        </div>
        <div className="flex bg-white even:bg-[#D9F2F9] py-2">
          <p className="font-medium ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4">
            No KTP
          </p>
          <p className="w-2/3 lg:w-3/4">{data?.nik}</p>
        </div>
        <div className="flex bg-white even:bg-[#D9F2F9] py-2">
          <p className="font-medium ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4">
            Jenis Kelamin
          </p>
          <p className="w-2/3 lg:w-3/4">{data?.jenis_kelamin}</p>
        </div>
        <div className="flex bg-white even:bg-[#D9F2F9] py-2">
          <p className="font-medium ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4">
            Tempat, Tanggal Lahir
          </p>
          <p className="w-2/3 lg:w-3/4">
            {data?.tempat_lahir}, {formatDateWithoutDay(data?.tanggal_lahir)}
          </p>
        </div>
        <div className="flex bg-white even:bg-[#D9F2F9] py-2">
          <p className="font-medium ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4">
            Pekerjaan
          </p>
          <p className="w-2/3 lg:w-3/4">{data?.pekerjaan}</p>
        </div>
        <div className="flex bg-white even:bg-[#D9F2F9] py-2">
          <p className="font-medium ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4">
            Alamat
          </p>
          <p className="w-2/3 lg:w-3/4">{data?.alamat}</p>
        </div>
        <div className="flex bg-white even:bg-[#D9F2F9] py-2">
          <p className="font-medium ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4">RT</p>
          <p className="w-2/3 lg:w-3/4">{data?.rt}</p>
        </div>
        <div className="flex bg-white even:bg-[#D9F2F9] py-2">
          <p className="font-medium ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 ">RW</p>
          <p className="w-2/3 lg:w-3/4">{data?.rw}</p>
        </div>
        <div className="flex bg-white even:bg-[#D9F2F9] py-2">
          <p className="font-medium ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 ">
            Maksud Keperluan
          </p>
          <p className="w-2/3 lg:w-3/4">{data?.maksud_keperluan}</p>
        </div>
      </div>
      <div className="w-full py-8 bg-seaform" />
    </div>
  );
};

SuratPengantar.propTypes = {
  data: PropTypes.object,
};

export default SuratPengantar;
