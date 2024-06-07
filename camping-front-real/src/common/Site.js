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
      <div>{name}</div>
      <div>{address}</div>
      <div>{telephone}</div>
    </div>
  );
}
