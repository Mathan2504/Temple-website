import { Megaphone } from "lucide-react";
import { announcements } from "../data/templeData";
import "./AnnouncementBar.css";

export default function AnnouncementBar() {
  const loopItems = [...announcements, ...announcements];

  return (
    <div className="announcement-bar" role="marquee" aria-label="Temple announcements">
      <div className="announcement-bar__icon">
        <Megaphone size={16} />
      </div>
      <div className="announcement-bar__track">
        <div className="announcement-bar__scroll">
          {loopItems.map((a, i) => (
            <span key={i} className="announcement-bar__item">
              <span className="lang-ta">{a.tamil}</span>
              <span className="announcement-bar__en"> — {a.english}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
