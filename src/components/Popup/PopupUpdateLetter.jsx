import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const PopupUpdateLetter = ({
  funcConfirmation,
  id,
  title,
  description,
  url,
  modal,
  pesanSukses,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    funcConfirmation(id, "Disetujui");
    toast.success(pesanSukses, { duration: 3000 });
    setTimeout(() => {
      navigate(url);
    }, 1000);
  };

  return (
    <div className="">
      <Toaster />
      <dialog id={`my_modal_${modal}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-aqua text-center">{title}</h3>
          <p className="py-4 text-aqua">{description}</p>
          <div className="modal-action">
            <form
              method="dialog"
              className="flex justify-center items-center w-full gap-12"
            >
              <button
                className="btn bg-aqua text-overpost border-none"
                onClick={handleClick}
              >
                Ya
              </button>
              <button className="btn bg-red-500 text-overpost border-none">
                Tidak
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

PopupUpdateLetter.propTypes = {
  funcConfirmation: PropTypes.func,
  navigate: PropTypes.func,
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  modal: PropTypes.string,
  pesanSukses: PropTypes.string,
};

export default PopupUpdateLetter;
