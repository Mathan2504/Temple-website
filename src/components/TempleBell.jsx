import { useState } from "react";
import { motion } from "framer-motion";
import { playTempleBell } from "../utils/templeBellSound";
import "./TempleBell.css";

export default function TempleBell() {
  const [ringing, setRinging] = useState(false);

  const handleRing = () => {
    playTempleBell();
    setRinging(true);
    setTimeout(() => setRinging(false), 900);
  };

  return (
    <button
      className="temple-bell"
      onClick={handleRing}
      aria-label="Ring the temple bell"
      title="Ring the temple bell"
    >
      <motion.svg
        viewBox="0 0 64 90"
        className="temple-bell__svg"
        animate={ringing ? { rotate: [0, 14, -12, 8, -6, 0] } : { rotate: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        style={{ transformOrigin: "32px 8px" }}
      >
        <line x1="32" y1="0" x2="32" y2="10" stroke="var(--brown)" strokeWidth="2" />
        <path
          d="M20 12 Q32 4 44 12 L50 55 Q32 65 14 55 Z"
          fill="url(#bellGrad)"
          stroke="var(--maroon-deep)"
          strokeWidth="1.5"
        />
        <ellipse cx="32" cy="58" rx="19" ry="5" fill="var(--gold)" opacity="0.9" />
        <circle cx="32" cy="72" r="5" fill="var(--gold)" />
        <line x1="32" y1="58" x2="32" y2="68" stroke="var(--brown)" strokeWidth="2" />
        <defs>
          <linearGradient id="bellGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold-light)" />
            <stop offset="100%" stopColor="var(--gold)" />
          </linearGradient>
        </defs>
      </motion.svg>
    </button>
  );
}
