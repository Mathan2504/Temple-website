import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnnouncementBar from "./AnnouncementBar";
import TempleBell from "./TempleBell";
import WhatsAppFloat from "./WhatsAppFloat";
import ScrollToTopButton from "./ScrollToTopButton";
import useScrollToTopOnRoute from "../hooks/useScrollToTopOnRoute";

export default function Layout() {
  useScrollToTopOnRoute();
  const location = useLocation();

  return (
    <div className="app-shell">
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <TempleBell />
      <WhatsAppFloat />
      <ScrollToTopButton />
    </div>
  );
}
