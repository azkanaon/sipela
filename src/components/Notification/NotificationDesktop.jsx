import { useEffect } from "react";
import LogoNotif from "../../assets/logoNotif.png";
import { useNotificationStore } from "../../store/Notification";
import { timeAgo } from "../../utils/formattedData";
import { NavLink } from "react-router-dom";

const NotificationDesktop = () => {
  const notif = useNotificationStore((state) => state.notifications);
  const getNotif = useNotificationStore((state) => state.fetchNotifications);

  useEffect(() => {
    getNotif();
  }, [getNotif]);

  return (
    <div className="absolute max-h-96 w-96 lg:right-3 bg-overpost shadow-md border border-aqua/10 rounded-md overflow-y-auto z-50">
      <p className="text-aqua font-semibold bg-seaform pl-3 py-1 text-lg border-b-2 border-ocean/10">
        Notifikasi
      </p>
      {/* notif */}
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
          key={not?.id}
          className="h-1/4 w-full bg-seaform border-b-2 border-ocean/10 cursor-pointer  transition-all duration-300 hover:bg-overpost "
        >
          <NavLink
            to={
              not?.jenis === "Surat" ? "/pengajuan-surat" : "/registrasi-akun"
            }
          >
            <div className="p-3 h-full flex gap-4 ">
              {/* bagian kiri */}
              <div className="avatar flex items-center">
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

export default NotificationDesktop;
