import { IoNotifications } from "react-icons/io5";
import LogoNotif from "../../assets/logoNotif.png";
import { useNotificationStore } from "../../store/Notification";
import { useEffect } from "react";
import { timeAgo } from "../../utils/formattedData";
import { NavLink } from "react-router-dom";

const NotificationMobile = () => {
  const notif = useNotificationStore((state) => state.notifications);
  const getNotif = useNotificationStore((state) => state.fetchNotifications);

  useEffect(() => {
    getNotif();
  }, [getNotif]);

  return (
    <div className="md:hidden overflow-hidden text-aqua pt-5">
      <div className="text-2xl font-bold border-b-2 border-ocean/10  pl-5 pb-2">
        <h1 className="flex items-center">
          <span className="mr-2">
            <IoNotifications />
          </span>
          Notifikasi
        </h1>
      </div>
      {notif.length === 0 && (
        <div className="h-1/4 w-full  border-b-2 border-ocean/10 cursor-pointer  transition-all duration-300 hover:bg-overpost ">
          <div className="p-3 h-full flex gap-4 ">
            <div className="flex flex-col text-center w-full">
              <p className="text-slate-400 font-medium ">
                Tidak ada notifikasi
              </p>
            </div>
          </div>
        </div>
      )}
      {notif.map((not) => (
        <div
          className="w-screen bg-seaform border-b-2 border-ocean/10 cursor-pointer transition-all duration-300 hover:bg-overpost "
          key={not?.id}
        >
          <NavLink
            to={
              not?.jenis === "Surat" ? "/pengajuan-surat" : "/registrasi-akun"
            }
          >
            <div className="p-3 flex gap-4 ">
              {/* bagian kiri */}
              <div className="avatar static flex items-center">
                <div className="w-12 h-12">
                  <img className="w-full h-full" src={LogoNotif} />
                </div>
              </div>
              {/* isi notif */}
              <div className="flex flex-col ">
                <p className="text-aqua font-semibold">
                  {not?.jenis === "Surat"
                    ? "Pengajuan Surat Keterangan"
                    : "Pengajuan Akun Baru"}
                </p>
                <p className="text-aqua text-sm">{not?.deskripsi}</p>
                <p className="text-xs text-aqua/70 mt-2">
                  {timeAgo(not?.tanggal)}
                </p>
              </div>
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default NotificationMobile;
