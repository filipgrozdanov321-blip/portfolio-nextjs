import "../styles/GeneratorHeader.css";

export default function GeneratorHeader() {
  return (
    <header className="generator-header">
      <h1 className="generator-header-title">AI Content Generator</h1>
      <p className="generator-header-subtitle">
        Powered by the Claude API — generate blog intros, product descriptions,
        and social captions in seconds.
      </p>
    </header>
  );
}