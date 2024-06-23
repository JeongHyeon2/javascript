import axios from "axios";
import { useState } from "react";
import "./CardUsage.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

export default function CardUsage() {
  const initialData = [
    {
      cardNum: 2,
      useTotalCost: 10000,
      executionPurpose: "test",
      attendees: "attendees",
    },
    {
      cardNum: 2,
      useTotalCost: 10000,
      executionPurpose: "tedsdsdsdsdsst",
      attendees: "attendees",
    },
    {
      cardNum: 2,
      useTotalCost: 1,
      executionPurpose: "test",
      attendees: "attendees",
    },
  ];

  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState(initialData);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onClick = () => {
    const params = {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      keyword: keyword,
    };

    axios
      .get("http://172.30.104.63:5000/getExecutionDetails", { params })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const ItemRow = ({ data }) => (
    <div className="row">
      <div>{data.cardNum}</div>
      <div>{data.executionPurpose}</div>
      <div>{data.useTotalCost}</div>
      <div>{data.attendees}</div>
      <div>zzz</div>
    </div>
  );

  return (
    <div className="CardUsageContainer">
      <div className="datepickerContainer">
        <div>시작일</div>
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
        <div>종료일</div>
        <div>
          <DatePicker
            className="datepicker"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
      <div className="inputBox">
        <div>키워드</div>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
      </div>
      <div className="searchBox" onClick={onClick}>
        검색
      </div>
      <div className="resultContainer">
        <div className="row">
          <div>id</div>
          <div>사용 설명</div>
          <div>금액</div>
          <div>사용 일자</div>
          <div>집행 일자</div>
        </div>
        {data.map((item, index) => (
          <ItemRow key={index} data={item} />
        ))}
      </div>
    </div>
  );
}
