import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/Auth";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

const ProtectedRoute = ({ children }) => {
  const me = useAuthStore((state) => state.me);
  const getMe = useAuthStore((state) => state.getMe);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Memuat data pengguna saat ProtectedRoute dirender
    const loadMe = async () => {
      await getMe();
      setLoading(false); // Hanya set loading ke false setelah data me diperbarui
    };

    if (!me) {
      loadMe();
    } else {
      setLoading(false);
    }
  }, [me, getMe]);

  // Menampilkan state loading saat menunggu data me
  if (loading) {
    return (
      <div>
        <CgSpinner className="animate-spin" />
      </div>
    ); // Atau gunakan spinner atau komponen lain
  }

  // Jika data "me" tidak ada (belum login), arahkan ke halaman login
  if (!me) {
    return <Navigate to="/login_admin" replace />;
  }

  // Jika "me" ada, render halaman yang diinginkan
  return children;
};

export default ProtectedRoute;
