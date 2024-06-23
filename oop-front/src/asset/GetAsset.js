import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./Asset.css";
import "react-datepicker/dist/react-datepicker.css";

export default function GetAsset() {
  const [data, setData] = useState([]);

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
  useEffect(() => {}, []);

  const onClickRegister = () => {
    axios
      .get(`http://172.30.104.63:5000/viewAsset/1/test`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Data received successfully:", response);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error receiving data:", error);
      });
  };

  return <div className="AssetContianer"></div>;
}
