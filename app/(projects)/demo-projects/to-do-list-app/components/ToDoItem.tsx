"use client";

import "./ToDoItem.css";
import { Task } from "../Home";

interface ToDoItemProps {
  task: Task;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
}

export default function ToDoItem({
  task,
  deleteTask,
  toggleComplete,
}: ToDoItemProps) {
  return (
    <li className={`todo-item ${task.completed ? "completed" : ""}`}>
      <input
        className="todo-checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />

      <div className="todo-content">
        <h3>{task.taskName}</h3>
        <p>{task.description}</p>
      </div>

      <button
        className="todo-delete"
        onClick={() => deleteTask(task.id)}
      >
        Delete
      </button>
    </li>
  );
}
