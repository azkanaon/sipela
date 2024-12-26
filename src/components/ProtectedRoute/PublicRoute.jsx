import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/Auth";
import { useEffect, useState } from "react";

const PublicRoute = ({ children }) => {
  const me = useAuthStore((state) => state.me);
  const getMe = useAuthStore((state) => state.getMe);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMe = async () => {
      await getMe(); // Memanggil fungsi getMe untuk memuat data pengguna
      setLoading(false); // Set loading ke false setelah selesai
    };

    if (!me) {
      loadMe();
    } else {
      setLoading(false);
    }
  }, [me, getMe]);

  // Menampilkan spinner atau placeholder saat sedang loading
  if (loading) {
    return <div>Loading...</div>; // Bisa diganti dengan spinner yang lebih menarik
  }

  // Jika data "me" ada (sudah login), arahkan ke halaman beranda
  if (me) {
    return <Navigate to="/" replace />;
  }

  // Jika belum login, render halaman public (misalnya login)
  return children;
};

export default PublicRoute;
