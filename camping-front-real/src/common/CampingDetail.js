import "./CampingDetail.css";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import RegisteredSite from "../my-page-owner/RegisteredSite";

export default function CampingDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [campsite, setCampsite] = useState(null);
  const onClickRes = (site_id) => {
    navigate("/site-detail", {
      state: { site_id: site_id },
    });
  };
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const campSiteNum = location.state.campsiteNum;
    axios
      .get(`${process.env.REACT_APP_MY_IP}/campsite/detail/${campSiteNum}`)
      .then((res) => {
        setCampsite(() => res.data);
        console.log(res.data);
      });
    axios
      .get(`${process.env.REACT_APP_MY_IP}/review/${campSiteNum}`)
      .then((res) => {
        setReviews(() => res.data);

        console.log(res.data);
      });
  }, []);
  return (
    <div>
      {campsite && (
        <div className="myCampingRegisterContainer">
          <img
            src={`${process.env.REACT_APP_MY_IP}/${campsite.photo_url}`}
            alt="Preview"
            className="preview-image"
          />

          <div>숙소 이름: {campsite.name}</div>

          <div>숙소 주소: {campsite.address}</div>
          <div>전화번호: {campsite.telephone}</div>
          <div className="textarea">
            숙소 소개:
            {campsite.content}
          </div>
          <div className="checkin-out-time">
            입실시간:
            {campsite.enter_time}
            <div className="timeMargin"></div>
            퇴실시간:
            {campsite.exit_time}
          </div>

          <div className="checkin-out-time">
            매너타임 시작:
            {campsite.manner_time_start}
            <div className="timeMargin"></div>
            매너타임 종료:
            {campsite.manner_time_end}
          </div>
          <div className="facilities">
            <h3>시설 정보</h3>
            <h4>부대시설</h4>
            <div>{campsite.facilities}</div>
          </div>
          <hr></hr>
          <h1>사이트</h1>
          {campsite.sites.map((site) => (
            <RegisteredSite
              data={site}
              canRegister={true}
              onClick={() => onClickRes(site.site_id)}
            />
          ))}
        </div>
      )}
      <hr></hr>
      <h1>리뷰</h1>
      {reviews &&
        reviews.map((review) => (
          <ReviewItem key={review.review_id} review={review}></ReviewItem>
        ))}
    </div>
  );
}

function ReviewItem({ review }) {
  const { review_photo, review_post, review_star, user_num } = review;
  return (
    <div>
      <img
        src={`${process.env.REACT_APP_MY_IP}/${review_photo}`}
        alt="Preview"
        className="preview-image"
      />
      <div>내용:{review_post}</div>
      <div>점수:{review_star}</div>
      <div>작성자:{user_num}</div>
    </div>
  );
}
