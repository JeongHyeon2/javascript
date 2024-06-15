import axios from "axios";
import { useEffect, useState } from "react";
import "./ReservationCamping.css";
import { useNavigate } from "react-router-dom";
export default function ReservationCamping({ data, onClickCancel }) {
  const [site, setSite] = useState(null);
  const [camping, setCamping] = useState(null);
  const [canReview, setCanReview] = useState(false);
  const navigate = useNavigate();
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
        console.log(res.data);
        setSite(res.data.siteInfo);
        setCamping(res.data.campsiteInfo);

        const today = new Date();
        const new_check_out = new Date(check_out);

        if (today >= new_check_out) {
          setCanReview(true);
        }
      });
  }, []);
  const getKor = (state) => {
    if (state === "approve") return "승인";
    if (state === "wait") return "대기";
    if (state === "refuse") return "거절";
    if (state === "cancel") return "취소";
  };
  const onClickReview = () => {
    navigate("/review", {
      state: {
        data: {
          site_photo_url: site.site_photo_url,
          name: site.name,
          category: site.category,
          site_name: site.site_name,
          campsite_num: camping.campsite_num,
        },
      },
    });
  };

  return (
    <div className="ReservationCampingContainer">
      어른 : {adult} &nbsp; 아이 : {child} &nbsp; &nbsp; 체크인 :{" "}
      {check_in.split("T")[0]} &nbsp; 체크아웃 :{check_out.split("T")[0]}
      {site && (
        <div>
          <img
            className="ReservationCampingContainerImg"
            src={`${process.env.REACT_APP_MY_IP}/${site.site_photo_url}`}
          ></img>
          <span>
            {canReview
              ? approval == "approve"
                ? "종료"
                : getKor(approval)
              : getKor(approval)}
          </span>
          <div>
            캠핑장 이름 : {camping.name} &nbsp; 카테고리 : {site.category}
            &nbsp; 사이트 이름 : {site.site_name}
          </div>
        </div>
      )}
      {canReview ? (
        <button onClick={onClickReview}>리뷰작성</button>
      ) : getKor(approval) !== "취소" ? (
        <button onClick={onClickCancel}>취소</button>
      ) : null}
    </div>
  );
}
