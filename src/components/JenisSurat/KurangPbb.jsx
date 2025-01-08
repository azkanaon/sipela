import PropTypes from "prop-types";
import LampiranSurat from "../SuratWaris/LampiranSurat";
import { formatDateWithoutDay } from "../../utils/formattedData";

const KurangPbb = ({ detailData, groupedData }) => {
  const kurang_pbb = detailData[0]?.surat_pengantar?.kurang_pbb[0];

  return (
    <div>
      <div className="w-full rounded-md overflow-hidden mb-10">
        <h2 className="text-lg font-medium text-aqua bg-seaform py-6 pl-2 md:pl-10 w-full">
          Surat Keterangan Pengurangan PBB
        </h2>
        <div className="w-full text-aqua">
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Nama
            </p>
            <p className="w-2/3 lg:w-3/4">{kurang_pbb?.nama}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              NIK
            </p>
            <p className="w-2/3 lg:w-3/4">{kurang_pbb?.nik}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              NOP
            </p>
            <p className="w-2/3 lg:w-3/4">{kurang_pbb?.nop}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              No. KK, Tanggal KK
            </p>
            <p className="w-2/3 lg:w-3/4">
              {kurang_pbb?.kk}, {kurang_pbb?.tanggal_kk}{" "}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Tempat, Tanggal Lahir
            </p>
            <p className="w-2/3 lg:w-3/4">
              {kurang_pbb?.tempat_lahir},{" "}
              {formatDateWithoutDay(kurang_pbb?.tanggal_lahir)}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Kewarganegaraan
            </p>
            <p className="w-2/3 lg:w-3/4">{kurang_pbb?.kewarganegaraan}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Status Kawin
            </p>
            <p className="w-2/3 lg:w-3/4">{kurang_pbb?.status_kawin}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Pekerjaan
            </p>
            <p className="w-2/3 lg:w-3/4">{kurang_pbb?.pekerjaan}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Agama
            </p>
            <p className="w-2/3 lg:w-3/4">{kurang_pbb?.agama}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Alamat
            </p>
            <p className="w-2/3 lg:w-3/4">{kurang_pbb?.alamat}</p>
          </div>

          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              RT / RW
            </p>
            <p className="w-2/3 lg:w-3/4">
              {kurang_pbb?.rt} / {kurang_pbb?.rw}{" "}
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

KurangPbb.propTypes = {
  detailData: PropTypes.array,
  groupedData: PropTypes.array,
};

export default KurangPbb;
