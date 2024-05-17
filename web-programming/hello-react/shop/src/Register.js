import { useRef, useState } from "react";

export default function Register() {
  const [validate, setValidate] = useState(false);
  const input = useRef([]);
  const onClick = () => {
    if (input.current[0].value.length < 4) {
      alert("아이디는 4자리 이상이어야합니다!");
      setValidate(false);
      return;
    }
    if (input.current[1].value.length < 5) {
      alert("비밀번호는 5자리 이상이어야합니다!");
      setValidate(false);
      return;
    }
    if (input.current[1].value !== input.current[2].value) {
      alert("비밀번호 확인이 다릅니다!");
      setValidate(false);
      return;
    }
    if (input.current[3].value.length === 0) {
      alert("이메일을 입력해주세요!");
      setValidate(false);
      return;
    }
    setValidate(true);
  };
  return (
    <div>
      <h1>회원가입</h1>
      <div>
        <div>
          <label>아이디</label>
          <input
            type="text"
            placeholder="4자리이상"
            ref={(el) => (input.current[0] = el)}
          ></input>
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="5자리이상"
            ref={(el) => (input.current[1] = el)}
          ></input>
        </div>
        <div>
          <label>비밀번호확인</label>
          <input
            type="password"
            placeholder="5자리이상"
            ref={(el) => (input.current[2] = el)}
          ></input>
        </div>
        <div>
          <label>이메일</label>
          <input
            type="text"
            placeholder="이메일"
            ref={(el) => (input.current[3] = el)}
          ></input>
        </div>
        <button onClick={onClick}>이메일인증</button>
      </div>
      {validate ? (
        <div>
          <label>이메일코드</label>
          <input type="text" placeholder="코드"></input>
          <button>입력</button>
        </div>
      ) : null}
    </div>
  );
}
