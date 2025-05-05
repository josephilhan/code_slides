import React, { useState } from "react";
import "./AddTodo.css";

type Props = {
  onAddTodo: (title: string) => void;
};

const AddTodo = (props: Props) => {
  const [newTitle, setNewTitle] = useState("");
  return (
    <form
      className="add-todo-form"
      onSubmit={(event) => {
        event.preventDefault();
        props.onAddTodo(newTitle);
        setNewTitle("");
      }}
    >
      <label className="add-todo-label">
        Add a new todo
        <input
          className="add-todo-input"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          placeholder="What needs to be done?"
        />
      </label>
      <button 
        className="add-todo-button"
        disabled={newTitle.length === 0}
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;
