"use client";

import { useState } from "react";
import { INITIAL_TASKS, Task } from "./data/tasks";
import KanbanHeader from "./components/KanbanHeader";
import KanbanBoard from "./components/KanbanBoard";
import KanbanTaskModal from "./components/KanbanTaskModal";

type ModalState = { mode: "create" } | { mode: "edit"; task: Task } | null;

export default function TaskBoardPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [modalState, setModalState] = useState<ModalState>(null);

  function handleSaveTask(task: Task) {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === task.id);
      return exists ? prev.map((t) => (t.id === task.id ? task : t)) : [...prev, task];
    });
    setModalState(null);
  }

  function handleDeleteTask(taskId: string) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setModalState(null);
  }

  return (
    <main className="kanban-container">
      <KanbanHeader onAddTask={() => setModalState({ mode: "create" })} />

      <KanbanBoard
        tasks={tasks}
        setTasks={setTasks}
        onCardSelect={(task) => setModalState({ mode: "edit", task })}
      />

      {modalState?.mode === "create" && (
        <KanbanTaskModal
          mode="create"
          onClose={() => setModalState(null)}
          onSave={handleSaveTask}
        />
      )}

      {modalState?.mode === "edit" && (
        <KanbanTaskModal
          mode="edit"
          task={modalState.task}
          onClose={() => setModalState(null)}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}
    </main>
  );
}