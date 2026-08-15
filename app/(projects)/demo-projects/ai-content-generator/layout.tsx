import type { ReactNode } from "react";
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";
import "./styles/GeneratorGlobals.css";

export default function AiContentGeneratorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <BackButton />
      {children}
    </>
  );
}