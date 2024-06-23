import { useRef } from "react";
import axios from "axios";
import "./RegisterCardUsage.css";

export default function RegisterCardUsage() {
  const inputRefs = useRef({});

  const inputFields = [
    "사용총비용",
    "사용목적",
    "카드사용내역리스트",
    "참석자들",
  ];

  const fieldMapping = {
    사용총비용: "useTotalCost",
    사용목적: "executionPurpose",
    카드사용내역리스트: "cardUsageDetails",
    참석자들: "attendees",
  };

  const onClickRegister = () => {
    const formData = {};

    inputFields.forEach((field) => {
      if (inputRefs.current[field]) {
        const mappedField = fieldMapping[field];
        formData[mappedField] = inputRefs.current[field].value;
      }
    });

    console.log("Sending data:", formData);

    axios
      .post(`http://172.30.104.63:5000/addExecutionDetail`, formData, {
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
    <div className="RegisterCardUsageContainer">
      <h1> 내역 등록</h1>
      {inputFields.map((field, index) => (
        <div key={index} className="inputBox">
          <label>
            {field}
            <input ref={(el) => (inputRefs.current[field] = el)} />
          </label>
          <br />
        </div>
      ))}
      <div className="searchBox" onClick={onClickRegister}>
        등록
      </div>
    </div>
  );
}
