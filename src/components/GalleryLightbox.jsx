import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import "./GalleryLightbox.css";

export default function GalleryLightbox({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const close = () => setActiveIndex(null);
  const prev = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e) => {
    e.stopPropagation();
    setActiveIndex((i) => (i + 1) % images.length);
  };

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <motion.button
            key={img.id}
            className="gallery-grid__item"
            onClick={() => setActiveIndex(i)}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
            whileHover={{ scale: 1.03 }}
            aria-label={`Open ${img.titleEnglish}`}
            loading="lazy"
          >
            <ImageIcon size={26} />
            <span className="lang-ta gallery-grid__caption">{img.titleTamil}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button className="lightbox__close" onClick={close} aria-label="Close">
              <X size={26} />
            </button>
            <button className="lightbox__nav lightbox__nav--prev" onClick={prev} aria-label="Previous image">
              <ChevronLeft size={28} />
            </button>
            <motion.div
              className="lightbox__content"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox__image">
                <ImageIcon size={48} />
              </div>
              <p className="lang-ta lightbox__title">{images[activeIndex].titleTamil}</p>
              <p className="lightbox__title-en">{images[activeIndex].titleEnglish}</p>
            </motion.div>
            <button className="lightbox__nav lightbox__nav--next" onClick={next} aria-label="Next image">
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
