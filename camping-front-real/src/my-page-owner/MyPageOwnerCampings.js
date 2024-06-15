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
      axios
        .get(`${process.env.REACT_APP_MY_IP}/campsite/${token}`)
        .then((response) => {
          setCampings(response.data); // assuming response.data is an array
        })
        .catch((error) => {
          console.error("Error fetching campings:", error);
          setCampings([]); // Handle error state
        });
    }
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const onClickEditPage = (campsite_num) => {
    navigate("/owner-edit", { state: { campsiteNum: campsite_num } });
  };

  return (
    <div className="MyPageOwnerCampings">
      <h1>내 캠핑장</h1>
      <button onClick={() => navigate("/owner-reservations")}>예약 내역</button>
      {Array.isArray(campings) && campings.length > 0 ? (
        campings.map((camping) => (
          <Site
            key={camping.campsite_num}
            data={camping}
            onClick={() => onClickEditPage(camping.campsite_num)}
          />
        ))
      ) : (
        <p>캠핑장 데이터가 없습니다.</p>
      )}
    </div>
  );
}
