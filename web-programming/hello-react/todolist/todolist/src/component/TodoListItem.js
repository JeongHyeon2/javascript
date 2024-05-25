import React from "react";
import "../index.css";
import cn from "classnames";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from "react-icons/md";

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { text, checked, id } = todo;

  return (
    <div
      className="TodoListItem"
      onClick={() => {
        onToggle(id);
      }}
    >
      <div className={cn("checkbox", { checked })}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
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
