"use client";

import { ContentType } from "../lib/promptTemplates";
import "../styles/GeneratorTypeSelector.css";

interface GeneratorTypeSelectorProps {
  selectedType: ContentType;
  onSelectType: (type: ContentType) => void;
}

const TYPE_OPTIONS: { value: ContentType; label: string }[] = [
  { value: "blog-intro", label: "Blog Intro" },
  { value: "product-description", label: "Product Description" },
  { value: "social-caption", label: "Social Caption" },
];

export default function GeneratorTypeSelector({
  selectedType,
  onSelectType,
}: GeneratorTypeSelectorProps) {
  // This was role="tablist" / role="tab", which promises arrow-key navigation and
  // a matching tab panel that don't exist here. It's a group of toggle buttons,
  // which is what it actually is.
  return (
    <div className="generator-type-selector" role="group" aria-label="Content type">
      {TYPE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={selectedType === option.value}
          className={
            selectedType === option.value
              ? "generator-type-tab generator-type-tab-active"
              : "generator-type-tab"
          }
          onClick={() => onSelectType(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}