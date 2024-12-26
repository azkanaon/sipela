import { useEffect, useState } from "react";

import PopupResetPassword from "../components/Popup/PopupResetPassword";
import { useVerifyUser } from "../store/DataUser";
import LoadingScreen from "../components/EmptyPage/LoadingScreen";
import Table4Column from "../components/Table/Table4Column";

const ResetPasswordPage = () => {
  const getData = useVerifyUser((state) => state.searchVerifyAccount);
  const allData = useVerifyUser((state) => state.verifyAccount);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [detailAccount, setDetailAccount] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getData(query);
      setLoading(false);
    };
    fetchData();
  }, [getData, isUpdate, query]);

  const handlePopupOpen = (data) => {
    setIsUpdate(!isUpdate);
    setIsPopupOpen(!isPopupOpen);
    setDetailAccount(data);
  };

  const dataTHead = ["No", "NIK", "Nama", "Update Terakhir", "Tindakan"];
  const action = "Reset Password";

  return (
    <div>
      {isPopupOpen && (
        <PopupResetPassword
          handleOpen={handlePopupOpen}
          nik={detailAccount?.nik}
          nama={detailAccount?.nama}
        />
      )}
      <div>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className="px-4 lg:px-12 mt-5 overflow-x-auto w-screen md:w-full h-screen sm:h-fit">
            {/* TITLE */}
            <div className="text-aqua font-semibold">
              <div>
                <h1 className="text-4xl font-bold">
                  Reset Password Akun Warga
                </h1>
              </div>
            </div>

            <Table4Column
              handleOpen={handlePopupOpen}
              dataTHead={dataTHead}
              action={action}
              allData={allData}
              query={setQuery}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
