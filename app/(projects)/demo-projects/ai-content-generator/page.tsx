"use client";

import { useState } from "react";
import GeneratorHeader from "./components/GeneratorHeader";
import GeneratorTypeSelector from "./components/GeneratorTypeSelector";
import GeneratorForm from "./components/GeneratorForm";
import GeneratorResult from "./components/GeneratorResult";
import GeneratorHistory, {
  GeneratorHistoryItem,
} from "./components/GeneratorHistory";
import { ContentType } from "./lib/promptTemplates";

const DEFAULT_FIELDS: Record<ContentType, Record<string, string>> = {
  "blog-intro": { topic: "", audience: "", tone: "Professional" },
  "product-description": { productName: "", keyFeatures: "", tone: "Professional" },
  "social-caption": { platform: "Instagram", topic: "", tone: "Professional" },
};

const HISTORY_LIMIT = 10;
const PREVIEW_LENGTH = 60;

export default function AiContentGeneratorPage() {
  const [selectedType, setSelectedType] = useState<ContentType>("blog-intro");
  const [fields, setFields] = useState<Record<string, string>>(
    DEFAULT_FIELDS["blog-intro"]
  );
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratorHistoryItem[]>([]);

  const handleSelectType = (type: ContentType) => {
    setSelectedType(type);
    setFields(DEFAULT_FIELDS[type]);
    setResult(null);
    setError(null);
  };

  const handleFieldChange = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const generate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "/demo-projects/ai-content-generator/api/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: selectedType, fields }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong generating content.");
        return;
      }

      const text: string = data.result ?? "";
      setResult(text);

      const newItem: GeneratorHistoryItem = {
        id: crypto.randomUUID(),
        type: selectedType,
        preview:
          text.length > PREVIEW_LENGTH
            ? `${text.slice(0, PREVIEW_LENGTH)}...`
            : text,
        fullText: text,
        timestamp: Date.now(),
      };

      setHistory((prev) => [newItem, ...prev].slice(0, HISTORY_LIMIT));
    } catch (err) {
      console.error("Generate request failed:", err);
      setError("Something went wrong generating content.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryItem = (item: GeneratorHistoryItem) => {
    setResult(item.fullText);
    setError(null);
  };

  return (
    <div className="generator-page">
      <div className="generator-container">
        <GeneratorHeader />
        <GeneratorTypeSelector
          selectedType={selectedType}
          onSelectType={handleSelectType}
        />
        <GeneratorForm
          selectedType={selectedType}
          fields={fields}
          onFieldChange={handleFieldChange}
          onSubmit={generate}
          isLoading={isLoading}
        />
        <GeneratorResult
          result={result}
          isLoading={isLoading}
          error={error}
          onRegenerate={generate}
        />
        <GeneratorHistory
          history={history}
          onSelectItem={handleSelectHistoryItem}
        />
      </div>
    </div>
  );
}