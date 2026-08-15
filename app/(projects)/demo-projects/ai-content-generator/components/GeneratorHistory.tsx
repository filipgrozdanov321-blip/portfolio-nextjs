"use client";

import { ContentType } from "../lib/promptTemplates";
import "../styles/GeneratorHistory.css";

export interface GeneratorHistoryItem {
  id: string;
  type: ContentType;
  preview: string;
  fullText: string;
  timestamp: number;
}

interface GeneratorHistoryProps {
  history: GeneratorHistoryItem[];
  onSelectItem: (item: GeneratorHistoryItem) => void;
}

const TYPE_LABELS: Record<ContentType, string> = {
  "blog-intro": "Blog Intro",
  "product-description": "Product Description",
  "social-caption": "Social Caption",
};

export default function GeneratorHistory({
  history,
  onSelectItem,
}: GeneratorHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="generator-history">
      <h2 className="generator-history-title">History</h2>
      <ul className="generator-history-list">
        {history.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="generator-history-item"
              onClick={() => onSelectItem(item)}
            >
              <span className="generator-history-item-type">
                {TYPE_LABELS[item.type]}
              </span>
              <span className="generator-history-item-preview">
                {item.preview}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}