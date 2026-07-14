import { NavLink } from "react-router-dom";
import { Home } from "lucide-react";
import useSEO from "../hooks/useSEO";

export default function NotFound() {
  useSEO({ title: "Page Not Found | Temple", description: "The page you are looking for could not be found." });

  return (
    <div className="section" style={{ textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div className="container">
        <span style={{ fontSize: "3.5rem" }}>🛕</span>
        <h1 className="lang-ta" style={{ marginTop: "1rem" }}>பக்கம் கிடைக்கவில்லை</h1>
        <p style={{ color: "var(--text-muted)", margin: "0.5rem 0 1.5rem" }}>
          Page not found. Let's guide you back home.
        </p>
        <NavLink to="/" className="btn btn-primary" style={{ display: "inline-flex" }}>
          <Home size={17} /> Back to Home
        </NavLink>
      </div>
    </div>
  );
}
