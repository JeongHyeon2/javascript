import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./Asset.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Asset() {
  const inputRefs = useRef({});
  const [startDate, setStartDate] = useState(new Date());

  const inputFields = [
    "자산ID",
    "자산유형",
    "품목코드",
    "품목명",
    "규격",
    "수량",
    "단가",
    "총액",
  ];

  const fieldMapping = {
    자산ID: "asset_id",
    자산유형: "asset_type",
    품목코드: "item_code",
    품목명: "item_name",
    규격: "standard",
    수량: "item_count",
    단가: "item_unit_cost",
    총액: "item_amount",
    반납일자: "return_date",
  };

  const onClickRegister = () => {
    const formData = {};
    inputFields.forEach((field) => {
      formData[fieldMapping[field]] = inputRefs.current[field].value;
    });
    formData[fieldMapping["반납일자"]] = startDate.toISOString().split("T")[0];
    console.log(formData);
    axios
      .post("http://172.30.104.63:5000/registerAsset", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Data received successfully:", response);
      })
      .catch((error) => {
        console.error("Error receiving data:", error);
      });
  };

  return (
    <div className="AssetContainer">
      {inputFields.map((field, index) => (
        <div key={index} className="inputBox">
          <label>
            {field}
            <br />
            <textarea ref={(el) => (inputRefs.current[field] = el)} />
          </label>
          <br />
        </div>
      ))}
      <div className="datepickerContainer">
        <div>날짜</div>
        <div>
          <DatePicker
            className="datepicker"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
      <div className="searchBox" onClick={onClickRegister}>
        등록
      </div>
    </div>
  );
}
