import PropTypes from "prop-types";

const CardIdentityUser = ({
  setIsOpen,
  setWidthImage,
  setImageName,
  detailData,
}) => {
  const handleZoomImage = () => {
    setWidthImage("w-full md:w-1/3");
    setIsOpen(true);
    setImageName(detailData?.foto_selfie);
  };
  return (
    <div>
      <h1 className="text-aqua font-bold ml-4 text-2xl mb-2 lg:hidden ">
        Identitas
      </h1>
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-center md:items-stretch bg-aqua p-3 md:rounded-xl lg:w-4/5">
          <div className="w-24 md:w-36 lg:w-48 rounded-lg overflow-hidden cursor-pointer">
            {/* tombol zoom foto */}
            <div className="absolute w-24 md:w-36 lg:w-48 h-36 md:h-48 lg:h-72 bg-black/60 opacity-0 transition-all duration-300 hover:opacity-100">
              <p
                className="underline w-full h-full flex justify-center items-center
            "
                onClick={handleZoomImage}
              >
                Zoom Gambar
              </p>
            </div>
            {/* foto */}
            <div className="">
              <img
                src={detailData?.foto_selfie}
                alt="foto profile"
                className="w-24 md:w-36 lg:w-48 h-36 md:h-48 lg:h-72  object-cover object-center rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center ml-4 text-sm lg:text-lg mt-3 md:mt-0">
            <p>
              NIK : <span className="font-normal">{detailData?.nik}</span>
            </p>
            <p>
              No KK : <span className="font-normal">{detailData?.no_kk}</span>
            </p>
            <p>
              Nama : <span className="font-normal">{detailData?.nama}</span>
            </p>
            <p>
              RT : <span className="font-normal">{detailData?.rt}</span>
            </p>
            <p>
              RW : <span className="font-normal">{detailData?.rw}</span>
            </p>
            <p>
              No Telp: <span className="font-normal">{detailData?.telp}</span>
            </p>
            <p>
              Email : <span className="font-normal">{detailData?.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

CardIdentityUser.propTypes = {
  setIsOpen: PropTypes.func,
  setWidthImage: PropTypes.func,
  setImageName: PropTypes.func,
  detailData: PropTypes.object,
};

export default CardIdentityUser;
