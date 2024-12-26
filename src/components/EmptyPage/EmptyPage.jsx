import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NotFound from "./NotFound";
import NoAccess from "./NoAccess";

const EmptyPage = () => {
  const [isAccessible, setIsAccessible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unAccessRoutes = [
      "/registrasi-akun",
      "/riwayat-surat",
      "/reset-password",
      "/chat-langsung",
      "/berita",
      "/registrasi-akun/",
      "/riwayat-surat/",
      "/reset-password/",
      "/chat-langsung/",
      "/berita/",
    ];

    const dynamicUnaccessRoute = [
      /^\/registrasi-akun\/\d+$/, // Rute dengan id untuk registrasi akun
    ];

    // Cek apakah path saat ini adalah salah satu rute valid (statis)
    const isUnaccessRoute = unAccessRoutes.includes(location.pathname);

    // Cek apakah path saat ini sesuai dengan salah satu pola rute dinamis
    const isUnacessDynamicRoute = dynamicUnaccessRoute.some((pattern) =>
      pattern.test(location.pathname)
    );

    // Jika rute tidak valid, dianggap halaman 404
    if (!isUnaccessRoute && !isUnacessDynamicRoute) {
      setIsAccessible(true);
      console.log("Halaman tidak ditemukan, ini adalah halaman 404.");
    } else {
      setIsAccessible(false);
    }
  }, [location.pathname]);

  return <>{isAccessible ? <NotFound /> : <NoAccess />}</>;
};

export default EmptyPage;
