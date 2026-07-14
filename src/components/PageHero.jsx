import { motion } from "framer-motion";
import "./PageHero.css";

export default function PageHero({ titleTa, titleEn, subtitle }) {
  return (
    <section className="page-hero">
      <div className="page-hero__kolam" aria-hidden="true" />
      <div className="container page-hero__content">
        <motion.h1
          className="lang-ta page-hero__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {titleTa}
        </motion.h1>
        <motion.p
          className="page-hero__title-en"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {titleEn}
        </motion.p>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
      </div>
    </section>
  );
}
