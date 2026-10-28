"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import "./HabitForm.css";

interface Habit {
  id: string;
  name: string;
  description: string;
  totalDays: number;
  completedDays: number;
  completed: boolean;
  createdAt: string;
}

interface Errors {
  name?: string;
  totalDays?: string;
}

export default function HabitForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [totalDays, setTotalDays] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): Errors => {
    const nextErrors: Errors = {};
    if (!name.trim()) nextErrors.name = "Habit name is required";
    if (totalDays <= 0) nextErrors.totalDays = "Days must be greater than 0";
    return nextErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);

    const existingHabits: Habit[] = JSON.parse(
      localStorage.getItem("habits") || "[]"
    );

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      description,
      totalDays,
      completedDays: 0,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "habits",
      JSON.stringify([...existingHabits, newHabit])
    );

    router.push("/demo-projects/habit-tracker");
  };

  return (
    <section className="habit-tracker-form">
      <h2 className="habit-tracker-form__title">Habit Details</h2>

      <form className="habit-tracker-form__form" onSubmit={handleSubmit} noValidate>
        <div className="habit-tracker-form__field">
          <label htmlFor="habit-form-name">Habit Name</label>
          <input
            id="habit-form-name"
            type="text"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Daily workout, reading, etc."
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "habit-form-name-error" : undefined}
          />
          {errors.name && (
            <span
              id="habit-form-name-error"
              className="habit-tracker-form__error"
              role="alert"
            >
              {errors.name}
            </span>
          )}
        </div>

        <div className="habit-tracker-form__field">
          <label htmlFor="habit-form-description">Description (optional)</label>
          <input
            id="habit-form-description"
            type="text"
            autoComplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
          />
        </div>

        <div className="habit-tracker-form__field">
          <label htmlFor="habit-form-days">Total Days</label>
          <input
            id="habit-form-days"
            type="number"
            inputMode="numeric"
            min={1}
            value={totalDays}
            onChange={(e) => setTotalDays(Number(e.target.value))}
            aria-invalid={Boolean(errors.totalDays)}
            aria-describedby={errors.totalDays ? "habit-form-days-error" : undefined}
          />
          {errors.totalDays && (
            <span
              id="habit-form-days-error"
              className="habit-tracker-form__error"
              role="alert"
            >
              {errors.totalDays}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="habit-tracker-form__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Habit"}
        </button>
      </form>
    </section>
  );
}