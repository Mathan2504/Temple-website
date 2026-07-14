import PageHero from "../components/PageHero";
import SectionHeader from "../components/SectionHeader";
import DeityCard from "../components/DeityCard";
import SwamiGallery from "../components/SwamiGallery";
import { mainDeities, parivaraDeities } from "../data/templeData";
import useSEO from "../hooks/useSEO";

export default function Deities() {
  useSEO({
    title: "21 Sacred Peedams & Deities | Temple",
    description:
      "Explore the 21 sacred peedams — main deities and parivara deities — of Sri Bhoomi Alantha Perumal & Sri Isakki Amman Temple.",
  });

  return (
    <div>
      <PageHero
        titleTa="21 சக்தி பீடங்கள்"
        titleEn="The 21 Sacred Peedams"
        subtitle="Main deities and parivara deities presiding over the temple"
      />

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="சுவாமி காட்சி" titleTa="சுவாமி புகைப்பட தொகுப்பு" titleEn="Swami Gallery" />
          <SwamiGallery />
        </div>
      </section>

      <div className="divider-kolam" aria-hidden="true" />

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="முதன்மை தெய்வங்கள்"
            titleTa="11 முதன்மை சன்னிதிகள்"
            titleEn="The Eleven Main Deities"
          />
          <div className="grid-auto">
            {mainDeities.map((d, i) => (
              <DeityCard key={d.id} deity={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      <div className="divider-kolam" aria-hidden="true" />

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="பரிவார தெய்வங்கள்"
            titleTa="10 பரிவார தெய்வங்கள்"
            titleEn="The Ten Parivara Deities"
          />
          <div className="grid-auto">
            {parivaraDeities.map((d, i) => (
              <DeityCard key={d.id} deity={d} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
