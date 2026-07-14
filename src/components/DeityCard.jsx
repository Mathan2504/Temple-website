import { motion } from "framer-motion";
import { getDeityImage } from "../assets/deityImages";
import "./DeityCard.css";

export default function DeityCard({ deity, index }) {
  return (
    <motion.article
      className="deity-card glass-card temple-border"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      whileHover={{ y: -8 }}
    >
      <div className="deity-card__image">
        <img
          src={getDeityImage(deity.tamil)}
          alt={deity.english}
          loading="lazy"
          className="deity-card__photo"
        />
        <span className="deity-card__number">{String(deity.id).padStart(2, "0")}</span>
      </div>
      <div className="deity-card__body">
        <h3 className="lang-ta deity-card__name">{deity.tamil}</h3>
        <p className="deity-card__name-en">{deity.english}</p>
        <p className="lang-ta deity-card__desc">{deity.description}</p>
      </div>
    </motion.article>
  );
}
