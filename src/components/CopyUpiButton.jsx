import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyUpiButton({ upiId }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
    } catch (e) {
      // Clipboard API unavailable — fall back silently
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className="btn btn-outline btn-sm" onClick={handleCopy} aria-live="polite">
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "Copied!" : "Copy UPI ID"}
    </button>
  );
}
