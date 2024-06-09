import { useEffect, useState } from "react";
import "./Site.css";
export default function Site({ data, onClick }) {
  const { photo_url, name, address, telephone } = data;
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    setPhoto(`${process.env.REACT_APP_MY_IP}/${photo_url}`);
  }, []);
  return (
    <div className="Site" onClick={onClick}>
      <img className="site_img" alt="Preview" src={photo}></img>
      <div>캠핑장 이름: {name}</div>
      <div>캠핑장 주소: {address}</div>
      <div>전화번호: {telephone}</div>
    </div>
  );
}
