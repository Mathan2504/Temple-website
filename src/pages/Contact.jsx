import { Phone, Navigation, MapPin } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeader from "../components/SectionHeader";
import ContactForm from "../components/ContactForm";
import { templeInfo, contactPersons } from "../data/templeData";
import useSEO from "../hooks/useSEO";
import "./Contact.css";

export default function Contact() {
  useSEO({
    title: "Contact & Location | Temple",
    description:
      "Contact Sri Bhoomi Alantha Perumal & Sri Isakki Amman Temple, get directions, and find us on Google Maps.",
  });

  return (
    <div>
      <PageHero titleTa="தொடர்பு" titleEn="Contact Us" subtitle="We'd love to hear from you" />

      <section className="section">
        <div className="container contact-grid">
          <div className="contact-info">
            <SectionHeader eyebrow="தொடர்பு விவரங்கள்" titleTa="எங்களை தொடர்பு கொள்ள" titleEn="Get in Touch" />

            <div className="contact-info__list">
              <p className="contact-info__subheading lang-ta">📞 தொடர்புக்கு</p>

              {contactPersons.map((person) => (
                <a key={person.phone} href={`tel:${person.phone.replace(/\s/g, "")}`} className="contact-info__item">
                  <Phone size={20} color="var(--saffron)" />
                  <div>
                    <p className="lang-ta">{person.name}</p>
                    <strong>{person.phone}</strong>
                  </div>
                </a>
              ))}

              <div className="contact-info__item contact-info__item--static">
                <MapPin size={20} color="var(--saffron)" />
                <div>
                  <p>Village</p>
                  <strong className="lang-ta">{templeInfo.villageTamil}</strong>
                  <span className="contact-info__village-en">{templeInfo.villageEnglish}</span>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <div className="divider-kolam" aria-hidden="true" />

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="வரைபடம்" titleTa="கோவில் அமைவிடம்" titleEn="Temple Location" />
          <div className="map-wrapper temple-border">
            <iframe
              src={templeInfo.mapsEmbed}
              title="Temple Location Map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="map-actions">
            <a href={templeInfo.mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Navigation size={17} /> Open Google Maps
            </a>
            <a href={templeInfo.directionsLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Get Directions
            </a>
            <a href={`tel:${templeInfo.templePhone}`} className="btn btn-outline">
              <Phone size={17} /> Call Temple
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
