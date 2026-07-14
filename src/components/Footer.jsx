import { NavLink } from "react-router-dom";
import { Phone, MapPin, Mail, Globe, Camera, PlayCircle } from "lucide-react";
import { navLinks, templeInfo } from "../data/templeData";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__kolam" aria-hidden="true" />
      <div className="container footer__grid">
        <div className="footer__col">
          <div className="footer__brand">
            <span className="footer__om" aria-hidden="true">ॐ</span>
            <div>
              <p className="lang-ta footer__brand-ta">{templeInfo.nameTamil1}</p>
              <p className="lang-ta footer__brand-ta">{templeInfo.nameTamil2}</p>
            </div>
          </div>
          <p className="footer__village">
            <MapPin size={14} />
            <span className="lang-ta">{templeInfo.villageTamil}</span>
            <span className="footer__village-en">({templeInfo.villageEnglish})</span>
          </p>
          <p className="footer__desc lang-ta">{templeInfo.welcomeTamil}</p>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__links">
            {navLinks.map((l) => (
              <li key={l.path}>
                <NavLink to={l.path} className="lang-ta">{l.tamil}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Contact</h4>
          <ul className="footer__links">
            <li>
              <a href={`tel:${templeInfo.templePhone}`}>
                <Phone size={15} /> {templeInfo.templePhone}
              </a>
            </li>
            <li>
              <a href={templeInfo.directionsLink} target="_blank" rel="noopener noreferrer">
                <MapPin size={15} /> Get Directions
              </a>
            </li>
          </ul>
          <div className="footer__social">
            <a href="#" aria-label="Facebook"><Globe size={17} /></a>
            <a href="#" aria-label="Instagram"><Camera size={17} /></a>
            <a href="#" aria-label="YouTube"><PlayCircle size={17} /></a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {templeInfo.copyrightYear} All Rights Reserved</p>
        <p className="footer__credit">
          Developed &amp; Maintained by <strong>{templeInfo.developerName}</strong>
          {" · "}
          <a href={`tel:${templeInfo.developerPhone}`}>{templeInfo.developerPhone}</a>
          {" · "}
          <a href={`mailto:${templeInfo.developerEmail}`}>
            <Mail size={12} /> {templeInfo.developerEmail}
          </a>
        </p>
      </div>
    </footer>
  );
}
