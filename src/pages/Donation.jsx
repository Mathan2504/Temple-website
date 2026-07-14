import { HandCoins, Phone, MessageCircle, QrCode } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeader from "../components/SectionHeader";
import CopyUpiButton from "../components/CopyUpiButton";
import { templeInfo } from "../data/templeData";
import useSEO from "../hooks/useSEO";
import "./Donation.css";

export default function Donation() {
  useSEO({
    title: "Temple Donation & Ennai Kaappu | Temple",
    description:
      "Support the temple through UPI donation or offer Ennai Kaappu. Contact details and UPI ID for Sri Bhoomi Alantha Perumal & Sri Isakki Amman Temple.",
  });

  return (
    <div>
      <PageHero
        titleTa="கோவில் நன்கொடை"
        titleEn="Temple Donation"
        subtitle="Your contribution helps preserve our temple's traditions for generations to come"
      />

      <section className="section">
        <div className="container donation-grid">
          <div className="donation-card glass-card temple-border">
            <HandCoins size={32} color="var(--saffron)" />
            <h2 className="lang-ta">கோவில் வரி & நன்கொடை</h2>
            <p className="donation-card__subtitle">Temple Vari &amp; Donation</p>

            <dl className="donation-details">
              <div>
                <dt>UPI Name</dt>
                <dd>{templeInfo.upiName}</dd>
              </div>
              <div>
                <dt>UPI ID</dt>
                <dd>{templeInfo.upiId}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{templeInfo.donationPhone}</dd>
              </div>
            </dl>

            <div className="donation-actions">
              <CopyUpiButton upiId={templeInfo.upiId} />
              <a
                className="btn btn-primary"
                href={`upi://pay?pa=${templeInfo.upiId}&pn=${encodeURIComponent(templeInfo.upiName)}&cu=INR`}
              >
                <HandCoins size={17} /> Donate Now
              </a>
            </div>
          </div>

          <div className="donation-qr glass-card temple-border">
            <div className="donation-qr__box">
              <QrCode size={64} />
              <span>QR Code Placeholder</span>
            </div>
            <p className="donation-qr__caption">Scan with any UPI app to donate directly</p>
          </div>
        </div>
      </section>

      <div className="divider-kolam" aria-hidden="true" />

      {/* ENNAI KAAPPU */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="எண்ணெய் காப்பு" titleTa="எண்ணெய் காப்பு சாத்த" titleEn="Offer Ennai Kaappu" />
          <div className="ennai-card glass-card temple-border">
            <p className="lang-ta ennai-card__text">
              எண்ணெய் காப்பு சாத்த விரும்பும் பக்தர்கள் கீழே உள்ள எண்ணிற்கு தொடர்பு கொள்ளவும்.
            </p>
            <p className="ennai-card__number">{templeInfo.templePhone}</p>
            <div className="ennai-card__actions">
              <a className="btn btn-primary" href={`tel:${templeInfo.templePhone}`}>
                <Phone size={17} /> Call Now
              </a>
              <a
                className="btn btn-outline"
                href={`https://wa.me/${templeInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={17} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
