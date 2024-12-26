import { SiPrivateinternetaccess } from "react-icons/si";

const NoAccess = () => {
  return (
    <div className="bg-seaform h-screen md:h-[calc(100vh-4rem)] w-screen md:w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <SiPrivateinternetaccess className="h-20 w-20" />
        <h2 className="text-5xl font-bold">403</h2>
        <h4 className="font-semibold md:text-xl text-center text-aqua/60">
          Tidak memiliki izin untuk mengakses halaman ini
        </h4>
        <a href="/" className="mt-4">
          <button className="btn">Kembali Ke HomePage</button>
        </a>
      </div>
    </div>
  );
};

export default NoAccess;
