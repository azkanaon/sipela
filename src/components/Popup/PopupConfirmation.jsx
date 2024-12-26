import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";

const PopupConfirmation = ({
  funcConfirmation,
  id,
  title,
  description,
  modal,
  toastMessage,
}) => {
  const handleSubmit = (id_news) => {
    funcConfirmation(id_news);
    toast.success(toastMessage, { duration: 3000 });
  };

  return (
    <div className="">
      <Toaster />
      <dialog id={modal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-aqua text-center">{title}</h3>
          <p className="py-4">{description}</p>
          <div className="modal-action">
            <form
              method="dialog"
              className="flex justify-center items-center w-full gap-12"
            >
              <button
                className="btn bg-red-500 text-overpost border-none"
                onClick={() => handleSubmit(id)}
              >
                Ya
              </button>
              <button className="btn bg-wave text-overpost border-none">
                Tidak
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

PopupConfirmation.propTypes = {
  funcConfirmation: PropTypes.func,
  id: PropTypes.any,
  title: PropTypes.string,
  description: PropTypes.string,
  modal: PropTypes.string,
  toastMessage: PropTypes.string,
};

export default PopupConfirmation;
