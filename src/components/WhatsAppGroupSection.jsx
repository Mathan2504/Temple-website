import { motion } from "framer-motion";
import { MessageCircle, QrCode } from "lucide-react";
import whatsappQr from "../assets/whatsapp-qr.jpg";
import { templeInfo, whatsappGroup } from "../data/templeData";
import "./WhatsAppGroupSection.css";

export default function WhatsAppGroupSection() {
  const hasGroupLink = Boolean(templeInfo.whatsappGroupLink);

  return (
    <section className="section whatsapp-group">
      <div className="container whatsapp-group__inner">
        <motion.div
          className="whatsapp-group__text"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow lang-ta">✦ WhatsApp குழு ✦</span>
          <h2 className="lang-ta whatsapp-group__title">{whatsappGroup.titleTamil}</h2>
          <p className="whatsapp-group__title-en">{whatsappGroup.titleEnglish}</p>
          <p className="lang-ta whatsapp-group__desc">{whatsappGroup.descriptionTamil}</p>
          <p className="whatsapp-group__desc-en">{whatsappGroup.descriptionEnglish}</p>

          {hasGroupLink ? (
            <a
              href={templeInfo.whatsappGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle size={18} /> Join WhatsApp Group
            </a>
          ) : (
            <div className="whatsapp-group__hint">
              <QrCode size={18} />
              <span>QR குறியீட்டை ஸ்கேன் செய்து குழுவில் இணையுங்கள் — Scan the QR code to join</span>
            </div>
          )}
        </motion.div>

        <motion.div
          className="whatsapp-group__card glass-card temple-border"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img
            src={whatsappQr}
            alt="Sri Bhoomi Alantha Perumal WhatsApp Group QR Code"
            className="whatsapp-group__qr-img"
            loading="lazy"
            width="500"
            height="500"
          />
          <p className="whatsapp-group__card-caption lang-ta">குழு QR குறியீடு</p>
        </motion.div>
      </div>
    </section>
  );
}
