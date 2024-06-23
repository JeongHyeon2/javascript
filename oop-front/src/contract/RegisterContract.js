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
    "계약상대자이름",
    "계약금액",
    "계약내용",
  ];

  const fieldMapping = {
    계약이름: "contract_name",
    계약주소: "contract_address",
    계약부서: "contractRequest_department",
    계약자이름: "contractor_name",
    계약금액: "contract_amount",
    계약내용: "contract_content",
    계약상대자이름: "contract_partner_name",
  };

  const onClickRegister = () => {
    const formData = {};

    for (const field of inputFields) {
      const inputValue = inputRefs.current[field]?.value;
      if (!inputValue) {
        alert(`${field}을(를) 입력해주세요.`);
        return;
      }
      const mappedField = fieldMapping[field];
      formData[mappedField] = inputValue;
    }

    // Add the dates to the formData
    formData.contract_start_date = startDate.toISOString().split("T")[0];
    formData.contract_end_date = endDate.toISOString().split("T")[0];
    formData.is_Contractor_chungbuk_region = checkRegion ? 1 : 0;
    formData.is_New_bid = checkNewBid ? 1 : 0;

    console.log("Sending data:", formData);

    axios
      .post(`http://172.30.104.63:5000/writeContract`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Data sent successfully:", response.data);
        if (response.data) {
        } else {
          alert("계약 날짜가 잘못되었습니다.");
        }
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
