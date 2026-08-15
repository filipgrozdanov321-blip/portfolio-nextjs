import React, { useState } from "react";
import "./ToDoForm.css";

// Define the shape of a task (same as in ToDoApp.tsx)
interface NewTask {
  taskName: string;
  description: string;
  id: number;
  completed: boolean;
}

// Typing the Form component's props
interface FormProps {
  addTask: (newTask: NewTask) => void; // Expecting a function that accepts a NewTask
}

function Form({ addTask }: FormProps) {
  const [taskName, setTaskName] = useState<string>(""); 
  const [description, setDescription] = useState<string>(""); 
  const [error, setError] = useState<string>(""); // Error message state

  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
    if (e.target.value.trim() !== "") {
      setError(""); // Clear error when user types in the title
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskName.trim() === "") {
      setError("Task title is required!"); // Show error if title is empty
      return;
    }

    const newTask: NewTask = {
      id: Date.now(),       // unique ID for each task
      taskName: taskName,
      description: description, // can be empty
      completed: false      // start as not completed
    };

    addTask(newTask); // Call the parent function

    setTaskName("");
    setDescription("");
  };

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={handleTaskNameChange}
        />
        {error && <p className="error-message">{error}</p>} 
        <input
          type="text"
          placeholder="What is your task?"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button id="submit" type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default Form;
