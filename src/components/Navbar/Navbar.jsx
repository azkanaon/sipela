import { useEffect, useState } from "react";
import {
  IoIosLogOut,
  IoMdNotifications,
  IoIosNotificationsOutline,
} from "react-icons/io";
import NotificationDesktop from "../Notification/NotificationDesktop";
import { useAuthStore } from "../../store/Auth";
import PopupLogout from "../Popup/PopupLogout";
import { useNotificationStore } from "../../store/Notification";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const me = useAuthStore((state) => state.me);
  const countNotif = useNotificationStore((state) => state.countNotif);
  const getCountNotif = useNotificationStore((state) => state.getCountNotif);

  const handleLogout = () => {
    document.getElementById("my_modal_1").showModal();
  };

  useEffect(() => {
    getCountNotif();
  }, [getCountNotif, isOpen]);

  const totalNotif = countNotif?.reduce((total, item) => {
    if (me?.role === "kelurahan") {
      return total + item.count_kelurahan;
    } else if (me?.role === "rw") {
      return total + item.count_rw;
    } else if (me?.role === "rt") {
      return total + item.count_rt;
    }
    return total; // Jika role tidak cocok, tetapkan total saat ini
  }, 0);

  return (
    <div className="w-full h-16 flex justify-end text-overpost shadow-xl pr-12 ">
      <PopupLogout
        funcConfirmation={logout}
        title={"Keluar"}
        description={"Apakah anda yakin ingin keluar?"}
        modal={"1"}
      />
      {/* please make profile info in navbar with button logout */}
      <div className="flex gap-2 py-3 items-center">
        {/* notification */}
        <div className="flex items-center pr-8">
          <div
            className=" text-aqua  relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            {!isOpen ? (
              <div className="w-9 h-9 flex items-center justify-center hover:bg-ocean/70 cursor-pointer rounded-full duration-300 transition-all">
                <IoMdNotifications size={24} className="w-7 h-7 " />
                <span
                  className={`absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs ${
                    totalNotif === 0 ? "hidden" : ""
                  }`}
                >
                  {totalNotif}
                </span>
              </div>
            ) : (
              <div className="">
                <div className="w-9 h-9 flex items-center justify-center hover:bg-ocean/70 cursor-pointer rounded-full duration-300 transition-all">
                  <IoIosNotificationsOutline className="w-7 h-7 " />
                </div>
                <NotificationDesktop />
              </div>
            )}
          </div>
        </div>

        {/* Profile admin */}
        <div className="flex items-center pr-8">
          <img
            src="https://www.puskomedia.id/wp-content/uploads/2016/08/gedung-isola-upi-220830_1024x675.jpg"
            alt="Isola Logo"
            className="w-10 h-10 rounded-full border-2 border-aqua"
          />
          <p className="text-aqua font-semibold ml-2">
            Admin{" "}
            {me?.role === "kelurahan"
              ? me?.role.charAt(0).toUpperCase() + me?.role.slice(1)
              : me?.role.toUpperCase()}
          </p>
        </div>

        {/* Logout button */}
        <button
          className="flex items-center h-8 px-3  rounded-md text-overpost font-semibold bg-ocean hover:bg-aqua hover:scale-105 transition-all"
          onClick={handleLogout}
        >
          Keluar
          <IoIosLogOut size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
