import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import swamiImg from "../assets/swami.jpg";
import "./SwamiGallery.css";

export default function SwamiGallery({ titleTa = "சுவாமி புகைப்படம்", titleEn = "Swami Photo" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        className="swami-gallery__card glass-card temple-border"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        whileHover={{ y: -6 }}
        aria-label={`Open ${titleEn} in lightbox`}
      >
        <div className="swami-gallery__img-wrap">
          <img src={swamiImg} alt={titleEn} loading="lazy" className="swami-gallery__img" />
          <span className="swami-gallery__zoom-hint">
            <ZoomIn size={16} /> View
          </span>
        </div>
        <div className="swami-gallery__caption">
          <p className="lang-ta">{titleTa}</p>
          <p className="swami-gallery__caption-en">{titleEn}</p>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="swami-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <button className="swami-lightbox__close" onClick={() => setOpen(false)} aria-label="Close">
              <X size={26} />
            </button>
            <motion.img
              src={swamiImg}
              alt={titleEn}
              className="swami-lightbox__img"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
