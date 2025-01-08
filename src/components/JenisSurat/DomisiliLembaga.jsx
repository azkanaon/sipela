import PropTypes from "prop-types";
import LampiranSurat from "../SuratWaris/LampiranSurat";
import { formatDateWithoutDay } from "../../utils/formattedData";

const DomisiliLembaga = ({ detailData, groupedData }) => {
  const domisili_lembaga = detailData[0]?.surat_pengantar?.domisili_lembaga[0];

  return (
    <div>
      <div className="w-full rounded-md overflow-hidden mb-10">
        <h2 className="text-lg font-medium text-aqua bg-seaform py-6 pl-2 md:pl-10 w-full">
          Surat Keterangan Domisili Lembaga
        </h2>
        <div className="w-full text-aqua">
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Nama
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_lembaga?.nama}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              NIK
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_lembaga?.nik}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              No. KK
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_lembaga?.kk}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              No. NPWP
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_lembaga?.npwp}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Agama
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_lembaga?.agama}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Alamat Domisili
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_lembaga?.alamat}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Jenis Kelamin
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_lembaga?.jenis_kelamin}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Tempat/Tanggal Lahir
            </p>
            <p className="w-2/3 lg:w-3/4">
              {domisili_lembaga?.tempat_lahir} /{" "}
              {formatDateWithoutDay(domisili_lembaga?.tanggal_lahir)}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Kewarganegaraan
            </p>
            <p className="w-2/3 lg:w-3/4">
              {domisili_lembaga?.kewarganegaraan}
            </p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Status Kawin
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_lembaga?.status_kawin}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Pekerjaan
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_lembaga?.pekerjaan}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Jabatan
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_lembaga?.jabatan}</p>
          </div>
          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              RT / RW
            </p>
            <p className="w-2/3 lg:w-3/4">
              {domisili_lembaga?.rt} / {domisili_lembaga?.rw}{" "}
            </p>
          </div>

          <div className="flex even:bg-white bg-[#D9F2F9] py-2">
            <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
              Tujuan Pembuatan Surat
            </p>
            <p className="w-2/3 lg:w-3/4">{domisili_lembaga?.tujuan_surat}</p>
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

DomisiliLembaga.propTypes = {
  detailData: PropTypes.array,
  groupedData: PropTypes.array,
};

export default DomisiliLembaga;
