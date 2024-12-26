import PropTypes from "prop-types";

const SuratPernyataanBersama = ({
  namaSurat,
  label,
  pembuatPernyataan,
  data,
}) => {
  return (
    <div className="w-full rounded-md overflow-hidden mb-10">
      <h2 className="text-lg font-medium text-aqua bg-seaform py-6 pl-2 md:pl-10 w-full">
        Surat Pernyataan Bersama Para Ahli Waris
      </h2>
      <div className="w-full text-aqua">
        <div className="flex even:bg-white bg-[#D9F2F9] py-2">
          <p className=" ml-1 md:ml-4 lg:ml-6 w-full font-medium">
            {namaSurat}
          </p>
        </div>
        <div className="flex even:bg-white bg-[#D9F2F9] py-2">
          <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
            {label}
          </p>
          <p className="w-2/3 lg:w-3/4">{data?.length}</p>
        </div>
        {data &&
          data.length > 0 &&
          data.map((dat, index) => (
            <div key={index}>
              <div className="flex even:bg-white bg-[#D9F2F9] py-2">
                <p className=" ml-1 md:ml-4 lg:ml-6 w-full font-semibold">
                  {pembuatPernyataan} ke-{index + 1}
                </p>
              </div>
              <div className="flex even:bg-white bg-[#D9F2F9] py-2">
                <p className=" ml-1 md:ml-4 lg:ml-6 w-1/3 lg:w-1/4 font-medium ">
                  Nama
                </p>
                <p className="w-2/3 lg:w-3/4">{dat.nama}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

SuratPernyataanBersama.propTypes = {
  namaSurat: PropTypes.string,
  pembuatPernyataan: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.array,
};

export default SuratPernyataanBersama;
