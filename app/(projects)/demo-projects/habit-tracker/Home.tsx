"use client";

import { useEffect, useState } from "react";
import HabitCard, { Habit } from "./components/HabitCard";

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    syncFromStorage();
  }, []);

  const syncFromStorage = () => {
    const stored: Habit[] = JSON.parse(
      localStorage.getItem("habits") || "[]"
    );

    setHabits(stored.filter((h) => !h.completed));
  };

  const handleAddDay = async (id: string): Promise<string> => {
    const all: Habit[] = JSON.parse(
      localStorage.getItem("habits") || "[]"
    );

    const today = new Date().toLocaleDateString();
    const lastAddedDate = localStorage.getItem(`lastAddedDate_${id}`);

    if (lastAddedDate === today) {
      return "Already added today";
    }

    const updated = all.map((habit) => {
      if (habit.id !== id) return habit;

      const completedDays = habit.completedDays + 1;
      return {
        ...habit,
        completedDays,
        completed: completedDays >= habit.totalDays,
      };
    });

    localStorage.setItem("habits", JSON.stringify(updated));
    localStorage.setItem(`lastAddedDate_${id}`, today);

    syncFromStorage();
    return "OK";
  };

  const handleEdit = (updatedHabit: Habit) => {
    const all: Habit[] = JSON.parse(
      localStorage.getItem("habits") || "[]"
    );

    const updated = all.map((h) =>
      h.id === updatedHabit.id ? updatedHabit : h
    );

    localStorage.setItem("habits", JSON.stringify(updated));
    syncFromStorage();
  };

  const handleDelete = (id: string) => {
    const all: Habit[] = JSON.parse(
      localStorage.getItem("habits") || "[]"
    );

    const updated = all.filter((h) => h.id !== id);

    localStorage.setItem("habits", JSON.stringify(updated));
    syncFromStorage();
  };

  return (
    <div className="home-page">
      <div className="habit-list">
        {habits.length === 0 ? (
          <p>No active habits yet. Start adding some!</p>
        ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddDay={handleAddDay}
            />
          ))
        )}
      </div>
    </div>
  );
}
