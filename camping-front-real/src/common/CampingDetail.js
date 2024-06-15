import "./CampingDetail.css";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import RegisteredSite from "../my-page-owner/RegisteredSite";

export default function CampingDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [campsite, setCampsite] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const campSiteNum = location.state.campsiteNum;
    axios
      .get(`${process.env.REACT_APP_MY_IP}/campsite/detail/${campSiteNum}`)
      .then((res) => {
        setCampsite(res.data);
        console.log(res.data);
      });
    axios
      .get(`${process.env.REACT_APP_MY_IP}/review/${campSiteNum}`)
      .then((res) => {
        setReviews(res.data);
        console.log(res.data);
      });
  }, [location.state.campsiteNum]);

  const onClickRes = (site_id) => {
    navigate("/site-detail", {
      state: { site_id: site_id },
    });
  };

  const facilityMapping = {
    publicShowerroom: "공용 샤워실",
    publicRestroom: "공용 화장실",
    counter: "계수대",
    publicParkingLot: "공용 주차장",
    store: "편의점/매점",
  };

  const activityMapping = {
    fishing: "낚시",
  };

  const environmentMapping = {
    valley: "계곡",
    mountain: "산",
  };

  const getKoreanText = (data, mapping) => {
    if (mapping.hasOwnProperty(data)) {
      return mapping[data];
    }
    return null; // 매핑되지 않은 데이터인 경우
  };

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
            입실시간: {campsite.enter_time}
            <div className="timeMargin"></div>
            퇴실시간: {campsite.exit_time}
          </div>

          <div className="checkin-out-time">
            매너타임 시작: {campsite.manner_time_start}
            <div className="timeMargin"></div>
            매너타임 종료: {campsite.manner_time_end}
          </div>
          <div className="facilities">
            <h3>시설 정보</h3>
            <h4>부대시설</h4>
            <div>
              {campsite.facilities.map(
                (item) =>
                  getKoreanText(item, facilityMapping) && (
                    <div key={item}>{getKoreanText(item, facilityMapping)}</div>
                  )
              )}
            </div>
            <h4>놀거리</h4>
            <div>
              {campsite.facilities.map(
                (item) =>
                  getKoreanText(item, activityMapping) && (
                    <div key={item}>{getKoreanText(item, activityMapping)}</div>
                  )
              )}
            </div>
            <h4>주변 환경</h4>
            <div>
              {campsite.facilities.map(
                (item) =>
                  getKoreanText(item, environmentMapping) && (
                    <div key={item}>
                      {getKoreanText(item, environmentMapping)}
                    </div>
                  )
              )}
            </div>
          </div>
          <hr />
          <h1>사이트</h1>
          {campsite.sites.map((site) => (
            <RegisteredSite
              key={site.site_id}
              data={site}
              canRegister={true}
              onClick={() => onClickRes(site.site_id)}
            />
          ))}
        </div>
      )}
      <div className="myCampingRegisterContainer">
        <h1>리뷰</h1>
        {reviews &&
          reviews.map((review) => (
            <ReviewItem key={review.review_id} review={review} />
          ))}
      </div>
    </div>
  );
}

function ReviewItem({ review }) {
  const { review_photo, review_post, review_star, user_num } = review;
  return (
    <div className="ReviewItemContainer">
      <img
        src={`${process.env.REACT_APP_MY_IP}/${review_photo}`}
        alt="Preview"
        className="preview-image"
      />
      <div>내용: {review_post}</div>
      <div>점수: {review_star}</div>
      <div>작성자ID: {user_num}</div>
    </div>
  );
}
