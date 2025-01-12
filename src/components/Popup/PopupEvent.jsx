import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { MdOutlineFileUpload, MdOutlineChangeCircle } from "react-icons/md";
import {
  handleContentClick,
  handleOutsideClick,
  useClosePopupWithEscKey,
} from "../../hooks/useClosePopup";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDataEvent } from "../../store/DataEvent";

const PopupEvent = ({ handleOpen }) => {
  const [image, setImage] = useState("");
  const [isFull, setIsFull] = useState(false);
  const [previewImage, setPreviewImage] = useState(false);

  const [imageClass, setImageClass] = useState("object-cover");
  const fileRef = useRef(null);

  const addEvent = useDataEvent((state) => state.addEvent);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();

      // Buat nama file acak
      const randomFileName = `${Date.now()}-${image.name}`;

      // Buat file baru dengan nama acak
      const newFile = new File([image], randomFileName, {
        type: image.type,
      });

      // Tambahkan file baru ke FormData
      formData.append("image", newFile);

      // Jika tidak ada, lakukan add
      addEvent({ formData });
      toast.success("Event baru berhasil ditambahkaan", { duration: 3000 });

      handleOpen();
    }
  };

  // Handle file change to set the preview image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create a local URL for the preview image
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleImageLoad = (event) => {
    const img = event.target;
    if (img.naturalHeight > img.naturalWidth) {
      setImageClass("object-contain");
    } else {
      setImageClass("object-cover");
    }
  };

  useEffect(() => {
    const handleFull = () => {
      if (image) {
        setIsFull(true);
      }
    };
    handleFull();
  }, [image]);

  useClosePopupWithEscKey(handleOpen);
  return (
    <div
      className="fixed inset-0 h-screen w-screen bg-black/70 z-40"
      onClick={() => {
        handleOutsideClick(handleOpen);
      }}
    >
      <Toaster />
      <div className="flex items-center justify-center w-screen h-screen">
        <div
          className="relative w-full lg:w-5/12 rounded-lg bg-overpost"
          onClick={handleContentClick}
        >
          <div className="absolute top-3 right-5 cursor-pointer">
            <div>
              <IoClose
                className="h-6 w-6 transition-all hover:text-red-500"
                onClick={handleOpen}
              />
            </div>
          </div>
          {/* title */}
          <h1 className="text-aqua text-xl text-center font-bold my-4">
            Tambah Event
          </h1>

          {/* Form */}
          <form action="" className="flex justify-center">
            {/* input title */}
            <div className="flex flex-col w-11/12  ">
              {/* Gambar */}
              <div className="mb-4">
                <label
                  htmlFor=""
                  className="font-medium lg:font-bold text-aqua text-base lg:text-lg mb-2"
                >
                  Gambar
                </label>
                <div
                  className="w-full h-32 lg:h-52 flex items-center justify-center rounded-lg  border-2 border-dashed border-warm_grey cursor-pointer overflow-hidden"
                  onClick={() => {
                    fileRef.current.click();
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="input-file"
                    hidden
                    ref={fileRef}
                    onChange={handleImageChange}
                    required
                  />
                  {previewImage ? (
                    <div className="flex gap-4 lg:gap-12">
                      <div>
                        <img
                          src={previewImage}
                          alt="Preview"
                          onLoad={handleImageLoad}
                          className={`h-28 lg:h-44 w-40 lg:w-80 ${imageClass} object-center rounded-lg my-10 border border-aqua/20`}
                        />
                      </div>
                      <div className="flex justify-center items-center">
                        <p className="text-warm_grey font-medium lg:font-bold cursor-pointer flex flex-col items-center ">
                          <MdOutlineChangeCircle className="h-6 w-6  lg:w-8 lg:h-8 " />
                          Ubah Foto
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Display placeholder if no image is selected
                    <div className="flex items-center justify-center flex-col text-warm_grey">
                      <MdOutlineFileUpload className=" h-8 w-8 lg:h-12 lg:w-12" />
                      <p className="font-medium lg:font-bold">
                        Upload Foto Disini
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Button Tambah */}
              <div className="mb-4">
                <button
                  className="py-2 lg:py-3 text-sm lg:text-base rounded-md font-semibold w-full bg-aqua text-white transition-all hover:bg-aqua/70"
                  onClick={handleSubmit}
                  disabled={!isFull}
                >
                  Tambah
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

PopupEvent.propTypes = {
  handleOpen: PropTypes.func,
  status: PropTypes.string,
  selectedNews: PropTypes.object,
};

export default PopupEvent;
