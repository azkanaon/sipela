import { useState } from "react";
import Logo from "../../assets/LogoIsola.png";
import SidebarMenu from "./SidebarMenu";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { cn } from "../../utils/twMerge";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/Auth";

const SidebarMobile = () => {
  const me = useAuthStore((state) => state.me);
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  return (
    <div
      className={cn(
        ` relative h-screen w-72 bg-ocean text-overpost transition-all duration-300 overscroll-y-auto`,
        !isOpen && "w-0"
      )}
    >
      <div className="absolute -right-8 top-32 cursor-pointer">
        <div
          className="w-8 h-20 bg-ocean rounded-r-xl flex items-center justify-center flex-col"
          onClick={toggleSidebar}
        >
          <p>
            {isOpen ? <IoMdClose size={18} /> : <GiHamburgerMenu size={18} />}{" "}
          </p>
          <p className="text-xs font-bold [writing-mode:vertical-rl] mt-2">
            {!isOpen ? "Menu" : "Tutup"}
          </p>
        </div>
      </div>
      <div className="pl-3 pt-5 flex flex-col justify-between h-full">
        <div>
          {/* Logo */}
          <div
            className={cn(
              "flex items-center pl-2 transition-all duration-300 opacity-100",
              !isOpen && "opacity-0 transition-all duration-300"
            )}
          >
            <img src={Logo} alt="#logo" className="w-24" />
            <h1 className="text-4xl font-bold ml-4">ISOLA Mobile</h1>
          </div>
          {/* Menu */}
          <div
            className={cn(
              "block transition-all duration-300",
              !isOpen && "hidden"
            )}
          >
            <div className="mt-8" />
            <p className="font-semibold tracking-wide">Menu</p>
            <SidebarMenu />
          </div>
        </div>
        {/* Profile and Logout Button */}
        <div className="flex items-center justify-between mb-4 mr-4 overflow-hidden">
          {/* Profile */}
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              className="rounded-full w-8 h-8 mr-2"
            />
            <p className="font-semibold text-sm">
              Admin{" "}
              {me?.role === "kelurahan"
                ? me?.role.charAt(0).toUpperCase() + me?.role.slice(1)
                : me?.role.toUpperCase()}
            </p>
          </div>
          {/* Logout */}
          <div className="flex items-center ">
            <button
              className="font-semibold text-aqua text-sm bg-overpost border border-overpost rounded-md flex items-center p-1"
              onClick={() => logout(navigate)}
            >
              Keluar
              <IoIosLogOut size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMobile;
