import React, { useState } from "react";

const EventPractice = () => {
  const [form, setForm] = useState({
    username: "",
    message: "",
  });
  const { username, message } = form;
  const onChange = (e) => {
    console.log(1, e.target.name);
    console.log(1, e.target.value);
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const onClick = () => {
    setForm({
      username: "",
      message: "",
    });
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
        onChange={onChange || ""}
      />
      <input
        type="text"
        name="message"
        placeholder="아무거나"
        value={message}
        onChange={onChange || ""}
        onKeyDown={onKeyDown}
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};
export default EventPractice;
