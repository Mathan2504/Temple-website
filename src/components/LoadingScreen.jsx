import { motion } from "framer-motion";
import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      role="status"
      aria-label="Loading temple website"
    >
      <motion.div
        className="loading-screen__om"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.08, 1], opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        ॐ
      </motion.div>
      <motion.div
        className="loading-screen__ring"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <p className="loading-screen__text lang-ta">இறையருள் கோரி...</p>
    </motion.div>
  );
}
