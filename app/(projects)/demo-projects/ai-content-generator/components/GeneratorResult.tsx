"use client";

import { useEffect, useRef, useState } from "react";
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<number | undefined>(undefined);

  const hasContent = isLoading || Boolean(error) || Boolean(result);

  // On a phone the Generate button is near the bottom of the form, so the result
  // appears BELOW the screen and nothing seems to happen. This brings it into
  // view when it starts loading and when it arrives ("nearest" means the page
  // doesn't move if it's already visible).
  useEffect(() => {
    if (!hasContent) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    wrapperRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
    });
  }, [hasContent, isLoading, error, result]);

  // Stop the "Copied!" timer if the component goes away
  useEffect(() => {
    return () => window.clearTimeout(copyTimer.current);
  }, []);

  if (!hasContent) {
    return null;
  }

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard write failed silently — no action needed
    }
  };

  return (
    <div className="generator-result" ref={wrapperRef}>
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
              {copied ? (
                <Check size={16} aria-hidden="true" />
              ) : (
                <Copy size={16} aria-hidden="true" />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              type="button"
              className="generator-result-btn generator-result-btn-secondary"
              onClick={onRegenerate}
            >
              <RefreshCw size={16} aria-hidden="true" />
              Regenerate
            </button>
          </div>
        </>
      )}
    </div>
  );
}