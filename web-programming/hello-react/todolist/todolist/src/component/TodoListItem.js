import React, { useState } from "react";
import "../index.css";
import cn from "classnames";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
  MdEdit,
  MdUndo,
} from "react-icons/md";

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { text, checked, id } = todo;
  const [mytext, setMyText] = useState(text);
  const [isReadOnly, setisReadOnly] = useState(true);
  const handleChange = (event) => {
    setMyText(event.target.value);
  };
  const onClickEdit = () => {
    setisReadOnly((prev) => !prev);
  };
  const onClickInput = (e) => {
    e.stopPropagation();
  };
  const onClickUndo = () => {
    setMyText(text);
  };
  return (
    <div className="TodoListItem">
      <div
        className={cn("checkbox", { checked })}
        onClick={(e) => {
          onToggle(id);
          e.stopPropagation();
        }}
      >
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <input
          className="text"
          readOnly={isReadOnly}
          type="text"
          value={mytext}
          onChange={handleChange}
          onClick={onClickInput}
          style={{
            border: "none",
            borderBottom: isReadOnly ? "0px solid black" : "1px solid black",
            outline: "none",
          }}
        />
      </div>
      <div className="edit" onClick={onClickEdit}>
        <MdEdit />
      </div>
      <div className="undo" onClick={onClickUndo}>
        <MdUndo />
      </div>
      <div
        className="remove"
        onClick={(e) => {
          onRemove(id);
          e.stopPropagation();
        }}
      >
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};
export default TodoListItem;
