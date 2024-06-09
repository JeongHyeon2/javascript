import { useLocation, useNavigate } from "react-router-dom";
import "./Review.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Review() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [content, setContent] = useState("");
  const [star, setStar] = useState(null);
  useEffect(() => {
    const data = location.state.data;
    console.log(data);
    setData(data);
  }, []);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const postReview = () => {
    const formData = new FormData();
    formData.append("reviewPhoto", selectedFile);
    formData.append("userNum", localStorage.getItem("user_num"));
    formData.append("campsiteNum", data.campsite_num);
    formData.append("reviewPost", content);
    formData.append("reviewStar", star);
    axios
      .post(`${process.env.REACT_APP_MY_IP}/review`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        alert("리뷰 작성 성공");
        navigate("/main-page");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setSelectedFile(file);
  };
  return (
    <div>
      {data && (
        <div className="Review">
          <div>
            <img
              className="ReservationCampingContainerImg"
              src={`${process.env.REACT_APP_MY_IP}/${data.site_photo_url}`}
            ></img>
            캠핑장 이름 : {data.name} &nbsp; 카테고리 : {data.category}
            &nbsp; 사이트 이름 : {data.site_name}
          </div>
          {imageUrl && (
            <img
              className="ReservationCampingContainerImg"
              src={imageUrl}
              alt="Preview"
            />
          )}

          <input type="file" onChange={handleImageChange} />
          <div>
            <label>
              별점
              <input
                value={star}
                inputMode="numeric"
                onChange={(e) => {
                  setStar(e.target.value);
                }}
              ></input>
            </label>
          </div>
          <div>
            <label>
              내용
              <input
                className="ReviewContent"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></input>
            </label>
          </div>
          <button onClick={postReview}>확인</button>
        </div>
      )}
    </div>
  );
}
