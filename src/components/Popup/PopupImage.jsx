import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import {
  handleContentClick,
  handleOutsideClick,
  useClosePopupWithEscKey,
} from "../../hooks/useClosePopup";

const PopupImage = ({ setIsOpen, widthImage, imageName }) => {
  useClosePopupWithEscKey(setIsOpen);

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black/70 z-40"
      onClick={() => {
        handleOutsideClick(setIsOpen);
      }} // Menutup popup ketika mengklik luar gambar
    >
      {/* Close Button */}
      <div className="absolute top-4 right-4 cursor-pointer z-50">
        <button
          onClick={() => setIsOpen(false)} // Menutup popup ketika tombol close diklik
          className="text-white hover:text-glacier_blue/40"
        >
          <IoMdClose size={32} />
        </button>
      </div>

      <div className="flex justify-center items-center h-full">
        <div
          className={`bg-white ${widthImage} flex justify-center items-center relative`}
          onClick={handleContentClick} // Mencegah penutupan popup saat gambar diklik
        >
          <img src={imageName} alt="popup" />
        </div>
      </div>
    </div>
  );
};

PopupImage.propTypes = {
  setIsOpen: PropTypes.func,
  widthImage: PropTypes.string,
  imageName: PropTypes.string,
};

export default PopupImage;
