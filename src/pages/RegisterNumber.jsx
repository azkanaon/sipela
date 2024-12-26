import { useEffect } from "react";
import { useDataLetter } from "../store/DataLetter";
import { useAuthStore } from "../store/Auth";
import TableRegisterNumber from "../components/Table/TableRegisterNumber";
import TableUploadDokumen from "../components/Table/TableUploadDokumen";

const RegisterNumber = () => {
  const letters = useDataLetter((state) => state.dataRegister);
  const getData = useDataLetter((state) => state.getRegisterNumber);
  const dataUpload = useDataLetter((state) => state.uploadRegister);
  const getUpload = useDataLetter((state) => state.getUploadDokumenRegister);
  const me = useAuthStore((state) => state.me);

  useEffect(() => {
    getData();
    getUpload();
  }, [getData, getUpload]);

  return (
    <div className="px-4 lg:px-12 mt-5 overflow-x-auto w-screen md:w-full h-screen sm:h-fit">
      <TableRegisterNumber dataRegister={letters} />
      {me?.role === "kelurahan" && (
        <div className="mt-8">
          <TableUploadDokumen dataUpload={dataUpload} />
        </div>
      )}
    </div>
  );
};

export default RegisterNumber;
