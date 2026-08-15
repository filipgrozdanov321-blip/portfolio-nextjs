"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import "../styles/GeneratorResult.css";

interface GeneratorResultProps {
  result: string | null;
  isLoading: boolean;
  error: string | null;
  onRegenerate: () => void;
}

export default function GeneratorResult({
  result,
  isLoading,
  error,
  onRegenerate,
}: GeneratorResultProps) {
  const [copied, setCopied] = useState(false);

  if (!isLoading && !error && !result) {
    return null;
  }

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard write failed silently — no action needed
    }
  };

  return (
    <div className="generator-result">
      {isLoading && (
        <div className="generator-result-skeleton" aria-live="polite" aria-busy="true">
          <div className="generator-result-skeleton-line" style={{ width: "90%" }} />
          <div className="generator-result-skeleton-line" style={{ width: "75%" }} />
          <div className="generator-result-skeleton-line" style={{ width: "60%" }} />
        </div>
      )}

      {!isLoading && error && (
        <p className="generator-result-error" role="alert">
          {error}
        </p>
      )}

      {!isLoading && !error && result && (
        <>
          <p className="generator-result-text">{result}</p>
          <div className="generator-result-actions">
            <button
              type="button"
              className="generator-result-btn"
              onClick={handleCopy}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              type="button"
              className="generator-result-btn generator-result-btn-secondary"
              onClick={onRegenerate}
            >
              <RefreshCw size={16} />
              Regenerate
            </button>
          </div>
        </>
      )}
    </div>
  );
}