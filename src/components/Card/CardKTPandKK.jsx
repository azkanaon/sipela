import PropTypes from "prop-types";

const CardKTPandKK = ({ setIsOpen, setWidthImage, setImageName, ktp, kk }) => {
  const handleZoomImage = (imageName) => {
    setWidthImage("w-full md:w-[68%]");
    setIsOpen(true);
    setImageName(imageName);
  };
  return (
    <div className="">
      <div className="mt-10">
        <h3 className="font-bold text-2xl text-aqua mb-3">Dokumen Terlampir</h3>
        <div className="w-full lg:w-4/5 bg-aqua md:rounded-xl md:h-64 flex items-center justify-center overflow-hidden pt-4">
          <div className="w-full flex flex-col md:flex-row items-center md:items-baseline md:justify-around">
            <div className="md:my-4">
              <div className="w-56 h-32 absolute bg-black/60 opacity-0 transition-all duration-300 hover:opacity-100 rounded-lg">
                <p
                  className="underline w-full h-full flex justify-center items-center cursor-pointer"
                  onClick={() => handleZoomImage(ktp)}
                >
                  Zoom Gambar
                </p>
              </div>
              <div className="">
                <img
                  src={ktp}
                  className="w-56 h-32 object-center object-cover overflow-hidden rounded-lg"
                  alt=""
                />
                <p className="text-overpost text-center mt-2">Foto KTP</p>
              </div>
            </div>
            <div className="md:my-4 ">
              <div className="w-56 h-32 absolute bg-black/60 opacity-0 transition-all duration-300 hover:opacity-100 rounded-lg">
                <p
                  className="underline w-full h-full flex justify-center items-center cursor-pointer"
                  onClick={() => handleZoomImage(kk)}
                >
                  Zoom Gambar
                </p>
              </div>
              <img
                // FIXME: klo udh ada foto beneran, benerin ini
                src={kk}
                className="w-56 h-32 object-center object-cover overflow-hidden rounded-lg"
                alt=""
              />
              <p className="text-overpost text-center mt-2">Foto KK</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardKTPandKK.propTypes = {
  setIsOpen: PropTypes.func,
  setWidthImage: PropTypes.func,
  setImageName: PropTypes.func,
  kk: PropTypes.string,
  ktp: PropTypes.string,
};

export default CardKTPandKK;
