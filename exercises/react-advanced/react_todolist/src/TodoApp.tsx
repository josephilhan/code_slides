import React from "react";

import "./TodoApp.css";
import useTodos from "./useTodos";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import LoadFromApi from "./LoadFromApi";
import Stats from "./Stats";

const TodoApp = () => {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    loadFromApi,
    isLoading,
  } = useTodos();
  return (
    <div className="TodoApp">
      <h1>Todo App</h1>
      
      <div className="TodoApp__sidebar">
        <Stats todos={todos} />
        <LoadFromApi isLoading={isLoading} onLoad={loadFromApi} />
      </div>
      
      <div className="TodoApp__main">
        <div className="todolist-container">
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </div>
      </div>
      
      <div className="TodoApp__footer">
        <AddTodo onAddTodo={addTodo} />
      </div>
    </div>
  );
};

export default TodoApp;
