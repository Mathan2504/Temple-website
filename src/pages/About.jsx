import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import { aboutSections } from "../data/templeData";
import useSEO from "../hooks/useSEO";
import "./About.css";

export default function About() {
  useSEO({
    title: "Temple History & About | Sri Bhoomi Alantha Perumal & Sri Isakki Amman Temple",
    description:
      "Learn about the history, importance, objectives, and architecture of Sri Bhoomi Alantha Perumal Temple & Sri Isakki Amman Temple.",
  });

  return (
    <div>
      <PageHero
        titleTa="கோவில் வரலாறு"
        titleEn="About the Temple"
        subtitle="The story, purpose, and design behind our sacred temple"
      />

      <section className="section about-page">
        <div className="container about-page__list">
          {aboutSections.map((s, i) => (
            <motion.article
              key={s.id}
              className="about-page__item glass-card temple-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <div className="about-page__number">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h2 className="lang-ta about-page__title">{s.titleTamil}</h2>
                <p className="about-page__title-en">{s.titleEnglish}</p>
                <p className="lang-ta about-page__body">{s.bodyTamil}</p>
                <p className="about-page__body-en">{s.bodyEnglish}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
