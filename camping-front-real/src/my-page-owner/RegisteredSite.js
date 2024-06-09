import "./RegisteredSite.css";

export default function RegisteredSite({ data, canRegister, onClick }) {
  console.log(data);
  const { site_photo_url, category, charge, capacity, site_name } = data;
  return (
    <div className="RegisteredSiteContainer">
      <img
        className="registered_img"
        src={`${process.env.REACT_APP_MY_IP}/${site_photo_url}`}
      ></img>
      <div>카테고리:{category}</div>
      <div>이름:{site_name}</div>
      <div>요금:{charge}</div>
      <div>인원수:{capacity}</div>
      {canRegister ? (
        <div>
          <button onClick={onClick}>예약</button>
        </div>
      ) : null}
    </div>
  );
}
