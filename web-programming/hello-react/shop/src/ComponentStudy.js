import logo from "./logo.svg";
import React, { Fragment, useState, useRef } from "react";
import "./App.css";
import Greeting from "./Greeting";

function ComponentStudy() {
  const [textSwitch, setTextSwitch] = useState(true);

  return (
    <div>
      <Greeting
        text={textSwitch}
        handleClick={() => setTextSwitch(!textSwitch)}
      ></Greeting>
    </div>
  );
}

export default ComponentStudy;
