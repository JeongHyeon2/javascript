import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setId(event.target.value);
  };

  const handlePwdChange = (event) => {
    setPwd(event.target.value);
  };

  const handleLogin = () => {
    try {
      axios
        .post(`${process.env.REACT_APP_MY_IP}/login`, { id: id, password: pwd })
        .then((response) => {
          const { user_num, role } = response.data[0]; // 서버에서 받은 토큰
          console.log(response.data);
          // 로그인 성공시 토큰을 로컬 스토리지에 저장
          localStorage.setItem("user_num", user_num);
          localStorage.setItem("role", role);

          // 로그인 성공시 /owner-register로 이동
          navigate("/main-page"); // useNavigate 훅 사용하여 페이지 이동
        })
        .catch((error) => {
          console.error("로그인 실패:", error);
        });
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        value={id}
        placeholder="아이디"
      />
      <input
        type="password"
        onChange={handlePwdChange}
        value={pwd}
        placeholder="비밀번호"
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
