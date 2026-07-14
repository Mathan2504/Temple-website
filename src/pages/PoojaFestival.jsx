import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeader from "../components/SectionHeader";
import FestivalCountdown from "../components/FestivalCountdown";
import { weeklyPooja, annualFestival, festivalDaySchedule } from "../data/templeData";
import useSEO from "../hooks/useSEO";
import "./PoojaFestival.css";

export default function PoojaFestival() {
  useSEO({
    title: "Weekly Pooja & Annual Kodai Festival | Temple",
    description:
      "Weekly pooja timings every Tuesday & Friday at 12:00 PM, and the annual Kodai Vizha festival details with a live countdown.",
  });

  return (
    <div>
      <PageHero
        titleTa="பூஜை & விழா"
        titleEn="Pooja & Festival"
        subtitle="Weekly worship timings and our grand annual celebration"
      />

      {/* WEEKLY POOJA */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="வார பூஜை" titleTa="வாராந்திர பூஜை நேரம்" titleEn="Weekly Pooja Schedule" />
          <div className="pooja-days">
            {weeklyPooja.daysEnglish.map((day, i) => (
              <motion.div
                key={day}
                className="pooja-days__card glass-card temple-border"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Clock size={28} color="var(--saffron)" />
                <h3 className="lang-ta">{weeklyPooja.days[i]}</h3>
                <p className="pooja-days__time">{weeklyPooja.time}</p>
              </motion.div>
            ))}
          </div>
          <p className="lang-ta pooja-note">{weeklyPooja.descriptionTamil}</p>
          <p className="pooja-note-en">{weeklyPooja.descriptionEnglish}</p>
        </div>
      </section>

      <div className="divider-kolam" aria-hidden="true" />

      {/* ANNUAL FESTIVAL */}
      <section className="section festival-section">
        <div className="container">
          <span className="section-eyebrow lang-ta">✦ ஆண்டு விழா ✦</span>
          <h2 className="lang-ta festival-section__title">{annualFestival.titleTamil}</h2>
          <p className="festival-section__title-en">{annualFestival.titleEnglish}</p>
          <p className="lang-ta festival-section__schedule">{annualFestival.scheduleTamil}</p>
          <p className="festival-section__schedule-en">{annualFestival.scheduleEnglish}</p>

          <div className="festival-section__countdown">
            <FestivalCountdown targetDate={annualFestival.nextFestivalDate} />
          </div>

          <div className="festival-highlights">
            {annualFestival.highlights.map((h) => (
              <div key={h.english} className="festival-highlights__item">
                <Sparkles size={18} color="var(--gold)" />
                <div>
                  <p className="lang-ta">{h.tamil}</p>
                  <p className="festival-highlights__en">{h.english}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-kolam" aria-hidden="true" />

      {/* FESTIVAL DAY SCHEDULE */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="நிகழ்ச்சி நிரல்"
            titleTa="கொடை விழா நிகழ்ச்சி நிரல்"
            titleEn="Kodai Vizha Programme Schedule"
          />

          <div className="schedule-table glass-card temple-border">
            {festivalDaySchedule.map((item, i) => (
              <motion.div
                key={item.time + item.event}
                className="schedule-table__row"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: (i % 10) * 0.04 }}
              >
                <div className="schedule-table__time">
                  <Clock size={16} color="var(--saffron)" />
                  <span className="lang-ta">{item.time}</span>
                </div>
                <div className="schedule-table__event lang-ta">{item.event}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
