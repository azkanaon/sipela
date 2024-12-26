import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/Auth";
import { useEffect } from "react";

const PopupLogout = ({ funcConfirmation, title, description, modal }) => {
  const navigate = useNavigate();

  const getMe = useAuthStore((state) => state.getMe);
  useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <div className="">
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
                className="btn bg-red-500 text-overpost border-none"
                onClick={() => funcConfirmation(navigate)}
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

PopupLogout.propTypes = {
  funcConfirmation: PropTypes.func,
  navigate: PropTypes.func,
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  modal: PropTypes.string,
  pesanSukses: PropTypes.string,
};

export default PopupLogout;
