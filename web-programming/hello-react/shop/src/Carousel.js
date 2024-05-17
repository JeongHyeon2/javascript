import { useState, useRef } from "react";
import "./Carousel.css";
import munu1 from "./img/menu1.jpg";
import munu2 from "./img/menu2.jpg";
import munu3 from "./img/menu3.jpg";

const TOTAL_SLIDES = 3; // 전체 슬라이드 개수(총3개. 배열로 계산)

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const move = (e) => {
    const buttonType = e.target.dataset.btntype;
    if (buttonType === "next") {
      setCurrentSlide((prev) => (prev + 1) % 3);
    } else if (buttonType === "prev") {
      setCurrentSlide((prev) => (prev - 1 < 0 ? TOTAL_SLIDES - 1 : prev - 1));
    }
  };

  return (
    <div className="container">
      <h1>{currentSlide + 1}번 째 사진</h1>
      <div
        className="carousel-container"
        style={{
          transform: `translateX(-${currentSlide}00%)`,
        }}
      >
        <img className="slider" src={munu1}></img>
        <img className="slider" src={munu2}></img>
        <img className="slider" src={munu3}></img>
      </div>
      <div className="button-container">
        <button className="prevButton" onClick={move} data-btntype={"prev"}>
          Prev
        </button>
        <button className="nextButton" onClick={move} data-btntype={"next"}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
