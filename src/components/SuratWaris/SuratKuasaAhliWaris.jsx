import PropTypes from "prop-types";
import { formatDateWithoutDay } from "../../utils/formattedData";

const SuratKuasaAhliWaris = ({ data, flag, anak }) => {
  const dat = data && data[flag];

  return (
    <div className="w-full rounded-md overflow-hidden mb-10">
      <h2 className="text-lg font-medium text-aqua bg-seaform py-6 pl-2 md:pl-10 w-full">
        Rincian Pemberi Waris
      </h2>
      <div className="w-full text-aqua">
        <div className="flex even:bg-white bg-[#D9F2F9] py-2">
          <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
            Nama Almarhum/Almarhumah
          </p>
          <p className="w-2/3 lg:w-3/4">{dat?.nama_almarhum}</p>
        </div>
        <div className="flex even:bg-white bg-[#D9F2F9] py-2">
          <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
            Tanggal Meninggal
          </p>
          <p className="w-2/3 lg:w-3/4">
            {formatDateWithoutDay(dat?.tanggal_meninggal)}
          </p>
        </div>
        <div className="flex even:bg-white bg-[#D9F2F9] py-2">
          <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
            Tempat Meninggal
          </p>
          <p className="w-2/3 lg:w-3/4">{dat?.tempat_meninggal}</p>
        </div>
        <div className="flex even:bg-white bg-[#D9F2F9] py-2">
          <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
            Alamat Terakhir
          </p>
          <p className="w-2/3 lg:w-3/4">{dat?.alamat_terakhir}</p>
        </div>
        <div className="flex even:bg-white bg-[#D9F2F9] py-2">
          <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
            Jumlah Anak
          </p>
          <p className="w-2/3 lg:w-3/4">
            {flag === 1 ? anak : dat?.ahli_waris?.length}
          </p>
        </div>
      </div>
      <div className="w-full py-8 bg-seaform" />
    </div>
  );
};
SuratKuasaAhliWaris.propTypes = {
  data: PropTypes.array,
  flag: PropTypes.number,
  anak: PropTypes.number,
};
export default SuratKuasaAhliWaris;
