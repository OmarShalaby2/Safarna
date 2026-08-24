// src/components/DailyPlan.jsx
import { useTrip } from "../context/TripContext";
import { t, tf } from "../data/translations";

export default function DailyPlan({ itinerary }) {
  const { lang } = useTrip();
  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div className="space-y-4">
      {itinerary.map((day) => (
        <div key={day.day} className="card">
          <p className="font-semibold text-primary mb-3">
            {t(lang, "dayLabel")} {day.day}
          </p>
          <ul className="space-y-2">
            {day.items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm">
                <span className="text-lg">{item.icon}</span>
                <span>{item.key ? tf(lang, item.key, item.vars || {}) : item.rawLabel}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
