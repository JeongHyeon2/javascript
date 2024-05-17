import "./css/order_item.css";
export default function OrderItem(props) {
  return (
    <div className="order_item_container">
      {props.item.name} {props.item.count}
      <div className="order_btns">
        <div className="order_btn" onClick={() => props.addItem(props.item)}>
          +
        </div>
        <div className="order_btn" onClick={() => props.minusItem(props.item)}>
          -
        </div>
        <div className="order_btn" onClick={() => props.deleteItem(props.item)}>
          x
        </div>
      </div>
    </div>
  );
}
