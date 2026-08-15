"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import "./HabitCard.css";

export interface Habit {
  id: string;
  name: string;
  description: string;
  totalDays: number;
  completedDays: number;
  completed: boolean;
  createdAt?: string;
}

interface HabitCardProps {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
  onAddDay: (id: string) => Promise<string>;
  mode?: "active" | "completed";
}

export default function HabitCard({
  habit,
  onEdit,
  onDelete,
  onAddDay,
  mode = "active",
}: HabitCardProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDisabledToday, setIsDisabledToday] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [updatedHabit, setUpdatedHabit] = useState<Habit>({ ...habit });

  useEffect(() => {
    if (mode !== "active") return;

    const today = new Date().toLocaleDateString();
    const lastAddedDate = localStorage.getItem(`lastAddedDate_${habit.id}`);

    if (lastAddedDate === today) {
      setIsDisabledToday(true);
    }

    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const timer = setTimeout(() => {
      setIsDisabledToday(false);
      localStorage.removeItem(`lastAddedDate_${habit.id}`);
    }, midnight.getTime() - now.getTime());

    return () => clearTimeout(timer);
  }, [habit.id, mode]);

  const progressPercent =
    habit.totalDays > 0
      ? (habit.completedDays / habit.totalDays) * 100
      : 0;

  const formattedDate = habit.createdAt
    ? moment(habit.createdAt).format("MMMM D, YYYY h:mm A")
    : "";

  const openPopup = () => {
    setShowPopup(true);
    requestAnimationFrame(() => setIsPopupOpen(true));
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => setShowPopup(false), 300);
  };

  const openEdit = () => {
    setShowEdit(true);
    requestAnimationFrame(() => setIsEditOpen(true));
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setTimeout(() => setShowEdit(false), 300);
  };

  const handleConfirmAddDay = async () => {
    const result = await onAddDay(habit.id);

    if (result !== "Already added today") {
      localStorage.setItem(
        `lastAddedDate_${habit.id}`,
        new Date().toLocaleDateString()
      );
      setIsDisabledToday(true);
    }

    closePopup();
  };

  const handleEditSubmit = () => {
    onEdit({
      ...habit,
      ...updatedHabit,
      completed: updatedHabit.completedDays >= updatedHabit.totalDays,
    });

    closeEdit();
  };

  return (
    <div className={`habit-card habit-card--${mode}`}>
      <div className="habit-card__content">
        <h3>{habit.name}</h3>

        <p className="paragraph">{habit.description}</p>

        <p className="paragraph">
          {habit.completedDays} / {habit.totalDays} Days
        </p>

        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {mode === "active" && !isDisabledToday && (
          <button className="add-day-button" onClick={openPopup}>
            Add Day
          </button>
        )}

        {formattedDate && <p className="paragraph">{formattedDate}</p>}
      </div>

      <div
        className={`habit-card__expandable ${
          showPopup || showEdit ? "is-open" : ""
        }`}
      >
        {mode === "active" && showPopup && (
          <div className={`popup ${isPopupOpen ? "popup--open" : ""}`}>
            <div className="popup__inner">
              <p>Are you sure you want to add a day?</p>
              <button onClick={handleConfirmAddDay}>Confirm</button>
              <button onClick={closePopup}>Cancel</button>
            </div>
          </div>
        )}

        {mode === "active" && showEdit && (
          <div className={`edit-form ${isEditOpen ? "edit-form--open" : ""}`}>
            <input
              type="text"
              value={updatedHabit.name}
              onChange={(e) =>
                setUpdatedHabit({ ...updatedHabit, name: e.target.value })
              }
            />

            <input
              type="text"
              value={updatedHabit.description}
              onChange={(e) =>
                setUpdatedHabit({
                  ...updatedHabit,
                  description: e.target.value,
                })
              }
            />

            <input
              type="number"
              min={1}
              value={updatedHabit.totalDays}
              onChange={(e) =>
                setUpdatedHabit({
                  ...updatedHabit,
                  totalDays: Number(e.target.value),
                })
              }
            />
          </div>
        )}

        <div className="buttons-swap">
          {mode === "active" && (
            <button
              className="btn-primary"
              onClick={isEditOpen ? handleEditSubmit : openEdit}
            >
              {isEditOpen ? "Save" : "Edit"}
            </button>
          )}

          <button
            className="btn-danger"
            onClick={isEditOpen ? closeEdit : () => onDelete(habit.id)}
          >
            {isEditOpen ? "Cancel" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
