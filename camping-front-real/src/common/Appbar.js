import { useNavigate } from "react-router-dom";
import "./Appbar.css";
export default function Appbar() {
  const navigate = useNavigate();
  const onClickLogin = () => {
    navigate("/login");
  };
  const onClickLogout = () => {
    localStorage.clear();
    alert("로그아웃 되었습니다.");
    navigate("/login", { replace: true });
  };
  const onClickMyPage = () => {
    if (localStorage.getItem("role") === "user") {
      navigate("/my-page");
    } else if (localStorage.getItem("role") === "admin") {
      navigate("/owner-campings");
    }
  };
  return (
    <div className="AppbarContainer">
      <div>{localStorage.getItem("role")}</div>
      {localStorage.getItem("user_num") == null ? (
        <button onClick={onClickLogin}>로그인</button>
      ) : (
        <button onClick={onClickLogout}>로그아웃</button>
      )}
      {localStorage.getItem("role") ? (
        <button onClick={onClickMyPage}>마이페이지</button>
      ) : null}
      <button
        onClick={() => {
          navigate("/main-page");
        }}
      >
        홈
      </button>
    </div>
  );
}
