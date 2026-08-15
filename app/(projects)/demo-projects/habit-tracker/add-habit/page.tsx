"use client";

import HabitForm from "../components/HabitForm";

export default function Page() {
  return (
    <div className="habit-tracker-page">
      <h1 className="create-habit">Create a Habit</h1>
      <HabitForm />
    </div>
  );
}
