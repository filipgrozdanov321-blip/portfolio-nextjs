export type ColumnId = "todo" | "in-progress" | "done";

export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  assignee: string;
  dueDate?: string; // "YYYY-MM-DD"
  columnId: ColumnId;
}

export interface ColumnConfig {
  id: ColumnId;
  title: string;
  wipLimit?: number;
}

export const COLUMNS: ColumnConfig[] = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress", wipLimit: 4 },
  { id: "done", title: "Done" },
];

// Seed data — 10 tasks. "in-progress" starts AT its WIP limit (4/4) so the
// warning-colored indicator is visible the moment the page loads.
export const INITIAL_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Design new landing page hero",
    description:
      "Explore two directions for the hero section: a bold type-led layout and a product-screenshot led layout.",
    priority: "Medium",
    assignee: "Alex Chen",
    dueDate: "2026-08-03",
    columnId: "todo",
  },
  {
    id: "task-2",
    title: "Write onboarding email sequence",
    description:
      "Draft the 4-part welcome sequence for new signups, covering setup, first project, and upgrade nudge.",
    priority: "Low",
    assignee: "Priya Patel",
    columnId: "todo",
  },
  {
    id: "task-3",
    title: "Audit third-party dependencies",
    description:
      "Check for unmaintained packages and known vulnerabilities across the monorepo before the next release.",
    priority: "Medium",
    assignee: "Jordan Lee",
    dueDate: "2026-08-10",
    columnId: "todo",
  },
  {
    id: "task-4",
    title: "Fix session timeout bug",
    description:
      "Users are being logged out roughly every 20 minutes instead of after the intended 24-hour window.",
    priority: "High",
    assignee: "Sam Rivera",
    dueDate: "2026-07-24",
    columnId: "in-progress",
  },
  {
    id: "task-5",
    title: "Implement dark mode toggle",
    description:
      "Add a persisted theme toggle to the app shell, wired up to the existing CSS custom properties.",
    priority: "Medium",
    assignee: "Morgan Blake",
    dueDate: "2026-07-29",
    columnId: "in-progress",
  },
  {
    id: "task-6",
    title: "Refactor API error handling",
    description:
      "Centralize error parsing so every request returns a consistent shape the UI can rely on.",
    priority: "Medium",
    assignee: "Alex Chen",
    columnId: "in-progress",
  },
  {
    id: "task-7",
    title: "Set up CI/CD pipeline",
    description:
      "Wire up automatic linting, type-checking, and preview deployments for every pull request.",
    priority: "High",
    assignee: "Jordan Lee",
    dueDate: "2026-07-28",
    columnId: "in-progress",
  },
  {
    id: "task-8",
    title: "Conduct user research interviews",
    description:
      "Run five 30-minute interviews with recently churned users to understand the drop-off points.",
    priority: "Low",
    assignee: "Priya Patel",
    columnId: "done",
  },
  {
    id: "task-9",
    title: "Optimize image loading",
    description:
      "Swap in next/image across marketing pages and lazy-load below-the-fold assets.",
    priority: "Medium",
    assignee: "Sam Rivera",
    dueDate: "2026-07-15",
    columnId: "done",
  },
  {
    id: "task-10",
    title: "Update Node dependencies",
    description:
      "Bump Next.js and React to latest stable and resolve any breaking changes in the upgrade.",
    priority: "Low",
    assignee: "Morgan Blake",
    columnId: "done",
  },
];