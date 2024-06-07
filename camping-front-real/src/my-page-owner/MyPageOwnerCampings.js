import axios from "axios";
import Site from "../common/Site";
import "./MyPageOwnerCampings.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MyPageOwnerCampings() {
  const [campings, setCampings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("user_num");
    const role = localStorage.getItem("role");
    if (token && role) {
      console.log(token);
      console.log(role);
      axios
        .get(`${process.env.REACT_APP_MY_IP}/campsite/${token}`)
        .then((response) => {
          console.log(response);
          setCampings(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  const onClickEditPage = (campsite_num) => {
    navigate("/owner-edit", { state: { campsiteNum: campsite_num } });
    console.log(campsite_num);
  };
  return (
    <div className="MyPageOwnerCampings">
      {campings.map((camping) => (
        <Site
          key={camping.campsite_num}
          data={camping}
          onClick={() => onClickEditPage(camping.campsite_num)}
        ></Site>
      ))}
    </div>
  );
}
