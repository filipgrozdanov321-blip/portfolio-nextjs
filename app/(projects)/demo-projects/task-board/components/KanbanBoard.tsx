"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { COLUMNS, ColumnId, Task } from "../data/tasks";
import KanbanColumn from "./KanbanColumn";
import { KanbanCardOverlay } from "./KanbanCard";
import "../styles/KanbanBoard.css";

interface KanbanBoardProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onCardSelect: (task: Task) => void;
}

const COLUMN_IDS: string[] = COLUMNS.map((c) => c.id);

export default function KanbanBoard({ tasks, setTasks, onCardSelect }: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Three sensors instead of one PointerSensor:
  //
  // - MouseSensor: a mouse drag starts after moving 8px (same as before), so a
  //   plain click still opens the edit dialog.
  // - TouchSensor: a finger drag starts after HOLDING for 250ms. That's the key
  //   change for phones. With a plain pointer sensor, a drag starts the moment a
  //   finger moves, which means you could never scroll the page or the board
  //   with a finger that landed on a card (the card grabbed it). Now a quick
  //   swipe scrolls as normal, and a short press-and-hold picks the card up.
  //   "tolerance" lets the finger wiggle 8px during that hold without cancelling.
  // - KeyboardSensor: Space picks a card up, arrow keys move it, Space drops it,
  //   Escape cancels. The board was not usable without a mouse before.
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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