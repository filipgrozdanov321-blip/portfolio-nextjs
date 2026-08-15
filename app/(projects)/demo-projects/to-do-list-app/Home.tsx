"use client";

import { useState } from "react";
import ToDoForm from "./components/ToDoForm";
import ToDoList from "./components/ToDoList";
import "./styles.css";

export interface Task {
  id: string;
  taskName: string;
  description: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      taskName: task.taskName,
      description: task.description,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="to-do-list-app-container">
      <ToDoForm addTask={addTask} />
      <ToDoList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    </div>
  );
}
