import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import TaskForm from "./components/TaskForm";
import "./App.css";

const initialData = {
  tasks: [],
  boards: {
    todo: [],
    inProgress: [],
    completed: [],
  },
};

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("kanbanData");
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("kanbanData", JSON.stringify(data));
  }, [data]);

  const addTask = (content) => {
    const newTask = { id: `task-${Date.now()}`, content };
    setData({
      tasks: [...data.tasks, newTask],
      boards: {
        ...data.boards,
        todo: [...data.boards.todo, newTask.id],
      },
    });
  };

  const onDragStart = (e, boardId, taskIndex) => {
    e.dataTransfer.setData("taskIndex", taskIndex);
    e.dataTransfer.setData("sourceBoardId", boardId);
  };

  const onDragOver = (e) => e.preventDefault();

  const onDrop = (e, targetBoardId) => {
    const taskIndex = e.dataTransfer.getData("taskIndex");
    const sourceBoardId = e.dataTransfer.getData("sourceBoardId");

    if (sourceBoardId === targetBoardId) return;

    const taskId = data.boards[sourceBoardId][taskIndex];

    const newSource = data.boards[sourceBoardId].filter(
      (_, i) => i !== Number(taskIndex),
    );
    const newTarget = [...data.boards[targetBoardId], taskId];

    setData({
      tasks: data.tasks,
      boards: {
        ...data.boards,
        [sourceBoardId]: newSource,
        [targetBoardId]: newTarget,
      },
    });
  };

  const getTasks = (boardId) =>
    data.boards[boardId].map((id) => data.tasks.find((task) => task.id === id));

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <TaskForm addTask={addTask} />

      <div className="board-container">
        <Board
          title="To Do"
          boardId="todo"
          tasks={getTasks("todo")}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />

        <Board
          title="In Progress"
          boardId="inProgress"
          tasks={getTasks("inProgress")}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />

        <Board
          title="Completed"
          boardId="completed"
          tasks={getTasks("completed")}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      </div>
    </div>
  );
}
