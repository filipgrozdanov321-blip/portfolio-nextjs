"use client";

import Header from "./components/Header";
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";
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
        <BackButton />
        {children}

      </main>
    </>
  );
}
