"use client";

import "./ToDoList.css";
import ToDoItem from "./ToDoItem";
import { Task } from "../Home";

interface ToDoListProps {
  tasks: Task[];
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}

export default function ToDoList({
  tasks,
  toggleComplete,
  deleteTask,
}: ToDoListProps) {
  return (
    <div className="todo-list-container">
      {tasks.length > 0 && <h2>Task List</h2>}

      <ul className="todo-list">
        {tasks.map((task) => (
          <ToDoItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}
