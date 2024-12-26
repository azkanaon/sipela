import { useDataLetter } from "../../store/DataLetter";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/Auth";
import LoadingScreen from "../../components/EmptyPage/LoadingScreen";
import Table4ColumnLetter from "../../components/Table/Table4ColumnLetter";

const LetterRequest = () => {
  const dataTHead = [
    "No",
    "NIK",
    "Nama Pengaju",
    "RT",
    "RW",
    "Jenis Surat",
    "Waktu",
    "Status",
    "Tindakan",
  ];
  const action = "Detail";

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const letters = useDataLetter((state) => state.letters);
  const getData = useDataLetter((state) => state.searchLetter);
  const me = useAuthStore((state) => state.me);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getData(query, me.role);
      setLoading(false);
    };

    fetchData();
  }, [getData, query, me]);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="px-4 lg:px-12 mt-5 overflow-x-auto w-screen md:w-full h-screen sm:h-fit">
          {/* TITLE */}
          <div className="text-aqua font-semibold">
            <div>
              <h1 className="text-4xl font-bold">Pengajuan Surat </h1>
            </div>
          </div>

          <Table4ColumnLetter
            dataTHead={dataTHead}
            action={action}
            allData={letters}
            query={setQuery}
          />
        </div>
      )}
    </div>
  );
};

export default LetterRequest;
