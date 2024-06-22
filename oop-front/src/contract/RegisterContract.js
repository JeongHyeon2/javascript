import { useRef, useState } from "react";
import "./RegisterContract.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function RegisterContract() {
  const [checkRegion, setCheckRegion] = useState(false);
  const [checkNewBid, setCheckNewBid] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const inputRefs = useRef({});
  const inputFields = [
    "계약이름",
    "계약주소",
    "계약부서",
    "계약자이름",
    "계약금액",
    "계약내용",
  ];

  const fieldMapping = {
    계약이름: "contractName",
    계약주소: "contractAddress",
    계약부서: "contractRequestDepartment",
    계약자이름: "contractPartnerName",
    계약금액: "contractAmount",
    계약내용: "contract",
  };

  const onClickRegister = () => {
    const formData = {};

    inputFields.forEach((field) => {
      if (inputRefs.current[field]) {
        const mappedField = fieldMapping[field];
        formData[mappedField] = inputRefs.current[field].value;
      }
    });

    // Add the dates to the formData
    formData.contractStartDate = startDate.toISOString().split("T")[0];
    formData.contractEndDate = endDate.toISOString().split("T")[0];
    formData.checkRegion = checkRegion;
    formData.checkNewBid = checkNewBid;

    console.log("Sending data:", formData);

    axios
      .post(`http://172.30.104.63:5000/createWorkExperience`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Data sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div className="RegisterContractContianer">
      <h1>계약서 작성</h1>
      {inputFields.map((field, index) => (
        <div key={index} className="inputBox">
          <label>
            {field}
            <br />
            <textarea ref={(el) => (inputRefs.current[field] = el)} />
          </label>
          {field === "계약주소" && (
            <label className="checkRegion">
              충북 지역 체크
              <input
                type="checkbox"
                checked={checkRegion}
                onChange={(e) => setCheckRegion(e.target.checked)}
              ></input>
            </label>
          )}
          <br />
        </div>
      ))}
      <div className="datepickerContainer">
        <div>계약 시작일</div>
        <div>
          <DatePicker
            className="datepicker"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
      <div className="datepickerContainer">
        <div>계약 종료일</div>
        <div>
          <DatePicker
            className="datepicker"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <br />
        <label className="checkRegion">
          신규 입찰 체크
          <input
            type="checkbox"
            checked={checkNewBid}
            onChange={(e) => setCheckNewBid(e.target.checked)}
          ></input>
        </label>
      </div>

      <div className="searchBox" onClick={onClickRegister}>
        등록
      </div>
    </div>
  );
}
