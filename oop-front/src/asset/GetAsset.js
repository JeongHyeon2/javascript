import axios from "axios";
import { useEffect } from "react";

export default function GetAsset() {
  useEffect(() => {
    axios
      .get(`http://172.30.101.89:5000/viewAsset/1/test`, {
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
  return <div>getAsset</div>;
}
