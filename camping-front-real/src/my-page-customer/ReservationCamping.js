import axios from "axios";
import { useEffect, useState } from "react";
import "./ReservationCamping.css";
export default function ReservationCamping({ data }) {
  const [site, setSite] = useState(null);
  const [camping, setCamping] = useState(null);
  const {
    adult,
    approval,
    check_in,
    check_out,
    child,
    reservation_id,
    site_id,
  } = data;
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_MY_IP}/site/myPage/${site_id}`)
      .then((res) => {
        console.log(res.data.siteInfo);
        setSite(res.data.siteInfo);
        setCamping(res.data.campsiteInfo);
      });
  }, []);

  return (
    <div className="ReservationCampingContainer">
      어른 : {adult} &nbsp; 아이 : {child} &nbsp; 상태 : {approval}
      &nbsp; 체크인 : {check_in.split("T")[0]} &nbsp; 체크아웃 :
      {check_out.split("T")[0]}
      {site && (
        <div>
          <img
            className="ReservationCampingContainerImg"
            src={`${process.env.REACT_APP_MY_IP}/${site.site_photo_url}`}
          ></img>
          캠핑장 이름 : {camping.name} &nbsp; 카테고리 : {site.category}
          &nbsp; 사이트 이름 : {site.site_name}
        </div>
      )}
    </div>
  );
}
