import React from "react";
import "./css/tab.css";

export default function Tab(props) {
  const { name, isSelected, click } = props;
  return (
    <div
      className={`tabContainer ${isSelected ? "selected" : ""}`}
      onClick={click}
    >
      {name || "null"}
    </div>
  );
}
