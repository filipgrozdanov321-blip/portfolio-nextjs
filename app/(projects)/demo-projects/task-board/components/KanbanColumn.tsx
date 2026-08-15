"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ColumnConfig, Task } from "../data/tasks";
import KanbanCard from "./KanbanCard";
import "../styles/KanbanColumn.css";

interface KanbanColumnProps {
  column: ColumnConfig;
  tasks: Task[];
  onCardSelect: (task: Task) => void;
}

type WipStatus = "safe" | "warning" | "danger";

function getWipStatus(count: number, limit?: number): WipStatus | null {
  if (limit === undefined) return null;
  if (count > limit) return "danger";
  if (count === limit) return "warning";
  return "safe";
}

export default function KanbanColumn({ column, tasks, onCardSelect }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  const wipStatus = getWipStatus(tasks.length, column.wipLimit);

  return (
    <div className={`kanban-column${isOver ? " kanban-column-over" : ""}`}>
      <div className="kanban-column-header">
        <div className="kanban-column-title-row">
          <h2 className="kanban-column-title">{column.title}</h2>
          <span className="kanban-column-count">{tasks.length}</span>
        </div>

        {column.wipLimit !== undefined && wipStatus && (
          <span className={`kanban-wip-indicator kanban-wip-${wipStatus}`}>
            {tasks.length}/{column.wipLimit} WIP
          </span>
        )}
      </div>

      <div ref={setNodeRef} className="kanban-column-body">
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} onSelect={onCardSelect} />
          ))}
          {tasks.length === 0 && <div className="kanban-column-empty">No tasks here — drag one in</div>}
        </SortableContext>
      </div>
    </div>
  );
}