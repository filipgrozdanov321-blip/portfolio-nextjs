"use client";

import { FormEvent } from "react";
import { ContentType } from "../lib/promptTemplates";
import "../styles/GeneratorForm.css";

interface GeneratorFormProps {
  selectedType: ContentType;
  fields: Record<string, string>;
  onFieldChange: (key: string, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const TONE_OPTIONS = ["Professional", "Casual", "Playful", "Persuasive"];
const PLATFORM_OPTIONS = ["Instagram", "LinkedIn", "Twitter/X"];

export default function GeneratorForm({
  selectedType,
  fields,
  onFieldChange,
  onSubmit,
  isLoading,
}: GeneratorFormProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="generator-form" onSubmit={handleSubmit}>
      {selectedType === "blog-intro" && (
        <>
          <div className="generator-form-field">
            <label htmlFor="topic">Topic</label>
            <input
              id="topic"
              type="text"
              maxLength={300}
              value={fields.topic ?? ""}
              onChange={(e) => onFieldChange("topic", e.target.value)}
              placeholder="e.g. Why remote work is here to stay"
              required
            />
          </div>
          <div className="generator-form-field">
            <label htmlFor="audience">Audience</label>
            <input
              id="audience"
              type="text"
              maxLength={300}
              value={fields.audience ?? ""}
              onChange={(e) => onFieldChange("audience", e.target.value)}
              placeholder="e.g. startup founders"
              required
            />
          </div>
          <ToneSelect value={fields.tone} onChange={onFieldChange} />
        </>
      )}

      {selectedType === "product-description" && (
        <>
          <div className="generator-form-field">
            <label htmlFor="productName">Product Name</label>
            <input
              id="productName"
              type="text"
              maxLength={300}
              value={fields.productName ?? ""}
              onChange={(e) => onFieldChange("productName", e.target.value)}
              placeholder="e.g. AeroFlask Pro"
              required
            />
          </div>
          <div className="generator-form-field">
            <label htmlFor="keyFeatures">Key Features</label>
            <textarea
              id="keyFeatures"
              maxLength={300}
              value={fields.keyFeatures ?? ""}
              onChange={(e) => onFieldChange("keyFeatures", e.target.value)}
              placeholder="e.g. keeps drinks cold 24h, leak-proof, recycled steel"
              required
            />
          </div>
          <ToneSelect value={fields.tone} onChange={onFieldChange} />
        </>
      )}

      {selectedType === "social-caption" && (
        <>
          <div className="generator-form-field">
            <label htmlFor="platform">Platform</label>
            <select
              id="platform"
              value={fields.platform ?? PLATFORM_OPTIONS[0]}
              onChange={(e) => onFieldChange("platform", e.target.value)}
            >
              {PLATFORM_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="generator-form-field">
            <label htmlFor="topic">Topic</label>
            <input
              id="topic"
              type="text"
              maxLength={300}
              value={fields.topic ?? ""}
              onChange={(e) => onFieldChange("topic", e.target.value)}
              placeholder="e.g. launching our new summer collection"
              required
            />
          </div>
          <ToneSelect value={fields.tone} onChange={onFieldChange} />
        </>
      )}

      <button type="submit" className="generator-form-submit" disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate"}
      </button>
    </form>
  );
}

interface ToneSelectProps {
  value?: string;
  onChange: (key: string, value: string) => void;
}

function ToneSelect({ value, onChange }: ToneSelectProps) {
  return (
    <div className="generator-form-field">
      <label htmlFor="tone">Tone</label>
      <select
        id="tone"
        value={value ?? TONE_OPTIONS[0]}
        onChange={(e) => onChange("tone", e.target.value)}
      >
        {TONE_OPTIONS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}