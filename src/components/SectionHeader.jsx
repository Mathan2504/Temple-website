import { motion } from "framer-motion";

export default function SectionHeader({ eyebrow, titleTa, titleEn }) {
  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
    >
      {eyebrow && <span className="section-eyebrow lang-ta">✦ {eyebrow} ✦</span>}
      <h2 className="section-title-ta lang-ta">{titleTa}</h2>
      {titleEn && <p className="section-title-en">{titleEn}</p>}
    </motion.div>
  );
}
