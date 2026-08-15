"use client";

import { Plus } from "lucide-react";
import "../styles/KanbanHeader.css";
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";

interface KanbanHeaderProps {
  onAddTask: () => void;
}

export default function KanbanHeader({ onAddTask }: KanbanHeaderProps) {
  return (
    <header className="kanban-header">
      <BackButton />
      <div className="kanban-header-text">
        <h1 className="kanban-header-title">Task Board</h1>
        <p className="kanban-header-subtitle">
          Drag tasks between columns, reorder within a column, and keep an eye on the WIP limit.
        </p>
      </div>
      <button type="button" className="kanban-add-button" onClick={onAddTask}>
        <Plus size={16} />
        Add Task
      </button>
    </header>
  );
}