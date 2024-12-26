import PropTypes from "prop-types";

const CardHistory = ({ name, jumlah, color }) => {
  return (
    <div className="flex flex-col ">
      <div className={` ${color} text-white p-4  rounded-lg`}>
        <div className="flex items-start gap-3">
          <div className="bg-white/20 p-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-bold">{name}</div>
            <div className="text-xl font-bold mt-1">
              Jumlah Surat Selesai : {jumlah}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardHistory.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  jumlah: PropTypes.number,
};

export default CardHistory;
