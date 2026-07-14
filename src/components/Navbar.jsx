import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Phone } from "lucide-react";
import { navLinks, templeInfo } from "../data/templeData";
import { useTheme } from "../hooks/useTheme";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <span className="navbar__om" aria-hidden="true">ॐ</span>
          <span className="navbar__brand-text">
            <span className="lang-ta navbar__brand-ta">ஸ்ரீ பூமி அளந்த பெருமாள் &amp; இசக்கி அம்மன்</span>
            <span className="navbar__brand-en">Temple Trust</span>
          </span>
        </NavLink>

        <nav className="navbar__links" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                "navbar__link" + (isActive ? " navbar__link--active" : "")
              }
            >
              <span className="lang-ta">{link.tamil}</span>
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <a href={`tel:${templeInfo.templePhone}`} className="navbar__call" aria-label="Call temple">
            <Phone size={16} />
          </a>
          <button
            className="navbar__theme-btn"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            className="navbar__burger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="navbar__mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="navbar__mobile-link lang-ta"
                onClick={() => setOpen(false)}
              >
                {link.tamil} <span className="navbar__mobile-en">{link.english}</span>
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
