import axios from "axios";
import { useEffect, useState } from "react";
import "./Asset.css";
import "react-datepicker/dist/react-datepicker.css";

export default function GetAsset() {
  const [data, setData] = useState([]);
  const [assetId, setAssetId] = useState("");
  const [assetType, setAssetType] = useState("");

  const inputFields = [
    "자산ID",
    "자산유형",
    "품목코드",
    "품목명",
    "규격",
    "수량",
    "단가",
    "총액",
    "반납일자",
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

  useEffect(() => {}, [assetId, assetType]);

  const renderRows = () => {
    return data.map((item, index) => (
      <div key={index} className="row">
        {inputFields.map((field) => (
          <div key={field} className="cell">
            {field === "반납일자"
              ? item[fieldMapping[field]].split("T")[0]
              : item[fieldMapping[field]]}
          </div>
        ))}
      </div>
    ));
  };

  const handleAssetIdChange = (event) => {
    setAssetId(event.target.value);
  };

  const handleAssetTypeChange = (event) => {
    setAssetType(event.target.value);
  };

  return (
    <div className="AssetContainer">
      <div className="input-fields">
        <input
          type="text"
          placeholder="자산ID 입력"
          value={assetId}
          onChange={handleAssetIdChange}
        />
        <input
          type="text"
          placeholder="자산유형 입력"
          value={assetType}
          onChange={handleAssetTypeChange}
        />
        <button onClick={() => setData([])}>Clear Data</button>
        <button
          onClick={() => {
            if (assetId && assetType) {
              axios
                .get(
                  `http://172.30.104.63:5000/viewAsset/${assetId}/${assetType}`,
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((response) => {
                  console.log("Data received successfully:", response);
                  setData(response.data);
                })
                .catch((error) => {
                  console.error("Error receiving data:", error);
                });
            }
          }}
        >
          Search
        </button>
      </div>
      <div className="header">
        {inputFields.map((field) => (
          <div key={field} className="header-cell">
            {field}
          </div>
        ))}
      </div>
      <div className="body">{renderRows()}</div>
    </div>
  );
}
