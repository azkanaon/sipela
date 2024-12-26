import { formatDate } from "../utils/formattedData";
import logo from "../assets/backgroundLogin.jpeg";
import CardHome from "../components/Card/CardHome";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FaMailBulk } from "react-icons/fa";
import { useUserNotVerify, useVerifyUser } from "../store/DataUser";
import { useEffect } from "react";
import { useAuthStore } from "../store/Auth";

const HomePage = () => {
  const getVerifyAccount = useVerifyUser((state) => state.getVerifyAccount);
  const getNotVerifyAccount = useUserNotVerify(
    (state) => state.fetchUsersNotVerify
  );
  const verifyAccount = useVerifyUser((state) => state.verifyAccount);
  const notVerifyAccount = useUserNotVerify((state) => state.usersNotVerify);
  const me = useAuthStore((state) => state.me);

  useEffect(() => {
    getVerifyAccount("diterima");
    getNotVerifyAccount("belum");
  }, [getVerifyAccount, getNotVerifyAccount]);

  return (
    <div className="mx-12 mt-5">
      {/* Title */}
      <div className="text-aqua font-semibold">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-lg">{formatDate(new Date())}</p>
        </div>
      </div>

      {/* Image Isola */}
      <div className="mt-5">
        <img
          src={logo}
          alt="Background Isola"
          className="w-full h-80 object-cover object-center rounded-xl"
        />
      </div>

      {/* Data Akun dan Surat */}
      <div className="flex flex-col md:flex-row items-center md:justify-around mt-10 gap-10 md:gap-0 mb-10">
        {me?.role === "kelurahan" && (
          <CardHome
            title={"Akun"}
            totalFinish={verifyAccount.length}
            totalProcess={notVerifyAccount.length}
            icon={
              <MdOutlineSupervisorAccount className="h-9 w-9 md:h-12 md:w-12" />
            }
            linkDone={"/riwayat-surat"}
            linkNotDone={"/registrasi-akun"}
          />
        )}

        <CardHome
          title={"Surat"}
          totalFinish={12}
          totalProcess={190}
          icon={<FaMailBulk className="h-9 w-9 md:h-12 md:w-12" />}
          linkDone={"/riwayat-surat"}
          linkNotDone={"/pengajuan-surat"}
        />
      </div>
    </div>
  );
};

export default HomePage;
