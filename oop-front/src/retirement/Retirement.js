import "./Retirement.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from "react";
export default function Retirement() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div className="RetirementContainer">
      <h1>퇴직금계산</h1>
      <div className="inputBox">
        <label>
          회원ID <input></input>
        </label>
      </div>
      <div className="datepickerContainer">
        <div>근무 시작일</div>
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
        <div>근무 종료일</div>
        <div>
          <DatePicker
            className="datepicker"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
      <div className="searchBox">계산</div>
      <div className="resultBox">퇴직금:</div>
    </div>
  );
}
