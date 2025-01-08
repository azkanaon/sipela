import PropTypes from "prop-types";
import LampiranSurat from "../SuratWaris/LampiranSurat";
import { formatDateWithoutDay } from "../../utils/formattedData";

const TidakMampuBerobat = ({ detailData, groupedData }) => {
  const tidak_mampu_berobat =
    detailData[0]?.surat_pengantar?.tidak_mampu_berobat[0];

  return (
    <div>
      <div className="w-full rounded-md overflow-hidden mb-10">
        <h2 className="text-lg font-medium text-aqua bg-seaform py-6 pl-2 md:pl-10 w-full">
          Surat Keterangan Tidak Mampu Berobat
        </h2>
        <div className="w-full text-aqua">
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Nama
            </p>
            <p className="w-2/3 lg:w-3/4">{tidak_mampu_berobat?.nama}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              NIK
            </p>
            <p className="w-2/3 lg:w-3/4">{tidak_mampu_berobat?.nik}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              No. KK, Tanggal KK
            </p>
            <p className="w-2/3 lg:w-3/4">
              {tidak_mampu_berobat?.kk},{" "}
              {formatDateWithoutDay(tidak_mampu_berobat?.tanggal_kk)},
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Jenis Kelamin
            </p>
            <p className="w-2/3 lg:w-3/4">
              {tidak_mampu_berobat?.jenis_kelamin}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Kewarganegaraan
            </p>
            <p className="w-2/3 lg:w-3/4">
              {tidak_mampu_berobat?.kewarganegaraan}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Status Kawin
            </p>
            <p className="w-2/3 lg:w-3/4">
              {tidak_mampu_berobat?.status_kawin}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Pekerjaan
            </p>
            <p className="w-2/3 lg:w-3/4">{tidak_mampu_berobat?.pekerjaan}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Agama
            </p>
            <p className="w-2/3 lg:w-3/4">{tidak_mampu_berobat?.agama}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Alamat
            </p>
            <p className="w-2/3 lg:w-3/4">{tidak_mampu_berobat?.alamat}</p>
          </div>

          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              RT / RW
            </p>
            <p className="w-2/3 lg:w-3/4">
              {tidak_mampu_berobat?.rt} / {tidak_mampu_berobat?.rw}{" "}
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

TidakMampuBerobat.propTypes = {
  detailData: PropTypes.array,
  groupedData: PropTypes.array,
};

export default TidakMampuBerobat;
