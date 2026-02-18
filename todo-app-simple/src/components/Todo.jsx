import React, { useState } from "react";
import "./Todo.css";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdate = () => {
    if (!input.trim()) return;

    if (editId) {
      setTodos(todos.map((t) => (t.id === editId ? { ...t, text: input } : t)));
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: input }]);
    }
    setInput("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleEdit = (todo) => {
    setInput(todo.text);
    setEditId(todo.id);
  };

  return (
    <div className="container">
      <h2>Todo App</h2>

      <div className="inputRow">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />
        <button className="addBtn" onClick={handleAddOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id} className="todoItem">
            <span>{todo.text}</span>

            <div>
              <button className="editBtn" onClick={() => handleEdit(todo)}>
                Edit
              </button>
              <button
                className="deleteBtn"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
