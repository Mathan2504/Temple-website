import "./HeroPetals.css";

// A handful of softly falling petals for the hero — decorative only,
// aria-hidden, and kept sparse so it doesn't distract from the content.
const PETAL_COUNT = 7;

export default function HeroPetals() {
  return (
    <div className="hero-petals" aria-hidden="true">
      {Array.from({ length: PETAL_COUNT }).map((_, i) => (
        <span key={i} className={`hero-petal hero-petal--${i + 1}`} />
      ))}
    </div>
  );
}
