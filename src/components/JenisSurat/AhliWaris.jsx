import PropTypes from "prop-types";
import LampiranSurat from "../SuratWaris/LampiranSurat";
import SuratKuasaAhliWaris from "../SuratWaris/SuratKuasaAhliWaris";
import SuratPernyataanBersama from "../SuratWaris/SuratPernyataanBersama";

const AhliWaris = ({ detailData, groupedData }) => {
  return (
    <div>
      <SuratKuasaAhliWaris
        data={detailData[0]?.surat_pengantar?.ahli_waris}
        flag={0}
      />

      {detailData[0]?.surat_pengantar?.ahli_waris?.length > 1 && (
        <SuratKuasaAhliWaris
          data={detailData[0]?.surat_pengantar?.ahli_waris}
          flag={1}
          anak={
            detailData[0]?.surat_pengantar?.ahli_waris[0]?.ahli_waris?.length
          }
        />
      )}

      <div className="my-4">
        <SuratPernyataanBersama
          namaSurat={"Yang membuat Pernyataan bersama:"}
          label={"Jumlah Yang Membuat Pernyataan Bersama"}
          pembuatPernyataan={"Anak"}
          data={detailData[0]?.surat_pengantar?.ahli_waris[0]?.ahli_waris}
        />
      </div>

      <div className="my-4" />
      <SuratPernyataanBersama
        namaSurat={"Saksi-saksi"}
        label={"Jumlah Saksi-saksi:"}
        pembuatPernyataan={"Saksi"}
        data={detailData[0]?.surat_pengantar?.ahli_waris[0]?.saksi}
      />

      {/* Lampiran */}
      {groupedData?.map((data) => (
        <div key={data?.category}>
          <div className="my-4" />
          <LampiranSurat title={data?.category} data={data?.items} />
        </div>
      ))}
    </div>
  );
};

AhliWaris.propTypes = {
  detailData: PropTypes.array,
  groupedData: PropTypes.array,
};

export default AhliWaris;
