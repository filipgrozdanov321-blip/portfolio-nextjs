"use client";

import Header from "./components/Header";

import "./styles.css";

export default function HabitTrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="habit-tracker-main">
        <Header />
        {children}

      </main>
    </>
  );
}
