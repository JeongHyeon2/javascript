import "./Retirement.css";

import { useState } from "react";
export default function GetRetirement() {
  return (
    <div className="RetirementContainer">
      <h1>퇴직금계산</h1>
      <div className="inputBox">
        <label>
          회원ID <input></input>
        </label>
      </div>

      <div className="searchBox">계산</div>
      <div className="resultBox">퇴직금:</div>
    </div>
  );
}
