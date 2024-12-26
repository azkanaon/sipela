import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Sidebar from "./components/Sidebar/Sidebar";
import SidebarMobile from "./components/Sidebar/SidebarMobile";
import Navbar from "./components/Navbar/Navbar";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LetterHistory from "./pages/LetterHistory";
import NotificationMobile from "./components/Notification/NotificationMobile";
import LiveChat from "./pages/LiveChat";
import News from "./pages/News/News";
import AccountRequest from "./pages/AccountRequest/AccountRequest";
import DetailRequestAccount from "./pages/AccountRequest/DetailRequestAccount";
import DetailLetterRequest from "./pages/LetterRequest/DetailLetterRequest";
import LetterRequest from "./pages/LetterRequest/LetterRequest";
import RegisterNumber from "./pages/RegisterNumber";
import RegisterNumberDetail from "./pages/RegisterNumberDetail";
import { useAuthStore } from "./store/Auth";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./components/ProtectedRoute/PublicRoute";
import EmptyPage from "./components/EmptyPage/EmptyPage";
import Event from "./pages/Event";
import AdminRTRW from "./pages/AdminRTRW";
import TrackingLetterRequest from "./pages/LetterRequest/TrackingLetterRequest";

const App = () => {
  console.log(import.meta.env.VITE_API_URL);

  const getMe = useAuthStore((state) => state.getMe);
  const me = useAuthStore((state) => state.me);
  const location = useLocation();
  const [is404, setIs404] = useState(false); // State untuk cek halaman 404

  useEffect(() => {
    // Daftar rute yang valid (tanpa rute dinamis)
    const staticRoutes = [
      "/",
      "/login_admin",
      "/registrasi-akun",
      "/pengajuan-surat",
      "/riwayat-surat",
      "/reset-password",
      "/notifikasi",
      "/chat-langsung",
      "/nomor-register",
      "/berita",
      "/lacak-surat",
      "/login_admin/",
      "/registrasi-akun/",
      "/pengajuan-surat/",
      "/riwayat-surat/",
      "/reset-password/",
      "/notifikasi/",
      "/chat-langsung/",
      "/nomor-register/",
      "/berita/",
      "/event",
      "/event/",
      "/admin-rt-rw",
      "/admin-rt-rw/",
      "/lacak-surat/",
    ];

    // Daftar rute dinamis dengan pola regex
    const dynamicRoutePatterns = [
      /^\/nomor-register\/\d+$/, // Rute dengan id untuk nomor register
      /^\/registrasi-akun\/\d+$/, // Rute dengan id untuk registrasi akun
      /^\/pengajuan-surat\/\d+$/, // Rute dengan id untuk pengajuan surat
    ];

    // Cek apakah path saat ini adalah salah satu rute valid (statis)
    const isValidStaticRoute = staticRoutes.includes(location.pathname);

    // Cek apakah path saat ini sesuai dengan salah satu pola rute dinamis
    const isValidDynamicRoute = dynamicRoutePatterns.some((pattern) =>
      pattern.test(location.pathname)
    );

    // Jika rute tidak valid, dianggap halaman 404
    if (!isValidStaticRoute && !isValidDynamicRoute) {
      setIs404(true);
      console.log("Halaman tidak ditemukan, ini adalah halaman 404.");
    } else {
      setIs404(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    getMe();
  }, [getMe]);

  const isLoginPage = location.pathname === "/login_admin";

  return (
    <div className="flex relative bg-overpost">
      {/* Render Sidebar hanya jika bukan halaman login atau 404 */}
      <div className="hidden lg:flex">
        {!isLoginPage && !is404 && <Sidebar />}
      </div>
      {/* Sidebar Mobile */}
      <div className="flex fixed lg:hidden">
        {!isLoginPage && !is404 && <SidebarMobile />}
      </div>

      {/* Konten */}
      <div className={`md:flex-1 transition-all duration-300`}>
        <div className="hidden md:flex">
          {!isLoginPage && !is404 && <Navbar />}
        </div>
        <Routes>
          {/* Rute Login dibungkus dengan PublicRoute */}
          <Route
            path="/login_admin"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifikasi"
            element={
              <ProtectedRoute>
                <NotificationMobile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pengajuan-surat"
            element={
              <ProtectedRoute>
                <LetterRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pengajuan-surat/:id"
            element={
              <ProtectedRoute>
                <DetailLetterRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomor-register"
            element={
              <ProtectedRoute>
                <RegisterNumber />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nomor-register/:id"
            element={
              <ProtectedRoute>
                <RegisterNumberDetail />
              </ProtectedRoute>
            }
          />
          {me?.role === "kelurahan" && (
            <>
              <Route
                path="/registrasi-akun"
                element={
                  <ProtectedRoute>
                    <AccountRequest />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/riwayat-surat"
                element={
                  <ProtectedRoute>
                    <LetterHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reset-password"
                element={
                  <ProtectedRoute>
                    <ResetPasswordPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat-langsung"
                element={
                  <ProtectedRoute>
                    <LiveChat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/berita"
                element={
                  <ProtectedRoute>
                    <News />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/event"
                element={
                  <ProtectedRoute>
                    <Event />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-rt-rw"
                element={
                  <ProtectedRoute>
                    <AdminRTRW />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lacak-surat"
                element={
                  <ProtectedRoute>
                    <TrackingLetterRequest />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/registrasi-akun/:id"
                element={
                  <ProtectedRoute>
                    <DetailRequestAccount />
                  </ProtectedRoute>
                }
              />
            </>
          )}

          {/* Rute 404 */}
          <Route path="/*" element={<EmptyPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
