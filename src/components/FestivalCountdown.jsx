import useCountdown from "../hooks/useCountdown";
import "./FestivalCountdown.css";

const units = [
  { key: "days", labelTa: "நாட்கள்", labelEn: "Days" },
  { key: "hours", labelTa: "மணி", labelEn: "Hours" },
  { key: "minutes", labelTa: "நிமிடம்", labelEn: "Min" },
  { key: "seconds", labelTa: "வினாடி", labelEn: "Sec" },
];

export default function FestivalCountdown({ targetDate }) {
  const timeLeft = useCountdown(targetDate);

  if (timeLeft.total <= 0) {
    return (
      <p className="festival-countdown__ended lang-ta">
        விழா சிறப்பாக நடைபெற்றது! 🙏
      </p>
    );
  }

  return (
    <div className="festival-countdown">
      {units.map((u) => (
        <div key={u.key} className="festival-countdown__unit">
          <span className="festival-countdown__value">
            {String(timeLeft[u.key]).padStart(2, "0")}
          </span>
          <span className="festival-countdown__label lang-ta">{u.labelTa}</span>
        </div>
      ))}
    </div>
  );
}
