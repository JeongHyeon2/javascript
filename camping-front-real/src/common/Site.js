import { useEffect, useState } from "react";
import "./Site.css";
export default function Site({ data, onClick }) {
  const { photo_url, name, address, telephone } = data;
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    setPhoto(`${process.env.REACT_APP_MY_IP}/${photo_url}`);
  }, []);
  const TOTAL_SLIDES = 2;
  const [currentSlide, setCurrentSlide] = useState(0);
  const move = (e) => {
    e.stopPropagation();
    const buttonType = e.target.className;
    console.log(buttonType);
    if (buttonType === "nextButton") {
      setCurrentSlide((currentSlide + 1) % TOTAL_SLIDES);
    } else {
      setCurrentSlide(
        currentSlide - 1 < 0 ? TOTAL_SLIDES - 1 : currentSlide - 1
      );
    }
  };
  return (
    <div className="Site" onClick={onClick}>
      <div className="container">
        <div
          className="carousel-container"
          style={{ transform: `translateX(-${currentSlide}00%)` }}
        >
          <img
            className="slider"
            src={`${process.env.REACT_APP_MY_IP}/${photo_url}`}
          ></img>
          <img
            className="slider"
            src={`${process.env.REACT_APP_MY_IP}/${photo_url}`}
          ></img>
        </div>
        <div className="button-container">
          <button className="prevButton" onClick={move} value="prev">
            &larr;
          </button>
          <button className="nextButton" onClick={move} value="next">
            &rarr;
          </button>
        </div>
      </div>
      <div>캠핑장 이름: {name}</div>
      <div>캠핑장 주소: {address}</div>
      <div>전화번호: {telephone}</div>
    </div>
  );
}
