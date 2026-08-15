"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { COLUMNS, ColumnId, Task } from "../data/tasks";
import KanbanColumn from "./KanbanColumn";
import KanbanCard, { KanbanCardOverlay } from "./KanbanCard";
import "../styles/KanbanBoard.css";

interface KanbanBoardProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onCardSelect: (task: Task) => void;
}

const COLUMN_IDS: string[] = COLUMNS.map((c) => c.id);

export default function KanbanBoard({ tasks, setTasks, onCardSelect }: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    if (activeId === overId) return;

    const activeTaskItem = tasks.find((t) => t.id === activeId);
    if (!activeTaskItem) return;

    const overIsColumn = COLUMN_IDS.includes(overId);
    const overTask = tasks.find((t) => t.id === overId);
    const targetColumnId: ColumnId = overIsColumn
      ? (overId as ColumnId)
      : overTask
      ? overTask.columnId
      : activeTaskItem.columnId;

    if (activeTaskItem.columnId !== targetColumnId) {
      setTasks((prev) =>
        prev.map((t) => (t.id === activeId ? { ...t, columnId: targetColumnId } : t))
      );
      return;
    }

    if (!overTask) return;

    setTasks((prev) => {
      const columnTasks = prev.filter((t) => t.columnId === targetColumnId);
      const otherTasks = prev.filter((t) => t.columnId !== targetColumnId);
      const oldIndex = columnTasks.findIndex((t) => t.id === activeId);
      const newIndex = columnTasks.findIndex((t) => t.id === overId);
      return [...otherTasks, ...arrayMove(columnTasks, oldIndex, newIndex)];
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveTask(null)}
    >
      <div className="kanban-board">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={tasks.filter((t) => t.columnId === column.id)}
            onCardSelect={onCardSelect}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? <KanbanCardOverlay task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}