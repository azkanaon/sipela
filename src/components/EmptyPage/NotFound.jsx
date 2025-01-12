import { RiPhoneFindLine } from "react-icons/ri";

const NotFound = () => {
  return (
    <div className="fixed h-screen w-screen bg-seaform text-aqua flex items-center justify-center">
      <div className="flex flex-col items-center">
        <RiPhoneFindLine className="h-20 w-20" />
        <h2 className="text-5xl font-bold">404</h2>
        <h4 className="font-semibold md:text-xl text-aqua/60">
          Halaman Tidak Ditemukan
        </h4>
        <a href="/" className="mt-4">
          <button className="btn">Kembali Ke Home Page</button>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
