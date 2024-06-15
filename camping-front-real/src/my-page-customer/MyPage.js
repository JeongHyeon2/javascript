import { useEffect, useState } from "react";
import "./MyPage.css";
import axios from "axios";
import ReservationCamping from "./ReservationCamping";
export default function MyPage() {
  const [reservationList, setReservationList] = useState();
  const onClickCancel = (reservation_id) => {
    axios
      .post(
        `${process.env.REACT_APP_MY_IP}/reservation/cancel/${reservation_id}`
      )
      .then((res) => {
        console.log(res);
        alert("취소완료");
        axios
          .get(
            `${
              process.env.REACT_APP_MY_IP
            }/reservation/myPage/${localStorage.getItem("user_num")}`
          )
          .then((res) => {
            console.log(res.data);
            setReservationList(res.data);
          });
      });
  };
  useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_MY_IP
        }/reservation/myPage/${localStorage.getItem("user_num")}`
      )
      .then((res) => {
        console.log(res.data);
        setReservationList(res.data);
      });
  }, []);
  return (
    <div className="MyPageContainer">
      <h1>내 예약</h1>
      {reservationList &&
        reservationList.map((item) => (
          <ReservationCamping
            data={item}
            onClickCancel={() => {
              onClickCancel(item.reservation_id);
            }}
          ></ReservationCamping>
        ))}
    </div>
  );
}
