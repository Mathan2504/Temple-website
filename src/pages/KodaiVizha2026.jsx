import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, CalendarDays, Clock } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeader from "../components/SectionHeader";
import programmeImg from "../assets/kodai-vizha-programme.jpg";
import { kodaiVizha2026 } from "../data/templeData";
import useSEO from "../hooks/useSEO";
import "./KodaiVizha2026.css";

export default function KodaiVizha2026() {
  const [zoomed, setZoomed] = useState(false);

  useSEO({
    title: "Kodai Vizha 2026 Programme | Temple",
    description:
      "Kodai Vizha 2026 festival programme schedule — dates, events, and timings for the annual temple festival.",
  });

  return (
    <div>
      <PageHero
        titleTa="கொடை விழா 2026"
        titleEn="Kodai Vizha 2026"
        subtitle="The complete festival programme schedule"
      />

      {/* PROGRAMME IMAGE */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="நிகழ்ச்சி நிரல்"
            titleTa={kodaiVizha2026.titleTamil}
            titleEn={kodaiVizha2026.titleEnglish}
          />

          <motion.button
            className="kodai-poster glass-card temple-border"
            onClick={() => setZoomed(true)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            aria-label="Zoom festival programme poster"
          >
            <img
              src={programmeImg}
              alt="Kodai Vizha 2026 festival programme poster"
              loading="lazy"
              className="kodai-poster__img"
            />
            <span className="kodai-poster__zoom-hint">
              <ZoomIn size={16} /> Tap to zoom
            </span>
          </motion.button>
        </div>
      </section>

      <div className="divider-kolam" aria-hidden="true" />

      {/* TIMETABLE */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="நேர அட்டவணை" titleTa="தினசரி நிகழ்ச்சி நேரம்" titleEn="Day-by-Day Schedule" />

          <div className="kodai-timetable">
            {kodaiVizha2026.schedule.map((item, i) => (
              <motion.div
                key={item.day}
                className="kodai-timetable__row glass-card temple-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <div className="kodai-timetable__day">
                  <CalendarDays size={18} color="var(--saffron)" />
                  <div>
                    <span className="kodai-timetable__day-label">{item.day}</span>
                    <span className="lang-ta kodai-timetable__day-ta">{item.dateTamil}</span>
                  </div>
                </div>
                <div className="kodai-timetable__event">
                  <p className="lang-ta">{item.eventTamil}</p>
                  <p className="kodai-timetable__event-en">{item.eventEnglish}</p>
                </div>
                <div className="kodai-timetable__time">
                  <Clock size={16} color="var(--gold)" />
                  <span className="lang-ta">{item.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ZOOM LIGHTBOX */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            className="kodai-zoom-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Zoomed festival programme poster"
          >
            <button className="kodai-zoom-overlay__close" onClick={() => setZoomed(false)} aria-label="Close">
              <X size={26} />
            </button>
            <motion.img
              src={programmeImg}
              alt="Kodai Vizha 2026 festival programme poster, zoomed"
              className="kodai-zoom-overlay__img"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
