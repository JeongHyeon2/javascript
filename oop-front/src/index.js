import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import RegisterWorkEx from "./workEx/RegisterWorkEx";
import GetWorkEx from "./workEx/GetWorkEx";
import CardUsage from "./cardUsage/CardUsage";
import RegisterCardUsage from "./cardUsage/RegisterCardUsage";
import RegisterContract from "./contract/RegisterContract";
import Contract from "./contract/Contract";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ComponentStudy />);

function ComponentStudy() {
  return <Contract></Contract>;
}
