import { useEffect, useRef, useState } from "react";
import "./RegisterContract.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function Contract() {
  const [checkRegion, setCheckRegion] = useState(false);
  const [checkNewBid, setCheckNewBid] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const inputRefs = useRef({});
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

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
  const onClickContract = () => {};

  return (
    <>
      <div className="InputContractNumber">
        <h1>계약서 번호 입력 </h1>
        <div className="inputBox">
          <label>
            계약서 번호:
            <input></input>
          </label>
        </div>
        <div className="searchBox" onClick={onClickContract}>
          계약서 가져오기
        </div>
      </div>
      <div className="RegisterContractContianer">
        <h1>계약서 조회</h1>
        {inputFields.map((field, index) => (
          <div key={index} className="inputBox">
            <label>
              {field}
              <br />
              <textarea
                disabled={true}
                ref={(el) => (inputRefs.current[field] = el)}
              />
            </label>
            {field === "계약주소" && (
              <label className="checkRegion">
                충북 지역 체크
                <input
                  disabled={true}
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
              disabled={true}
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
              disabled={true}
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
              disabled={true}
              checked={checkNewBid}
              onChange={(e) => setCheckNewBid(e.target.checked)}
            ></input>
          </label>
        </div>
      </div>
    </>
  );
}
