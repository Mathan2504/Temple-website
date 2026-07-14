import { MessageCircle } from "lucide-react";
import { templeInfo } from "../data/templeData";
import "./WhatsAppFloat.css";

export default function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${templeInfo.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="WhatsApp"
    >
      <MessageCircle size={26} fill="currentColor" />
    </a>
  );
}
