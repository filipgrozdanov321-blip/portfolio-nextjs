"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar } from "lucide-react";
import { Task } from "../data/tasks";
import "../styles/KanbanCard.css";

interface KanbanCardProps {
  task: Task;
  onSelect: (task: Task) => void;
}

const PRIORITY_CLASS: Record<Task["priority"], string> = {
  Low: "kanban-priority-low",
  Medium: "kanban-priority-medium",
  High: "kanban-priority-high",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase())
    .slice(0, 2)
    .join("");
}

function formatDueDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function CardBody({ task }: { task: Task }) {
  return (
    <>
      <div className="kanban-card-top">
        <span className={`kanban-priority-badge ${PRIORITY_CLASS[task.priority]}`}>
          <span className="kanban-priority-dot" />
          {task.priority}
        </span>
      </div>

      <h3 className="kanban-card-title">{task.title}</h3>
      <p className="kanban-card-description">{task.description}</p>

      <div className="kanban-card-footer">
        <div className="kanban-card-assignee" title={task.assignee}>
          {getInitials(task.assignee)}
        </div>
        {task.dueDate && (
          <div className="kanban-card-due">
            <Calendar size={12} />
            <span>{formatDueDate(task.dueDate)}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default function KanbanCard({ task, onSelect }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="kanban-card"
      onClick={() => onSelect(task)}
    >
      <CardBody task={task} />
    </div>
  );
}

// Static visual copy for <DragOverlay>. No useSortable here on purpose —
// the "real" card already owns that hook for this task id, and dnd-kit
// doesn't allow two sortable registrations for the same id at once.
export function KanbanCardOverlay({ task }: { task: Task }) {
  return (
    <div className="kanban-card kanban-card-overlay">
      <CardBody task={task} />
    </div>
  );
}