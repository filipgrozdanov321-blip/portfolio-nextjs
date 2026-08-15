"use client";

import { useEffect, useState } from "react";
import HabitCard, { Habit } from "../components/HabitCard";

export default function CompletedPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored: Habit[] = JSON.parse(
      localStorage.getItem("habits") || "[]"
    );

    setHabits(stored.filter((h) => h.completed));
    setLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    const all: Habit[] = JSON.parse(
      localStorage.getItem("habits") || "[]"
    );

    const updated = all.filter((h) => h.id !== id);

    localStorage.setItem("habits", JSON.stringify(updated));
    setHabits(updated.filter((h) => h.completed));
  };

  if (loading) {
    return <p>Loading Completed Habits...</p>;
  }

  return (
    <div className="page">
      {habits.length > 0 ? (
        <h1 className="page-title">Your Completed Habits</h1>
      ) : (
        <p className="empty-state">
          Go complete some habits to see them here!
        </p>
      )}

      {habits.length > 0 && (
        <div className="habit-grid">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              mode="completed"
              onDelete={handleDelete}
              onEdit={() => {}}
              onAddDay={async () => "OK"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
