import { useState } from "react";
import Logo from "../../assets/LogoIsola.png";
import SidebarMenu from "./SidebarMenu";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { cn } from "../../utils/twMerge";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cn(
        `sticky top-0 h-screen w-72 bg-ocean text-overpost transition-all duration-300 overflow-y-auto overflow-x-hidden`,
        !isOpen && "w-8"
      )}
    >
      {/* START BUTTON OPEN CLOSE SIDEBAR */}
      <div className="bg-red-600">
        <div
          className={cn(
            `fixed top-20 cursor-pointer transition-all duration-300`,
            isOpen ? "left-[260px]" : "left-2"
          )}
        >
          <div
            className="w-12 h-12 bg-aqua rounded-full flex items-center justify-center"
            onClick={toggleSidebar}
          >
            {isOpen ? <IoMdClose size={24} /> : <GiHamburgerMenu size={20} />}
          </div>
        </div>
      </div>
      {/* END BUTTON OPEN CLOSE SIDEBAR */}
      <div className="pl-3 pt-5">
        {/* Logo */}
        <div
          className={cn(
            "flex items-center pl-2 transition-all duration-300 opacity-100",
            !isOpen && "opacity-0 transition-all duration-300"
          )}
        >
          <img src={Logo} alt="#logo" className="w-24" />
          <h1 className="text-4xl font-bold ml-4">ISOLA</h1>
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
    </div>
  );
};

export default Sidebar;
