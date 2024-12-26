import { useEffect, useState } from "react";
import { useDataLetter } from "../store/DataLetter";
import TableHistory from "../components/Table/TableHistory";
import CardHistory from "../components/Card/CardHistory";

const LetterHistory = () => {
  const dataHistory = useDataLetter((state) => state.history);
  const getHistory = useDataLetter((state) => state.searchLetterHistory);

  const [query, setQuery] = useState("");

  // Menghitung jumlah kemunculan tiap jenis surat
  const countByJenisSurat = dataHistory.reduce((acc, item) => {
    const jenisSurat = item.surat_pengantar.jenis_surat.nama;
    acc[jenisSurat] = (acc[jenisSurat] || 0) + 1;
    return acc;
  }, {});

  const groupData = Object.entries(countByJenisSurat).map(([nama, count]) => ({
    nama,
    count,
  }));

  const colors = ["bg-aqua", "bg-wave", "bg-glacier_blue"];

  useEffect(() => {
    getHistory(query);
  }, [getHistory, query]);

  return (
    <div className="px-4 lg:px-12 mt-5 overflow-x-auto w-screen md:w-full h-screen sm:h-fit bgice">
      {/* Statistik Surat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {groupData.map((data, index) => (
          <CardHistory
            key={data.nama}
            name={data.nama}
            jumlah={data.count}
            color={colors[index % colors.length]}
          />
        ))}
      </div>

      {/* Riwayat Pengajuan Surat */}
      <TableHistory dataHistory={dataHistory} query={setQuery} />
    </div>
  );
};

export default LetterHistory;
