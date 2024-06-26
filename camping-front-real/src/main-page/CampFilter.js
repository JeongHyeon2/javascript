import React, { useState } from "react";
import "./CampFilter.css";

const CampFilter = ({ show, onClose, onClick }) => {
  const [region, setRegion] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [name, setName] = useState("");

  if (!show) {
    return null;
  }
  function handleRadio(e) {
    if (e.target.value === selectedOption) {
      setSelectedOption(null);
    }
  }
  function handleRadioChange(e) {
    // 라디오 버튼을 다시 클릭하면 선택 값을 취소합니다.
    const newValue = e.target.value === selectedOption ? null : e.target.value;
    setSelectedOption(newValue);
  }

  function handleConfirm() {
    // 입력된 값을 저장
    localStorage.setItem("name", name);
    localStorage.setItem("region", region);
    localStorage.setItem("checkIn", checkInDate);
    localStorage.setItem("checkOut", checkOutDate);
    localStorage.setItem("category", selectedOption);

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <div className="modal-body">
          <div className="radio-container">
            <label>
              <input
                onClick={handleRadio}
                type="radio"
                name="category"
                value="캠핑"
                onChange={handleRadioChange}
                checked={selectedOption === "캠핑"}
              />{" "}
              캠핑
            </label>
            <label>
              <input
                onClick={handleRadio}
                type="radio"
                name="category"
                value="글램핑"
                onChange={handleRadioChange}
                checked={selectedOption === "글램핑"}
              />{" "}
              글램핑
            </label>
            <label>
              <input
                onClick={handleRadio}
                type="radio"
                name="category"
                value="카라반"
                onChange={handleRadioChange}
                checked={selectedOption === "카라반"}
              />{" "}
              카라반
            </label>
            <label>
              <input
                onClick={handleRadio}
                type="radio"
                name="category"
                value="펜션"
                onChange={handleRadioChange}
                checked={selectedOption === "펜션"}
              />{" "}
              펜션
            </label>
          </div>
          <div className="input-container">
            <label>이름</label>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>지역</label>
            <input
              type="text"
              placeholder="지역"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
            <label>입실일</label>
            <input
              type="date"
              placeholder="입실일"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
            />
            <label>퇴실일</label>
            <input
              type="date"
              placeholder="퇴실일"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              handleConfirm();
              onClick();
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampFilter;
