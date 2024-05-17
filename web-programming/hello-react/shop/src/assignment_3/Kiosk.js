import React, { useState } from "react";
import Tab from "./Tab";
import MenuList from "./MenuList";
import "./css/kiosk.css";

export default function Kiosk() {
  const [selectedTab, setSelectedTab] = useState("커피");

  const handleClick = (tabName) => {
    setSelectedTab(tabName);
  };
  const getType = (korType) => {
    if (korType === "커피") return "COFFEE";
    if (korType === "티") return "TEA";
  };

  return (
    <div className="kiosk_parent">
      <div className="kiosk_tab">
        <Tab
          name="커피"
          isSelected={selectedTab === "커피"}
          click={() => handleClick("커피")}
        />
        <Tab
          name="티"
          isSelected={selectedTab === "티"}
          click={() => handleClick("티")}
        />
      </div>
      <div className="kiosk_container">
        <MenuList type={getType(selectedTab)} />
      </div>
    </div>
  );
}
