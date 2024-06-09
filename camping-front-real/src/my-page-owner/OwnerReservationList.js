import { useEffect, useState } from "react";
import "./OwnerReservationList.css";
import axios from "axios";

export default function OwnerReservationList() {
  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get(
        `${
          process.env.REACT_APP_MY_IP
        }/reservation/admin/${localStorage.getItem("user_num")}`
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="OwnerReservationListContainer">
      {data.map((item) =>
        item.siteInfos.map((siteInfo) =>
          siteInfo.reservationInfos.map((reservationInfo) => (
            <ReservationRow
              getData={getData}
              key={reservationInfo.reservation_id}
              item={item}
              siteInfo={siteInfo}
              reservationInfo={reservationInfo}
            />
          ))
        )
      )}
    </div>
  );
}

function ReservationRow({ item, siteInfo, reservationInfo, getData }) {
  const { name } = item;
  const { site_name, check_in, check_out } = siteInfo;
  const { reservation_id, approval } = reservationInfo;
  const onClickApprove = () => {
    axios
      .post(
        `${process.env.REACT_APP_MY_IP}/reservation/approve/${reservation_id}`
      )
      .then(() => {
        alert("예약 승인");
        getData();
      });
  };
  const onClickReject = () => {
    axios
      .post(
        `${process.env.REACT_APP_MY_IP}/reservation/refuse/${reservation_id}`
      )
      .then(() => {
        alert("예약 거절");
        getData();
      });
  };
  return (
    <div className="ReservationRowContainer">
      캠핑장이름: {name} &nbsp; 사이트 이름: {site_name}
      체크인: {check_in}
      &nbsp; 체크아웃: {check_out}
      &nbsp; 예약 아이디: {reservation_id}
      &nbsp; 승인 여부: {approval}
      <div>
        <button onClick={onClickApprove}>승인</button>
        <button onClick={onClickReject}>거절</button>
      </div>
    </div>
  );
}
