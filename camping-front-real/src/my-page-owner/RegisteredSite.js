import "./RegisteredSite.css";

export default function RegisteredSite({ data }) {
  console.log(data);
  const { site_photo_url, category, charge, capacity } = data;
  return (
    <div>
      <img
        className="registered_img"
        src={`${process.env.REACT_APP_MY_IP}/${site_photo_url}`}
      ></img>
      <div>{category}</div>
      <div>{charge}</div>
      <div>{capacity}</div>
    </div>
  );
}
