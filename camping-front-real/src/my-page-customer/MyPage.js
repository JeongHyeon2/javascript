import { useEffect, useState } from "react";
import "./MyPage.css";
import axios from "axios";
import ReservationCamping from "./ReservationCamping";
export default function MyPage() {
  const [reservationList, setReservationList] = useState();
  useEffect(() => {
    axios
      .get(
        `${
          process.env.REACT_APP_MY_IP
        }/reservation/myPage/${localStorage.getItem("user_num")}`
      )
      .then((res) => {
        console.log(res);
        setReservationList(res.data);
      });
  }, []);
  return (
    <div className="MyPageContainer">
      <h1>내 예약</h1>
      {reservationList &&
        reservationList.map((item) => (
          <ReservationCamping data={item}></ReservationCamping>
        ))}
    </div>
  );
}
