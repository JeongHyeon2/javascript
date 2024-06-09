import React, { useState, useEffect } from "react";
import "./MyPageOwnerRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function MyPageOwnerRegister() {
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
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [checkinTime, setCheckinTime] = useState("");
  const [checkoutTime, setCheckoutTime] = useState("");
  const [mannerTimeStart, setmannerTimeStart] = useState("");
  const [mannerTimeEnd, setmannerTimeEnd] = useState("");
  const navigate = useNavigate();
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
  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 토큰을 가져와 로그인 상태 확인
    const token = localStorage.getItem("user_num");
    const role = localStorage.getItem("role");
    if (token && role) {
      setUserId(token);
      setRole(role);
    }
  }, []);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const onClickBtn = () => {
    const formData = new FormData();
    formData.append("photoUrl", selectedFile);
    formData.append("userNum", userId);
    formData.append("name", name);
    formData.append("address", address);
    formData.append("telephone", contact);
    formData.append("content", description);
    formData.append("enterTime", `${checkinTime}:00`);
    formData.append("exitTime", `${checkoutTime}:00`);
    formData.append("mannerTimeStart", `${mannerTimeStart}:00`);
    formData.append("mannerTimeEnd", `${mannerTimeEnd}:00`);
    Object.keys(facilities)
      .filter((key) => facilities[key])
      .forEach((key, index) => {
        formData.append(`facilities[${index}][facility]`, key);
      });
    console.log(formData);
    axios
      .post(`${process.env.REACT_APP_MY_IP}/campsite`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        alert("등록 성공");
        navigate("/main-page");
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
