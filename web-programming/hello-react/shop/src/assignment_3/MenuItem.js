import "./css/menu_item.css";
export default function MenuItem(props) {
  return (
    <div className="menu_item_container" onClick={props.onClick}>
      <div>
        <img className="menu_item_img" src={props.item.imgName}></img>
      </div>
      <div>{props.item.name}</div>
      <div>{props.item.price}</div>
    </div>
  );
}
