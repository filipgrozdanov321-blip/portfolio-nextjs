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
  return (
    <div className="generator-type-selector" role="tablist">
      {TYPE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={selectedType === option.value}
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