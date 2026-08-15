import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./styles/KanbanGlobals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--kanban-font-inter",
});

export const metadata: Metadata = {
  title: "Task Board Demo",
  description: "A drag-and-drop Kanban task board built with dnd-kit.",
};

export default function TaskBoardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`kanban-page ${inter.variable}`}>
      {children}
    </div>
  );
}