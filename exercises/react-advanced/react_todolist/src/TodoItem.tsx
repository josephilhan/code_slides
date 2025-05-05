import React from "react";

import "./TodoItem.css";

type Props = {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

const TodoItem = (props: Props) => {
  let className = "todo-item";
  if (props.completed) {
    className += " completed";
  }
  
  return (
    <li className={className}>
      <div className="todo-item-text" onClick={props.onToggle}>
        <span className="todo-item-status">
          {props.completed ? "✓" : ""}
        </span>
        <span className={props.completed ? "todo-item-text-completed" : ""}>
          {props.title}
        </span>
      </div>
      <button className="todo-item-delete" onClick={(e) => {
        e.stopPropagation();
        props.onDelete();
      }}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
