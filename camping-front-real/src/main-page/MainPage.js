import { useEffect, useState } from "react";
import "./MainPage.css";
import axios from "axios";
import Site from "../common/Site";
import { useNavigate } from "react-router-dom";
import CampFilter from "./CampFilter";
export default function MainPage() {
  const [showModal, setShowModal] = useState(false);

  const handleFilterButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 문자열 불러오기
  const myString = sessionStorage.getItem("filterOption");
  const [campings, setCampings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_MY_IP}/campsite`)
      .then((response) => {
        console.log(response);
        setCampings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const onClickCamping = (campsite_num) => {
    navigate("/camping-detail", { state: { campsiteNum: campsite_num } });
  };
  const onClickRegisterCamping = () => {
    navigate("/owner-register");
  };
  return (
    <div className="mainPageContainer">
      <div className={"main-filter-button"} onClick={handleFilterButtonClick}>
        검색필터
      </div>

      {localStorage.getItem("role") === "admin" ? (
        <button onClick={onClickRegisterCamping}>캠핑장 등록</button>
      ) : null}
      {campings.map((camping) => {
        return (
          <Site
            key={camping.campsite_num}
            data={camping}
            onClick={() => onClickCamping(camping.campsite_num)}
          ></Site>
        );
      })}
      <CampFilter show={showModal} onClose={handleCloseModal} />
    </div>
  );
}
