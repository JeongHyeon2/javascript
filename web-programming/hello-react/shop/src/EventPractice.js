import React, { useState } from "react";

const EventPractice = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const onChangeUserName = (e) => {
    setUsername(e.target.value);
  };
  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const onClick = () => {
    setUsername((prev) => "");
    setMessage((prev) => "");
    alert(`username: ${username}, message: ${message}`);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <div>
      <h1>이벤트</h1>

      <input
        type="text"
        name="username"
        placeholder="유저이름"
        value={username}
        onChange={onChangeUserName || ""}
      />
      <input
        type="text"
        name="message"
        placeholder="아무거나"
        value={message}
        onChange={onChangeMessage || ""}
        onKeyDown={onKeyDown}
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};
export default EventPractice;
