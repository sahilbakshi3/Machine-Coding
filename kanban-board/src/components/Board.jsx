import React from "react";
import Task from "./Task";

const Board = ({ title, onDragOver, onDrop, boardId, tasks, onDragStart }) => {
  return (
    <div
      className="board"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, boardId)}
    >
      <h3>{title}</h3>
      <div className="task-list">
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            task={task}
            index={index}
            boardId={boardId}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
