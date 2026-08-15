"use client";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { COLUMNS, ColumnId, Priority, Task } from "../data/tasks";
import "../styles/KanbanTaskModal.css";

interface KanbanTaskModalProps {
  mode: "create" | "edit";
  task?: Task;
  defaultColumnId?: ColumnId;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

interface FormState {
  title: string;
  description: string;
  priority: Priority;
  assignee: string;
  dueDate: string;
  columnId: ColumnId;
}

function buildInitialState(
  mode: "create" | "edit",
  task?: Task,
  defaultColumnId?: ColumnId
): FormState {
  if (mode === "edit" && task) {
    return {
      title: task.title,
      description: task.description,
      priority: task.priority,
      assignee: task.assignee,
      dueDate: task.dueDate ?? "",
      columnId: task.columnId,
    };
  }
  return {
    title: "",
    description: "",
    priority: "Medium",
    assignee: "",
    dueDate: "",
    columnId: defaultColumnId ?? "todo",
  };
}

export default function KanbanTaskModal({
  mode,
  task,
  defaultColumnId,
  onClose,
  onSave,
  onDelete,
}: KanbanTaskModalProps) {
  const [form, setForm] = useState<FormState>(() =>
    buildInitialState(mode, task, defaultColumnId)
  );
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Give the task a title before saving.");
      return;
    }

    const savedTask: Task = {
      id: mode === "edit" && task ? task.id : `task-${Date.now()}`,
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      assignee: form.assignee.trim() || "Unassigned",
      dueDate: form.dueDate || undefined,
      columnId: form.columnId,
    };

    onSave(savedTask);
  }

  return (
    <div className="kanban-modal-overlay" onClick={onClose}>
      <div className="kanban-modal" onClick={(e) => e.stopPropagation()}>
        <div className="kanban-modal-header">
          <h2 className="kanban-modal-title">{mode === "create" ? "Add Task" : "Edit Task"}</h2>
          <button type="button" className="kanban-modal-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form className="kanban-modal-form" onSubmit={handleSubmit}>
          <label className="kanban-field">
            <span className="kanban-field-label">Title</span>
            <input
              type="text"
              className="kanban-field-input"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. Fix login redirect bug"
              autoFocus
            />
          </label>

          <label className="kanban-field">
            <span className="kanban-field-label">Description</span>
            <textarea
              className="kanban-field-textarea"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="What needs to happen?"
              rows={3}
            />
          </label>

          <div className="kanban-field-row">
            <label className="kanban-field">
              <span className="kanban-field-label">Priority</span>
              <select
                className="kanban-field-input"
                value={form.priority}
                onChange={(e) => update("priority", e.target.value as Priority)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>

            <label className="kanban-field">
              <span className="kanban-field-label">Assignee</span>
              <input
                type="text"
                className="kanban-field-input"
                value={form.assignee}
                onChange={(e) => update("assignee", e.target.value)}
                placeholder="e.g. Alex Chen"
              />
            </label>
          </div>

          <div className="kanban-field-row">
            <label className="kanban-field">
              <span className="kanban-field-label">Due date</span>
              <input
                type="date"
                className="kanban-field-input"
                value={form.dueDate}
                onChange={(e) => update("dueDate", e.target.value)}
              />
            </label>

            {mode === "create" && (
              <label className="kanban-field">
                <span className="kanban-field-label">Column</span>
                <select
                  className="kanban-field-input"
                  value={form.columnId}
                  onChange={(e) => update("columnId", e.target.value as ColumnId)}
                >
                  {COLUMNS.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.title}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          {error && <p className="kanban-field-error">{error}</p>}

          <div className="kanban-modal-actions">
            {mode === "edit" && task && onDelete && (
              <button
                type="button"
                className="kanban-btn kanban-btn-delete"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            )}
            <div className="kanban-modal-actions-right">
              <button type="button" className="kanban-btn kanban-btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="kanban-btn kanban-btn-save">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}