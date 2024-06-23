import axios from "axios";
import { useEffect } from "react";

export default function Asset() {
  useEffect(() => {
    const formData = {};
    formData.asset_id = 1;
    formData.asset_type = "test";
    formData.item_code = "itemcode";
    formData.item_name = "itemname";
    formData.standard = "Intel Core i7, 16GB RAM";
    formData.item_count = 5;
    formData.item_unit_cost = 500;
    formData.item_amount = 10;
    formData.return_date = "2024-06-25";

    axios
      .post(`http://172.30.101.89:5000/registerAsset`, formData, {
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
  }, []);
  return <div>test</div>;
}
