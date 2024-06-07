import "./MySiteRegister.css";
import React, { useState, useEffect } from "react";
export default function MySiteRegister({ addSite }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      사이트 리스트
      <div>
        <button onClick={() => setIsModalOpen(!isModalOpen)}>
          사이트 추가
        </button>
      </div>
      <div>{isModalOpen && <SiteRegister />}</div>
    </div>
  );

  function SiteRegister() {
    const [price, setPrice] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [peopleCount, setPeopleCount] = useState("");
    const [name, setName] = useState("");
    const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태 추가
    const [imageUrl, setImageUrl] = useState(""); // 이미지 미리보기 URL 상태 추가

    const closeModal = () => setIsModalOpen(false);
    const handleSelectChange = (e) => {
      setSelectedOption(e.target.value);
    };

    const handlePeopleCountChange = (e) => {
      setPeopleCount(e.target.value);
    };

    const handlePriceChange = (e) => {
      setPrice(e.target.value);
    };
    const handleNameChange = (e) => {
      setName(e.target.value);
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImageFile(file);

      // 이미지 미리보기 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    };

    const handleSubmit = () => {
      const newSite = {
        sitePhotoUrl: imageFile, // 이미지 URL 사용
        siteName: name,
        category: selectedOption || "캠핑",
        pCapacity: parseInt(peopleCount),
        charge: parseInt(price),
      };
      closeModal();
      addSite(newSite);
    };

    return (
      <div className="modalOverlay">
        <div className="modalContent">
          <div className="image-container">
            {/* 이미지 미리보기 */}
            {imageUrl && (
              <img src={imageUrl} alt="Preview" className="preview-image" />
            )}
            {/* 파일 선택 인풋 */}
            <input type="file" onChange={handleImageChange} />
          </div>
          <div className="inputContainer">
            사이트 이름{" "}
            <input className="input" value={name} onChange={handleNameChange} />
          </div>
          <select
            value={selectedOption}
            onChange={handleSelectChange}
            className="selectMenu"
          >
            <option value="캠핑">캠핑</option>
            <option value="글램핑">글램핑</option>
            <option value="카라반">카라반</option>
            <option value="펜션">펜션</option>
          </select>
          <div className="inputContainer">
            인원수{" "}
            <input
              className="input"
              value={peopleCount}
              onChange={handlePeopleCountChange}
            />
          </div>
          <div className="inputContainer">
            요금{" "}
            <input
              className="input"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
          <div className="modalOverlay-btn">
            <button onClick={closeModal}>닫기</button>
            <button onClick={handleSubmit}>확인</button>
          </div>
        </div>
      </div>
    );
  }
}
