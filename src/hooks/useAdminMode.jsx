import { createContext, useContext, useState } from "react";

// NOTE: This is a lightweight, client-only gate so the gallery pages can
// distinguish "admin" from "visitor" in this frontend-only demo. It is
// NOT real authentication or security. Once a Spring Boot backend is
// connected, replace this with real login (e.g. JWT session) and only
// allow the /api/media POST/PUT/DELETE endpoints for authenticated admins.
const ADMIN_PASSCODE = "temple-admin";
const SESSION_KEY = "temple_admin_mode";

const AdminModeContext = createContext(null);

export function AdminModeProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");

  const login = (passcode) => {
    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  };

  return (
    <AdminModeContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminModeContext.Provider>
  );
}

export function useAdminMode() {
  const ctx = useContext(AdminModeContext);
  if (!ctx) throw new Error("useAdminMode must be used within AdminModeProvider");
  return ctx;
}
