import { Link, useParams } from "react-router-dom";
import CardIdentityUser from "../../components/Card/CardIdentityUser";
import CardKTPandKK from "../../components/Card/CardKTPandKK";
import CardCheckIdentity from "../../components/Card/CardCheckIdentity";
import PopupImage from "../../components/Popup/PopupImage";
import { useEffect, useState } from "react";
import { useDetailUser } from "../../store/DataUser";
import LoadingScreen from "../../components/EmptyPage/LoadingScreen";

const DetailRequestAccount = () => {
  const { id } = useParams();

  const detailData = useDetailUser((state) => state.userDetail);
  const getDetail = useDetailUser((state) => state.getUserDetail);

  const [isOpen, setIsOpen] = useState(false);
  const [widthImage, setWidthImage] = useState("w-full md:w-1/2");
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getDetail(id);
      setLoading(false);
    };

    fetchData();
  }, [getDetail, id]);

  return (
    <div>
      {isOpen && (
        <PopupImage
          setIsOpen={setIsOpen}
          widthImage={widthImage}
          imageName={imageName}
        />
      )}
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="md:mx-12 mt-5 overflow-hidden ">
          {/* Title */}
          <div className="">
            <div className="breadcrumbs text-aqua md:text-xl lg:text-3xl font-bold">
              <ul>
                <li className="">
                  <div className="hidden md:flex">
                    <Link to="/registrasi-akun">
                      Pengajuan Registrasi Akun User{" "}
                    </Link>
                  </div>
                </li>
                <li className="text-xl">Detail</li>
              </ul>
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex w-full flex-wrap justify-around mt-10 font-semibold text-overpost ">
            <div className="w-full md:w-1/2 ">
              {/* DATA DIRI USER */}
              {detailData[0] && (
                <CardIdentityUser
                  setIsOpen={setIsOpen}
                  setWidthImage={setWidthImage}
                  setImageName={setImageName}
                  detailData={detailData[0]}
                />
              )}

              {/* DOKUMEN FOTO KTP DAN KK */}
              {detailData[0] && (
                <CardKTPandKK
                  setIsOpen={setIsOpen}
                  setWidthImage={setWidthImage}
                  setImageName={setImageName}
                  ktp={detailData[0]?.foto_ktp}
                  kk={detailData[0]?.foto_kk}
                />
              )}
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 xl:mr-30 ">
              {detailData[0] && (
                <CardCheckIdentity detailData={detailData[0]} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailRequestAccount;
