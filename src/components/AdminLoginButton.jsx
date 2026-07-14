import { useState } from "react";
import { ShieldCheck, ShieldOff, X } from "lucide-react";
import { useAdminMode } from "../hooks/useAdminMode.jsx";
import "./AdminLoginButton.css";

export default function AdminLoginButton() {
  const { isAdmin, login, logout } = useAdminMode();
  const [open, setOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(passcode)) {
      setOpen(false);
      setPasscode("");
      setError("");
    } else {
      setError("Incorrect passcode");
    }
  };

  if (isAdmin) {
    return (
      <button className="admin-toggle admin-toggle--active" onClick={logout}>
        <ShieldCheck size={16} /> Admin mode on — tap to log out
      </button>
    );
  }

  return (
    <div className="admin-toggle-wrap">
      <button className="admin-toggle" onClick={() => setOpen((o) => !o)}>
        <ShieldOff size={16} /> Admin login
      </button>
      {open && (
        <form className="admin-toggle__panel" onSubmit={handleLogin}>
          <button
            type="button"
            className="admin-toggle__close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <X size={14} />
          </button>
          <label htmlFor="admin-passcode">Admin passcode</label>
          <input
            id="admin-passcode"
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            autoFocus
          />
          {error && <span className="admin-toggle__error">{error}</span>}
          <button type="submit" className="btn btn-primary btn-sm">Login</button>
        </form>
      )}
    </div>
  );
}
