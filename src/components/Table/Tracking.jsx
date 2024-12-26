import PropTypes from "prop-types";

const Tracking = ({ data }) => {
  return (
    <div
      className={`rounded-lg overflow-hidden my-4 mb-12 border-2 border-aqua/20`}
    >
      <div className=" w-full bg-seaform">
        <p className="font-medium text-aqua text-xl ml-8 py-4">Status Surat</p>
      </div>
      <div className=" my-8 flex items-center justify-center">
        <ul className="steps font-medium text-sm">
          <li
            data-content={data?.status_rt === "Disetujui" ? "✓" : "⏳"}
            className={`step  ${
              data?.status_rt === "Disetujui"
                ? "text-aqua step-success"
                : "text-slate-400 step-accent "
            }`}
          >
            {data?.status_rt === "Disetujui"
              ? `RT ${data?.surat_pengantar?.rt} Sudah Menyetujui`
              : `Menunggu Verifikasi RT ${data?.surat_pengantar?.rt}`}
          </li>
          <li
            data-content={data?.status_rw === "Disetujui" ? "✓" : "⏳"}
            className={`step ${
              data?.status_rw === "Disetujui"
                ? "text-aqua step-success"
                : "text-slate-400 step-accent "
            }`}
          >
            {data?.status_rw === "Disetujui"
              ? `RW ${data?.surat_pengantar?.rw} Sudah Menyetujui`
              : `Menunggu Verifikasi RT ${data?.surat_pengantar?.rw}`}
          </li>
          <li
            data-content={data?.status_kelurahan === "Disetujui" ? "✓" : "⏳"}
            className={`step ${
              data?.status_kelurahan === "Disetujui"
                ? "text-aqua step-success"
                : "text-slate-400 step-accent "
            }`}
          >
            {data?.status_kelurahan === "Disetujui"
              ? `Kelurahan Sudah Menyetujui`
              : `Menunggu Verifikasi Kelurahan`}
          </li>
          <li
            data-content={
              data?.surat_pengantar?.nomor_register_pengantar_rt ? "✓" : "⏳"
            }
            className={`step ${
              data?.surat_pengantar?.nomor_register_pengantar_rt
                ? "text-aqua step-success"
                : "text-slate-400 step-accent "
            }`}
          >
            {data?.surat_pengantar?.nomor_register_pengantar_rt
              ? `RT Sudah Memberi No Register`
              : `Menunggu No Register RT`}
          </li>
          <li
            data-content={
              data?.surat_pengantar?.nomor_register_pengantar_rw ? "✓" : "⏳"
            }
            className={`step ${
              data?.surat_pengantar?.nomor_register_pengantar_rw
                ? "text-aqua step-success"
                : "text-slate-400 step-accent "
            }`}
          >
            {data?.surat_pengantar?.nomor_register_pengantar_rw
              ? `RW Sudah Memberi No Register`
              : `Menunggu No Register RW`}
          </li>
          <li
            data-content={
              data?.surat_pengantar?.nomor_register_pengantar_kelurahan
                ? "✓"
                : "⏳"
            }
            className={`step ${
              data?.surat_pengantar?.nomor_register_pengantar_kelurahan
                ? "text-aqua step-success"
                : "text-slate-400 step-accent "
            }`}
          >
            {data?.surat_pengantar?.nomor_register_pengantar_kelurahan
              ? `Kelurahan Sudah Memberi No Register`
              : `Menunggu No Register Kelurahan`}
          </li>
        </ul>
      </div>
      <div className="h-12 bg-seaform w-full" />
    </div>
  );
};

Tracking.propTypes = {
  data: PropTypes.object,
};

export default Tracking;
