import { useEffect, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { MdHistory, MdAccountCircle, MdEvent } from "react-icons/md";
import { IoChatboxOutline, IoNotifications } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import {
  FaMailBulk,
  FaKey,
  FaNewspaper,
  FaFileAlt,
  FaRegCompass,
} from "react-icons/fa";
import { cn } from "../../utils/twMerge";
import { useAuthStore } from "../../store/Auth";
import { GrUserAdmin } from "react-icons/gr";
import { useNotificationStore } from "../../store/Notification";

const SidebarMenu = () => {
  const location = useLocation();
  const me = useAuthStore((state) => state.me);
  const countNotif = useNotificationStore((state) => state.countNotif);
  const getCountNotif = useNotificationStore((state) => state.getCountNotif);

  const dropdownMenu = [
    {
      label: "Pengajuan Surat",
      icon: <FaMailBulk size={20} />,
      link: "/pengajuan-surat",
      isRT: true,
      isRW: true,
      isKelurahan: true,
    },
    {
      label: "Nomor Register",
      icon: <FaFileAlt size={20} />,
      link: "/nomor-register",
      isRT: true,
      isRW: true,
      isKelurahan: true,
    },
    {
      label: "Lacak Surat",
      icon: <FaRegCompass size={20} />,
      link: "/lacak-surat",
      isRT: false,
      isRW: false,
      isKelurahan: true,
    },
    {
      label: "Registrasi Akun",
      icon: <MdAccountCircle size={20} />,
      link: "/registrasi-akun",
      isRT: false,
      isRW: false,
      isKelurahan: true,
    },
    {
      label: "Reset Password",
      icon: <FaKey size={20} />,
      link: "/reset-password",
      isRT: false,
      isRW: false,
      isKelurahan: true,
    },
  ];

  const isDropdownActive = dropdownMenu.some(
    (item) => item.link === location.pathname
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(isDropdownActive);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    getCountNotif();
  }, [getCountNotif]);

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
    <div className="ml-3 mt-4 cursor-pointer transition-all ">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-semibold rounded-l-2xl py-3 pl-2 flex items-center ${
            isActive ? "bg-aqua" : "hover:bg-aqua"
          }`
        }
      >
        <IoMdHome size={24} className="mr-2" />
        Dashboard
      </NavLink>

      {/* Dropdown Menu */}
      <div className=" font-semibold rounded-l-2xl my-2">
        <div
          className="flex justify-between hover:bg-aqua hover:rounded-l-xl py-2"
          onClick={toggleDropdown}
        >
          <p className="flex items-center ml-2">
            <CiMail size={24} className="mr-2" />
            Pengajuan
          </p>
          <div className={cn("flex items-center mr-4")}>
            <div
              className={` duration-300 ease-out ${
                isDropdownOpen ? "-rotate-180" : ""
              }`}
            >
              <IoIosArrowDown size={20} />
            </div>
          </div>
        </div>

        {/* Isi Dropdown */}
        {
          <div
            className={`transform origin-top overflow-hidden transition-transform duration-300 ease-in-out ${
              isDropdownOpen ? "h-fit scale-y-100" : "h-0 scale-y-0"
            }`}
          >
            {dropdownMenu.map((item, index) => (
              <NavLink
                to={item.link}
                key={index}
                className={({ isActive }) =>
                  `flex my-2 ml-2 py-1  pl-1 rounded-l-xl ${
                    isActive ? "bg-aqua" : "hover:bg-aqua"
                  } ${me?.role === "rt" && !item.isRT && "hidden"} ${
                    me?.role === "kelurahan" && !item.isKelurahan && "hidden"
                  } ${me?.role === "rw" && !item.isRW && "hidden"}`
                }
              >
                <p className="text-md py-1 flex pl-4 items-center">
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </p>
              </NavLink>
            ))}
          </div>
        }
      </div>

      {/* Menu Lain */}
      {me?.role === "kelurahan" && (
        <>
          <NavLink
            to="/berita"
            className={({ isActive }) =>
              `font-semibold rounded-l-2xl py-3 pl-2 flex items-center ${
                isActive ? "bg-aqua" : "hover:bg-aqua"
              }`
            }
          >
            <FaNewspaper size={24} className="mr-2" />
            Berita
          </NavLink>

          <NavLink
            to="/event"
            className={({ isActive }) =>
              `font-semibold rounded-l-2xl py-3 pl-2 flex items-center ${
                isActive ? "bg-aqua" : "hover:bg-aqua"
              }`
            }
          >
            <MdEvent size={24} className="mr-2" />
            Event
          </NavLink>

          <NavLink
            to="/riwayat-surat"
            className={({ isActive }) =>
              `font-semibold rounded-l-2xl py-3 pl-2 flex items-center ${
                isActive ? "bg-aqua" : "hover:bg-aqua"
              }`
            }
          >
            <MdHistory size={24} className="mr-2" />
            Riwayat
          </NavLink>

          <NavLink
            to="/chat-langsung"
            className={({ isActive }) =>
              `font-semibold rounded-l-2xl py-3 mt-2 pl-2 flex items-center ${
                isActive ? "bg-aqua" : "hover:bg-aqua"
              }`
            }
          >
            <IoChatboxOutline size={24} className="mr-2" />
            Live Chat
          </NavLink>

          <NavLink
            to="/admin-rt-rw"
            className={({ isActive }) =>
              `font-semibold rounded-l-2xl py-3 mt-2 pl-2 flex items-center ${
                isActive ? "bg-aqua" : "hover:bg-aqua"
              }`
            }
          >
            <GrUserAdmin size={24} className="mr-2" />
            Akun RT RW
          </NavLink>
        </>
      )}

      <NavLink
        to="/notifikasi"
        className={({ isActive }) =>
          `md:hidden font-semibold rounded-l-2xl py-3 mt-2 pl-2 flex items-center relative  ${
            isActive ? "bg-aqua" : "hover:bg-aqua"
          }`
        }
      >
        <span
          className={`absolute top-2 left-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs ${
            totalNotif === 0 ? "hidden" : ""
          }`}
        >
          {totalNotif}
        </span>
        <IoNotifications size={24} className="mr-2" />
        Notifikasi
      </NavLink>
    </div>
  );
};

export default SidebarMenu;
