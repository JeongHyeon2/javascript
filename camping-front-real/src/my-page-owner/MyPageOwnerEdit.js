import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MyPageOwnerEdit.css";
import axios from "axios";
import MySiteRegister from "./MySiteRegister";
import RegisteredSite from "./RegisteredSite";
export default function MyPageOwnerEdit() {
  const location = useLocation();
  const [imageUrl, setImageUrl] = useState(""); // 이미지 미리보기 URL 상태 추가
  const [selectedFile, setSelectedFile] = useState(null);
  const [facilities, setFacilities] = useState({
    publicShowerroom: false,
    publicRestroom: false,
    counter: false,
    publicParkingLot: false,
    store: false,
    fishing: false,
    valley: false,
    mountain: false,
  });
  const [sites, setSites] = useState([]);
  const [campSiteNum, setCampSiteNum] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [checkinTime, setCheckinTime] = useState("");
  const [checkoutTime, setCheckoutTime] = useState("");
  const [mannerTimeStart, setmannerTimeStart] = useState("");
  const [mannerTimeEnd, setmannerTimeEnd] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const handleFacilityChange = (e) => {
    const { name, checked } = e.target;
    setFacilities((prevFacilities) => ({
      ...prevFacilities,
      [name]: checked,
    }));
  };
  const getData = () => {
    const campSiteNum = location.state.campsiteNum;
    setCampSiteNum(campSiteNum);
    console.log(campSiteNum);
    const token = localStorage.getItem("user_num");
    const role = localStorage.getItem("role");
    if (token && role && campSiteNum) {
      setUserId(token);
      axios
        .get(`${process.env.REACT_APP_MY_IP}/campsite/detail/${campSiteNum}`)
        .then((response) => {
          const {
            address,
            campsite_num,
            content,
            enter_time,
            exit_time,
            facilities,
            manner_time_end,
            manner_time_start,
            name,
            photo_url,
            sites,
            telephone,
          } = response.data;
          setCampSiteNum(campsite_num);
          let str_enter_time = enter_time;
          let str_exit_time = exit_time;
          let str_manner_time_end = manner_time_end;
          let str_manner_time_start = manner_time_start;
          setImageUrl(`${process.env.REACT_APP_MY_IP}/${photo_url}`);
          setAddress(address);
          setDescription(content);
          setCheckinTime(str_enter_time.slice(0, -3));
          setCheckoutTime(str_exit_time.slice(0, -3));
          setFacilities((prevFacilities) => {
            const newFacilities = { ...prevFacilities };

            facilities.forEach((facility) => {
              console.log(facility);

              if (newFacilities.hasOwnProperty(facility)) {
                newFacilities[facility] = true;
              }
            });
            return newFacilities;
          });
          setSites(sites);
          setmannerTimeStart(str_manner_time_start.slice(0, -3));
          setmannerTimeEnd(str_manner_time_end.slice(0, -3));
          setName(name);
          setContact(telephone);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const onClickBtn = () => {
    // Filter out the facilities that are true
    const selectedFacilities = Object.keys(facilities).filter(
      (facility) => facilities[facility]
    );

    const body = {
      userNum: userId,
      campsiteNum: campSiteNum,
      name: name,
      content: description,
      address: address,
      telephone: contact,
      enterTime: `${checkinTime}:00`,
      exitTime: `${checkoutTime}:00`,
      mannerTimeStart: `${mannerTimeStart}:00`,
      mannerTimeEnd: `${mannerTimeEnd}:00`,
      facilities: selectedFacilities, // Only include selected facilities
    };
    console.log(body);
    axios
      .put(`${process.env.REACT_APP_MY_IP}/campsite`, body, {})
      .then((response) => {
        console.log(response);
        alert("수정 완료");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="myCampingRegisterContainer">
      <div>대표 사진</div>

      {imageUrl && (
        <img src={imageUrl} alt="Preview" className="preview-image" />
      )}

      <input type="file" onChange={handleImageChange} />
      <InputContainer text={"이름"} onChange={handleNameChange} value={name} />

      <InputContainer
        text={"주소"}
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />
      <InputContainer
        text={"연락처"}
        onChange={(e) => setContact(e.target.value)}
        value={contact}
      />
      <div className="textarea">
        숙소 소개
        <div>
          <textarea
            className="textareaContainer"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
      </div>
      <div className="checkin-out-time">
        입실시간
        <TimeSelect
          onChange={(e) => setCheckinTime(e.target.value)}
          value={checkinTime}
        />
        <div className="timeMargin"></div>
        퇴실시간
        <TimeSelect
          onChange={(e) => setCheckoutTime(e.target.value)}
          value={checkoutTime}
        />
      </div>

      <div className="checkin-out-time">
        매너타임 시작
        <TimeSelect
          value={mannerTimeStart}
          onChange={(e) => setmannerTimeStart(e.target.value)}
        />
        <div className="timeMargin"></div>
        매너타임 종료
        <TimeSelect
          value={mannerTimeEnd}
          onChange={(e) => setmannerTimeEnd(e.target.value)}
        />
      </div>
      <div className="facilities">
        <h3>시설 정보</h3>
        <h4>부대시설</h4>
        <label>
          공용 샤워실
          <input
            type="checkbox"
            name="publicShowerroom"
            checked={facilities.publicShowerroom}
            onChange={handleFacilityChange}
          />
        </label>
        <label>
          공용 화장실
          <input
            type="checkbox"
            name="publicRestroom"
            checked={facilities.publicRestroom}
            onChange={handleFacilityChange}
          />
        </label>
        <label>
          계수대
          <input
            type="checkbox"
            name="counter"
            checked={facilities.counter}
            onChange={handleFacilityChange}
          />
        </label>
        <label>
          공용 주차장
          <input
            type="checkbox"
            name="publicParkingLot"
            checked={facilities.publicParkingLot}
            onChange={handleFacilityChange}
          />
        </label>
        <label>
          편의점/매점
          <input
            type="checkbox"
            name="store"
            checked={facilities.store}
            onChange={handleFacilityChange}
          />
        </label>
        <h4>놀거리</h4>
        <label>
          낚시
          <input
            type="checkbox"
            name="fishing"
            checked={facilities.fishing}
            onChange={handleFacilityChange}
          />
        </label>
        <label>
          계곡
          <input
            type="checkbox"
            name="valley"
            checked={facilities.valley}
            onChange={handleFacilityChange}
          />
        </label>
        <h4>주변 환경</h4>
        <label>
          산
          <input
            type="checkbox"
            name="mountain"
            checked={facilities.mountain}
            onChange={handleFacilityChange}
          />
        </label>
      </div>
      <button onClick={onClickBtn}>확인</button>
      <hr></hr>
      <h1>사이트 리스트</h1>
      {sites.map((site) => (
        <RegisteredSite data={site} />
      ))}

      <MySiteRegister
        addSite={(newSite) => {
          console.log(newSite);
          const formData = new FormData();
          formData.append("sitePhotoUrl", newSite.sitePhotoUrl);
          formData.append("siteName", newSite.siteName);
          formData.append("campsiteNum", campSiteNum);
          formData.append("category", newSite.category);
          formData.append("pCapacity", newSite.pCapacity);
          formData.append("charge", newSite.charge);
          axios
            .post(`${process.env.REACT_APP_MY_IP}/site`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              alert("등록 완료");
              console.log(response);
              getData();
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      ></MySiteRegister>
    </div>
  );
}
function TimeSelect({ onChange, value }) {
  const times = Array.from({ length: 48 }, (_, i) => {
    const hours = Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours < 10 ? `0${hours}` : hours}:${minutes}`;
  });

  return (
    <select className="timeSelect" onChange={onChange} value={value}>
      {times.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
}
function InputContainer({ text, value, onChange }) {
  return (
    <div className="inputContainer">
      {text || "null"}{" "}
      <input className="input" onChange={onChange} value={value} />
    </div>
  );
}
