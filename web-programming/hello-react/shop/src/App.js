import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Paging from "./Paging";
import EventPractice from "./EventPractice";

const shop1 = {
  shopId: 0,
  name: "한솥도시락",
  address: "경북 구미시 대학로 39",
  phoneNumber: "054-472-0615",
  imageUrl:
    "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190129_78%2F1548769656380Gis2f_JPEG%2F2ouPWK3JIzUca0Bh-7Onclqk.jpg",
  star: 4.48,
};
const shop2 = {
  shopId: 1,
  name: "짜장꽃필무렵",
  address: "경북 구미시 대학로 39 라동 101호",
  phoneNumber: "054-471-8414",
  imageUrl:
    "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240317_233%2F1710643119018hwXTK_JPEG%2FIMG_4240.jpeg",
  star: 4.38,
};

function App() {
  const [shop, setShop] = useState([shop1, shop2]);
  const [selectedShop, setSelectedShop] = useState(null);

  function onClickShop(event) {
    const id = parseInt(event.currentTarget.dataset.seq);
    console.log(id);
    setSelectedShop(shop[id]);
  }
  return (
    <div className="post-container">
      <EventPractice></EventPractice>

      <hr></hr>
      <div
        className="post-list"
        onClick={onClickShop}
        data-seq={shop[0].shopId}
      >
        <h2>상호명: {shop[0].name}</h2>
        <img src={shop[0].imageUrl}></img>
      </div>
      <div
        className="post-list"
        onClick={onClickShop}
        data-seq={shop[1].shopId}
      >
        <h2>상호명: {shop[1].name}</h2>
        <img src={shop[1].imageUrl}></img>
      </div>
      <div>
        <h2>상세정보</h2>
        <div>
          <div>
            <span>주소</span> {selectedShop != null ? selectedShop.address : ""}
          </div>
          <div>
            <span>
              전화번호 {selectedShop != null ? selectedShop.phoneNumber : ""}
            </span>
          </div>
          <div>
            <span>별점 {selectedShop != null ? selectedShop.star : ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
