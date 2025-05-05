import React from "react";
import Todo from "./Todo";
import "./Stats.css";

type Props = {
  todos: Array<Todo>;
};

const Stats = (props: Props) => {
  const numTotal = props.todos.length;
  const numCompleted = props.todos.filter((todo) => todo.completed).length;
  const numIncomplete = numTotal - numCompleted;
  
  return (
    <div className="stats">
      <div className="stats-item">
        <div className="stats-number">{numTotal}</div>
        <div className="stats-label">Total</div>
      </div>
      
      <div className="stats-item">
        <div className="stats-number">{numIncomplete}</div>
        <div className="stats-label">Active</div>
      </div>
      
      <div className="stats-item">
        <div className="stats-number">{numCompleted}</div>
        <div className="stats-label">Completed</div>
      </div>
    </div>
  );
};

export default Stats;
