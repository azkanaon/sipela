import PropTypes from "prop-types";
import { useState } from "react";
import PopupImage from "../Popup/PopupImage";

const LampiranSurat = ({ data, title }) => {
  const [imageClass, setImageClass] = useState("h-96");
  const [isOpen, setIsOpen] = useState(false);
  const [imageName, setImageName] = useState(""); // Tambahkan state untuk imageName

  const handleImageLoad = (event) => {
    const img = event.target;
    if (img.naturalHeight < img.naturalWidth) {
      setImageClass("h-52");
    } else {
      setImageClass("h-96");
    }
  };

  const handleImageClick = (filePath) => {
    setImageName(filePath); // Set imageName dengan filePath
    setIsOpen(true); // Buka popup
  };
  return (
    <div>
      {isOpen && (
        <PopupImage
          setIsOpen={setIsOpen}
          widthImage={"w-full md:w-1/3"}
          imageName={imageName} // Pass imageName ke PopupImage
        />
      )}
      <div className="w-full rounded-md overflow-hidden mb-10">
        <h2 className="text-lg font-medium text-aqua bg-seaform py-6 pl-2 md:pl-10 w-full">
          Lampiran {title}
        </h2>
        <div className="flex flex-wrap lg:flex-nowrap justify-center border-l-2 border-r-2 gap-4 py-3 ">
          {data?.map((dat) => (
            <div
              className="w-full md:w-[48%] flex flex-col items-center"
              key={dat?.id}
            >
              <p className="mb-2 text-sm md:text-base text-center font-medium text-aqua lg:h-14 flex items-center">
                {dat?.nama}
              </p>
              {dat?.file_path.toLowerCase().endsWith(".pdf") ? (
                <a
                  href={dat.file_path}
                  className="underline font-medium bg-seaform p-2 rounded-md"
                  id="pdfLink"
                  target="_blank"
                >
                  {dat.file_path}
                </a>
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => handleImageClick(dat.file_path)}
                >
                  <div
                    className={`absolute w-80 ${imageClass} opacity-0 transition-all hover:opacity-100 hover:bg-black/50`}
                  >
                    <p className="h-full flex items-center justify-center">
                      Zoom Foto
                    </p>
                  </div>
                  <img
                    onLoad={handleImageLoad}
                    src={dat.file_path}
                    alt={"Image"} // Tambahkan alt yang lebih deskriptif
                    className={`w-80 ${imageClass} object-cover object-center border-2 border-dotted border-aqua`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full py-8 bg-seaform" />
    </div>
  );
};

LampiranSurat.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
};

export default LampiranSurat;
