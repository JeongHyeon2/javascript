import { useEffect, useState } from "react";
import "./OwnerReservationList.css";
import axios from "axios";

export default function OwnerReservationList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${
            process.env.REACT_APP_MY_IP
          }/reservation/admin/${localStorage.getItem("user_num")}`
        );
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="OwnerReservationListContainer">
        데이터를 로딩 중입니다...
      </div>
    );
  }

  // 데이터가 배열인지 확인 후 처리
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="OwnerReservationListContainer">데이터가 없습니다.</div>
    );
  }

  return (
    <div className="OwnerReservationListContainer">
      {data.map((item) =>
        item.siteInfos.map((siteInfo) =>
          siteInfo.reservationInfos.map((reservationInfo) => (
            <ReservationRow
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

function ReservationRow({ item, siteInfo, reservationInfo }) {
  const { name } = item;
  const { site_name, check_in, check_out, reservation_id, approval } =
    reservationInfo;

  const onClickApprove = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_MY_IP}/reservation/approve/${reservation_id}`
      );
      alert("예약 승인");
    } catch (error) {
      console.error("Error approving reservation:", error);
    }
  };

  const onClickReject = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_MY_IP}/reservation/refuse/${reservation_id}`
      );
      alert("예약 거절");
    } catch (error) {
      console.error("Error rejecting reservation:", error);
    }
  };
  const getKor = (state) => {
    if (state === "approve") return "승인";
    if (state === "wait") return "대기";
    if (state === "refuse") return "거절";
    if (state === "cancel") return "취소";
  };
  return (
    <div className="ReservationRowContainer">
      캠핑장 이름: {name} &nbsp; 사이트 이름: {site_name} &nbsp; 체크인:{" "}
      {check_in} &nbsp; 체크아웃: {check_out} &nbsp; 예약 아이디:{" "}
      {reservation_id} &nbsp; 승인 여부: {getKor(approval)}
      <div>
        <button onClick={onClickApprove}>승인</button>
        <button onClick={onClickReject}>거절</button>
      </div>
    </div>
  );
}
