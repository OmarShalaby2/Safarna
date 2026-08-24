// src/components/ActivityCard.jsx
import { useTrip } from "../context/TripContext";
import { t, tCategory } from "../data/translations";

export default function ActivityCard({ activity }) {
  const { lang } = useTrip();
  if (!activity) return null;
  return (
    <div className="card flex gap-4 items-center">
      <img src={activity.image} alt={activity.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{activity.name}</p>
        <span className="inline-block text-[11px] bg-accent/10 text-accent px-2 py-0.5 rounded-full mt-1">
          {tCategory(lang, activity.category)}
        </span>
      </div>
      <div className="text-end shrink-0 text-xs text-muted">
        <p className="font-semibold text-primary">{activity.price.toLocaleString()} {t(lang, "egp")}</p>
        <p>{activity.durationHours}h</p>
      </div>
    </div>
  );
}
