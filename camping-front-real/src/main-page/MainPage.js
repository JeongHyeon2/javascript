import { useEffect, useState } from "react";
import "./MainPage.css";
import axios from "axios";
import Site from "../common/Site";
import { useNavigate } from "react-router-dom";
export default function MainPage() {
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
  return (
    <div className="mainPageContainer">
      {campings.map((camping) => {
        return (
          <Site
            key={camping.campsite_num}
            data={camping}
            onClick={() => onClickCamping(camping.campsite_num)}
          ></Site>
        );
      })}
    </div>
  );
}
