import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { MdOutlineFileUpload, MdOutlineChangeCircle } from "react-icons/md";
import {
  handleContentClick,
  handleOutsideClick,
  useClosePopupWithEscKey,
} from "../../hooks/useClosePopup";
import { useEffect, useRef, useState } from "react";
import { useDataNews } from "../../store/DataNews";
import toast, { Toaster } from "react-hot-toast";
import { IoIosAlert } from "react-icons/io";

const PopupNews = ({ handleOpen, selectedNews }) => {
  const [title, setTitle] = useState(selectedNews ? selectedNews.judul : "");
  const [description, setDescription] = useState(
    selectedNews ? selectedNews.description : ""
  );
  const [image, setImage] = useState(selectedNews ? selectedNews.gambar : "");
  const [previewImage, setPreviewImage] = useState(
    selectedNews ? `${selectedNews.gambar}` : ""
  );
  const [imageClass, setImageClass] = useState("object-cover");
  const [isFull, setIsFull] = useState(false);
  const fileRef = useRef(null);

  const addNews = useDataNews((state) => state.addNews);
  const updateNews = useDataNews((state) => state.updateNews);

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

      // Jika selectedNews ada, lakukan update
      if (selectedNews) {
        updateNews(selectedNews.id, {
          title,
          description,
          formData,
        });
        toast.success("Berita berhasil diupdate", { duration: 3000 });
      } else {
        // Jika tidak ada, lakukan add
        addNews({ title, description, formData });
        toast.success("Berita baru berhasil ditamabahkaan", { duration: 3000 });
      }
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
      if (title && description && image) {
        setIsFull(true);
      }
    };
    handleFull();
  }, [title, description, image]);

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
            {selectedNews ? "Update" : "Tambah"} Berita
          </h1>

          {/* Form */}
          <form action="" className="flex justify-center">
            {/* input title */}
            <div className="flex flex-col w-11/12  ">
              {/* Gambar */}
              <div className="mb-4">
                <label htmlFor="" className="font-bold text-aqua text-lg mb-2">
                  Gambar
                </label>
                <div
                  className="w-full h-52 flex items-center justify-center rounded-lg  border-2 border-dashed border-warm_grey cursor-pointer overflow-hidden"
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
                    <div className="flex gap-12">
                      <div>
                        <img
                          src={previewImage}
                          alt="Preview"
                          onLoad={handleImageLoad}
                          className={`h-44 w-80 ${imageClass} object-center rounded-lg my-10 border-2 border-aqua`}
                        />
                      </div>
                      <div className="flex justify-center items-center">
                        <p className="text-warm_grey font-bold cursor-pointer flex flex-col items-center">
                          <MdOutlineChangeCircle className="w-8 h-8 " />
                          Ubah Foto
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Display placeholder if no image is selected
                    <div className="flex items-center justify-center flex-col text-warm_grey">
                      <MdOutlineFileUpload className="h-12 w-12" />
                      <p className="font-bold">Upload Foto Disini</p>
                    </div>
                  )}
                </div>
                {selectedNews && (
                  <div className="flex mt-1">
                    <IoIosAlert className="text-red-600 " />
                    <p className="text-xs text-red-600">
                      Tolong upload foto terbaru jika anda melakukan update
                      berita, jika tidak, maka foto sebelumnya akan menghilang
                    </p>
                  </div>
                )}
              </div>
              {/* Judul */}
              <div className="mb-4">
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="font-bold text-aqua text-lg mb-2"
                  >
                    Judul
                  </label>
                  <input
                    type="text"
                    className="input font-semibold focus:outline-none placeholder:font-semibold"
                    placeholder="Ketikkan Judul"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              {/* Deskripsi */}
              <div className="mb-4">
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="font-bold text-aqua text-lg mb-2"
                  >
                    Deskripsi
                  </label>
                  <textarea
                    className="input pt-4 font-semibold focus:outline-none placeholder:font-semibold h-40"
                    placeholder="Ketikkan Deskripsi"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              {/* Button Tambah */}
              <div className="mb-4">
                <button
                  className="btn w-full bg-aqua text-white hover:bg-aqua/70"
                  onClick={handleSubmit}
                  disabled={!isFull}
                >
                  {selectedNews ? "Update" : "Tambah"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

PopupNews.propTypes = {
  // Add your prop types here
  handleOpen: PropTypes.func,
  status: PropTypes.string,
  selectedNews: PropTypes.object,
};

export default PopupNews;
