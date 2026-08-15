"use client";

import { useRouter } from "next/navigation";
import "./BackButton.css";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="back-button"
      onClick={() => router.push("/")}
    >
      ← Back
    </button>
  );
}
