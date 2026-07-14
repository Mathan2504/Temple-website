import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Compass, BookOpen, HandCoins, MapPin } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import DeityCard from "../components/DeityCard";
import Counter from "../components/Counter";
import WhatsAppGroupSection from "../components/WhatsAppGroupSection";
import HeroPetals from "../components/HeroPetals";
import { templeInfo, weeklyPooja, mainDeities, annualFestival } from "../data/templeData";
import useSEO from "../hooks/useSEO";
import "./Home.css";
import "../components/Counter.css";

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const raysRotate = useTransform(scrollYProgress, [0, 1], [0, 25]);

  useSEO({
    title: "Sri Bhoomi Alantha Perumal & Sri Isakki Amman Temple",
    description:
      "Official website of Sri Bhoomi Alantha Perumal Temple & Sri Isakki Amman Temple — history, weekly pooja timings, Kodai festival, donation, and directions.",
  });

  return (
    <div>
      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <motion.div className="hero__rays" style={{ rotate: raysRotate }} aria-hidden="true" />
        <motion.div className="hero__glow" style={{ y: glowY }} aria-hidden="true" />
        <div className="hero__kolam" aria-hidden="true" />
        <HeroPetals />
        <div className="container hero__content">
          <motion.span
            className="hero__eyebrow lang-ta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🛕 வரலாறு மிக்க திருத்தலம்
          </motion.span>

          <motion.h1
            className="lang-ta hero__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {templeInfo.nameTamil1}
          </motion.h1>
          <motion.h2
            className="lang-ta hero__title hero__title--secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {templeInfo.nameTamil2}
          </motion.h2>

          <motion.p
            className="lang-ta hero__village"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
          >
            <MapPin size={16} />
            {templeInfo.villageTamil}
          </motion.p>

          <motion.p
            className="lang-ta hero__welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {templeInfo.welcomeTamil}
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <NavLink to="/deities" className="btn btn-primary">
              <Compass size={17} /> Explore Temple
            </NavLink>
            <NavLink to="/gallery" className="btn btn-outline">
              <BookOpen size={17} /> Photo Gallery
            </NavLink>
            <NavLink to="/donation" className="btn btn-outline">
              <HandCoins size={17} /> Donate
            </NavLink>
            <NavLink to="/contact" className="btn btn-outline">
              <MapPin size={17} /> Get Directions
            </NavLink>
          </motion.div>
        </div>

        <div className="hero__scroll-cue" aria-hidden="true" />
      </section>

      {/* WELCOME / STATS */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="இறையருள்"
            titleTa="பக்தர்களின் நம்பிக்கை தலம்"
            titleEn="A place of faith for generations of devotees"
          />
          <div className="grid-auto home-stats">
            <Counter target={21} label="புனித பீடங்கள்" suffix="" />
            <Counter target={2} label="வார பூஜை நாட்கள்" />
            <Counter target={100} label="ஆண்டுகால பாரம்பரியம்" suffix="+" />
            <Counter target={1000} label="பக்தர்கள் ஆசி" suffix="+" />
          </div>
        </div>
      </section>

      <div className="divider-kolam" aria-hidden="true" />

      {/* DEITY HIGHLIGHTS */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="21 சக்தி பீடங்கள்"
            titleTa="முதன்மை தெய்வங்கள்"
            titleEn="The presiding deities of the temple"
          />
          <div className="grid-auto">
            {mainDeities.slice(0, 6).map((d, i) => (
              <DeityCard key={d.id} deity={d} index={i} />
            ))}
          </div>
          <div className="home-cta-row">
            <NavLink to="/deities" className="btn btn-maroon">
              View All 21 Peedams
            </NavLink>
          </div>
        </div>
      </section>

      {/* WEEKLY POOJA STRIP */}
      <section className="section home-pooja">
        <div className="container home-pooja__inner">
          <div>
            <span className="section-eyebrow lang-ta">✦ வார பூஜை ✦</span>
            <h2 className="lang-ta home-pooja__title">
              {weeklyPooja.daysEnglish.join(" & ")} — {weeklyPooja.time}
            </h2>
            <p className="lang-ta home-pooja__text">{weeklyPooja.descriptionTamil}</p>
            <p className="home-pooja__text-en">{weeklyPooja.descriptionEnglish}</p>
          </div>
          <NavLink to="/pooja-festival" className="btn btn-primary">
            View Pooja &amp; Festival
          </NavLink>
        </div>
      </section>

      {/* FESTIVAL TEASER */}
      <section className="section home-festival">
        <div className="container home-festival__inner">
          <span className="section-eyebrow lang-ta">✦ {annualFestival.titleTamil} ✦</span>
          <h2 className="lang-ta home-festival__title">{annualFestival.scheduleTamil}</h2>
          <p className="home-festival__text-en">{annualFestival.scheduleEnglish}</p>
          <NavLink to="/pooja-festival" className="btn btn-outline">
            Festival Details &amp; Countdown
          </NavLink>
        </div>
      </section>

      <WhatsAppGroupSection />
    </div>
  );
}
