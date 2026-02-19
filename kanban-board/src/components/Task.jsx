import React from "react";

const Task = ({ task, index, boardId, onDragStart, onDragOver, onDrop }) => {
  return (
    <div
      className="task"
      draggable
      onDragStart={(e) => onDragStart(e, boardId, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, boardId)}
    >
      {task.content}
    </div>
  );
};

export default Task;
